import { NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { google } from "googleapis"

const gaPropertyId = "514193409"
const clientEmail = "lawyered@lawyered-479211.iam.gserviceaccount.com"
const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVoZbmuskDXP/6\nZbfWYbIyuKL7xT2nThB9pD0R9ahPZSZg5vwdiasEv5MCANA9VfmXiKuwzy2nJ8Gu\nTd0snxYDTBID7o9HZSIrmHl0cZx9V8qT03pLyVaxY3JKv9/meYM0RT1VCSuQdESD\nQvta5wzuUgYzr8X6kwmaw6F2Q3SkIqkCOGdnMspDkoYT4Ph9lQzR/vMckO3ZFiTK\nQ9ozNCjCzDLyWMlvJp4sQ8fEcPUASWW909hFAjm0AnZGV4AoQuQmITh/tL7cQ/Kn\nbYfjhFOhTIJQMG6hygGdqFHwfVPiU0VdVfHq8v6oIbZFdBoqxFOr/jy7VhCzmbNR\nWQACYTabAgMBAAECggEACrWyoHeNuz7u0ElIKZW1Psi11wRg3mHR/tJ8g0l6+hv6\njBIYYoyzx6WpA4kx51lHjXq7DL6eLcqW8ZuSsnl5O4oVPyA3C5+80k2vDRDjBP+h\nNr772w/JalQvdyLeYSoHU1gDRp+SkQfbJW92tWxu4AW5rN6rgK/dY+ZZ0ll4YAAL\nXKwk2VJYRBi4Igld5WvfFdlqgxFEwP9AwebSvr3flNd47hcary05rRZKAmOnxaCt\nixFKr6M+xbik48uyePi90HrLcjgQtYlHHsWwuoG+TRjajcIfigSpbiiF2cS85hGT\nv6mpd7eilZKDSNbFo4vfDW1Wg0Ue3dqZYb3+kmrRkQKBgQDzRfijiVRX4Jk71+SI\nO0USN8r14OsiLYdxIs7KmMIftPQFWjPYVvAyt+E1xUozxwuLXK77A2XWqKrdBssl\nNoSul9hnCZxC+12Kv+qrQzgv2MTpqX6C8kJEjAZafbcxNicLR4QXnL6OzbhtvxwH\nvMZ9NqzP9dq+GDvtALSoQAEiSwKBgQDgzqMl4+5zwTeHV1Xa1B2GwoaN46f9wDSH\n2iMAcXOHk4w5yJtRJU9TeHCCmA2JI7N/AFf1dJMfJCplv8F5eZ2UA6jbquJgF8Fh\n8JB/V8IBgwO/QDgIlQ+1rkBzjJjQIiSG+MNjh1mKmhUQoUyeqE/+pAncnU32tFd7\n4GkZvksK8QKBgQDI7UTkRXvdLQtC6xi9ED8HQf+nP0LVsscIQZiMqsjDCWD2vr7N\nc1jmewtOrwmPZFn7m+yGNBM7zYl6Dq9gp/vEfHPm/oAKrrRe8g4vr9BLbH2PBEgS\nfWcQWJqyyNyyj6iF32aRXgvhxLYMJulO1rMWHj9zb/tgQIHWSVvtDxggqwKBgQCm\nXqaE4xNUXTjwE2U5ZmNXmNylY0au1zDJHVlr+YorWrmbBehT/E2hk2+IZmkWBfLP\n2Xw+7f/3OveZh3jyoltI8BBmSSfxP4NhLPxzEYpFPiVmw2r0hwQyS3vtR67L0YjA\nzpcjMEbG+VL/lK+0dxGEfPfDajMJkdtwlNqTL64vsQKBgQCQH6Qyb7gPZyLJ8Fb4\nYE3FuOYwo031YoJCZjwBVfmtvMraoGy612RTs8xr1SKYHi1auH0aSBMh2I2dvLno\n07D5iayFWG6V6eoCXi6er2c/4O+sAAVe1h13XTUXTxppyLdgC0Bvmj9bZOc+4bN8\ndOE/FmuhQt0UlIG13Von9rU+jQ==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n")
const scSiteUrl = "https://lawyered.in"

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
