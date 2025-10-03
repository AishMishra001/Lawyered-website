// app/challan-pay/page.tsx

import Image from "next/image";
import { News } from "../components/News";

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
        <p>
          ChallanPay is India’s first unified platform for discovering, resolving, and tracking traffic challans across all states and enforcement authorities. Our mission is to remove the fragmentation and inefficiencies that plague traffic compliance today by unifying data, payments, and legal processes into a single experience.
        </p>
        <div>
          <p className="mb-6">
            We are building the &quot;Default Rail of Mobility Compliance&quot; — a digital-first legal infrastructure layer that powers the entire ecosystem:
          </p>
          <ul className="space-y-4 list-disc list-inside">
            <li><span className="font-bold text-[#22D2EE]">For Individuals:</span> Instant challan discovery, one-click resolution, and peace of mind.</li>
            <li><span className="font-bold text-[#22D2EE]">For Fleets & Enterprises:</span> Centralized dashboards, bulk challan settlements, and compliance automation.</li>
            <li><span className="font-bold text-[#22D2EE]">For Aggregators, Insurers, & OEMs:</span> Seamless API integrations to enhance customer journeys.</li>
            <li><span className="font-bold text-[#22D2EE]">For Governments & Regulators:</span> Better revenue collection, data analytics, and improved enforcement outcomes.</li>
          </ul>
        </div>
        <p>
          With <span className="text-[#22D2EE]">38.5 Cr registered vehicles, 18.2 Cr driving licenses,</span> and the rapid expansion of digital governance initiatives, India faces a critical moment. ChallanPay positions itself as the digital backbone of mobility compliance, integrating government, citizens, fleets, and enterprises into one unified ecosystem.
        </p>
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

    // Helper component for the circle to avoid repeating code
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
          
          {/* THE FIX: Replaced absolute positioning with a robust Flexbox layout */}
          <div className="flex flex-col items-start gap-y-14">
            {/* Row 1 */}
            <div className="flex justify-start gap-x-6">
              <VehicleCircle vehicle={vehicleTypes[0]} />
              <VehicleCircle vehicle={vehicleTypes[1]} />
            </div>
            {/* Row 2 */}
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




// Section 4: Chat with us on WhatsApp
function ChallanWhatsapp() {
  return (
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
          <a href="#" className="inline-flex items-center gap-3 bg-[#1A9849] text-white px-8 py-4 rounded-lg text-lg">
            <Image src="/whatsapp2.png" alt="WhatsApp icon" width={24} height={24} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
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