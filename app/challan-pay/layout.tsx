import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ChallanPay – Discover and Pay Traffic Challans Online",
  description:
    "Fast, secure challan discovery and resolution for individuals, fleets and enterprises across India.",
  alternates: { canonical: "/challan-pay" },
}

export default function ChallanPayLayout({ children }: { children: React.ReactNode }) {
  return children
}