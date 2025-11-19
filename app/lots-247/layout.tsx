import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LOTS247 – Fleet Legal-Tech Platform by Lawyered",
  description:
    "Real-time compliance tracking, instant challan resolution, accident support, and regulatory risk management for fleets and mobility.",
  alternates: { canonical: "/lots-247" },
}

export default function LotsLayout({ children }: { children: React.ReactNode }) {
  return children
}