import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions – Lawyered",
  description: "Usage terms for Lawyered, LOTS247, and ChallanPay services.",
  alternates: { canonical: "/terms-and-conditions" },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}