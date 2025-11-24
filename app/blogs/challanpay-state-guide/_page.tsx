import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "How ChallanPay Works — State‑Wise Challan Resolution Guide",
  description:
    "Understand ChallanPay and how to resolve traffic challans across Indian states, with steps, tips, and links to official portals.",
  alternates: { canonical: "/blogs/challanpay-state-guide" },
  keywords: [
    "ChallanPay",
    "state challan resolution",
    "pay e‑challan",
    "check challan status",
    "Parivahan",
    "traffic fines India",
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
                { "@type": "ListItem", position: 3, name: "ChallanPay Guide", item: `${siteUrl}/blogs/challanpay-state-guide` },
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
              headline: "How ChallanPay Works — State‑Wise Challan Resolution Guide",
              description:
                "Understand ChallanPay and how to resolve traffic challans across Indian states, with steps, tips, and links to official portals.",
              image: `${siteUrl}/blog3.png`,
              datePublished: "2025-11-24",
              dateModified: "2025-11-24",
              author: { "@type": "Organization", name: "Team Lawyered" },
              mainEntityOfPage: `${siteUrl}/blogs/challanpay-state-guide`,
              url: `${siteUrl}/blogs/challanpay-state-guide`,
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
          <p className="text-lg text-black dark:text-gray-400">Nov 24, 2025 | 6 min read • Author: Team Lawyered</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00A2BB] dark:text-[#22D3EE] leading-tight">
            How ChallanPay Works — State‑Wise Challan Resolution Guide
          </h1>
        </header>

        <div className="my-6 md:my-8 overflow-hidden relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src="/blog3.png"
            alt="ChallanPay state‑wise resolution guide"
            fill
            className="object-cover grayscale"
          />
        </div>

        <article className="prose prose-invert text-base prose-lg max-w-none text-black dark:text-gray-300 space-y-12">
          <p>
            ChallanPay simplifies traffic challan checks and payments across India with a unified experience and step‑by‑step guidance. Whether you need to verify a challan, pay a fine, or dispute an error, use
            <Link href="/challan-pay" className="text-[#22D3EE] hover:underline">ChallanPay</Link>
            to get resolution fast.
          </p>

          <h2 className="text-black dark:text-white font-bold text-2xl">How ChallanPay Works</h2>
          <p>
            Enter your vehicle number, verify challan details, choose a resolution path (pay or dispute), and track updates. For fleets, integrate with
            <Link href="/lots-247" className="text-[#22D3EE] hover:underline">LOTS247</Link>
            to centralize compliance.
          </p>

          <h2 className="text-black dark:text-white font-bold text-2xl">State‑Wise Resolution — Quick Links</h2>
          <p>
            Many states route e‑challans via Parivahan. Use official portals below for verification and payment.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>All‑India Parivahan e‑Challan: <a href="https://echallan.parivahan.gov.in" className="text-[#22D3EE] hover:underline">echallan.parivahan.gov.in</a></li>
            <li>Delhi Traffic Police: <a href="https://delhitrafficpolice.nic.in/e-challan/" className="text-[#22D3EE] hover:underline">delhitrafficpolice.nic.in</a></li>
            <li>Maharashtra: <a href="https://mahatrafficechallan.gov.in/" className="text-[#22D3EE] hover:underline">mahatrafficechallan.gov.in</a></li>
            <li>Haryana: <a href="https://haryanapolice.gov.in/e-challan" className="text-[#22D3EE] hover:underline">haryanapolice.gov.in</a></li>
            <li>Uttar Pradesh: <a href="https://uttarpradesh.challanpay.com/" className="text-[#22D3EE] hover:underline">UP portal</a></li>
          </ul>

          <h2 className="text-black dark:text-white font-bold text-2xl">When to Dispute a Challan</h2>
          <p>
            Dispute when details are incorrect, evidence contradicts the allegation, or the challan is duplicated. Attach photos, location data, and receipts. Use official portals’ grievance sections and keep an acknowledgement.
          </p>

          <h2 className="text-black dark:text-white font-bold text-2xl">Fleet Workflows</h2>
          <p>
            For fleets, centralize challan monitoring, assign case owners, and reconcile payments monthly. LOTS247 enables on‑road legal assistance, API integration, and compliance dashboards.
          </p>

          <h2 className="text-black dark:text-white font-bold text-2xl">Get Started</h2>
          <p>
            Resolve your challans now with
            <Link href="/challan-pay" className="text-[#22D3EE] hover:underline mx-1">ChallanPay</Link>.
            For fleets, explore
            <Link href="/lots-247" className="text-[#22D3EE] hover:underline mx-1">LOTS247</Link>
            for end‑to‑end legal cover and compliance.
          </p>
        </article>
      </div>
    </div>
  )
}
