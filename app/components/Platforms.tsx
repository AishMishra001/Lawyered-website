"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, MouseEvent, CSSProperties, useRef } from "react";
import { useTheme } from "next-themes";

export function Platforms() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // All hooks declared up front so order never changes between renders
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mounted guard
  useEffect(() => setMounted(true), []);

  // Avoid using theme-dependent values until after hydration
  const isLight = mounted && theme === "light";

  // Smooth delayed mouse follow animation
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const dx = mousePosition.x - delayedMousePosition.x;
      const dy = mousePosition.y - delayedMousePosition.y;

      if (!isHovering && Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        setDelayedMousePosition({ x: -1, y: -1 });
        return;
      }

      setDelayedMousePosition({
        x: delayedMousePosition.x + dx * 0.05,
        y: delayedMousePosition.y + dy * 0.05,
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, delayedMousePosition, isHovering]);

  // Mobile detection and resize listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) setIsHovering(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => setIsHovering(false);

  const desktopSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  const mobileSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  // Render: always run same hooks, but show a simple placeholder while not mounted
  return (
    <div className="relative pb-12 md:pb-24 px-4 md:px-24">
      <div className="flex flex-col items-center justify-center text-center md:text-left">
        <div className="max-w-8xl">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-[#0E7490] dark:text-[#22D3EE] text-center md:text-left">
            Platforms
          </h2>

          {/* Provide the same textual content both server & client to avoid mismatch */}
          <p className="text-black dark:text-gray-300 max-w-8xl text-center md:text-left text-base leading-relaxed mx-auto md:mx-0">
            India&apos;s mobility sector is a key industry comprising commercial fleet operators, logistics providers, ride-hailing services, and private vehicle owners, the public VAHAN dashboard displaying roughly 40.24 crore total vehicle registrations (and growing). The legal complexities in this sector are vast and often result in operational disruptions, financial losses, and compliance risks. A combination of stringent regulations, fragmented enforcement policies, and a growing number of vehicles on the road has intensified the legal challenges faced by stakeholders in this space.
          </p>

          <div ref={containerRef} className="relative mt-12 md:mt-16">
            {/* Background images: hide theme-dependent images until mounted to avoid mismatch */}
            {!mounted ? (
              <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full opacity-40 bg-transparent" />
              </div>
            ) : (
              <>
                {!isMobile && (
                  <div className="absolute inset-0 z-0" style={desktopSpotlightStyle}>
                    <div className="relative w-full h-full opacity-40">
                      {mounted ? (
                        <Image
                          src={theme === 'light' ? "/Whitegrid11.png" : "/MainFrame.png"}
                          alt="Background Frame"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        // Render a static, non-theme-dependent fallback during SSR/hydration
                        <div className="w-full h-full bg-transparent" />
                      )}
                    </div>
                  </div>
                )}
                {isMobile && (
                  <div className="absolute inset-0 z-0" style={mobileSpotlightStyle}>
                    <div className="relative w-full h-full opacity-40">
                      <Image src="/mobileGrid.png" alt="Mobile Grid Background" fill className="object-cover" />
                    </div>
                  </div>
                )}
              </>
            )}

            <div
              className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 ${isLight ? 'md:gap-20' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* LOTS 247 Card */}
              <Link href="/lots-247">
                <div
                  className={`flex flex-col ${isLight ? 'items-center' : 'items-start'
                    } gap-6 ${isLight ? 'text-center' : 'text-left'
                    } py-8 md:py-0 hover:cursor-pointer dark:bg-transparent dark:items-center dark:text-center ${isLight ? "px-10 py-5 pt-12 pb-12" : ""
                    }`}
                >
                  <div className="h-20 flex items-center">
                    {mounted ? (
                      <Image
                        src={theme === 'light' ? "/lots-247-logo2.png" : "/lots-247-logo.png"}
                        alt="LOTS 247 Logo"
                        width={250}
                        height={70}
                        className="object-contain w-48 md:w-60 h-auto"
                      />
                    ) : (
                      <div className="w-48 md:w-60 h-12 bg-gray-200 dark:bg-gray-800 rounded" />
                    )}
                  </div>

                  <p
                    className={`text-black dark:text-gray-300 text-sm md:text-base max-w-sm flex-grow px-4 md:px-0 ${isLight ? 'py-[10px]' : ''
                      }`}
                  >
                    LOTS247 is not just a legal solution; it is a mission-critical,
                    technology-driven new SaaS (Service-as-a-Software) designed to
                    eliminate roadside legal issues in real time — India&apos;s first
                    roadside legal assistance platform.
                  </p>

                  <button className="mt-auto border border-gray-400 dark:border-gray-600 text-black dark:text-white py-2 px-6 rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors w-fit hover:cursor-pointer">
                    Read More
                  </button>
                </div>
              </Link>



              {/* ChallanPay Card */}
              <Link href="/challan-pay">
                <div className={`flex flex-col ${isLight ? 'items-center' : 'items-start'} gap-6 ${isLight ? 'text-center' : 'text-left'} py-8 md:py-0 hover:cursor-pointer dark:bg-transparent dark:items-center dark:text-center ${isLight ? 'px-10 py-5' : ''}`}>
                  <div className="h-20 flex items-center">
                    {mounted ? (
                      <Image src={theme === 'light' ? "/challanPay-logo4.png" : "/challanPay-logo2.png"} alt="ChallanPay Logo" width={250} height={70} className="object-contain w-48 md:w-60 h-auto" />
                    ) : (
                      <div className="w-48 md:w-60 h-12 bg-gray-200 dark:bg-gray-800 rounded" />
                    )}
                  </div>
                  <p className={`text-black dark:text-gray-300 text-sm md:text-base max-w-sm flex-grow px-4 md:px-0 ${isLight ? 'py-[10px]' : ''}`}>
                    ChallanPay is India&apos;s first unified platform for discovering,
                    resolving, and tracking traffic challans across all states and
                    enforcement authorities.
                  </p>
                  <button className="mt-auto border border-gray-400 dark:border-gray-600 text-black dark:text-white py-2 px-6 rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors w-fit hover:cursor-pointer">
                    Read More
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
