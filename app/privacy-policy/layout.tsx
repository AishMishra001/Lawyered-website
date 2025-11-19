import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy – Lawyered",
  description: "Our commitment to privacy, data protection, and user rights.",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}