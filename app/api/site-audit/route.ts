import { NextResponse } from "next/server"
import sitemap from "@/app/sitemap"

type PageAudit = {
  url: string
  status: number
  title?: string | null
  titleLength?: number | null
  metaDescription?: string | null
  metaLength?: number | null
  h1?: string | null
  h1Count: number
  imgWithoutAltCount: number
  thinContent: boolean
  canonical?: string | null
  canonicalMissing: boolean
  canonicalMismatch: boolean
  brokenLinksCount: number
  redirectChainsCount: number
}

type LinkIssue = {
  sourcePage: string
  href: string
  finalUrl: string
  status: number
  chainLength: number
}

function textBetween(html: string, regex: RegExp): string | null {
  const m = html.match(regex)
  if (!m) return null
  const s = m[1]?.trim() ?? null
  return s && s.replace(/\s+/g, " ")
}

function getMetaDescription(html: string): string | null {
  const re = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
  const m = html.match(re)
  return m ? (m[1] || "").trim() : null
}

function getCanonical(html: string): string | null {
  const re = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  const m = html.match(re)
  return m ? (m[1] || "").trim() : null
}

function countImgWithoutAlt(html: string): number {
  const imgs = html.match(/<img\b[^>]*>/gi) || []
  let count = 0
  for (const tag of imgs) {
    const hasAlt = /\balt=/.test(tag)
    const emptyAlt = /\balt=["']\s*["']/.test(tag)
    if (!hasAlt || emptyAlt) count++
  }
  return count
}

function extractH1s(html: string): string[] {
  const matches = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || []
  return matches.map((m) => {
    const inner = m.replace(/<h1\b[^>]*>/i, "").replace(/<\/h1>/i, "")
    const stripped = inner.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ")
    return stripped.replace(/\s+/g, " ").trim()
  })
}

function wordCountFromBody(html: string): number {
  let body = html
  body = body.replace(/<script[\s\S]*?<\/script>/gi, " ")
  body = body.replace(/<style[\s\S]*?<\/style>/gi, " ")
  body = body.replace(/<nav[\s\s]*?<\/nav>/gi, " ")
  body = body.replace(/<header[\s\S]*?<\/header>/gi, " ")
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, " ")
  body = body.replace(/<aside[\s\S]*?<\/aside>/gi, " ")
  body = body.replace(/<[^>]+>/g, " ")
  const text = body.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
  if (!text) return 0
  return text.split(/\s+/).length
}

function getLinks(html: string): string[] {
  const matches = html.match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi) || []
  const urls: string[] = []
  for (const m of matches) {
    const h = m.match(/href=["']([^"']+)["']/i)
    if (h && h[1]) urls.push(h[1])
  }
  return urls
}

async function followRedirects(url: string, max: number): Promise<{ finalUrl: string; status: number; chain: string[] }> {
  const chain: string[] = []
  let current = url
  for (let i = 0; i < max; i++) {
    try {
      const res = await fetch(current, { method: "GET", redirect: "manual", cache: "no-store" })
      const status = res.status
      if (status >= 300 && status < 400) {
        const loc = res.headers.get("location")
        if (!loc) return { finalUrl: current, status, chain }
        const next = new URL(loc, current).href
        chain.push(next)
        current = next
        continue
      }
      return { finalUrl: res.url || current, status, chain }
    } catch {
      return { finalUrl: current, status: 0, chain }
    }
  }
  return { finalUrl: current, status: 0, chain }
}

function toCsv<T extends Record<string, unknown>>(rows: T[], headers: (keyof T)[]): string {
  const h = headers.map((k) => String(k)).join(",")
  const lines = [h]
  for (const row of rows) {
    const vals = headers.map((k) => {
      const v = row[k]
      if (v == null) return ""
      const s = String(v)
      const escaped = '"' + s.replace(/"/g, '""') + '"'
      return escaped
    })
    lines.push(vals.join(","))
  }
  return lines.join("\r\n")
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const base = url.searchParams.get("baseUrl") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  let targets: string[] = []
  try {
    const items = sitemap() as Array<{ url: string }>
    targets = items.map((i) => i.url).filter(Boolean)
  } catch {
    targets = [base]
  }
  const origin = new URL(base).origin

  const pageResults: PageAudit[] = []
  const linkIssues: LinkIssue[] = []

  for (const pageUrl of targets) {
    try {
      const res = await fetch(pageUrl, { method: "GET", redirect: "follow", cache: "no-store" })
      const status = res.status
      const html = await res.text()
      const title = textBetween(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
      const metaDescription = getMetaDescription(html)
      const h1s = extractH1s(html)
      const h1 = h1s[0] || null
      const h1Count = h1s.length
      const canonical = getCanonical(html)
      const canonicalMissing = !canonical
      let canonicalMismatch = false
      if (canonical) {
        try {
          const cu = new URL(canonical, pageUrl)
          const pu = new URL(pageUrl)
          const a = cu.href.replace(/\/$/, "")
          const b = pu.href.replace(/\/$/, "")
          canonicalMismatch = a !== b
        } catch {
          canonicalMismatch = true
        }
      }
      const imgWithoutAltCount = countImgWithoutAlt(html)
      const words = wordCountFromBody(html)
      const thinContent = words < 200
      const links = getLinks(html)
      let brokenLinksCount = 0
      let redirectChainsCount = 0
      for (const href of links) {
        try {
          const abs = new URL(href, pageUrl).href
          const isInternal = new URL(abs).origin === origin
          if (!isInternal) continue
          const r = await followRedirects(abs, 5)
          const chainLength = r.chain.length
          if (r.status >= 400 || r.status === 0) {
            brokenLinksCount++
            linkIssues.push({ sourcePage: pageUrl, href, finalUrl: r.finalUrl, status: r.status, chainLength })
          }
          if (chainLength > 0) {
            redirectChainsCount++
            if (r.status < 400) linkIssues.push({ sourcePage: pageUrl, href, finalUrl: r.finalUrl, status: r.status, chainLength })
          }
        } catch {}
      }

      pageResults.push({
        url: pageUrl,
        status,
        title,
        titleLength: title ? title.length : null,
        metaDescription,
        metaLength: metaDescription ? metaDescription.length : null,
        h1,
        h1Count,
        imgWithoutAltCount,
        thinContent,
        canonical,
        canonicalMissing,
        canonicalMismatch,
        brokenLinksCount,
        redirectChainsCount,
      })
    } catch {
      pageResults.push({
        url: pageUrl,
        status: 0,
        title: null,
        titleLength: null,
        metaDescription: null,
        metaLength: null,
        h1: null,
        h1Count: 0,
        imgWithoutAltCount: 0,
        thinContent: true,
        canonical: null,
        canonicalMissing: true,
        canonicalMismatch: true,
        brokenLinksCount: 0,
        redirectChainsCount: 0,
      })
    }
  }

  const titleMap = new Map<string, string[]>()
  const descMap = new Map<string, string[]>()
  const h1Map = new Map<string, string[]>()
  for (const p of pageResults) {
    if (p.title) titleMap.set(p.title, [...(titleMap.get(p.title) || []), p.url])
    if (p.metaDescription) descMap.set(p.metaDescription, [...(descMap.get(p.metaDescription) || []), p.url])
    if (p.h1) h1Map.set(p.h1, [...(h1Map.get(p.h1) || []), p.url])
  }

  const dupTitles = new Set<string>()
  const dupDescs = new Set<string>()
  const dupH1s = new Set<string>()
  for (const [t, urls] of titleMap.entries()) if (urls.length > 1) dupTitles.add(t)
  for (const [d, urls] of descMap.entries()) if (urls.length > 1) dupDescs.add(d)
  for (const [h, urls] of h1Map.entries()) if (urls.length > 1) dupH1s.add(h)

  const pagesCsv = toCsv(pageResults.map((p) => ({
    url: p.url,
    status: p.status,
    title: p.title || "",
    title_length: p.titleLength ?? "",
    title_misformatted: p.titleLength != null ? (p.titleLength < 30 || p.titleLength > 60) : false,
    title_missing: !p.title,
    title_duplicate: p.title ? dupTitles.has(p.title) : false,
    meta_description: p.metaDescription || "",
    meta_length: p.metaLength ?? "",
    meta_misformatted: p.metaLength != null ? (p.metaLength < 70 || p.metaLength > 160) : false,
    meta_missing: !p.metaDescription,
    meta_duplicate: p.metaDescription ? dupDescs.has(p.metaDescription) : false,
    h1: p.h1 || "",
    h1_count: p.h1Count,
    h1_missing: !p.h1,
    h1_duplicate_sitewide: p.h1 ? dupH1s.has(p.h1) : false,
    img_without_alt_count: p.imgWithoutAltCount,
    thin_content: p.thinContent,
    canonical_url: p.canonical || "",
    canonical_missing: p.canonicalMissing,
    canonical_mismatch: p.canonicalMismatch,
    broken_links_count: p.brokenLinksCount,
    redirect_chains_count: p.redirectChainsCount,
  })), [
    "url",
    "status",
    "title",
    "title_length",
    "title_misformatted",
    "title_missing",
    "title_duplicate",
    "meta_description",
    "meta_length",
    "meta_misformatted",
    "meta_missing",
    "meta_duplicate",
    "h1",
    "h1_count",
    "h1_missing",
    "h1_duplicate_sitewide",
    "img_without_alt_count",
    "thin_content",
    "canonical_url",
    "canonical_missing",
    "canonical_mismatch",
    "broken_links_count",
    "redirect_chains_count",
  ])

  const linksCsv = toCsv(linkIssues.map((l) => ({
    source_page: l.sourcePage,
    link_href: l.href,
    final_url: l.finalUrl,
    status: l.status,
    chain_length: l.chainLength,
  })), ["source_page", "link_href", "final_url", "status", "chain_length"])

  const summary = {
    pagesAudited: pageResults.length,
    missingTitles: pageResults.filter((p) => !p.title).length,
    duplicateTitles: pageResults.filter((p) => p.title && dupTitles.has(p.title)).length,
    missingMeta: pageResults.filter((p) => !p.metaDescription).length,
    duplicateMeta: pageResults.filter((p) => p.metaDescription && dupDescs.has(p.metaDescription)).length,
    h1Missing: pageResults.filter((p) => !p.h1).length,
    h1Multiple: pageResults.filter((p) => p.h1Count > 1).length,
    h1DuplicateSitewide: pageResults.filter((p) => p.h1 && dupH1s.has(p.h1)).length,
    imagesMissingAltTotal: pageResults.reduce((a, b) => a + b.imgWithoutAltCount, 0),
    thinContentPages: pageResults.filter((p) => p.thinContent).length,
    canonicalMissing: pageResults.filter((p) => p.canonicalMissing).length,
    canonicalMismatch: pageResults.filter((p) => p.canonicalMismatch).length,
    brokenLinksTotal: pageResults.reduce((a, b) => a + b.brokenLinksCount, 0),
    redirectChainsTotal: pageResults.reduce((a, b) => a + b.redirectChainsCount, 0),
  }

  return NextResponse.json({ summary, pagesCsv, linksCsv })
}
