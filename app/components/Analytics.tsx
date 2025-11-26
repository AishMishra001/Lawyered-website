"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId) return
    const q = searchParams?.toString()
    const page_path = q ? `${pathname}?${q}` : pathname
    const gtag = window.gtag
    if (typeof gtag === "function") {
      gtag("config", gaId, { page_path })
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer!.push(["config", gaId, { page_path }])
    }
  }, [pathname, searchParams])

  return null
}
