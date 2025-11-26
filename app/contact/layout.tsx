import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Lawyered",
  description: "Reach Lawyered for partnerships, careers, vendor queries and support.",
  alternates: { canonical: "/contact" },
  keywords: [
    "Contact Lawyered",
    "Contact LOTS247",
    "Contact ChallanPay",
    "customer support",
    "legal assistance contact"
  ],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
