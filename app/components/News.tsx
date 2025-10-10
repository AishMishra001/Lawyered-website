"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const newsData = [
  {
    image: "/news1.png",
    headline: "Revolutionizing On-Road Legal Support: Lawyered's Journey Towards Accessible Justice",
    description: "Lawyered, a legal tech startup founded by Himanshu Gupta, is transforming the landscape of on-road legal assistance for vehicle owners in India. With its innovative LOTS platform, the company connects users to a network of over 70,000 lawyers for immediate support on traffic violations and legal disputes, operating 24/7 across 98% of India's pin codes.",
    date: "September 02, 2024",
    link: "https://yourstory.com/2024/08/justice-on-the-road-lawyered-legal-tech-startup-lawyers-network-highway",
  },
  {
    image: "/news2.png",
    headline: "Meet Himanshu Gupta: The Visionary Revolutionizing Road Side Legal Assistance with LOTS",
    description: "With a mission to make Indian roads safer and more efficient, Himanshu has introduced cutting-edge tools like challan resolution and immediate legal help through the LOTS app. His journey is a testament to passion, purpose, and the power of technology to solve real-world problems.",
    date: "Apr 02, 2025",
    link: "https://sugermint.com/himanshu-gupta/",
  },
  {
    image: "/news3.png",
    headline: "Contracts To Code: Legal Tech Is Shaping India's Startup Future. Here's How",
    description: "At a justice innovation workshop in a rural Tamil Nadu law school—well past the temple town of Mahabalipuram—we asked a class of law students how many were using ChatGPT. Every hand shot up. In an urban college, this wouldn't have been surprising. But here? Their professor explained: most of these students were the children of farmers and fishermen from adjoining villages.",
    date: "May 11, 2025",
    link: "https://news.abplive.com/technology/legal-tech-is-shaping-india-s-startup-future-here-s-how-1770572/amp",
  },
  {
    image: "/news4.png",
    headline: "LOTS Launches at Dealerships in Chhattisgarh with FADA & RADA",
    description: "On February 28, 2024, the Federation of Automobile Dealers Associations (FADA) and the Raipur Automobile Dealers Association (RADA) welcomed the launch of Lawyered's flagship product, LOTS24x7 (On-Road Legal Assistance), at dealerships across Raipur, Chhattisgarh.",
    date: "March 12, 2024",
    link: "https://theprint.in/ani-press-releases/fada-and-lawyered-spearheaded-on-road-legal-assistance-for-dealerships-started-from-raipur-on-february-28th-2024/1997875/",
  },
  {
    image: "/news5.png",
    headline: "Delhi traffic challan: How to get them waived off or settled at Lok Adalat 2025",
    description: "In India today, technology touches almost every part of our lives — from how we pay bills to how we travel, shop, and even consult a doctor. Quietly, but powerfully, it’s also starting to reshape another cornerstone of our society: the legal system.",
    date: "Mar 3, 2025",
    link: "https://www.hindustantimes.com/business/delhi-traffic-challan-how-to-get-them-waived-off-or-settled-at-lok-adalat-2025-101740993817814.html",
  },
  {
    image: "/news10.png",
    headline: "Celebrating Vision and Leadership : Himanshu Gupta Awarded 'Entrepreneur of the Year' at 2024 Entrepreneur India Startup Awards",
    description: "On February 28, 2024, the Federation of Automobile Dealers Associations (FADA) and the Raipur Automobile Dealers Association (RADA) welcomed the launch of Lawyered's flagship product, LOTS24x7 (On-Road Legal Assistance), at dealerships across Raipur, Chhattisgarh.",
    date: "Oct 23, 2024",
    link: "https://lawyered.in/events-and-news/lots-launches-at-dealerships-in-chhattisgarh-with-fada-&-rada",
  },
];

const extendedNewsData = [...newsData, ...newsData];

export function News() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const getScrollAmount = useCallback(() => {
    if (!scrollContainerRef.current) return 0;
    const firstItem = scrollContainerRef.current.firstChild as HTMLElement;
    if (!firstItem) return 400; // fallback width

    const itemWidth = firstItem.offsetWidth;
    const gap = 32; // gap-8 = 2rem = 32px

    if (isMobile) {
      // On mobile, scroll one item at a time
      return itemWidth + gap;
    }

    // On desktop, scroll exactly 3 items + 2 gaps
    return (itemWidth * 3) + (gap * 2);
  }, [isMobile]);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      setIsInteracting(true);
      const container = scrollContainerRef.current;
      const scrollAmount = getScrollAmount();
      container.scrollTo({ left: container.scrollLeft - scrollAmount, behavior: 'smooth' });
      setTimeout(() => setIsInteracting(false), 1000);
    }
  };

  const handleNext = useCallback(() => {
    if (scrollContainerRef.current) {
      setIsInteracting(true);
      const container = scrollContainerRef.current;
      const scrollAmount = getScrollAmount();
      container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
      setTimeout(() => setIsInteracting(false), 1000);
    }
  }, [isMobile, getScrollAmount]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isMobile) return;

    let scrollEndTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft } = scrollContainerRef.current;
          
          const firstItem = scrollContainerRef.current.firstChild as HTMLElement;
          if (!firstItem) return;
          const itemWidth = firstItem.offsetWidth;
          const gap = 32; // from gap-8
          const firstHalfWidth = (itemWidth + gap) * newsData.length;

          if (scrollLeft >= firstHalfWidth) {
            scrollContainerRef.current.scrollLeft = scrollLeft - firstHalfWidth;
          }
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollEndTimer);
    };
  }, [isMobile]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isHovering && !isInteracting) {
      // Automatically scroll to the next set of items.
      interval = setInterval(handleNext, 2000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovering, isInteracting, handleNext]);

  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-semibold text-[#22D2EE]">
            Latest News and Media
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-2 border border-gray-700 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-gray-700 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: isMobile ? 'none' : 'x mandatory'
            }}
          >
            {extendedNewsData.map((article, index) => (
              <div
                key={index}
                className="border border-gray-500 p-4 flex flex-col gap-8 flex-shrink-0 w-full md:w-[calc((100%-64px)/3)]"
                style={{
                  scrollSnapAlign: isMobile ? 'none' : 'start'
                }}
              >
                <div className="h-10 flex items-center">
                  <Image src={article.image} alt={article.headline} width={120} height={40} objectFit="contain" className={article.image === '/news6.png' ? '' : 'filter brightness-0 invert'} />
                </div>
                <h3 className="text-lg font-semibold text-brand-cyan mb-3 max-w-lg overflow-hidden">
                  <Link href={article.link} className="hover:underline text-lg text-[#22D2EE]" target="_blank">
                    {article.headline}
                  </Link>
                </h3>
                <p className="text-white text-base leading-relaxed max-w-lg overflow-hidden">
                  {article.description}
                </p>
                <div className="mt-auto flex justify-between items-center text-sm">
                  <span className="text-gray-500">{article.date}</span>
                  <Link href={article.link} className="text-[#22D2EE] text-lg hover:underline font-semibold" target="_blank">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}