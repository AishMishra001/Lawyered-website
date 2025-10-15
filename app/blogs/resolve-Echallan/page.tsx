// app/blogs/traffic-challan-app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SingleBlogPage() {
  return (
    <div className="pt-28 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button & Breadcrumbs */}
        <div className="mb-8 mt-4 md:mt-0">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-lg">
            <ChevronLeft size={16} />
            Back
          </Link>
          <p className="text-sm md:text-xl text-gray-500 mt-4 md:mt-6 flex gap-2 md:gap-6">
            <span> Home</span>
            <span> &gt;</span>
            <span>Blog details</span>
          </p>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <p className="text-lg text-gray-400">Dec 3, 2024 | 5 min read • Author: Team Lawyered</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#22D3EE] leading-tight">
            How to Resolve E-Challans Online: A Step-by-Step Guide for Traffic Fine Payment in India
          </h1>
        </header>

        {/* Featured Image */}
        <div className="my-6 md:my-8 overflow-hidden relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src="/blog6.png" // As specified
            alt="Traffic light against a cloudy sky"
            fill
            className="object-cover grayscale"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-invert text-base prose-lg max-w-none text-gray-300 space-y-12">
          <p>
           Navigating India’s bustling roads can be challenging, often leading to unintentional traffic rule violations. This can result in hefty e-challans, but managing them has never been easier. But what if managing these fines was as easy as a few taps on your smartphone?
          </p>
          <p>
            With the advent of online challan payment methods, e-challan platforms, and quick status checks, dealing with traffic penalties has become more convenient than ever. Whether you need to pay a challan, monitor its status, or verify the details, you can now do it all from the comfort of your home or while on the go.
          </p>

          {/* Content from Photo 2 */}
          <h2 className="text-white font-bold text-2xl">Common E-Challans: Types of Traffic Fines in India</h2>
          <p>
            While driving, you may come across several types of challans, including:
          </p>
          <p>
            Traffic Challan: Issued for common violations like speeding, running red lights, or not wearing a helmet.
          </p>
          <p>
            Parking Challan: Parking Challan: Issued for parking in prohibited areas or violating designated parking regulations.
          </p>
          <p>
            Overspeeding: Issued for driving a vehicle at a speed that exceeds the legally established speed limit for a particular road or area.
          </p>
          <p>
            Lane violation: Issued when a driver fails to properly maintain their position within designated traffic lanes on a road. 
          </p>
          

          {/* Content from Photo 3 */}
          <h2 className="text-white font-bold text-2xl">Checking Your Challan Status</h2>
          <p>
           The easiest way to check your traffic challan status is by visiting the Parivahan website.
          </p>
          <a href="https://echallan.parivahan.gov.in/index/accused-challan">Check Your Challan Status Here- https://echallan.parivahan.gov.in/index/accused-challan</a>

          <h2 className="text-white font-bold text-2xl">How to submit grievances?</h2>
          <p>
           If you feel your challan was issued in error, don&apos;t panic. Gather any evidence to support your case, then visit the Parivahan website and follow these steps:
          </p>
          
         
          <p>
         Visit the Complaint Section: Navigate to the complaint section on the Parivahan website to file your dispute
          </p>

          <p>
            Submit Your Claim: Follow the guidelines provided and submit supporting documents to contest the fine.
          </p>
          

         

          <h2 className="text-white font-bold text-2xl">Conclusion</h2>
          <p>
          While resolving a challan may seem daunting at first, it&apos;s a straightforward process if you follow this guide.Remember, promptly paying your challans not only helps you avoid additional fines but also contributes to safer roads for everyone.
“Driving safely” means “travelling carefully”
          </p>
          
        </article>
      </div>
    </div>
  );
}
