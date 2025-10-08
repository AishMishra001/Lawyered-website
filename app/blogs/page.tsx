"use client";

import Image from "next/image";
import React, { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Section 1: Hero
function BlogsHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) setIsHovering(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const dx = mousePosition.x - delayedMousePosition.x;
      const dy = mousePosition.y - delayedMousePosition.y;
      
      setDelayedMousePosition({
        x: delayedMousePosition.x + dx * 0.05,
        y: delayedMousePosition.y + dy * 0.05,
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, delayedMousePosition]);

  const spotlightStyle: CSSProperties = {
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div className="relative w-full overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0" style={spotlightStyle}>
        <div className="relative w-full h-full opacity-40">
          <Image
            src="/MainFrame.png"
            alt="background frame"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-32 grid md:grid-cols-2 items-center h-screen">
        {/* Left Column: Sticker */}
        <div
          className="flex justify-center"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={isImageHovered ? "/blogHero2.png" : "/blogHero.png"}
            alt="Person excited at laptop"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-white leading-tight">
            Read our blog for sharp legal insights that simplify the law
          </h1>
        </div>
      </div>
    </div>
  );
}


// Section 2: Blog Categories
function BlogCategories() {
  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold text-[#22D3EE]">
          Blogs
        </h2>
        {/* <div className="flex flex-wrap gap-4 items-center">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-10 py-4 rounded-lg text-xl transition-colors
                ${
                  index === 0
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
        </div> */}
      </div>
    </div>
  );
}

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
}

// Section 3: Blogs Grid
function BlogsGrid() {
  const blogPosts: BlogPost[] = [
    {
      image: "/blog3.png",
      title: "Can we pay traffic challan through an app? Explore app that offers seamless on road legal solutions",
      excerpt: "Can we pay a Traffic Challan through a n app? Explore App That Offers seamless on road legal Solutions. It is a busy Monday morning in Mumbai, and you are rushing to work when you notice the familiar blue and red lights flashing behind you.",
      date: "Dec 3, 2024",
      readTime: "5 min read",
      href: "/blogs/traffic-challan-app",
      
    },
    {
      image: "/blog2.png",
      title: "Future of AI in Legal Tech: A Comparative Analysis of India and US",
      excerpt: "Can we pay a Traffic Challan through a n app? Explore App That Offers seamless on road legal Solutions. It is a busy Monday morning in Mumbai, and you are rushing to work when you notice the familiar blue and red lights flashing behind you.",
      date: "Dec 3, 2024",
      readTime: "5 min read",
      href: "/blogs/future-of-ai",
    },
    {
      image: "/blog1.png",
      title: "Stay Compliant with Himachal's New E-Challan System: How LOTS Can Keep You Covered on the Road",
      excerpt: "Himachal’s new e-challan system is revolutionising road compliance. Discover how LOTS can help you stay updated on vehicle documentation, avoid fines, and access legal support as needed. Learn more with our guide.",
      date: "Dec 3, 2024",
      readTime: "5 min read",
      href: "/blogs/E-challan-system",
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
                <h3 className="text-xl font-semibold text-[#22D3EE] hover:underline">
                  <a href={post.href}>{post.title}</a>
                </h3>
                <p className="mt-4 text-white text-base leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-800 text-base text-white">
                  <span>{post.date}</span> | <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <a href="#" className="flex text-base items-center justify-center gap-1 text-[#22D3EE] hover:underline">
            See All <ChevronDown size={16} />
          </a>
        </div> */}
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
