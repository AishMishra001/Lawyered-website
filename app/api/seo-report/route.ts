import { NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { google } from "googleapis"

const gaPropertyId = process.env.GA4_PROPERTY_ID
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
const scSiteUrl = process.env.GOOGLE_SC_PROPERTY_URL

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

function formatDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export async function GET() {
  const missing: string[] = []
  if (!gaPropertyId) missing.push("GA4_PROPERTY_ID")
  if (!clientEmail) missing.push("GOOGLE_CLIENT_EMAIL")
  if (!privateKey) missing.push("GOOGLE_PRIVATE_KEY")
  if (!scSiteUrl) missing.push("GOOGLE_SC_PROPERTY_URL")

  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 30)

  const result: SeoReport = { status: "ok", missingEnv: missing }

  try {
    if (gaPropertyId && clientEmail && privateKey) {
      const analytics = new BetaAnalyticsDataClient({
        credentials: { client_email: clientEmail, private_key: privateKey },
      })

      const [organic] = await analytics.runReport({
        property: `properties/${gaPropertyId}`,
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }],
        limit: 10,
      })

      const organicRow = organic.rows?.find(
        (r) => r.dimensionValues?.[0]?.value === "Organic Search"
      )

      const [landingPages] = await analytics.runReport({
        property: `properties/${gaPropertyId}`,
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        dimensions: [{ name: "landingPagePlusQueryString" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ desc: true, metric: { metricName: "sessions" } }],
        limit: 15,
      })

      const [devices] = await analytics.runReport({
        property: `properties/${gaPropertyId}`,
        dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "sessions" }],
      })

      result.ga4 = {
        organicTraffic: {
          sessions: Number(organicRow?.metricValues?.[0]?.value || 0),
          users: Number(organicRow?.metricValues?.[1]?.value || 0),
        },
        topLandingPages: (landingPages.rows || []).map((r) => ({
          page: r.dimensionValues?.[0]?.value || "",
          sessions: Number(r.metricValues?.[0]?.value || 0),
        })),
        deviceSplit: (devices.rows || []).map((r) => ({
          device: r.dimensionValues?.[0]?.value || "",
          sessions: Number(r.metricValues?.[0]?.value || 0),
        })),
      }
    }
  } catch (e: unknown) {
    result.ga4Error = e instanceof Error ? e.message : String(e)
  }

  try {
    if (clientEmail && privateKey && scSiteUrl) {
      const jwt = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: [
          "https://www.googleapis.com/auth/webmasters.readonly",
          "https://www.googleapis.com/auth/webmasters",
        ],
      })
      await jwt.authorize()
      const webmasters = google.webmasters({ version: "v3", auth: jwt })

      const queries = await webmasters.searchanalytics.query({
        siteUrl: scSiteUrl,
        requestBody: {
          startDate: formatDate(start),
          endDate: formatDate(end),
          dimensions: ["query"],
          rowLimit: 20,
          aggregationType: "auto",
        },
      })

      const pages = await webmasters.searchanalytics.query({
        siteUrl: scSiteUrl,
        requestBody: {
          startDate: formatDate(start),
          endDate: formatDate(end),
          dimensions: ["page"],
          rowLimit: 20,
          aggregationType: "auto",
        },
      })

      let sitemapSummary: SitemapSummaryItem[] | null = null
      try {
        const sitemaps = await webmasters.sitemaps.list({ siteUrl: scSiteUrl })
        sitemapSummary = (sitemaps.data.sitemap || []).map((s) => ({
          path: s.path ?? null,
          type: s.type ?? null,
          lastSubmitted: s.lastSubmitted ?? null,
          lastDownloaded: s.lastDownloaded ?? null,
          errors: s.errors != null ? Number(s.errors) : null,
          warnings: s.warnings != null ? Number(s.warnings) : null,
        }))
      } catch {}

      result.gsc = {
        topQueries: (queries.data.rows || []).map((r) => ({
          query: r.keys?.[0] || "",
          clicks: r.clicks || 0,
          impressions: r.impressions || 0,
          ctr: r.ctr || 0,
          position: r.position || 0,
        })),
        topPages: (pages.data.rows || []).map((r) => ({
          page: r.keys?.[0] || "",
          clicks: r.clicks || 0,
          impressions: r.impressions || 0,
          ctr: r.ctr || 0,
          position: r.position || 0,
        })),
        sitemapSummary,
      }
    }
  } catch (e: unknown) {
    result.gscError = e instanceof Error ? e.message : String(e)
  }

  if (missing.length) {
    result.status = "missing_env"
  }
  return NextResponse.json(result)
}
