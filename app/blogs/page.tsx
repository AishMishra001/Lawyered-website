"use client";

import Image from "next/image";
import React, { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Section 1: Hero
function BlogsHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile detection and rotation animation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotation animation for mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Desktop spotlight style (mouse-following)
  const desktopSpotlightStyle: CSSProperties = {
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  // Mobile spotlight style (rotating mask)
  const mobileSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 200px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 200px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div className="relative w-full overflow-hidden" onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined}>
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>

      {/* Desktop MainFrame background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0" style={desktopSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image
              src="/MainFrame.png"
              alt="background frame"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Mobile Grid background */}
      {isMobile && (
        <div className="absolute inset-0 z-0" style={mobileSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image
              src="/mobileGrid.png"
              alt="Mobile Grid Background"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-16 md:py-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center min-h-screen">
        {/* Left Column: Sticker */}
        <div
          className="flex justify-center order-2 md:order-1"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={isImageHovered ? "/blogHero4.png" : "/blogHero3.png"}
            alt="Person excited at laptop"
            width={400}
            height={400}
            className="object-contain w-full max-w-sm md:max-w-md"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col gap-6 order-1 md:order-2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
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
    <div className="pb-12 md:pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {blogPosts.map((post) => (
            <div key={post.title} className="bg-transparent border-gray-700 border-2 overflow-hidden flex flex-col hover:border-[#22D3EE] transition-colors duration-300">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow gap-3 md:gap-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#22D3EE] hover:underline leading-tight">
                  <a href={post.href}>{post.title}</a>
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="pt-3 md:pt-4 border-t border-gray-800 text-sm md:text-base text-white">
                  <span>{post.date}</span> | <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
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
