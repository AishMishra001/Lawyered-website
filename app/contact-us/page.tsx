"use client";

import Image from "next/image";
import { Mail, RefreshCw } from "lucide-react";
import { useState, useEffect, MouseEvent, CSSProperties } from "react";

// Section 1: Hero
function AboutHero() {
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

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-32 grid md:grid-cols-2 gap-16 items-center h-screen">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-base text-white leading-relaxed">
            Lawyered is redefining legal assistance for mobility in India. With a mission to make legal help as accessible as consumer products, we invite customers, partners, team members, investors and industry experts to be part of this transformational journey.
          </p>
        </div>

        {/* Right Column: Sticker */}
        <div 
          className="flex justify-center"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={isImageHovered ? "/contact.png" : "/contact2.png"}
            alt="Customer support agent"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// Section 2: Forms
function ContactFormSection() {
  return (
    <div className="pb-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Column: Form */}
        <div className="border border-gray-800 rounded-lg p-8 space-y-10">
          <h2 className="text-3xl text-white">
            Fill out the form and our executive will reach out to you
          </h2>
          <form className="space-y-8">
            <input type="text" placeholder="Name" className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"/>
            <input type="email" placeholder="E-mail" className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"/>
            <select className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-500">
              <option className="bg-gray-900 border border-gray-700">Partnership</option>
              <option className="bg-gray-900 border border-gray-700">Vendor</option>
              <option className="bg-gray-900 border border-gray-700">Carrer</option>
              <option className="bg-gray-900 border border-gray-700">Other</option>
            </select>
            <input type="tel" placeholder="Phone Number" className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"/>
            <textarea placeholder="Your Message" rows={3} className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"></textarea>
            
            <div className="flex items-center gap-4">
              <div className="font-[Times New Roman] text-lg">
                7Y6QQR
              </div>
              <button type="button" className="p-3 text-gray-400">
                <RefreshCw size={20} />
              </button>
            </div>
            <input type="text" placeholder="Enter Captcha" className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"/>
            
            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" id="auth" className="mt-1 h-4 w-4 rounded bg-gray-700 border-gray-600 accent-[#0891B2]"/>
              <label htmlFor="auth" className="text-base text-white">
                I hereby authorise to send notifications via SMS, Email, RCS and others as per <a href="/terms-and-conditions" className="text-[#0891B2] underline">Terms of Services</a> | <a href="/privacy-policy" className="text-[#0891B2] underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="w-full bg-[#0891B2] text-white py-3 text-base rounded-lg mt-4">
              Submit
            </button>
          </form>
        </div>
        
        {/* Right Column: Email Info */}
        <div className="relative rounded-lg overflow-hidden p-8 flex flex-col justify-center items-center h-48">
            <Image src="/road-forest.jpg" alt="Road in a forest" layout="fill" className="object-cover z-0 opacity-80 grayscale"/>
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <div className="relative z-20 flex items-center gap-22">

              <div className="flex gap-4">

                <Mail size={28} className="text-white"/>
                <p className="text-lg text-white">Email</p>
              </div>
                <a href="mailto:info@lawyered.in" className=" hover:bg-white text-white hover:text-[#0891B2] bg-[#0891B2]  font-semibold px-6 py-2 text-lg">
                    info@lawyered.in
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}


// Assembling the page
export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <ContactFormSection />
    </>
  );
}
