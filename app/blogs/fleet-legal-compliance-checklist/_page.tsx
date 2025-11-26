import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Fleet Legal Compliance Checklist for India",
  description:
    "Essential legal compliance checklist for fleets in India: documents, permits, taxes, and operational controls.",
  alternates: { canonical: "/blogs/fleet-legal-compliance-checklist" },
  keywords: [
    "fleet compliance India",
    "transport legal checklist",
    "PUC insurance fitness",
    "AITP state tax",
    "LOTS247 fleet legal",
  ],
}

export default function SingleBlogPage() {
  return (
    <div className="pt-28 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
                { "@type": "ListItem", position: 2, name: "Blogs", item: `${siteUrl}/blogs` },
                { "@type": "ListItem", position: 3, name: "Fleet Compliance Checklist", item: `${siteUrl}/blogs/fleet-legal-compliance-checklist` },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "Fleet Legal Compliance Checklist for India",
              description:
                "Essential legal compliance checklist for fleets in India: documents, permits, taxes, and operational controls.",
              image: `${siteUrl}/blog1.png`,
              datePublished: "2025-11-24",
              dateModified: "2025-11-24",
              author: { "@type": "Organization", name: "Team Lawyered" },
              mainEntityOfPage: `${siteUrl}/blogs/fleet-legal-compliance-checklist`,
              url: `${siteUrl}/blogs/fleet-legal-compliance-checklist`,
            }),
          }}
        />

        <div className="mb-8 mt-4 md:mt-0">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-black dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-lg">
            <ChevronLeft size={16} />
            Back
          </Link>
          <p className="text-sm md:text-xl text-black dark:text-gray-500 mt-4 md:mt-6 flex gap-2 md:gap-6">
            <span> Home</span>
            <span> &gt;</span>
            <span>Blog details</span>
          </p>
        </div>

        <header className="space-y-4">
          <p className="text-lg text-black dark:text-gray-400">Nov 24, 2025 | 7 min read • Author: Team Lawyered</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00A2BB] dark:text-[#22D3EE] leading-tight">
            Fleet Legal Compliance Checklist for India
          </h1>
        </header>

        <div className="my-6 md:my-8 overflow-hidden relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src="/blog1.png"
            alt="Fleet legal compliance checklist"
            fill
            className="object-cover grayscale"
          />
        </div>

        <article className="prose prose-invert text-base prose-lg max-w-none text-black dark:text-gray-300 space-y-12">
          <p>
            This checklist helps transport businesses and fleet operators stay compliant across documents, permits, taxes, and operations. Pair it with
            <Link href="/lots-247" className="text-[#22D3EE] hover:underline">LOTS247</Link>
            for 24×7 on‑road legal support and compliance automation.
          </p>

          <h2 className="text-black dark:text-white font-bold text-2xl">Vehicle Documents</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Registration Certificate (RC) — up‑to‑date owner and vehicle details</li>
            <li>Valid Insurance — comprehensive or third‑party coverage</li>
            <li>Pollution Under Control (PUC) — timely renewals and tracking</li>
            <li>Fitness Certificate — as per vehicle class and usage</li>
          </ul>

          <h2 className="text-black dark:text-white font-bold text-2xl">Permits & Taxes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>National Permit / AITP — ensure proper endorsements</li>
            <li>State Tax for AITP vehicles — pay and reconcile per‑state</li>
            <li>Toll & FASTag — account health and recharge policy</li>
          </ul>

          <h2 className="text-black dark:text-white font-bold text-2xl">Driver Compliance</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Valid Driving Licence with category endorsements</li>
            <li>Induction training on traffic rules and dispute handling</li>
            <li>Incident reporting SOPs with evidence capture</li>
          </ul>

          <h2 className="text-black dark:text-white font-bold text-2xl">Operational Controls</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Centralized challan monitoring and assignment</li>
            <li>Monthly reconciliation of payments and disputes</li>
            <li>Audit trails and document management</li>
          </ul>

          <h2 className="text-black dark:text-white font-bold text-2xl">On‑Road Legal Support</h2>
          <p>
            Use LOTS247 for on‑site representation, dispute guidance, and API integrations to keep your fleet compliant and productive.
          </p>

          <h2 className="text-black dark:text-white font-bold text-2xl">Get Help</h2>
          <p>
            For driver‑level challans and disputes, use
            <Link href="/challan-pay" className="text-[#22D3EE] hover:underline mx-1">ChallanPay</Link>.
            For fleet‑wide compliance and dashboards, explore
            <Link href="/lots-247" className="text-[#22D3EE] hover:underline mx-1">LOTS247</Link>.
          </p>
        </article>
      </div>
    </div>
  )
}
