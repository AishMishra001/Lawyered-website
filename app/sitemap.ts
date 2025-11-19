import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const lastMod = new Date()
  return [
    { url: `${base}/`, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/lots-247`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/challan-pay`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blogs`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blogs/E-challan-system`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blogs/future-of-ai`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blogs/lots-covered`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blogs/resolve-Echallan`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blogs/traffic-challan-app`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blogs/traffic-challan-haryana`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-and-conditions`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.3 },
  ]
}