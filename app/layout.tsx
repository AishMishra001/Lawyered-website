// app/layout.tsx

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Lawyered - Resolving Legal Risks For Mobility",
  description: "Innovating & Building Scalable Technology Platforms",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(siteUrl),
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
