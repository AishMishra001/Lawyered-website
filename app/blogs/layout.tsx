import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lawyered Blog – Legal Insights for Mobility",
  description: "Articles on challan resolution, fleet legal-tech, compliance, and on‑road assistance.",
  alternates: { canonical: "/blogs" },
}

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children
}