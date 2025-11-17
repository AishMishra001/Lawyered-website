"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { useState, MouseEvent, useEffect } from "react";
import { useTheme } from "next-themes";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // added mounted guard to avoid theme/window-dependent markup before hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Use consistent default during SSR to prevent hydration mismatch
  const isLightMode = mounted && resolvedTheme === "light";

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
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Rotation animation for both desktop and mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Desktop spotlight style (rotating mask with increased size)
  const desktopSpotlightStyle: React.CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  // Mobile spotlight style (rotating mask)
  const mobileSpotlightStyle: React.CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <Navbar />

      {/* Desktop MainFrame background */}
      {!isMobile && (
        <div className="absolute inset-0 z-10" style={desktopSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image
              src={isLightMode ? "/Whitegrid11.png" : "/MainFrame.png"}
              alt="Background Frame"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Mobile Grid background */}
      {isMobile && (
        <div className="absolute inset-0 z-10" style={mobileSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            {mounted ? (
              <Image
                src={isLightMode ? "/mobileGrid1.png" : "/mobileGrid.png"}
                alt="Mobile Grid Background"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-transparent" />
            )}
          </div>
        </div>
      )}
      
      {/* Main content container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 gap-4 pt-20 md:pt-0">
        <h1 className="text-3xl md:text-5xl font-semibold text-black dark:text-white leading-tight max-w-7xl mx-auto">
          Identifying & Resolving Recurring <br />
          Legal Risks For Mobility
        </h1>
        <p className="mt-4 text-base  text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Innovating & Building Scalable Technology Platforms
        </p>

        <div className="w-full max-w-7xl mt-8 md:mt-16">
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
            <Image
              src="/Himanshu_Gupta2.png"
              alt="Himanshu Gupta, Founder & CEO"
              width={150}
              height={150}
              className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
            />
            <div className="text-center md:text-left flex flex-col justify-between">

              <div>

              <p className="text-black dark:text-white text-base">
                A note from our founder & CEO,
              </p>
              <p className="text-black dark:text-white font-bold text-base">
                Himanshu Gupta
              </p>
              </div>
              <Link
                href="/ceo-message"
                className="text-black dark:text-white underline block text-base hover:underline pt-6 font-semibold hover:text-black dark:hover:text-[#22D2EE] hover:font-bold"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
