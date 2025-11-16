"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const newsData = [
  {
    image: "/news13.png",
    headline: "Indian Tourist Transporters Association partners with Lawyered for 24x7 legal support",
    description: "A nationwide partnership brings round‑the‑clock legal assistance to tourist transport operators, streamlining roadside queries, challan resolution, and incident support via LOTS 24x7.",
    date: "May 19, 2025",
    link: "https://travel.economictimes.indiatimes.com/news/associations/indian-tourist-transporters-association-partners-with-lawyered-for-24x7-legal-support/121265623",
  },
  {
    image: "/news17.png",
    headline: "Mobility’s Hidden Backlog: How India’s Vehicle Boom Created a Challan Pendency Problem",
    description: "India’s vehicle base tops 40 crore, but e‑challan pendency keeps rising—9.75 crore pending and ₹16,000+ crore penalties; why proactive, timely resolution now matters for mobility.",
    date: "September 15, 2025",
    link: "https://www.evmechanica.com/mobilitys-hidden-backlog-how-indias-vehicle-boom-created-a-challan-pendency-problem/",
  },
  {
    image: "/news13.png",
    headline: "National Lok Adalat: Clearing challans has potential—but reach is limited",
    description: "Citizens can settle pending traffic challans during Lok Adalats, yet infrequent sessions and selection‑based resolution constrain impact—reinforcing the need for continuous, on‑demand legal help.",
    date: "March 6, 2025",
    link: "https://economictimes.indiatimes.com/wealth/save/time-to-settle-pending-traffic-challan-national-lok-adalat-on-march-8-2025-for-delhi-traffic-police-challans-know-how-it-works/articleshow/118684698.cms",
  },
  {
    image: "/news16.png",
    headline: "How LOTS is transforming roadside legal assistance",
    description: "Explore how LOTS delivers on‑the‑spot legal guidance, seamless challan checks and disputes, and rapid support for drivers—turning roadside stress into quick, informed resolution.",
    date: "February 16, 2025",
    link: "https://www.techiexpert.com/lawyered-journey-recolonizing-roadside-legal-assistance/",
  },
  {
    image: "/news2.png",
    headline: "Himanshu Gupta on transforming legal access with Lawyered",
    description: "An in‑depth profile on building Lawyered and LOTS, product‑led innovation, and the mission to make legal help faster, human, and accessible across everyday mobility contexts.",
    date: "January 17, 2025",
    link: "https://sugermint.com/himanshu-gupta/",
  },
  {
    image: "/news18.png",
    headline: "Ride‑hailing price surges: who really pays?",
    description: "Outlook Business unpacks why Ola, Uber, and Rapido fares spike during rain and rush hours, the regulatory backdrop, and the real cost borne by commuters and drivers.",
    date: "July 13, 2025",
    link: "https://www.outlookbusiness.com/in-depth/rain-rush-too-few-cabs-why-ola-uber-rapido-prices-surge-and-who-really-pays",
  },
  {
    image: "/news15.png",
    headline: "Smarter Legal Tools for Transport Businesses – Lawyered Insight",
    description: "Discover how Lawyered empowers transport firms with legal-tech like LOTS247 & ChallanPay to tackle roadside risk and scale operations efficiently.",
    date: "November 1, 2025",
    link: "https://evolutionautoindia.in/the-road-ahead-why-transport-businesses-need-smarter-legal-tools-to-scale/",
  },
  {
    image: "/news17.png",
    headline: "Lawyered Launches LOTS247: 24/7 Fleet Legal-Tech Platform",
    description: "Lawyered unveils LOTS247 — India’s first 24×7 fleet-legal-tech ecosystem for drivers, fleets & vehicles, redefining roadside legal support upgrading the ecosystem for India’s mobility and logistics sectors.",
    date: "November 4, 2025",
    link: "https://www.evmechanica.com/lawyered-transforms-lots-into-lots247-for-fleet-legal-tech/",
  },
];

const extendedNewsData = [...newsData, ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData , ...newsData];
function Lots247News() {
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
          <h2 className="text-2xl md:text-4xl font-semibold text-[#0E7490] dark:text-[#22D3EE]">
            Latest News and Media
          </h2>
          <div className="flex items-center gap-2 md:gap">
            <button
              onClick={handlePrev}
              className="p-1 border border-gray-700 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={12} />
            </button>
            <button
              onClick={handleNext}
              className="p-1 border border-gray-700 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden relative "
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
                className="border border-gray-200 dark:border-[#353545] p-4 flex flex-col gap-8 flex-shrink-0 w-full bg-[#F7F7F7] dark:bg-transparent md:w-[calc((100%-64px)/3)] "
                style={{
                  scrollSnapAlign: isMobile ? 'none' : 'start'
                }}
              >
                <div className="w-40 h-12 flex items-center relative">
                  <Image src={article.image} alt={article.headline} width={120} height={40} objectFit="cover" className={article.image === '/news6.png' ? '' : 'dark:filter dark:brightness-0 dark:invert'} />
                </div>
                <h3 className="text-lg font-semibold text-brand-cyan mb-3 max-w-lg overflow-hidden">
									<Link
										href={article.link}
										className="hover:underline text-lg text-black dark:text-[#22D2EE]"
										target="_blank"
									>
										{article.headline}
									</Link>
								</h3>
                <p className="text-black dark:text-white text-base leading-relaxed max-w-lg overflow-hidden">
                  {article.description}
                </p>
                <div className="mt-auto flex justify-between items-center text-sm">
                  <span className="text-gray-500">{article.date}</span>
                  <Link href={article.link} className="text-[#0E7490] dark:text-[#22D3EE] text-lg hover:underline font-semibold" target="_blank">
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

export default Lots247News