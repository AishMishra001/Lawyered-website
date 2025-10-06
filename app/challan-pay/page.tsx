"use client"; // Required for state and click events

import Image from "next/image";
import { News } from "../components/News";
import { useState } from "react"; // Required for managing modal state
import { motion, AnimatePresence } from "framer-motion"; // Required for animations
import { X } from "lucide-react"; // Required for the close icon

// Section 1: Hero
function ChallanHero() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-1/2 h-1/2">
          <Image
            src="/Frame.png"
            alt="background frame"
            fill
            className="object-contain opacity-110 scale-120"
          />
        </div>
      </div>

      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-32 grid md:grid-cols-2 gap-16 items-center h-screen">
        {/* Left Column: Sticker */}
        <div className="flex justify-center">
          <Image
            src="/sticker6.png"
            alt="Man checking challan on phone"
            width={700}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col items-start gap-6">
          <Image
            src="/challanpay-logo2.png" // Please ensure this logo file exists
            alt="ChallanPay Logo"
            width={500}
            height={120}
          />
          <h1 className="text-5xl font-bold text-white">
            ChallanPay, Anytime Anywhere
          </h1>
          <p className="text-xl text-white">
            ChallanPay brings you a fast, secure and hassle-free way to settle your traffic challans online.
          </p>
          <div className="flex gap-2 mt-4">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 2: Content
function ChallanContent() {
  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto text-xl text-white leading-relaxed space-y-8">
        <p>
          India’s traffic compliance system is deeply fragmented, inefficient, and inconsistent across states. 8 Cr+ challans are issued annually, valued at over ₹12,000 Cr, but nearly 75% remain unpaid, clogging judicial systems and burdening citizens and businesses alike.
        </p>
        {/* ... rest of the content */}
      </div>
    </div>
  );
}

// Section 3: Select Vehicle Type
function ChallanVehicleSelector() {
    const vehicleTypes = [
        {icon: <Image src="/Mask1.png" alt="Private" width={100} height={100} />},
        { icon: <Image src="/Mask2.png" alt="Two-Wheeler" width={100} height={100} />},
        { icon: <Image src="/Mask3.png" alt="Electric" width={100} height={100} />},
        {  icon: <Image src="/Mask4.png" alt="Commercial" width={100} height={100} /> },
    ];

    const VehicleCircle = ({ vehicle }: { vehicle: typeof vehicleTypes[0] }) => (
        <div
            className={`flex flex-col items-center justify-center gap-2 rounded-full bg-white aspect-square cursor-pointer transition-all duration-300 w-40 h-40 border-2 border-gray-700 text-gray-400 hover:border-brand-cyan hover:text-brand-cyan'}`}
        >
            {vehicle.icon}
            <p className={`font-semibold text-white`}></p>
        </div>
    );

  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-16 items-center px-22">
        {/* Left Column: Vehicle Type Buttons */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Select Vehicle Type*</h2>
          <div className="flex flex-col items-start gap-y-14">
            <div className="flex justify-start gap-x-6">
              <VehicleCircle vehicle={vehicleTypes[0]} />
              <VehicleCircle vehicle={vehicleTypes[1]} />
            </div>
            <div className="flex justify-start gap-x-6">
              <VehicleCircle vehicle={vehicleTypes[2]} />
              <VehicleCircle vehicle={vehicleTypes[3]} />
            </div>
          </div>
        </div>

        {/* Right Column: Input and Checkbox */}
        <div className="space-y-12">
          <input
            type="text"
            defaultValue="UP32MM1f13"
            className="w-full bg-white text-black text-2xl font-mono tracking-widest p-8 rounded-lg border-none outline-none"
          />
          <button className="w-[40%] bg-[#0b9eb4] text-white text-2xl p-6 rounded-lg">
            Check Challan Status
          </button>
          <div className="flex items-start gap-4 pt-4">
            <input type="checkbox" id="terms" className="h-8 w-8 rounded bg-gray-700 border-gray-600 accent-brand-cyan"/>
            <label htmlFor="terms" className="text-white text-xl">
              I agree to the terms, conditions and the privacy policy, and authorize ChallanPay to fetch my vehicle registration and challan details from the Government database.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// NEW: Modal component for the WhatsApp form
const WhatsappModal = ({ onClose }: { onClose: () => void }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-lg w-full border border-gray-700 shadow-xl">
            {/* The close button is placed outside the main card for the specific design */}
            <button onClick={onClose} className="absolute -top-5 -right-5 text-gray-400 hover:text-white bg-gray-800 rounded-full p-2 border-2 border-gray-700">
                <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Share Your Company Details</h2>
            <form className="space-y-5">
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Company Name</label>
                    <input type="text" placeholder="ABC Private Limited" className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500" />
                </div>
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Number of Vehicles</label>
                    <select className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-300">
                        <option>0-10</option>
                        <option>11-50</option>
                        <option>51-100</option>
                        <option>100+</option>
                    </select>
                </div>
                <a href="#" className="w-full mt-4 inline-flex items-center justify-center gap-3 bg-[#1A9849] text-white font-bold py-3 rounded-lg text-lg">
                    <Image src="/whatsapp2.png" alt="WhatsApp icon" width={24} height={24} />
                    Chat with us on WhatsApp
                </a>
            </form>
        </motion.div>
    </motion.div>
);


// UPDATED: Section 4: Chat with us on WhatsApp
function ChallanWhatsapp() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="py-16 px-4 md:px-26 border-y-2 border-gray-800">
        <div className="max-w-8xl grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-start bg-transparent rounded-lg p-4">
            <Image
              src="/Mask5.png"
              alt="Trucks on a highway"
              width={600}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="text-4xl font-semibold text-white">
              Want to check challans for multiple vehicles together? Do not worry.
            </p>
            {/* This button now opens the modal */}
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-3 bg-[#1A9849] text-white px-8 py-4 rounded-lg text-lg">
              <Image src="/whatsapp2.png" alt="WhatsApp icon" width={24} height={24} />
              Chat with us on WhatsApp
            </button>
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
      <News/>
    </>
  );
}