import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Lawyered",
  description: "Reach Lawyered for partnerships, careers, vendor queries and support.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}