// app/layout.tsx

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { Suspense } from "react"
import Analytics from "@/app/components/Analytics"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = {
  title: "Lawyered - Resolving Legal Risks For Mobility",
  description: "Innovating & Building Scalable Technology Platforms",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(siteUrl),
  keywords: [
    "Lawyered",
    "legal tech for mobility",
    "on-road legal assistance",
    "fleet legal assistance",
    "challan resolution",
    "RTO services",
    "LOTS247",
    "ChallanPay",
    "India mobility compliance"
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Important for next-themes: suppress hydration warning and wrap app with ThemeProvider.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lawyered",
              url: siteUrl,
              logo: `${siteUrl}/lawyered-logo.png`,
              sameAs: [
                "https://www.linkedin.com/company/lawyered/",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-9988441033",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["en"],
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: siteUrl,
              name: "Lawyered",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
