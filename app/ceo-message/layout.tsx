import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CEO's Message – Himanshu Gupta, Lawyered",
  description:
    "From reactive to preventive to predictive legal risk management for mobility – a note from our Founder & CEO.",
  alternates: { canonical: "/ceo-message" },
  keywords: [
    "Lawyered CEO message",
    "Himanshu Gupta",
    "legal risk management",
    "mobility legal tech",
  ],
}

export default function CeoMessageLayout({ children }: { children: React.ReactNode }) {
  return children
}
