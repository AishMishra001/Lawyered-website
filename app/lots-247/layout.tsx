import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LOTS247 – Fleet Legal-Tech Platform by Lawyered",
  description:
    "Real-time compliance tracking, instant challan resolution, accident support, and regulatory risk management for fleets and mobility.",
  alternates: { canonical: "/lots-247" },
  keywords: [
    "LOTS247",
    "fleet legal assistance",
    "roadside legal support",
    "challan resolution service",
    "RTO-as-a-Service",
    "compliance tracking",
    "accident legal support",
    "legal tech for fleets"
  ],
}

export default function LotsLayout({ children }: { children: React.ReactNode }) {
  return children
}
