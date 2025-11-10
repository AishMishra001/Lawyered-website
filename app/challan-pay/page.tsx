"use client"; // Required for state and click events

import Image from "next/image";
import Link from "next/link";
import ChallanPayNews from "../components/ChallanPayNews";
import { useState, useEffect, MouseEvent, CSSProperties } from "react"; // Required for state and click events
import { motion, AnimatePresence } from "framer-motion"; // Required for animations
import { X } from "lucide-react"; // Required for the close icon
import RewardBot from "../reward-Bot/page";

// Section 1: Hero
function ChallanHero() {
  const slides = [
    {
      h1: "ChallanPay, Anytime, Anywhere",
      p: "ChallanPay brings you a fast, secure and hassle-free way to settle your traffic challans online.",
      image: "/challan1.png",
      imageBefore: "/challan4.png",
      alt: "Man checking challan on phone",
      width: 400,
      height: 300,
    },
    {
      h1: "Pay Traffic Challans Instantly",
      p: "Few clicks, that's it. Discover & resolve your traffic challans.",
      image: "/challan2.png",
      imageBefore: "/challan5.png",
      alt: "Pay challan instantly",
      width: 400,
      height: 300,
    },
    {
      h1: "No queues. No stress. with ChallanPay",
      p: "No spam, no scam. Only authorized payments with ChallanPay",
      image: "/challan3.png",
      imageBefore: "/challan6.png",
      alt: "No stress with ChallanPay",
      width: 400,
      height: 300,
    },
  ];

  const [index, setIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // scrolls every 3 seconds

    return () => clearInterval(intervalId);
  }, [slides.length]);

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
    <div className="relative w-full overflow-hidden" onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined}>
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>

      {/* Desktop MainFrame background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0" style={desktopSpotlightStyle}>
          <div className="relative w-full h-full opacity-40">
            <Image
              src="/MainFrame.png"
              alt="Background Frame"
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

      <div className="relative px-4 md:px-16 lg:px-26 z-10 max-w-8xl mx-auto pt-32 md:pt-28 lg:py-32 flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center min-h-[80vh] md:min-h-[85vh] lg:min-h-screen">
        {/* Left Column: Sticker */}
        <div
          className="flex justify-center md:pt-26 relative h-[250px] md:h-[600px] w-full md:w-[700px] order-2 md:order-1 -mt-4"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute"
            >
              <Image
                src={isImageHovered ? slides[index].image : slides[index].imageBefore}
                alt={slides[index].alt}
                width={slides[index].width}
                height={slides[index].height}
                className="object-contain w-64 md:w-full h-auto"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots for Mobile */}
        <div className="flex md:hidden justify-center gap-2 order-3 ">
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

        {/* Right Column: Text Content */}
        <div className="flex flex-col items-center md:items-start gap-3 md:gap-6 order-1 md:order-2 text-center md:text-left">
          <Image
            src="/challanPay-logo3.png"
            alt="ChallanPay Logo"
            width={350}
            height={70}
            className="w-64 md:w-80 h-auto"
          />
          <div className="relative h-32 md:h-48 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full"
              >
                <h1 className="text-xl md:text-3xl font-bold text-black dark:text-white pb-2 md:pb-4 px-4 md:px-0">
                  {slides[index].h1}
                </h1>
                <p className="text-sm md:text-base text-black dark:text-white px-4 md:px-0">
                  {slides[index].p}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden md:flex gap-2 mt-1 md:mt-4">
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
      </div>
    </div>
  );
}

// Section 2: Content
function ChallanContent() {
  return (
    <div className="pb-12 pt-4 md:pt-0 md:pb-16 lg:pb-24 px-4 md:px-16 lg:px-26">
      <div className="max-w-8xl mx-auto text-sm md:text-base text-black dark:text-white leading-relaxed space-y-5 md:space-y-6 lg:space-y-8 text-center md:text-left">
        <p className="px-4 md:px-0">
          India&apos;s traffic compliance system is deeply fragmented, inefficient, and inconsistent across states. 8 Cr+ challans are issued annually, valued at over ₹12,000 Cr, but nearly 75% remain unpaid, clogging judicial systems and burdening citizens and businesses alike.
        </p>
        <p className="px-4 md:px-0">
          ChallanPay is India&apos;s first unified platform for discovering, resolving, and tracking traffic challans across all states and enforcement authorities. Our mission is to remove the fragmentation and inefficiencies that plague traffic compliance today by unifying data, payments, and legal processes into a single experience.
        </p>
        <div className="px-4 md:px-0 text-left">
          <p className="mb-4 md:mb-6">
            We are building the &quot;Default Rail of Mobility Compliance&quot; — a digital-first legal infrastructure layer that powers the entire ecosystem:
          </p>
          <ul className="space-y-3 md:space-y-4 list-disc list-inside">
            <li><span className="font-bold text-[#22D2EE]">For Individuals:</span> Instant challan discovery, one-click resolution, and peace of mind.</li>
            <li><span className="font-bold text-[#22D2EE]">For Fleets & Enterprises:</span> Centralized dashboards, bulk challan settlements, and compliance automation.</li>
            <li><span className="font-bold text-[#22D2EE]">For Aggregators, Insurers, & OEMs:</span> Seamless API integrations to enhance customer journeys.</li>
            <li><span className="font-bold text-[#22D2EE]">For Governments & Regulators:</span> Better revenue collection, data analytics, and improved enforcement outcomes.</li>
          </ul>
        </div>
        <p className="px-4 md:px-0">
          With <span className="text-[#22D2EE]">38.5 Cr registered vehicles, 18.2 Cr driving licenses,</span> and the rapid expansion of digital governance initiatives, India faces a critical moment. ChallanPay positions itself as the digital backbone of mobility compliance, integrating government, citizens, fleets, and enterprises into one unified ecosystem.
        </p>
      </div>
    </div>
  );
}

// Section 3: Select Vehicle Type
function ChallanVehicleSelector() {
    const vehicleData = [
        { id: 'private', label: 'Private', unselectedIcon: '/Mask5.png', selectedIcon: '/Mask1.png' },
        { id: 'electric', label: 'Electric', unselectedIcon: '/Mask6.png', selectedIcon: '/Mask2.png' },
        { id: 'commercial', label: 'Commercial', unselectedIcon: '/Mask7.png', selectedIcon: '/Mask3.png' },
        { id: 'two-wheeler', label: 'Two-Wheeler', unselectedIcon: '/Mask8.png', selectedIcon: '/Mask4.png' },
    ];

    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const handleVehicleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setVehicleNumber(value);

        // Regex to validate Indian vehicle number format, allowing for optional spaces
        const regex = /^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{0,3}[ -]?[0-9]{1,4}$/;
        
        if (value === '' || regex.test(value)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const handleVehicleSelect = (vehicleId: string) => {
        if (selectedVehicleId === vehicleId) {
            setSelectedVehicleId(null);
        } else {
            setSelectedVehicleId(vehicleId);
        }
    };

    const handleCheckChallan = () => {
        if (isValid && vehicleNumber && selectedVehicleId && isTermsChecked) {
            let vehicleType = selectedVehicleId;
            if (vehicleType === 'two-wheeler') {
                vehicleType = 'private-two-wheeler';
            }
            const url = `https://www.challanpay.in/verification/${vehicleNumber}?type=${vehicleType}`;
            window.open(url, '_blank');
        } else {
            if (!isTermsChecked) {
                alert("Please agree to the terms & conditions and privacy policy before checking challan status.");
            } else {
                alert("Please select a vehicle type and enter a valid vehicle number.");
            }
        }
    };

    const VehicleCircle = ({ vehicle, isSelected, onClick }: { vehicle: typeof vehicleData[0], isSelected: boolean, onClick: () => void }) => {
        const iconSrc = isSelected ? vehicle.selectedIcon : vehicle.unselectedIcon;
        return (
            <div
                onClick={onClick}
                className={`relative flex flex-col items-center justify-center rounded-full aspect-square cursor-pointer transition-all duration-300 ease-in-out w-30 h-30 md:w-40 md:h-40 border-2 text-gray-400 hover:border-brand-cyan ${
                    isSelected ? 'border-[#0b9eb4] bg-blue-100' : 'border-gray-700 bg-white'
                }`}
            >
                <div className="relative w-20 md:w-20 h-20 md:h-20">
                    <Image
                        src={iconSrc}
                        alt={vehicle.label}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        );
    };

  return (
    <div className="pb-12 md:py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center px-4 md:px-22">
        {/* Left Column: Vehicle Type Buttons */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 md:mb-8 text-center md:text-left">Select Vehicle Type*</h2>
          <div className="flex flex-col items-center md:items-start gap-y-12 md:gap-y-14">
            <div className="flex justify-center  md:justify-start gap-x-12 md:gap-x-6">
                <VehicleCircle 
                    vehicle={vehicleData[0]}
                    isSelected={selectedVehicleId === vehicleData[0].id}
                    onClick={() => handleVehicleSelect(vehicleData[0].id)}
                />
                <VehicleCircle 
                    vehicle={vehicleData[1]}
                    isSelected={selectedVehicleId === vehicleData[1].id}
                    onClick={() => handleVehicleSelect(vehicleData[1].id)}
                />
            </div>
            <div className="flex justify-center md:justify-start gap-x-12 md:gap-x-6">
                <VehicleCircle 
                    vehicle={vehicleData[2]}
                    isSelected={selectedVehicleId === vehicleData[2].id}
                    onClick={() => handleVehicleSelect(vehicleData[2].id)}
                />
                <VehicleCircle 
                    vehicle={vehicleData[3]}
                    isSelected={selectedVehicleId === vehicleData[3].id}
                    onClick={() => handleVehicleSelect(vehicleData[3].id)}
                />
            </div>
          </div>
        </div>

        {/* Right Column: Input and Checkbox */}
        <div className="w-full space-y-8 md:space-y-12">
          <div>
            <input
              type="text"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
              placeholder="Enter Vehicle Number"
              className={`w-full bg-white text-black text-lg md:text-2xl font-mono tracking-widest p-4 md:p-8 rounded-lg outline-none ${!isValid ? 'border-2 border-red-500' : 'border-none'}`}
            />
            <p className={`mt-2 text-sm md:text-base ${isValid ? 'opacity-0' : 'text-red-500'}`}>Please enter a valid vehicle number.</p>
          </div>
          <button onClick={handleCheckChallan} className="w-full md:w-[50%] bg-[#0b9eb4] text-white text-sm md:text-base py-3 md:py-4 px-6 md:px-10 rounded-lg">
            Check Challan Status
          </button>
          <div className="flex items-start gap-3 md:gap-4">
            <div className="relative">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
                className="md:h-5 md:w-5 rounded border-gray-600 flex-shrink-0 mt-1 appearance-none bg-gray-700 checked:bg-[#0b9eb4]  focus:ring-opacity-50"
                style={{
                  accentColor: '#0b9eb4'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  className={`w-3 h-3 text-white transition-opacity duration-200 ${isTermsChecked ? 'opacity-100' : 'opacity-0'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <label htmlFor="terms" className="text-black dark:text-white text-xs md:text-base leading-relaxed">
              I agree to the{' '}
              <Link href="https://lawyered.in/p/terms-and-conditions-for-challan-resolution" className="font-bold underline text-[#22D2EE]">
                terms & conditions
              </Link>
              {' '}and the{' '}
              <Link href="https://lawyered.in/p/privacy-policy" className="font-bold underline text-[#22D2EE]">
                privacy policy
              </Link>
              , and authorize ChallanPay to fetch my vehicle registration and challan details from the Government database.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}


// NEW: Modal component for the WhatsApp form
const WhatsappModal = ({ onClose }: { onClose: () => void }) => {
    const [companyName, setCompanyName] = useState('');
    const [numVehicles, setNumVehicles] = useState('');

    const handleChat = () => {
        const phone = '919289928628';
        const message = `Company Name: ${companyName}\nNumber of Vehicles: ${numVehicles}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-lg w-full border border-gray-700 shadow-xl">
                {/* The close button is placed outside the main card for the specific design */}
                <button onClick={onClose} className="absolute -top-5 -right-5 text-gray-400 hover:text-white bg-gray-800 rounded-full p-2 border-2 border-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">Share Your Company Details</h2>
                <form className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Company Name</label>
                        <input
                            type="text"
                            placeholder="ABC Private Limited"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <label className="text-sm text-gray-400 mb-2 block">Number of Vehicles</label>
                        <div className="relative">
                            <select
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-300 appearance-none cursor-pointer pr-10"
                                style={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none'
                                }}
                                value={numVehicles}
                                onChange={(e) => setNumVehicles(e.target.value)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="0-10">0-10</option>
                                <option value="11-20">11-20</option>
                                <option value="21-30">21-30</option>
                                <option value="31-40">31-40</option>
                                <option value="41-50">41-50</option>
                                <option value="50+">50+</option>
                            </select>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                color: #9CA3AF;
                            }
                            select:focus option {
                                background-color: rgba(31, 41, 55, 0.9);
                            }
                        `}</style>
                    </div>
                    <button
                        type="button" // To prevent form submission
                        onClick={handleChat}
                        className="w-full mt-4 inline-flex items-center justify-center gap-3 bg-[#1A9849] text-white font-bold py-3 rounded-lg text-lg"
                    >
                        <Image src="/whatsapp2.png" alt="WhatsApp icon" width={24} height={24} />
                        Chat with us on WhatsApp
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};


// UPDATED: Section 4: Chat with us on WhatsApp
function ChallanWhatsapp() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState('');

  return (
    <>
      <div className="py-12 md:py-16 px-4 md:px-26 border-y-2 border-gray-800">
        <div className="max-w-8xl mx-auto space-y-8">
          {/* WhatsApp Section */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Image Section */}
            <div
              className="flex justify-center md:justify-start bg-transparent rounded-lg p-4 order-2 md:order-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={isHovered ? "/whatsapp96.png" : "/whatsapp69.png"}
                alt="Trucks on a highway"
                width={500}
                height={200}
                className="object-contain w-64 md:w-full h-auto"
              />
            </div>

            {/* Text and Button Section */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 order-1 md:order-2 text-center md:text-left">
              <p className="text-lg md:text-2xl font-semibold text-black dark:text-white px-4 md:px-0">
                Want to check challans for multiple vehicles together? Do not worry.
              </p>
              {/* This button now opens the modal */}
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-3 bg-[#1A9849] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base">
                <Image src="/whatsapp2.png" alt="WhatsApp icon" width={24} height={24} />
                Chat with us on WhatsApp
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-2 border-gray-700 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-12">
              <h2 className="text-md md:text-2xl font-bold text-black dark:text-white text-center">
Socials Ahead, Don&apos;t Miss the Signal!
              </h2>
              <div className="flex items-center space-x-6 md:space-x-8">
                <a href="https://www.facebook.com/share/14KSBMrXdXs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('facebook')} onMouseLeave={() => setSocialHovered('')}>
                  <Image src={socialHovered === 'facebook' ? '/facebook4.png' : '/facebook3.png'} alt="Facebook" width={35} height={35} className="w-8  h-auto transition-opacity duration-200 hover:opacity-80" />
                </a>
                <a href="https://www.instagram.com/challanpay.in" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('instagram')} onMouseLeave={() => setSocialHovered('')}>
                  <Image src={socialHovered === 'instagram' ? '/instagram4.png' : '/instagram3.png'} alt="Instagram" width={35} height={35} className="w-8  h-auto transition-opacity duration-200 hover:opacity-80" />
                </a>
                <a href="https://x.com/challanpay25389?t=Rt94s4lkuIfFsUpMHC8_VA&s=09" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('twitter')} onMouseLeave={() => setSocialHovered('')}>
                  <Image src={socialHovered === 'twitter' ? '/twitter5.png' : '/twitter3.png'} alt="Twitter" width={35} height={35} className="w-8  h-auto transition-opacity duration-200 hover:opacity-80" />
                </a>
                <a href="https://www.youtube.com/@LawyeredIN/videos" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('youtube')} onMouseLeave={() => setSocialHovered('')}>
                  <Image src={socialHovered === 'youtube' ? '/youtube6.png' : '/youtube5.png'} alt="YouTube" width={35} height={35} className="w-8 h-auto transition-opacity duration-200 hover:opacity-80" />
                </a>
                <a href="https://www.linkedin.com/company/challanpay/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setSocialHovered('linkedin')} onMouseLeave={() => setSocialHovered('')}>
                  <Image src={socialHovered === 'linkedin' ? '/linkedin4.png' : '/linkedin3.png'} alt="LinkedIn" width={35} height={35} className="w-8 h-auto transition-opacity duration-200 hover:opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AnimatePresence handles the modal's appearance and disappearance */}
      <AnimatePresence>
        {isModalOpen && <WhatsappModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}


// Assembling the page
export default function ChallanPayPage() {
  return (
    <>
      <ChallanHero />
      <ChallanContent />
      <ChallanVehicleSelector />
      <ChallanWhatsapp />
      <ChallanPayNews />
      <RewardBot />
    </>
  );
}
