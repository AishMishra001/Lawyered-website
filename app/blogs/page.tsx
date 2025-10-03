// app/blogs/page.tsx

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import React from "react";

// Section 1: Hero
function BlogsHero() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-1/2 h-1/2">
          <Image
            src="/Frame.png"
            alt="background frame"
            fill
            className="object-contain opacity-100 scale-125"
          />
        </div>
      </div>

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-32 grid md:grid-cols-2 items-center h-screen">
        {/* Left Column: Sticker */}
        <div className="flex justify-center">
          <Image
            src="/sticker9.png"
            alt="Person excited at laptop"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-semibold text-white leading-tight">
            Read our blog for sharp legal insights that simplify the law
          </h1>
        </div>
      </div>
    </div>
  );
}

// Section 2: Blog Categories
function BlogCategories() {
  const categories = [
    "Motor Vehicle Act", "Hookah Bar License", "Legal Notice", "Civil Law",
    "Trade Laws", "Consumer Protection Law", "Constitutional Law", "Criminal Law",
    "Property Law", "Insolvency and Bankruptcy Law"
  ];

  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-5xl font-bold text-[#22D3EE] mb-8">
          Blog Categories
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-10 py-4 rounded-lg text-2xl transition-colors
                ${index === 0
                  ? 'bg-[#22D3EE] text-black'
                  : 'bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
            >
              {category}
            </button>
          ))}
          <a href="#" className="flex items-center gap-1 text-[#22D3EE] hover:underline">
            View More <ChevronDown size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Section 3: Blogs Grid
function BlogsGrid() {
  const blogPosts = [
    {
      image: "/blog3.png",
      title: "Can we pay traffic challan through an app? Explore app that offers seamless on road legal solutions",
      excerpt: "Can we pay a Traffic Challan through a n app? Explore App That Offers seamless on road legal Solutions. It is a busy Monday morning in Mumbai, and you are rushing to work when you notice the familiar blue and red lights flashing behind you.",
      date: "Dec 3, 2024",
      readTime: "5 min read",
    },
    {
      image: "/blog2.png",
      title: "Future of AI in Legal Tech: A Comparative Analysis of India and US",
      excerpt: "Can we pay a Traffic Challan through a n app? Explore App That Offers seamless on road legal Solutions. It is a busy Monday morning in Mumbai, and you are rushing to work when you notice the familiar blue and red lights flashing behind you.",
      date: "Dec 3, 2024",
      readTime: "5 min read",
    },
    {
      image: "/blog1.png",
      title: "AI’s Impact on Legal Tech: A Comparison of Global Strategies",
      excerpt: "Streamlining Traffic Challan Payments: Discover the convenience of mobile app solutions for on-the-go legal compliance. Imagine a typical Monday morning in Mumbai when.",
      date: "Dec 3, 2024",
      readTime: "5 min read",
    },
  ];

  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 px-8">
          {blogPosts.map((post) => (
            <div key={post.title} className="bg-transparent border-gray-700 border-2 overflow-hidden flex flex-col">
              <Image src={post.image} alt={post.title} width={600} height={400} className="w-full object-cover" />
              <div className="p-6 flex flex-col flex-grow gap-6">
                <h3 className="text-2xl font-semibold text-[#22D3EE] hover:underline">
                  <a href="/blogs/traffic-challan-app">{post.title}</a>
                </h3>
                <p className="mt-4 text-white text-xl leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-800 text-lg text-white">
                  <span>{post.date}</span> | <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#" className="flex text-xl items-center justify-center gap-1 text-[#22D3EE] hover:underline">
            See All <ChevronDown size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}


// Assembling the page
export default function BlogsPage() {
  return (
    <>
      <BlogsHero />
      <BlogCategories />
      <BlogsGrid />
    </>
  );
}