"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, MouseEvent, CSSProperties, useRef } from "react";
 
export function Platforms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) setIsHovering(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ 
        x: event.clientX - rect.left, 
        y: event.clientY - rect.top 
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

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

  const spotlightStyle: CSSProperties = {
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 300px at ${delayedMousePosition.x}px ${delayedMousePosition.y}px, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div ref={containerRef} className="relative pb-12 md:pb-24 px-4 md:px-24">
      <div className="absolute inset-0 z-0" style={spotlightStyle}>
        <div className="relative w-full h-full opacity-40">
          <Image
            src="/MainFrame.png"
            alt="Background Frame"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center md:text-left">
        <div className="max-w-8xl">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-[#22D2EE]">
            Platforms
          </h2>
          <p className="text-gray-300 max-w-8xl text-base leading-relaxed mx-auto md:mx-0">
         India’s mobility sector is a key industry comprising commercial fleet operators, logistics providers, ride-hailing services, and private vehicle owners, the public VAHAN dashboard displaying roughly 40.24 crore total vehicle registrations (and growing). The legal complexities in this sector are vast and often result in operational disruptions, financial losses, and compliance risks. A combination of stringent regulations, fragmented enforcement policies, and a growing number of vehicles on the road has intensified the legal challenges faced by stakeholders in this space.
          </p>

          <div 
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* LOTS 247 Card */}
            <div className="flex flex-col items-center gap-6 text-center py-8 md:py-0">
              <div className="h-20 flex items-center"> 
                <Image
                  src="/lots-247-logo.png"
                  alt="LOTS 247 Logo"
                  width={250}
                  height={70}
                  className="object-contain w-48 md:w-60 h-auto"
                />
              </div>
              <p className="text-gray-300 text-sm md:text-base max-w-sm flex-grow px-4 md:px-0">
                LOTS247 is not just a legal solution; it is a mission-critical,
                technology-driven new SaaS (Service-as-a-Software) designed to
                eliminate roadside legal issues in real time- India&apos;s first
                road side legal assistance platform.
              </p>
              <Link href="/lots-247">
                <button className="mt-auto border border-gray-600 text-white py-2 px-6 rounded-lg hover:bg-white hover:text-black transition-colors w-fit hover:cursor-pointer">
                  Read More
                </button>
              </Link>
            </div>

            {/* ChallanPay Card */}
            <div className="flex flex-col items-center gap-6 text-center py-8 md:py-0">
              <div className="h-20 flex items-center">
                <Image
                  src="/challanPay-logo2.png"
                  alt="ChallanPay Logo"
                  width={250}
                  height={70}
                  className="object-contain w-48 md:w-60 h-auto"
                />
              </div>
              <p className="text-gray-300 text-sm md:text-base max-w-sm flex-grow px-4 md:px-0">
                ChallanPay is India&apos;s first unified platform for discovering,
                resolving, and tracking traffic challans across all states and
                enforcement authorities.
              </p>  
              <Link href="/challan-pay">
                <button className="mt-auto border border-gray-600 text-white py-2 px-6 rounded-lg hover:bg-white hover:text-black transition-colors w-fit hover:cursor-pointer">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
