  "use client";
// app/lots-247/page.tsx
import Image from "next/image"
import { Check, Truck, Scale, MapPin, X, ChevronDown } from "lucide-react"
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
      <div className="relative max-w-8xl z-10 flex flex-col items-center pt-8 px-4 md:px-26">
        <Image src="/lots247-logo2.png" alt="LOTS 247 Logo" width={400} height={100} priority className="w-64 md:w-96 h-auto" />
        
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
                <h1 className="text-2xl md:text-4xl font-bold text-white px-4">{slides[index].h1}</h1>
                <p className="mt-4 text-sm md:text-base text-white max-w-6xl mx-auto px-4">{slides[index].p}</p>
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
      <p className="relative z-10 text-white w-full mx-auto mt-24 px-4 md:px-26 text-sm md:text-base max-w-7xl">
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <div className="pb-12 md:py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
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
            <h3 className="text-lg md:text-2xl font-bold mt-1">24×7 On-Call Resolution</h3>
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
            <h3 className="text-lg md:text-2xl font-bold mt-1">On-Site Deployment</h3>
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
            <h3 className="text-lg md:text-2xl font-bold mt-1">Challans & RTO-as-a-Service</h3>
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
  );
}

// Section 3: Drive Ahead Without Legal Worries! (Pricing)
function LotsPricing() {
  const [isStickerHovered, setIsStickerHovered] = useState(false);
  const features = [
    "Number of Vehicles", "24/7 On-Call Resolution", "On-Site Legal Resolution", "Challan-as-a-Service",
    "Online Lok Adalat Court", "RTO-as-a-Service", "Dashboard Access", "No.of Users", "Automated Report",
    "Personalized Reports", "Incident Update via WhatsApp", "Add-Ons", "Value-Added Services",
    "Dedicated Account Manager", "Bulk Challan Resolution", "API Integration",
  ];

  
  const plans = [
    {
      name: "U Drive", logo: "/Udrive.png", bgColor: "bg-[#06B6D4]",
      values: ["1", true, "Pay Per Use", true, "79 , 1000 , 2000", "Pay Per Use", false, false, false, false, false, "Pay Per Use", "Pay Per Use", false, false, false],
    },
    {
      name: "B Safe", logo: "/Bsafe.png", bgColor: "bg-[#00B876]",
      values: ["Unlimited", true, "Pay Per Use", true, "49 , 1000 , 2000", "Pay Per Use", true, "3", true, false, true, "Pay Per Use", "Pay Per Use", false, false, false],
    },
    {
      name: "V Care", logo: "/Vcare.png", topSeller: true, bgColor: "bg-[#FF9100]",
      values: ["Unlimited", true, "Pay Per Use", true, "39 , As per Add-on B2 , \u00A0", "Pay Per Use", true, "10", true, true, true, "B1,B2,B3#", "Worth 20K", true, true, true],
    },
  ];

  return (
    <div className="pb-24 px-4 md:px-8 lg:px-26 relative bg-transparent lg:bg-[url('/sketch.png')] bg-no-repeat bg-[length:110%_auto] bg-[center_top_10rem]">
      <div className="absolute inset-0 bg-brand-dark/95 lg:bg-brand-dark/95"></div>
      <div className="max-w-8xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Drive Ahead Without Legal Worries!</h2>
        <p className="text-gray-300 text-center text-base mt-2">
          Choose the right package to keep your fleet running smoothly
        </p>

        <div className="mt-12 lg:mt-22 grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-8 lg:gap-12 items-start lg:items-end">
          {/* Left column : features  */}
          <div className="hidden lg:flex flex-col">
            <div 
              className="flex items-center justify-center"
              onMouseEnter={() => setIsStickerHovered(true)}
              onMouseLeave={() => setIsStickerHovered(false)}
            >
              <Image src={isStickerHovered ? "/sticker44.png" : "/sticker111.png"} alt="Sticker" width={350} height={350} className="object-contain" />
            </div>
            <div className="bg-white rounded-lg py-6 space-y-4">
              {features.map((f, idx) => (
                <div key={idx} className="h-[5rem] pb-6 flex flex-col items-center justify-center text-lg text-center text-black border-b border-black/10 last:border-b-0 p-2">
                  {f === "Online Lok Adalat Court" ? <div>Online<br/>Lok Adalat<br/>Court</div> : f}
                </div>
              ))}
            </div>
          </div>
              {/* Right column : plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                
                <div className="bg-white rounded-lg py-6 space-y-4">
                  {plan.values.map((val, idx) => (
                    <div
                      key={idx}
                      className="h-[5rem] pb-6  px-4 lg:px-2 flex items-center justify-center text-base lg:text-lg text-center border-b border-black/10 last:border-b-0 p-2"
                    >
                      <div className="w-full flex items-center justify-between lg:justify-center">
                        <span className="lg:hidden font-semibold text-sm text-gray-600 text-left pr-2">{features[idx] === "Online Lok Adalat Court" ? <div>Online<br/>Lok Adalat<br/>Court</div> : features[idx]}</span>
                        
                        <div className="text-right lg:text-center">
                            {val === true ? (
                                <Image src="/Tick.png" alt="Checkmark" width={24} height={24} className="object-contain inline-block" />
                            ) : val === false ? (
                                <Image src="/CircleX.png" alt="Cross" width={24} height={24} className="object-contain inline-block" />
                            ) : (typeof val === 'string' && val.includes(' , ')) ? (
                                <div>
                                    {val.split(' , ').map((line, i) => {
                                        if (!isNaN(Number(line.replace(/,/g, '')))) {
                                            if (plan.name === 'V Care' && idx === 4) {
                                                return <p key={i} className="text-black">{line}</p>;
                                            }
                                            return <p key={i} className="text-black">INR {line}</p>;
                                        }
                                        return <p key={i} className="text-black">{line}</p>;
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 4: Submit Card
function LotsForm() {
  // State for controlling the visibility of the pop-ups
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  // State for the form inputs to make them controlled components
  const [companyName, setCompanyName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [employeeCount, setEmployeeCount] = useState("1-10");

  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 10) {
      setMobileNo(numericValue);
    }
  };

  // Handler for the main form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to your backend here
    // to trigger an OTP service. For this example, we'll just open the OTP popup.
    setShowOtpPopup(true);
  };

  // Handler for the OTP form submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would verify the OTP here.
    // After successful verification, close the OTP popup and show the "Thank You" message.
    setShowOtpPopup(false);
    setShowThankYouPopup(true);
  };

  // This effect will automatically close the "Thank You" popup after 3 seconds
  useEffect(() => {
    if (showThankYouPopup) {
      const timer = setTimeout(() => {
        setShowThankYouPopup(false);
        // Reset form fields after the process is complete
        setCompanyName("");
        setMobileNo("");
        setEmployeeCount("1-10");
      }, 3000); // Popup will disappear after 3000 milliseconds (3 seconds)

      // Cleanup the timer if the component unmounts or the popup is closed manually
      return () => clearTimeout(timer);
    }
  }, [showThankYouPopup]);

  return (
    <>
      {/* The main form section */}
      <div className="py-12 md:py-24 max-w-8xl px-4 md:px-26">
        <div className="mx-auto border border-gray-800 rounded-lg p-4 md:p-8">
          <div className="w-full max-w-8xl flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <p className="text-gray-200 text-sm md:text-base text-center md:text-left">
              To know more about <span className="text-[#22D2EE]">Add-Ons for Business Packages</span>, fill out the form
              and our executive will contact you.
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
                <select 
                  className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500 pr-8 text-sm md:text-base"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  required
                >
                  <option>1-10</option>
                  <option>11-20</option>
                  <option>21-30</option>
                  <option>31-40</option>
                  <option>41-50</option>
                  <option>50+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDown size={20} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end">
                <button type="submit" className="mt-2 bg-[#0891B2] text-white py-3 px-8 md:px-14 rounded-md text-sm md:text-base w-full md:w-auto">
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
              <label htmlFor="otp" className="text-gray-400 text-sm">Enter OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="1234"
                className="w-full bg-[#2d3138] border border-gray-600 rounded-lg p-3 mt-1 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                required
                autoFocus
              />
              <button 
                type="submit" 
                className="w-full mt-6 bg-[#0891B2] text-white py-3 px-14 rounded-lg font-semibold"
              >
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
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Thank you for Submitting!</h2>
            <p className="text-xl text-white">Our team will reach out to you!</p>
          </div>
        </div>
      )}
    </>
  )
}


// Section 5: Comprehensive Legal Coverage for Fleets
function LotsCoverage() {
  const stats = [
    {
      icon: <Truck width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Over 800+ logistics partners onboarded,</span> expanding reach across the
          transport industry.
        </>
      ),
    },
    {
      icon: <Scale width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Providing legal assistance</span> to 600K+ private and commercial vehicles.
        </>
      ),
    },
    {
      icon: <MapPin width={40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">Over 200K+ Roadside Legal Cases</span> successfully handled.
        </>
      ),
    },
    {
      icon: <Check width={ 40} height={40} />,
      text: (
        <>
          <span className="text-[#22D2EE]">150K+ challans resolved,</span> saving customers over ₹50Cr+ in penalties and
          legal fees.
        </>
      ),
    },
  ]

  return (
    <div className="py-12 md:py-24 px-4 md:px-26 max-w-8xl">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-16 px-4">Comprehensive Legal Coverage for Fleets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="border border-gray-600 p-6 flex flex-col">
              <div className="text-gray-400 mb-4 h-10 w-10">{stat.icon}</div>
              <p className="text-gray-300 text-sm md:text-base pb-8 md:pb-32">{stat.text}</p>
            </div>
          ))}
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
      <LotsCoverage />
      <News />
    </>
  )
}
