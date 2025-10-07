"use client";
// app/lots-247/page.tsx
import Image from "next/image"
import { Check, Truck, Scale, MapPin, X } from "lucide-react"
import { News } from "../components/News"
import { useState, useEffect, MouseEvent, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Section 1: Hero
function LotsHero() {
  const slides = [
    {
      h1: "Seamless Mobility, Zero Legal Hassles.",
      p: "From compliance tracking to challan closure, accident support, and regulatory safeguards — everything your fleet and mobility needs to move forward."
    },
    {
      h1: "Eliminate Legal Roadblocks. Ensure Seamless Mobility.",
      p: "Real-time legal compliance, challan resolution, accident support, and regulatory risk management for fleets, logistics, and private mobility."
    },
    {
      h1: "Clear the Legal Path. Drive Without Disruption.",
      p: "Stay ahead with real-time compliance, instant challan resolution, accident assistance, and end-to-end regulatory risk management."
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // scrolls every 3 seconds

    return () => clearInterval(intervalId);
  }, [slides.length]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
    <div className="relative w-full text-center py-38 h-screen" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0" style={spotlightStyle}>
        <div className="relative w-full h-full opacity-40">
          <Image src="/MainFrame.png" alt="background frame" fill className="object-cover" />
        </div>
      </div>
      <div className="relative max-w-8xl z-10 flex flex-col items-center px-4 md:px-26">
        <Image src="/lots247-logo.png" alt="LOTS 247 Logo" width={400} height={100} priority />
        
        <div className="relative h-48 mt-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full left-0 right-0"
              >
                <h1 className="text-4xl font-bold text-white">{slides[index].h1}</h1>
                <p className="mt-4 text-base text-white max-w-6xl mx-auto">{slides[index].p}</p>
              </motion.div>
            </AnimatePresence>
        </div>

        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === i ? 'bg-[#22D2EE]' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
        </div>
      </div>
      <p className="relative z-10 text-white w-full mx-auto mt-24 px-26 text-base">
        LOTS247 is not just a legal solution; it is a mission-critical, technology-driven new SaaS
        (Service-as-a-Software) designed to eliminate roadside legal issues in real time. It ensures that vehicle owners
        and businesses never suffer financial, operational, or psychological distress due to legal entanglements. LOTS
        is a painkiller solution—an indispensable safety net for every vehicle on Indian roads.
      </p>
    </div>
  )
}

// Section 2: The Only Scalable & Dependable Legal-Tech Infrastructure
function LotsInfrastructure() {
  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-16">
          The Only Scalable & Dependable Legal-Tech Infrastructure
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="border border-gray-800 p-6 bg-transparent">
            <p className="text-base text-gray-400">Layer 1</p>
            <h3 className="text-2xl font-bold mt-1">24×7 On-Call Resolution</h3>
            <Image src="/sticker1.png" alt="On-Call Resolution" width={200} height={200} className="mx-auto my-6" />
            <p className="text-gray-300 text-base">
              Talk to a lawyer instantly: A tech-driven,{" "}
              <span className="text-[#22D2EE]">round-the-clock legal safety</span> net that immediately tackles roadside
              issues before they spiral, backed by in-house Lawyers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-800 p-6 bg-transparent">
            <p className="text-base text-gray-400">Layer 2</p>
            <h3 className="text-2xl font-bold mt-1">On-Site Deployment</h3>
            <Image src="/sticker2.png" alt="On-Site Deployment" width={150} height={150} className="mx-auto my-6" />
            <p className="text-gray-300 text-base pt-10">
              A lawyer at your location in 2 hours: Nationwide Network of{" "}
              <span className="text-[#22D2EE]">75K+ Lawyers across 98% of pin codes,</span> ensuring a 2-hour on-site
              deployment anytime, anywhere.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-800 p-6 bg-transparent">
            <p className="text-base text-gray-400">Layer 3</p>
            <h3 className="text-2xl font-bold mt-1">Challans & RTO-as-a-Service</h3>
            <Image src="/sticker3.png" alt="Challans & RTO Service" width={400} height={400} className="mx-auto my-6" />
            <ul className="text-gray-300 space-y-4 text-base">
              <li>
                <span className="text-[#22D2EE]">Advanced Live Challan Dashboard –</span> A real-time, centralized
                dashboard for tracking traffic violations across multiple vehicles.
              </li>
              <li>
                <span className="text-[#22D2EE]">RC & Vehicle Insight API Access –</span> Ownership, hypothecation,
                blacklist, fitness, and pollution check in real-time.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 3: Drive Ahead Without Legal Worries! (Pricing)
function LotsPricing() {
  const features = [
    "Number of Vehicles", "24/7 On-Call Resolution", "On-Site Legal Resolution", "Challan-as-a-Serivce",
    "Online Lok Adalat Court", "RTO-as-a-Serivce", "Dashboard Access", "No.of Users", "Automated Report",
    "Persoanlized Reports", "Incident Update via WhatsApp", "Add-Ons", "Value-Added Services",
    "Dedicated Account Manager", "Bulk Challan Resolution", "API Integration",
  ];

  const plans = [
    {
      name: "U Drive", logo: "/Udrive.png", bgColor: "bg-[#06B6D4]",
      values: ["1", true, "Pay Per Use", true, "INR 79 , 1000 , 2000", "Pay Per Use", false, false, false, false, false, "Pay Per Use", "Pay Per Use", false, false, false],
    },
    {
      name: "B Safe", logo: "/Bsafe.png", bgColor: "bg-[#00B876]",
      values: ["Unlimited", true, "Pay Per Use", true, "INR 49 , 1000 , 2000", "Pay Per Use", true, "3", true, false, true, "Pay Per Use", "Pay Per Use", false, false, false],
    },
    {
      name: "V Care", logo: "/Vcare.png", topSeller: true, bgColor: "bg-[#FF9100]",
      values: ["Unlimited", true, "Pay Per Use", true, "INR 39 , As per Add-on B2", "Pay Per Use", true, "10", true, true, true, "B1,B2,B3#", "Worth 20K", true, true, true],
    },
  ];

  return (
    <div className="py-24 px-4 md:px-26 relative bg-[url('/sketch.png')] bg-no-repeat bg-[length:110%_auto] bg-[center_top_10rem]">
      <div className="absolute inset-0 bg-brand-dark/95"></div>
      <div className="max-w-8xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center">Drive Ahead Without Legal Worries!</h2>
        <p className="text-gray-300 text-center text-base mt-2">
          Choose the right package to keep your fleet running smoothly
        </p>

        {/* THE FIX: Adjusted grid columns and gap */}
        <div className="mt-44 grid grid-cols-[1.5fr_3fr] gap-12 items-end">
          
          {/* Left side: Character illustration + Features Column */}
          {/* THE FIX: Restructured to place sticker cleanly above the box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <Image src="/sticker4.png" alt="Sticker" width={350} height={350} className="object-contain" />
            </div>
            <div className="bg-white rounded-lg p-6 space-y-4 mt-4">
              {features.map((f) => (
                <p key={f} className="h-12 flex items-center text-lg text-black border-b border-black/10 last:border-b-0">
                  {f}
                </p>
              ))}
            </div>
          </div>

          {/* Right side: Plans Columns (remains the same) */}
          <div className="grid grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className="relative flex flex-col gap-4">
                
                {plan.topSeller && (
                  <Image 
                    src="/TopSeller.png" 
                    alt="Top Seller"
                    width={150}
                    height={150}
                    className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3 rotate-12 z-10"
                  />
                )}
                
                <div className={`rounded-xl p-6 flex items-center justify-center ${plan.bgColor}`}>
                  <Image
                    src={plan.logo || "/placeholder.svg"}
                    alt={`${plan.name} logo`}
                    width={150}
                    height={50}
                    className="object-contain"
                  />
                </div>
                
                <div className="bg-white rounded-lg p-6 space-y-4">
                  {plan.values.map((val, idx) => (
                    <div
                      key={idx}
                      className="h-12 flex items-center justify-center text-lg text-center border-b border-black/10 last:border-b-0"
                    >
                      {val === true ? (
                        <Image src="/Tick.png" alt="Checkmark" width={30} height={30} className="object-contain" />
                      ) : val === false ? (
                        <Image src="/CircleX.png" alt="Cross" width={30} height={30} className="object-contain" />
                      ) : (
                        <p className="text-black">{val}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 4: Submit Card
function LotsForm() {
  return (
    <div className="py-24 max-w-8xl px-26">
      <div className=" mx-auto border border-gray-800 rounded-lg p-8 flex justify-center">
        <div className="w-full max-w-8xl grid md:grid-cols-2 gap-46 items-start">
          <p className="text-gray-200 text-base">
            To know more about <span className="text-[#22D2EE]">Add-Ons for Business Packages</span>, fill out the form
            and our executive will contact you.
          </p>
          <form className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              className="col-span-2 md:col-span-1 bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Mobile No."
              className="col-span-2 md:col-span-1 bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"
            />
            <select className="col-span-2 bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-500">
              <option>No. of Vehicles</option>
            </select>
            <button type="submit" className="col-span-1 items-end mt-2 bg-[#0891B2] text-white py-3 rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Section 5: Comprehensive Legal Coverage for Fleets
function LotsCoverage() {
  const stats = [
    {
      icon: <Truck />,
      text: (
        <>
          <span className="text-[#22D2EE]">Over 800+ logistics partners onboarded,</span> expanding reach across the
          transport industry.
        </>
      ),
    },
    {
      icon: <Scale />,
      text: (
        <>
          <span className="text-[#22D2EE]">Providing legal assistance</span> to 600K+ private and commercial vehicles.
        </>
      ),
    },
    {
      icon: <MapPin />,
      text: (
        <>
          <span className="text-[#22D2EE]">Over 200K+ Roadside Legal Cases</span> successfully handled.
        </>
      ),
    },
    {
      icon: <Check />,
      text: (
        <>
          <span className="text-[#22D2EE]">150K+ challans resolved,</span> saving customers over ₹50Cr+ in penalties and
          legal fees.
        </>
      ),
    },
  ]

  return (
    <div className="py-24 px-4 md:px-26 max-w-8xl">
      <div className="mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">Comprehensive Legal Coverage for Fleets</h2>
        <div className="grid md:grid-cols-4 gap-18">
          {stats.map((stat, i) => (
            <div key={i} className="border border-gray-600 p-6 flex flex-col">
              <div className="text-gray-400 mb-4">{stat.icon}</div>
              <p className="text-gray-300 text-base pb-32">{stat.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-24 relative rounded-lg overflow-hidden text-center p-16 flex flex-col items-center justify-center">
          <Image
            src="/road-forest.jpg"
            alt="Road in a forest"
            layout="fill"
            className="object-cover z-0 opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative z-20">
            <h3 className="text-2xl text-white">Connect with us to know more at</h3>
            <a
              href="mailto:Sales@lawyered.in"
              className="inline-block mt-6 bg-[#0891B2] text-white font-bold text-lg px-12 py-4"
            >
              Sales@lawyered.in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// Assembling the page
export default function Lots247Page() {
  return (
    <>
      <LotsHero />
      <LotsInfrastructure />
      <LotsPricing />
      <LotsForm />
      <LotsCoverage />
      <News />
    </>
  )
}
