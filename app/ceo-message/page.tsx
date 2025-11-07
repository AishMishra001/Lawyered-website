"use client";

import Image from "next/image";
import { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Hero Section Component
function CeoHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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

  // Rotation animation for both desktop and mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Desktop spotlight style (rotating mask with increased size)
  const desktopSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos(rotation * Math.PI / 180)}% ${50 + 35 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  // Mobile spotlight style (rotating mask)
  const mobileSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    maskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos(rotation * Math.PI / 180)}% ${50 + 30 * Math.sin(rotation * Math.PI / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  };

  return (
    <div className="relative w-full overflow-hidden pt-10" onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined}>
      {/* Grid Background */}
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

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-24 grid md:grid-cols-5 gap-32 items-center">
        {/* Left Column: Text Content */}
        <div className="md:col-span-3 flex flex-col gap-10 text-center md:text-left">
          <h1 className="text-2xl lg:text-4xl font-bold leading-tight text-black dark:text-white">
            A Note from our Founder,<br />Himanshu Gupta
          </h1>
          <div>
            <h2 className="text-xl lg:text-3xl text-black dark:text-gray-200">
              From Reactive to <span className="text-[#22D2EE]">Preventive</span> to <span className="text-[#22D2EE]">Predictive</span> advantage
            </h2>
            <p className="mt-4 text-black dark:text-white text-base">
              Gen AI-driven Legal Risks Management (LRM) for the mobility sector—monitor, predict, and resolve legal issues before they disrupt operations.
            </p>
          </div>
        </div>

        {/* Right Column: Founder's Photo */}
        <div className="md:col-span-2 flex justify-center items-center">
          {/* Apply gradient fade to the image */}
          <div className="relative">
            <Image
              src="/founder2.png" // Assuming you renamed the image to this
              alt="Himanshu Gupta, Founder & CEO"
              width={500}
              height={500}
              className="object-contain"
            />
            {/* Overlay for the gradient effect */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14141A] to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Content Section Component
function CeoContent() {
  const [isLinkedInHovered, setIsLinkedInHovered] = useState(false);
  const messageParagraphs = [
    "Dear friends,",
    "When I think back about “why Lawyered”, it’s something very simple. For most people, law feels like a wall, not a safety net. The moment you need legal help, it’s usually because something has already gone wrong. That always felt unjust to me. Why should law only show up when you’re already stuck?",
    "Legal risks aren’t rare. They exist in our lives every day. It could be a notice that arrives out of the blue, a compliance paperwork gap that stalls your business, a property legality that stalls a deal, a dispute at work, or a traffic challan that won’t go away. For individuals, families, and businesses alike, these pile up into stress, wasted time, and money lost. And more than the cost, it’s the helplessness that hurts.",
    "Law has always been reactive. It’s like a fire brigade that rushes in after damage is done. With Lawyered, we’re trying to flip that situation. We want to make legal help proactive, predictive, and ultimately preventive. A system that spots risks early, guides decisions in real time, and quietly prevents crises before they happen.",
    "That’s why we don’t see ourselves as just another legal-tech company. We’re building legal infrastructure- deep, vertical solutions designed for real-life legal pain points. We began with the mobility sector because the pain there is urgent and recurring. But the vision is bigger: finance, real estate, healthcare, commerce. Anywhere people and businesses keep running into the same legal pain loops, Lawyered should be the safety ‘layer they reach out for. This isn’t about technology for its own sake. It’s about dignity, confidence, and the ability to move forward without fear of being blindsided by the process. That’s the future we want to create; one where law protects, empowers, and stays one step ahead of life’s risks. Thank you for walking this road with us.",
  ];

  return (
    <div className="bg-brand-dark dark:bg-brand-dark py-12 px-4 md:px-26">
      <div className="max-w-8xl mx-auto space-y-8 text-black dark:text-gray-300 text-base leading-relaxed text-center md:text-left">
        {messageParagraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}

        {/* Signature */}
        <div className="pt-8 text-center md:text-left">
          <p className="text-base text-black dark:text-white">Regards,</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <p className="text-3xl font-bold text-[#22D2EE]">Himanshu Gupta</p>
            <a
              href="https://www.linkedin.com/in/gupta-himanshu/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsLinkedInHovered(true)}
              onMouseLeave={() => setIsLinkedInHovered(false)}
            >
              <Image
                src={isLinkedInHovered ? "/linkedin4.png" : "/linkedin3.png"}
                alt="LinkedIn"
                width={32}
                height={32}
              />
            </a>
          </div>
          <p className="text-black dark:text-white">Founder & CEO</p>
        </div>
      </div>
    </div>
  );
}


// Assembling the page
export default function CeoMessagePage() {
  return (
    <>
      <CeoHero />
      <CeoContent />
    </>
  );
}
