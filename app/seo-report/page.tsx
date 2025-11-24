"use client"
import { useEffect, useMemo, useState } from "react"

type Ga4LandingPage = { page: string; sessions: number }
type DeviceSplit = { device: string; sessions: number }
type Ga4Section = {
  organicTraffic: { sessions: number; users: number }
  topLandingPages: Ga4LandingPage[]
  deviceSplit: DeviceSplit[]
}
type GscQuery = { query: string; clicks: number; impressions: number; ctr: number; position: number }
type GscPage = { page: string; clicks: number; impressions: number; ctr: number; position: number }
type SitemapSummaryItem = {
  path?: string | null
  type?: string | null
  lastSubmitted?: string | null
  lastDownloaded?: string | null
  errors?: number | null
  warnings?: number | null
}
type SeoReport = {
  status: "ok" | "missing_env"
  missingEnv: string[]
  ga4?: Ga4Section
  gsc?: { topQueries: GscQuery[]; topPages: GscPage[]; sitemapSummary: SitemapSummaryItem[] | null }
  ga4Error?: string
  gscError?: string
}

type AuditSummary = {
  pagesAudited: number
  missingTitles: number
  duplicateTitles: number
  missingMeta: number
  duplicateMeta: number
  h1Missing: number
  h1Multiple: number
  h1DuplicateSitewide: number
  imagesMissingAltTotal: number
  thinContentPages: number
  canonicalMissing: number
  canonicalMismatch: number
  brokenLinksTotal: number
  redirectChainsTotal: number
}

type KeywordItem = { keyword: string; intent: "informational" | "commercial" | "transactional" | "navigational"; priority: number }
type KeywordMappingItem = { keyword: string; intent: KeywordItem["intent"]; target: string; rationale: string }

export default function SeoReportPage() {
  const [data, setData] = useState<SeoReport | null>(null)
  
  const [error, setError] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState<string>(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  const [auditLoading, setAuditLoading] = useState(false)
  const [auditSummary, setAuditSummary] = useState<AuditSummary | null>(null)
  const [pagesCsv, setPagesCsv] = useState<string | null>(null)
  const [linksCsv, setLinksCsv] = useState<string | null>(null)
  const [uiReady, setUiReady] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [tokenInput, setTokenInput] = useState("")
  const [tokenError, setTokenError] = useState<string | null>(null)
  const expectedToken = process.env.NEXT_PUBLIC_SEO_REPORT_TOKEN

  const keywords: KeywordItem[] = useMemo(() => (
    [
      { keyword: "Lawyered", intent: "navigational", priority: 10 },
      { keyword: "LOTS247", intent: "commercial", priority: 10 },
      { keyword: "ChallanPay", intent: "transactional", priority: 10 },
      { keyword: "legal tech for mobility", intent: "commercial", priority: 9 },
      { keyword: "on-road legal assistance", intent: "commercial", priority: 9 },
      { keyword: "traffic challan", intent: "informational", priority: 9 },
      { keyword: "e-challan", intent: "informational", priority: 9 },
      { keyword: "pay traffic challan online", intent: "transactional", priority: 10 },
      { keyword: "challan resolution", intent: "commercial", priority: 8 },
      { keyword: "fleet compliance", intent: "commercial", priority: 8 },
      { keyword: "RTO services", intent: "commercial", priority: 8 },
      { keyword: "Online Lok Adalat", intent: "informational", priority: 7 },
      { keyword: "accident legal support", intent: "commercial", priority: 7 },
      { keyword: "how to pay traffic challan online haryana", intent: "informational", priority: 8 },
      { keyword: "how to pay traffic challan online himachal", intent: "informational", priority: 8 },
      { keyword: "bulk challan resolution", intent: "commercial", priority: 7 }
    ]
  ), [])

  const keywordMap: KeywordMappingItem[] = useMemo(() => (
    [
      { keyword: "Lawyered", intent: "navigational", target: "/", rationale: "Brand and overview" },
      { keyword: "legal tech for mobility", intent: "commercial", target: "/", rationale: "High-level services" },
      { keyword: "on-road legal assistance", intent: "commercial", target: "/", rationale: "Primary positioning" },
      { keyword: "LOTS247", intent: "commercial", target: "/lots-247", rationale: "Transactional/commercial" },
      { keyword: "accident legal support", intent: "commercial", target: "/lots-247", rationale: "Service capability" },
      { keyword: "RTO services", intent: "commercial", target: "/lots-247", rationale: "RTO-as-a-Service" },
      { keyword: "ChallanPay", intent: "transactional", target: "/challan-pay", rationale: "Payment and discovery" },
      { keyword: "pay traffic challan online", intent: "transactional", target: "/challan-pay", rationale: "Core user action" },
      { keyword: "traffic challan", intent: "informational", target: "/blogs", rationale: "Education and guides" },
      { keyword: "e-challan", intent: "informational", target: "/blogs", rationale: "Education and guides" },
      { keyword: "how to pay traffic challan online haryana", intent: "informational", target: "/blogs/traffic-challan-haryana", rationale: "State-specific guide" },
      { keyword: "how to pay traffic challan online himachal", intent: "informational", target: "/blogs/E-challan-system", rationale: "State-specific system overview" },
      { keyword: "bulk challan resolution", intent: "commercial", target: "/lots-247", rationale: "Enterprise capability" }
    ]
  ), [])

  useEffect(() => {
    if (!authorized) return

    const cached = sessionStorage.getItem("seo-report-cache")
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as SeoReport
        setData(parsed)
        setUiReady(true)
      } catch {}
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const fetchData = async () => {
      try {
        const res = await fetch("/api/seo-report", { signal: controller.signal, cache: "no-store" })
        const json = await res.json()
        setData(json)
        sessionStorage.setItem("seo-report-cache", JSON.stringify(json))
      } catch (e: unknown) {
        if (!cached) setError(e instanceof Error ? e.message : String(e))
      } finally {
        clearTimeout(timeout)
        setUiReady(true)
      }
    }
    fetchData()
    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [authorized])

  if (!authorized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg p-6 shadow">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Enter Access Token</h1>
          <input
            className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded px-3 py-2 mb-3"
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!expectedToken) {
                  setTokenError("Token not configured")
                  return
                }
                if (tokenInput.trim() === expectedToken) {
                  setAuthorized(true)
                  setTokenError(null)
                } else {
                  setTokenError("Invalid token")
                }
              }
            }}
          />
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded bg-[#0891B2] text-white"
              onClick={() => {
                if (!expectedToken) {
                  setTokenError("Token not configured")
                  return
                }
                if (tokenInput.trim() === expectedToken) {
                  setAuthorized(true)
                  setTokenError(null)
                } else {
                  setTokenError("Invalid token")
                }
              }}
            >
              Continue
            </button>
          </div>
          {tokenError && <div className="mt-3 text-sm text-red-600">{tokenError}</div>}
        </div>
      </div>
    )
  }

  

  return (
    <div className="px-4 md:px-26 py-12 text-black dark:text-white">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Baseline SEO Report</h1>
      {error && (
        <div className="mb-4 text-sm px-3 py-2 rounded border border-red-300 text-red-700 bg-red-50 dark:border-red-800 dark:text-red-300 dark:bg-red-950/40">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Google Analytics</h2>
          {data ? (data.ga4 ? (
            <div className="space-y-4">
              <div>
                <div className="font-semibold">Organic Traffic (Last 30 days)</div>
                <div>Sessions: {data.ga4.organicTraffic.sessions}</div>
                <div>Users: {data.ga4.organicTraffic.users}</div>
              </div>
              <div>
                <div className="font-semibold">Top Landing Pages</div>
                <ul className="list-disc ml-5">
                  {data.ga4.topLandingPages.map((p: Ga4LandingPage, i: number) => (
                    <li key={i}>{p.page} — {p.sessions}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold">Device Split</div>
                <ul className="list-disc ml-5">
                  {data.ga4.deviceSplit.map((d: DeviceSplit, i: number) => (
                    <li key={i}>{d.device} — {d.sessions}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>Missing GA4 credentials</div>
          )) : (
            <div>Loading analytics...</div>
          )}
        </div>
        <div className="border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Google Search Console</h2>
          {data ? (data.gsc ? (
            <div className="space-y-4">
              <div>
                <div className="font-semibold">Top Queries</div>
                <ul className="list-disc ml-5">
                  {data.gsc.topQueries.map((q: GscQuery, i: number) => (
                    <li key={i}>{q.query} — {q.clicks} clicks, {q.impressions} impressions</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold">Top Pages</div>
                <ul className="list-disc ml-5">
                  {data.gsc.topPages.map((p: GscPage, i: number) => (
                    <li key={i}>{p.page} — {p.clicks} clicks, {p.impressions} impressions</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold">Sitemaps</div>
                {Array.isArray(data.gsc.sitemapSummary) && data.gsc.sitemapSummary.length > 0 ? (
                  <ul className="list-disc ml-5">
                    {data.gsc.sitemapSummary.map((s: SitemapSummaryItem, i: number) => (
                      <li key={i}>{s.path} — {s.type}</li>
                    ))}
                  </ul>
                ) : (
                  <div>No sitemap data available</div>
                )}
              </div>
            </div>
          ) : (
            <div>Missing GSC credentials</div>
          )) : (
            <div>Loading search console...</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
        <div className="border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Site Audit</h2>
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <input
              className="w-full md:w-auto flex-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded px-3 py-2"
              value={baseUrl}
              disabled={true}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
            <button
              className="px-4 py-2 rounded bg-[#0891B2] text-white"
              onClick={async () => {
                setAuditLoading(true)
                setAuditSummary(null)
                setPagesCsv(null)
                setLinksCsv(null)
                try {
                  const res = await fetch(`/api/site-audit?baseUrl=${encodeURIComponent(baseUrl)}`, { cache: "no-store" })
                  const json = await res.json()
                  setAuditSummary(json.summary)
                  setPagesCsv(json.pagesCsv)
                  setLinksCsv(json.linksCsv)
                } catch {
                } finally {
                  setAuditLoading(false)
                }
              }}
            >
              {auditLoading ? "Auditing..." : "Run Audit"}
            </button>
            {uiReady && pagesCsv && (
              <button
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                onClick={() => {
                  const blob = new Blob([pagesCsv], { type: "text/csv;charset=utf-8" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = "site-audit-pages.csv"
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Download Pages CSV
              </button>
            )}
            {uiReady && linksCsv && (
              <button
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
                onClick={() => {
                  const blob = new Blob([linksCsv], { type: "text/csv;charset=utf-8" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = "site-audit-links.csv"
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Download Links CSV
              </button>
            )}
          </div>
          {auditSummary && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Pages</div>
                <ul className="list-disc ml-5">
                  <li>Audited: {auditSummary.pagesAudited}</li>
                  <li>Thin Content: {auditSummary.thinContentPages}</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Titles</div>
                <ul className="list-disc ml-5">
                  <li>Missing: {auditSummary.missingTitles}</li>
                  <li>Duplicates: {auditSummary.duplicateTitles}</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Meta Descriptions</div>
                <ul className="list-disc ml-5">
                  <li>Missing: {auditSummary.missingMeta}</li>
                  <li>Duplicates: {auditSummary.duplicateMeta}</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">H1</div>
                <ul className="list-disc ml-5">
                  <li>Missing: {auditSummary.h1Missing}</li>
                  <li>Multiple per page: {auditSummary.h1Multiple}</li>
                  <li>Duplicates sitewide: {auditSummary.h1DuplicateSitewide}</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Images</div>
                <ul className="list-disc ml-5">
                  <li>Missing alt total: {auditSummary.imagesMissingAltTotal}</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Canonical</div>
                <ul className="list-disc ml-5">
                  <li>Missing: {auditSummary.canonicalMissing}</li>
                  <li>Mismatch: {auditSummary.canonicalMismatch}</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Links</div>
                <ul className="list-disc ml-5">
                  <li>Broken links total: {auditSummary.brokenLinksTotal}</li>
                  <li>Redirect chains total: {auditSummary.redirectChainsTotal}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Keyword Research</h2>
          <div className="space-y-2">
            {keywords
              .sort((a, b) => b.priority - a.priority)
              .map((k, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>{k.keyword}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{k.intent} · priority {k.priority}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Keyword → Page Mapping</h2>
          <div className="space-y-2">
            {keywordMap.map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">{m.keyword}</span> → <a href={m.target} className="underline">{m.target}</a>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{m.intent} · {m.rationale}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2">Identified Gaps</div>
            <ul className="list-disc ml-5 space-y-1">
              <li>State guides: Delhi, Maharashtra, Uttar Pradesh, Karnataka, Tamil Nadu</li>
              <li>Enterprise landing: Bulk challan resolution and dashboards</li>
              <li>API landing: VAHAN/RC insight integrations for partners</li>
            </ul>
          </div>
        </div>
      </div>
      {Array.isArray(data?.missingEnv) && data.missingEnv.length > 0 && (
        <div className="mt-8">
          <div className="font-semibold">Missing environment variables</div>
          <ul className="list-disc ml-5">
            {data.missingEnv.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
