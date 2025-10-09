// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lawyered - Resolving Legal Risks For Mobility",
  description: "Innovating & Building Scalable Technology Platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-dark text-white`}>
        <Navbar />
        {/* pt-28 pushes the content down to avoid being hidden by the fixed Navbar */}
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}