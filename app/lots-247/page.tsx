"use client"
// app/lots-247/page.tsx
import type React from "react"

import Image from "next/image"
import { X } from "lucide-react"
import { News } from "../components/News"
import { useState, useEffect, type MouseEvent, type CSSProperties, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

// Section 1: Hero
function LotsHero() {
  const slides = [
    {
      h1: "Seamless Mobility, Zero Legal Hassles.",
      p: "From compliance tracking to challan closure, accident support, and regulatory safeguards — everything your fleet and mobility needs to move forward.",
    },
    {
      h1: "Eliminate Legal Roadblocks. Ensure Seamless Mobility.",
      p: "Real-time legal compliance, challan resolution, accident support, and regulatory risk management for fleets, logistics, and private mobility.",
    },
    {
      h1: "Clear the Legal Path. Drive Without Disruption.",
      p: "Stay ahead with real-time compliance, instant challan resolution, accident assistance, and end-to-end regulatory risk management.",
    },
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000) // scrolls every 3 seconds

    return () => clearInterval(intervalId)
  }, [slides.length])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [delayedMousePosition, setDelayedMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) setIsHovering(true)
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const dx = mousePosition.x - delayedMousePosition.x
      const dy = mousePosition.y - delayedMousePosition.y

      setDelayedMousePosition({
        x: delayedMousePosition.x + dx * 0.05,
        y: delayedMousePosition.y + dy * 0.05,
      })
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition, delayedMousePosition])

  // Mobile detection and rotation animation
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Rotation animation for both desktop and mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Desktop spotlight style (rotating mask with increased size)
  const desktopSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
    maskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos((rotation * Math.PI) / 180)}% ${50 + 35 * Math.sin((rotation * Math.PI) / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 400px at ${50 + 35 * Math.cos((rotation * Math.PI) / 180)}% ${50 + 35 * Math.sin((rotation * Math.PI) / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  }

  // Mobile spotlight style (rotating mask)
  const mobileSpotlightStyle: CSSProperties = {
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
    maskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos((rotation * Math.PI) / 180)}% ${50 + 30 * Math.sin((rotation * Math.PI) / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
    WebkitMaskImage: `radial-gradient(circle 250px at ${50 + 30 * Math.cos((rotation * Math.PI) / 180)}% ${50 + 30 * Math.sin((rotation * Math.PI) / 180)}%, black 20%, rgba(0, 0, 0, 0.5) 50%, transparent 80%)`,
  }

  return (
    <div
      className="relative w-full text-center pt-30 h-screen"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>

      {/* Desktop MainFrame background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0" style={desktopSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image src="/MainFrame.png" alt="background frame" fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Mobile Grid background */}
      {isMobile && (
        <div className="absolute inset-0 z-0" style={mobileSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image src="/mobileGrid.png" alt="Mobile Grid Background" fill className="object-cover" />
          </div>
        </div>
      )}
      <div className="relative max-w-8xl z-10 flex flex-col items-center pt-8 px-4 md:px-26">
        <Image
          src="/lots247-logo2.png"
          alt="LOTS 247 Logo"
          width={400}
          height={100}
          priority
          className="w-64 md:w-96 h-auto"
        />

        <div className="relative h-52 sm:h-42 md:h-36 mt-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full left-0 right-0"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-white px-4">{slides[index].h1}</h1>
              <p className="mt-4 text-xs md:text-base text-white max-w-6xl mx-auto px-4">{slides[index].p}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Video Section - positioned within hero bounds */}
        <div className="-mt-4 w-full max-w-5xl flex items-center justify-center px-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl w-full" style={{
            aspectRatio: '16/9',
            maxHeight: 'min(60vh, 450px)',
            maxWidth: '100%'
          }}>
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-all duration-300 ${!isVideoPlaying ? 'grayscale' : 'grayscale-0'}`}
              controls
              preload="metadata"
              playsInline
              muted
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/lots.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>
    </div>
  )
}

// Section 2: The Only Scalable & Dependable Legal-Tech Infrastructure
function LotsInfrastructure() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  return (
    <div className="pb-12 md:py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <p className="relative z-10 text-white w-full mx-auto  px-4 md:px-26 pb-12 text-sm md:text-base max-w-7xl">
          LOTS247 is not just a legal solution; it is a mission-critical, technology-driven new SaaS
          (Service-as-a-Software) designed to eliminate roadside legal issues in real time. It ensures that vehicle owners
          and businesses never suffer financial, operational, or psychological distress due to legal entanglements. LOTS
          is a painkiller solution—an indispensable safety net for every vehicle on Indian roads.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 md:mb-16 px-4">
          The Only Scalable & Dependable Legal-Tech Infrastructure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Card 1 */}
          <div
            className="border border-gray-800 p-6 bg-transparent"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* <p className="text-base text-gray-400">Layer 1</p>
             */}
            <h3 className="text-base md:text-2xl font-bold mt-1">24×7 On-Call Resolution</h3>
            <Image
              src={hoveredCard === 1 ? "/sticker23.png" : "/sticker32.png"}
              alt="On-Call Resolution"
              width={200}
              height={200}
              className="mx-auto my-6 md:my-8 w-32 md:w-48"
            />
            <p className="text-gray-300 text-sm md:text-base">
              Talk to a lawyer instantly: A tech-driven,{" "}
              <span className="text-[#22D2EE]">round-the-clock legal safety</span> net that immediately tackles roadside
              issues before they spiral, backed by in-house Lawyers.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="border border-gray-800 p-6 bg-transparent"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* <p className="text-base text-gray-400">Layer 2</p> */}
            <h3 className="text-base md:text-2xl font-bold mt-1">On-Site Deployment</h3>
            <Image
              src={hoveredCard === 2 ? "/sticker22.png" : "/sticker88.png"}
              alt="On-Site Deployment"
              width={200}
              height={200}
              className="mx-auto my-4 md:my-6 w-32 md:w-48"
            />
            <p className="text-gray-300 text-sm md:text-base pt-6 md:pt-10">
              A lawyer at your location in 2 hours: Nationwide Network of{" "}
              <span className="text-[#22D2EE]">75K+ Lawyers across 98% of pin codes,</span> ensuring a 2-hour on-site
              deployment anytime, anywhere.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="border border-gray-800 p-6 bg-transparent"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* <p className="text-base text-gray-400">Layer 3</p> */}
            <h3 className="text-base md:text-2xl font-bold mt-1">Challans & RTO-as-a-Service</h3>
            <Image
              src={hoveredCard === 3 ? "/sticker24.png" : "/sticker42.png"}
              alt="Challans & RTO Service"
              width={240}
              height={240}
              className="mx-auto my-4 md:my-6 w-36 md:w-56"
            />
            <ul className="text-gray-300 space-y-3 md:space-y-4 text-sm md:text-base">
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

interface Plan {
  name: string
  logo: string
  bgColor: string
  topSeller?: boolean
  values: (string | boolean | number | null | undefined)[]
}

const DesktopPlan = ({ plan, features }: { plan: Plan; features: string[] }) => (
  <div className="flex flex-col gap-4">
    <div className={`relative rounded-xl p-6 flex items-center justify-center ${plan.bgColor} z-10 h-24`}>
      {plan.topSeller && (
        <Image
          src="/TopSeller2.png"
          alt="Top Seller"
          width={150}
          height={150}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 z-20"
        />
      )}
      <Image
        src={plan.logo || "/placeholder.svg"}
        alt={`${plan.name} logo`}
        width={150}
        height={50}
        className="object-contain"
      />
    </div>
    <div className="bg-white rounded-lg py-6 space-y-4">
      {plan.values.map((val: string | boolean | number | null | undefined, idx: number) => (
        <div
          key={idx}
          className="h-[5rem] pb-6 px-4 lg:px-2 flex items-center justify-center text-base lg:text-lg text-center border-b border-black/10 last:border-b-0 p-2"
        >
          <div className="w-full flex items-center justify-between lg:justify-center">
            <span className="lg:hidden font-semibold text-sm text-gray-600 text-left pr-2">
              {features[idx] === "Online Lok Adalat Court" ? (
                <div>
                  Online
                  <br />
                  Lok Adalat
                  <br />
                  Court
                </div>
              ) : (
                features[idx]
              )}
            </span>
            <div className="text-right lg:text-center">
              {val === true ? (
                <Image src="/Tick.png" alt="Checkmark" width={24} height={24} className="object-contain inline-block" />
              ) : val === false ? (
                <Image src="/CircleX.png" alt="Cross" width={24} height={24} className="object-contain inline-block" />
              ) : typeof val === "string" && val.includes(" , ") ? (
                <div>
                  {val.split(" , ").map((line: string, i: number) => {
                    if (!isNaN(Number(line.replace(/,/g, "")))) {
                      if (plan.name === "V Care" && idx === 4) {
                        return (
                          <p key={i} className="text-black">
                            {line}
                          </p>
                        )
                      }
                      return (
                        <p key={i} className="text-black">
                          INR {line}
                        </p>
                      )
                    }
                    return (
                      <p key={i} className="text-black">
                        {line}
                      </p>
                    )
                  })}
                </div>
              ) : (
                <p className="text-black">{val}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const MobilePlan = ({ plan, features }: { plan: Plan; features: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentScrollHeight, setContentScrollHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight
      const clientHeight = contentRef.current.clientHeight
      setContentScrollHeight(scrollHeight - clientHeight)
    }
  }, [plan.values])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -contentScrollHeight])

  return (
    <div ref={containerRef} className="h-[200vh]">
      <div className="sticky top-28 flex flex-col gap-4">
        <div className={`relative rounded-xl p-6 flex items-center justify-center ${plan.bgColor} z-10 h-24`}>
          {plan.topSeller && (
            <Image
              src="/TopSeller2.png"
              alt="Top Seller"
              width={150}
              height={150}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 z-20"
            />
          )}
          <Image
            src={plan.logo || "/placeholder.svg"}
            alt={`${plan.name} logo`}
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        <div
          ref={contentRef}
          className="bg-white rounded-lg pt-6 space-y-4 overflow-hidden"
          style={{ maxHeight: "calc(100vh - 13rem)" }}
        >
          <motion.div style={{ translateY }}>
            {plan.values.map((val: string | boolean | number | null | undefined, idx: number) => (
              <div
                key={idx}
                className="h-[5rem] px-4 flex items-center justify-center text-base text-center border-b border-black/10 last:border-b-0 p-2"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-600 text-left pr-2">
                    {features[idx] === "Online Lok Adalat Court" ? (
                      <div>
                        Online
                        <br />
                        Lok Adalat
                        <br />
                        Court
                      </div>
                    ) : (
                      features[idx]
                    )}
                  </span>
                  <div className="text-right">
                    {val === true ? (
                      <Image
                        src="/Tick.png"
                        alt="Checkmark"
                        width={24}
                        height={24}
                        className="object-contain inline-block"
                      />
                    ) : val === false ? (
                      <Image
                        src="/CircleX.png"
                        alt="Cross"
                        width={24}
                        height={24}
                        className="object-contain inline-block"
                      />
                    ) : typeof val === "string" && val.includes(" , ") ? (
                      <div>
                        {val.split(" , ").map((line, i) => {
                          if (!isNaN(Number(line.replace(/,/g, "")))) {
                            if (plan.name === "V Care" && idx === 4) {
                              return (
                                <p key={i} className="text-black">
                                  {line}
                                </p>
                              )
                            }
                            return (
                              <p key={i} className="text-black">
                                INR {line}
                              </p>
                            )
                          }
                          return (
                            <p key={i} className="text-black">
                              {line}
                            </p>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-black">{val}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const MobilePricingMatrix = ({
  plans,
  features,
}: {
  plans: Plan[]
  features: string[]
}) => {
  const renderValue = (val: string | boolean | number | null | undefined, planName: string, idx: number) => {
    if (val === true) {
      return <Image src="/Tick.png" alt="Included" width={24} height={24} className="inline-block" />
    }
    if (val === false || val === null || typeof val === "undefined") {
      return <Image src="/CircleX.png" alt="Not included" width={24} height={24} className="inline-block" />
    }
    if (typeof val === "string" && val.includes(" , ")) {
      // Multiple lines or numeric items; prefix INR for numbers except the noted exception
      const lines = val.split(" , ")
      return (
        <div className="leading-tight">
          {lines.map((line, i) => {
            const numeric = !isNaN(Number(line.replace(/,/g, "")))
            if (numeric) {
              if (planName === "V Care" && idx === 4) {
                return (
                  <p key={i} className="text-black">
                    {line}
                  </p>
                )
              }
              return <p key={i} className="text-black">{`INR ${line}`}</p>
            }
            return (
              <p key={i} className="text-black">
                {line}
              </p>
            )
          })}
        </div>
      )
    }
    return <p className="text-black">{String(val)}</p>
  }

  const mobileLabel = (f: string) => {
    if (f === "Online Lok Adalat Court") return "Online, Lok Adalat, Court"
    return f
  }

  return (
    <div className="lg:hidden">
      {/* Plan pills row */}
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative h-12 rounded-xl ${plan.bgColor} flex items-center justify-center`}>
            {plan.topSeller && (
              <Image
                src="/TopSeller2.png"
                alt="Top Seller"
                width={60}
                height={60}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 rotate-12 z-20"
              />
            )}
            <Image
              src={plan.logo || "/placeholder.svg"}
              alt={`${plan.name} logo`}
              width={90}
              height={24}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Feature sections */}
      <div className="mt-8 rounded-2xl p-4">
        {features.map((feature, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            <div className="text-white font-semibold text-sm mb-3">{mobileLabel(feature)}</div>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-lg ${feature === "Online Lok Adalat Court" ? "h-28" : "h-14"} flex items-center justify-center px-2 text-center`}
                >
                  {renderValue(plan.values[idx], plan.name, idx)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LotsPricing() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [isStickerHovered, setIsStickerHovered] = useState(false)

  const features = [
    "Number of Vehicles",
    "24/7 On-Call Resolution",
    "On-Site Legal Resolution",
    "Challan-as-a-Service",
    "Online Lok Adalat Court",
    "RTO-as-a-Service",
    "Dashboard Access",
    "No.of Users",
    "Automated Report",
    "Personalized Reports",
    "Incident Update via WhatsApp",
    "Add-Ons",
    "Value-Added Services",
    "Dedicated Account Manager",
    "Bulk Challan Resolution",
    "API Integration",
  ]

  const plans = [
    {
      name: "U Drive",
      logo: "/Udrive.png",
      bgColor: "bg-[#06B6D4]",
      values: [
        "1",
        true,
        "Pay Per Use",
        true,
        "79 , 1000 , 2000",
        "Pay Per Use",
        false,
        false,
        false,
        false,
        false,
        "Pay Per Use",
        "Pay Per Use",
        false,
        false,
        false,
      ],
    },
    {
      name: "B Safe",
      logo: "/Bsafe.png",
      bgColor: "bg-[#00B876]",
      values: [
        "Unlimited",
        true,
        "Pay Per Use",
        true,
        "49 , 1000 , 2000",
        "Pay Per Use",
        true,
        "3",
        true,
        false,
        true,
        "Pay Per Use",
        "Pay Per Use",
        false,
        false,
        false,
      ],
    },
    {
      name: "V Care",
      logo: "/Vcare.png",
      topSeller: true,
      bgColor: "bg-[#FF9100]",
      values: [
        "Unlimited",
        true,
        "Pay Per Use",
        true,
        "39 , As per Add-on B2 , \u00A0",
        "Pay Per Use",
        true,
        "10",
        true,
        true,
        true,
        "B1,B2,B3#",
        "Worth 20K",
        true,
        true,
        true,
      ],
    },
  ]

  return (
    <div className="pb-24 px-4 md:px-8 lg:px-26 relative bg-transparent bg-[url('/sketch.png')] bg-no-repeat bg-[length:110%_auto] lg:bg-[center_top_10rem]">
      <div className="absolute inset-0 bg-brand-dark/95 lg:bg-brand-dark/95"></div>
      <div className="max-w-8xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Drive Ahead Without Legal Worries!</h2>
        <p className="text-gray-300 text-center text-base my-4">
          Choose the right package to keep your fleet running smoothly
        </p>

        {isClient && isMobile ? (
          <MobilePricingMatrix plans={plans} features={features} />
        ) : (
          <div className="mt-12 lg:mt-22 grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-8 lg:gap-12 items-start lg:items-end">
            {/* Left column : features (desktop only) */}
            <div className="hidden lg:flex flex-col">
              <div
                className="flex items-center justify-center"
                onMouseEnter={() => setIsStickerHovered(true)}
                onMouseLeave={() => setIsStickerHovered(false)}
              >
                <Image
                  src={isStickerHovered ? "/sticker44.png" : "/sticker111.png"}
                  alt="Sticker"
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>
              <div className="bg-white rounded-lg py-6 space-y-4">
                {features.map((f, idx) => (
                  <div
                    key={idx}
                    className="h-[5rem] pb-6 flex flex-col items-center justify-center text-lg text-center text-black border-b border-black/10 last:border-b-0 p-2"
                  >
                    {f === "Online Lok Adalat Court" ? (
                      <div>
                        Online
                        <br />
                        Lok Adalat
                        <br />
                        Court
                      </div>
                    ) : (
                      f
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column : plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <DesktopPlan key={plan.name} plan={plan} features={features} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Section 4: Submit Card
function LotsForm() {
  // State for controlling the visibility of the pop-ups
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [showThankYouPopup, setShowThankYouPopup] = useState(false)

  // State for the form inputs to make them controlled components
  const [companyName, setCompanyName] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [employeeCount, setEmployeeCount] = useState("")
  const [formStatus, setFormStatus] = useState("")

  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^0-9]/g, "")
    if (numericValue.length <= 10) {
      setMobileNo(numericValue)
    }
  }

  // Handler for the main form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setFormStatus('Submitting...')

    const formData = {
      companyName,
      mobileNo,
      employeeCount,
      source: 'LOTS 247 Form'
    }

    try {
      const response = await fetch('https://automate.indiaaccelerator.co/webhook/5da90f77-0b4d-4695-904b-1583dc1a6323', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': window.location.origin,
          'Origin': window.location.origin,
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response.ok && responseData.message === "Workflow was started") {
        setFormStatus('Your message has been sent successfully!')
        // Reset form
        setCompanyName('')
        setMobileNo('')
        setEmployeeCount('')
        setShowThankYouPopup(true)
      } else {
        console.log('Webhook response:', responseData)
        setFormStatus('An error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus('An error occurred. Please try again.')
    }
  }

  // Handler for the OTP form submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would verify the OTP here.
    // After successful verification, close the OTP popup and show the "Thank You" message.
    setShowOtpPopup(false)
    setShowThankYouPopup(true)
  }

  // This effect will automatically close the "Thank You" popup after 3 seconds
  useEffect(() => {
    if (showThankYouPopup) {
      const timer = setTimeout(() => {
        setShowThankYouPopup(false)
        // Reset form fields after the process is complete
        setCompanyName("")
        setMobileNo("")
        setEmployeeCount("")
      }, 3000) // Popup will disappear after 3000 milliseconds (3 seconds)

      // Cleanup the timer if the component unmounts or the popup is closed manually
      return () => clearTimeout(timer)
    }
  }, [showThankYouPopup])

  return (
    <>
      {/* The main form section */}
      <div className="py-12 md:py-24 max-w-8xl px-4 md:px-26">
        <div className="mx-auto border border-gray-800 rounded-lg p-4 md:p-8">
          <div className="w-full max-w-8xl flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <p className="text-gray-200 text-base text-center md:text-left">
              To know more about <span className="text-[#22D2EE]">Add-Ons for Business Packages</span>, fill out the
              form and our executive will contact you.
            </p>
            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="col-span-1 bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500 text-sm md:text-base"
                required
              />
              <input
                type="tel"
                placeholder="Mobile No."
                value={mobileNo}
                onChange={handleMobileNoChange}
                className="col-span-1 bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500 text-sm md:text-base"
                required
              />
              <div className="relative col-span-1 md:col-span-2">
                <div className="relative">
                  <select
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-300 appearance-none cursor-pointer pr-10"
                    style={{
                      backgroundColor: "rgba(31, 41, 55, 0.5)",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                    }}
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    required
                  >
                    <option value="" disabled className="text-gray-500">
                      Select
                    </option>
                    <option value="1-10">1-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21-30">21-30</option>
                    <option value="31-40">31-40</option>
                    <option value="41-50">41-50</option>
                    <option value="50+">50+</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
                <style jsx>{`
                  select option {
                    background-color: rgba(31, 41, 55, 0.9);
                    color: white;
                    padding: 8px;
                  }
                  select option:first-child {
                    color: #9CA3AF !important;
                  }
                  select:focus option {
                    background-color: rgba(31, 41, 55, 0.9);
                  }

                  /* Comprehensive autofill styling for all browsers */
                  input:-webkit-autofill,
                  input:-webkit-autofill:hover,
                  input:-webkit-autofill:focus,
                  input:-webkit-autofill:active,
                  input:-webkit-autofill::first-line,
                  textarea:-webkit-autofill,
                  textarea:-webkit-autofill:hover,
                  textarea:-webkit-autofill:focus,
                  textarea:-webkit-autofill:active,
                  input:autofill,
                  input:autofill:hover,
                  input:autofill:focus,
                  input:autofill:active,
                  textarea:autofill,
                  textarea:autofill:hover,
                  textarea:autofill:focus,
                  textarea:autofill:active {
                    -webkit-box-shadow: 0 0 0 1000px rgba(31, 41, 55, 0.5) inset !important;
                    -webkit-text-fill-color: white !important;
                    -webkit-background-clip: text !important;
                    background-color: rgba(31, 41, 55, 0.5) !important;
                    background-clip: text !important;
                    border: 1px solid rgb(75 85 99) !important;
                    box-shadow: 0 0 0 1000px rgba(31, 41, 55, 0.5) inset !important;
                    text-fill-color: white !important;
                    -webkit-appearance: none !important;
                    appearance: none !important;
                  }

                  /* Additional fallback for stubborn browsers */
                  input[data-autofilled],
                  textarea[data-autofilled] {
                    background-color: rgba(31, 41, 55, 0.5) !important;
                    color: white !important;
                  }
                `}</style>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="mt-2 bg-[#0891B2] text-white py-3 px-8 md:px-14 rounded-md text-sm md:text-base w-full md:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* OTP Verification Popup (Photo 2) */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#20242A] p-8 rounded-2xl shadow-xl w-full max-w-sm relative text-white">
            <button
              onClick={() => setShowOtpPopup(false)}
              className="absolute top-3 right-3 bg-gray-600 rounded-full p-1 text-gray-300 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-6">Submit Verification Code</h2>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp" className="text-gray-400 text-sm">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="1234"
                className="w-full bg-[#2d3138] border border-gray-600 rounded-lg p-3 mt-1 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                required
                autoFocus
              />
              <button type="submit" className="w-full mt-6 bg-[#0891B2] text-white py-3 px-14 rounded-lg font-semibold">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Popup (Photo 3) */}
      {showThankYouPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#20242A] p-12 rounded-2xl shadow-xl w-full max-w-md text-center flex flex-col items-center">
            <div className="bg-green-500 rounded-full h-20 w-20 flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Thank you for Submitting!</h2>
            <p className="text-xl text-white">Our team will reach out to you!</p>
          </div>
        </div>
      )}
    </>
  )
}



// Section 5: Social Media
function LotsSocials() {
  const [socialHovered, setSocialHovered] = useState('');

  return (
    <div className="pb-12 md:pb-16 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="border-2 border-gray-700 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-12">
            <h2 className="text-md md:text-2xl font-bold text-white text-center">
              Socials Ahead, Don&apos;t Miss the Signal!
            </h2>
            <div className="flex items-center space-x-6 md:space-x-8">
              <a href="https://www.facebook.com/people/Lots247/61582100346946/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('facebook')} onMouseLeave={() => setSocialHovered('')}>
                <Image src={socialHovered === 'facebook' ? '/facebook4.png' : '/facebook3.png'} alt="Facebook" width={30} height={30} className="w-8  h-auto transition-opacity duration-200 hover:opacity-80" />
              </a>
              <a href="https://www.instagram.com/lots_247/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('instagram')} onMouseLeave={() => setSocialHovered('')}>
                <Image src={socialHovered === 'instagram' ? '/instagram4.png' : '/instagram3.png'} alt="Instagram" width={30} height={30} className="w-8 h-auto transition-opacity duration-200 hover:opacity-80" />
              </a>
              <a href="https://x.com/LOTS24X7" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('twitter')} onMouseLeave={() => setSocialHovered('')}>
                <Image src={socialHovered === 'twitter' ? '/twitter5.png' : '/twitter3.png'} alt="Twitter" width={30} height={30} className="w-8 h-auto transition-opacity duration-200 hover:opacity-80" />
              </a>
              <a href="https://www.youtube.com/@LOTS24X7" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('youtube')} onMouseLeave={() => setSocialHovered('')}>
                <Image src={socialHovered === 'youtube' ? '/youtube6.png' : '/youtube5.png'} alt="YouTube" width={30} height={30} className="w-8 h-auto transition-opacity duration-200 hover:opacity-80" />
              </a>
              <a href="https://www.linkedin.com/company/lots24x7/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('linkedin')} onMouseLeave={() => setSocialHovered('')}>
                <Image src={socialHovered === 'linkedin' ? '/linkedin4.png' : '/linkedin3.png'} alt="LinkedIn" width={30} height={30} className="w-8 h-auto transition-opacity duration-200 hover:opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 6: Comprehensive Legal Coverage for Fleets
function LotsCoverage() {
  const stats = [
    {
      icon: <Image src="/Truck.png" alt="Truck" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Over 800+ logistics partners onboarded,</span> expanding reach across the
          transport industry.
        </>
      ),
    },
    {
      icon: <Image src="/Scale.png" alt="Scale" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Providing legal assistance</span> to 600K+ private and commercial vehicles.
        </>
      ),
    },
    {
      icon: <Image src="/Signpost.png" alt="Signpost" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Over 200K+ Roadside Legal Cases</span> successfully handled.
        </>
      ),
    },
    {
      icon: <Image src="/Repeat1.png" alt="Check" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Multi-Industry Integration ,</span> Seamless collaboration with insurers,
          fleet operators, leasing companies, and mobility platforms.
        </>
      ),
    },
    {
      icon: <Image src="/HandHelping.png" alt="Check" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Pan-India legal support</span> available across 98% of India’s pin codes.
        </>
      ),
    },
    {
      icon: <Image src="/PhoneCall.png" alt="Check" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">On-Call Resolution Rate 85%</span> of cases are resolved instantly over a
          call, reducing downtime for customers.
        </>
      ),
    },
    {
      icon: <Image src="/SquareUserRound.png" alt="Check" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">On-Site Lawyer assistance</span> deployed within 2 hours through our 70,000+
          strong lawyer network.
        </>
      ),
    },
    {
      icon: <Image src="/SquareCheckBig.png" alt="Check" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">150K+ challans resolved,</span> saving customers over ₹50Cr+ in penalties and
          legal fees.
        </>
      ),
    },
    {
      icon: <Image src="/LineChart.png" alt="Check" width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">High Scalability, Handling thousands of cases daily, </span> reinforcing LOTS
          as the most reliable and indispensable legal-tech infrastructure for mobility in India.
        </>
      ),
    },
  ]

  // Create duplicated stats for infinite scroll effect
  const duplicatedStats = [...stats, ...stats, ...stats, ...stats]

  return (
    <div className="py-12 md:py-24 px-4 md:px-26 max-w-8xl">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-16 px-4">
          Comprehensive Legal Coverage for Fleets
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-infinite-scroll hover:pause-scroll">
            {duplicatedStats.map((stat, i) => (
              <div key={i} className="flex-none w-80 mx-4 border border-gray-600 p-6 flex flex-col">
                <div className="text-gray-400 mb-4 h-10 w-10">{stat.icon}</div>
                <p className="text-gray-300 text-sm md:text-base">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 md:mt-24 relative rounded-lg overflow-hidden text-center p-8 md:p-16 flex flex-col items-center justify-center">
          <Image
            src="/road-forest.jpg"
            alt="Road in a forest"
            layout="fill"
            className="object-cover z-0 opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative z-20">
            <h3 className="text-lg md:text-2xl text-white px-4">Connect with us to know more at</h3>
            <a
              href="mailto:Sales@lawyered.in"
              className="inline-block mt-4 md:mt-6 bg-[#0891B2] hover:bg-white text-white hover:text-[#0891B2] font-bold text-base md:text-lg px-8 md:px-12 py-3 md:py-4"
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
      <LotsSocials />
      <LotsCoverage />
      <News />
    </>
  )
}
