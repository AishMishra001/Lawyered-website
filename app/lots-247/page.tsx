// app/lots-247/page.tsx

import Image from "next/image";
import { Check, Truck, Scale, MapPin, X } from "lucide-react";
import { News } from "../components/News";

// Section 1: Hero
function LotsHero() {
  return (
    <div className="relative w-full text-center py-32">
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-1/2 h-1/2">
            <Image
                src="/Frame.png"
                alt="background frame"
                fill
                className="object-contain opacity-80"
            />
        </div>
      </div>
      <div className="relative max-w-8xl z-10 flex flex-col items-center px-4 md:px-26">
        <Image
          src="/lots-247-logo.png"
          alt="LOTS 247 Logo"
          width={400}
          height={100}
          priority
        />
        <h1 className="text-5xl font-bold mt-6 text-white">
          Seamless Mobility, Zero Legal Hassles.
        </h1>
        <p className="mt-4 text-xl text-white max-w-6xl">
          From compliance tracking to challan closure, accident support, and regulatory safeguards — everything your fleet and mobility needs to move forward.
        </p>
        <div className="flex gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
      </div>
      <p className="relative z-10 text-white w-full mx-auto mt-24 px-26 text-xl">
        LOTS247 is not just a legal solution; it is a mission-critical, technology-driven new SaaS (Service-as-a-Software) designed to eliminate roadside legal issues in real time. It ensures that vehicle owners and businesses never suffer financial, operational, or psychological distress due to legal entanglements. LOTS is a painkiller solution—an indispensable safety net for every vehicle on Indian roads.
      </p>
    </div>
  );
}

// Section 2: The Only Scalable & Dependable Legal-Tech Infrastructure
function LotsInfrastructure() {
  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-16">
          The Only Scalable & Dependable Legal-Tech Infrastructure
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="border border-gray-800 rounded-lg p-6 bg-transparent">
            <p className="text-lg text-gray-400">Layer 1</p>
            <h3 className="text-4xl font-bold mt-1">24×7 On-Call Resolution</h3>
            <Image src="/sticker1.png" alt="On-Call Resolution" width={300} height={300} className="mx-auto my-6"/>
            <p className="text-gray-300 text-xl">Talk to a lawyer instantly: A tech-driven, <span className="text-[#22D2EE]">round-the-clock legal safety</span> net that immediately tackles roadside issues before they spiral, backed by in-house Lawyers.</p>
          </div>
          {/* Card 2 */}
          <div className="border border-gray-800 rounded-lg p-6 bg-transparent">
            <p className="text-lg text-gray-400">Layer 2</p>
            <h3 className="text-4xl font-bold mt-1">On-Site Deployment</h3>
            <Image src="/sticker2.png" alt="On-Site Deployment" width={300} height={300} className="mx-auto my-6"/>
            <p className="text-gray-300 text-xl">A lawyer at your location in 2 hours: Nationwide Network of <span className="text-[#22D2EE]">75K+ Lawyers across 98% of pin codes,</span> ensuring a 2-hour on-site deployment anytime, anywhere.</p>
          </div>
          {/* Card 3 */}
          <div className="border border-gray-800 rounded-lg p-6 bg-transparent">
            <p className="text-lg text-gray-400">Layer 3</p>
            <h3 className="text-4xl font-bold mt-1">Challans & RTO-as-a-Service</h3>
            <Image src="/sticker3.png" alt="Challans & RTO Service" width={400} height={400} className="mx-auto my-6"/>
            <ul className="text-gray-300 space-y-4 text-xl">
              <li><span className="text-[#22D2EE]">Advanced Live Challan Dashboard –</span> A real-time, centralized dashboard for tracking traffic violations across multiple vehicles.</li>
              <li><span className="text-[#22D2EE]">RC & Vehicle Insight API Access –</span> Ownership, hypothecation, blacklist, fitness, and pollution check in real-time.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 3: Drive Ahead Without Legal Worries! (Pricing)
function LotsPricing() {
    const features = ["Number of Vehicles", "24/7 On-Call Resolution", "On-Site Legal Resolution", "Challan-as-a-Serivce", "Online Lok Adalat Court", "RTO-as-a-Serivce", "Dashboard Access", "No.of Users", "Automated Report", "Persoanlized Reports", "Incident Update via WhatsApp", "Add-Ons", "Value-Added Services", "Dedicated Account Manager", "Bulk Challan Resolution", "API Integration"];
    
    // Added background colors to the plan data
    const plans = [
        { name: "U Drive", logo: "/Udrive.png", bgColor: "bg-[#06B6D4]", values: ["1", "Pay Per Use", "Pay Per Use", "INR 79", "INR 1000", "Pay Per Use", false, false, false, false, false, "Pay Per Use", "Pay Per Use", false, false, false] },
        { name: "B Safe", logo: "/Bsafe.png", bgColor: "bg-[#00B876]", values: ["Unlimited", true, "Pay Per Use", "INR 49", "INR 1000", "Pay Per Use", true, "3", true, true, true, "Pay Per Use", "Pay Per Use", false, false, false] },
        { name: "V Care", logo: "/Vcare.png", topSeller: true, bgColor: "bg-[#FF9100]", values: ["Unlimited", true, "Pay Per Use", "INR 39", "As per Add-on B2", "Pay Per Use", true, "10", true, true, true, "B1,B2,B3#", "Worth 20K", true, true, true] }
    ];

  return (
    <div className="py-24 px-4 md:px-26 relative bg-[url('/sketch.png')] bg-no-repeat bg-[length:110%_auto] bg-[center_top_10rem]">
        <div className="absolute inset-0 bg-brand-dark/95"></div>
        <div className="max-w-8xl mx-auto relative z-10">
            <h2 className="text-5xl font-bold text-center">Drive Ahead Without Legal Worries!</h2>
            <p className="text-gray-300 text-center text-lg mt-2">Choose the right package to keep your fleet running smoothly</p>
            
            <div className="mt-16 flex gap-4">
                {/* Features Column */}
                <div className="w-1/4">
                    {/* This div is structured to align with the plan columns */}
                    <div className="rounded-xl flex flex-col gap-4">
                        <div className="h-24 flex items-end justify-center relative z-10">
                            <Image src="/sticker4.png" alt="Sticker" width={250} height={250}/>
                        </div>
                        <div className="p-4 space-y-4 bg-white rounded-lg flex flex-col">
                            {features.map(f => <p key={f} className="h-12 flex items-center text-lg text-black border-b border-black/10 last:border-b-0">{f}</p>)}
                        </div>
                    </div>
                </div>

                {/* Plans Columns */}
                <div className="w-3/4 grid grid-cols-3 gap-4">
                    {plans.map(plan => (
                        // rounded-xl and overflow-hidden create the container effect
                        <div key={plan.name} className="rounded-xl relative overflow-hidden flex flex-col gap-4">
                            {plan.topSeller && <div className="absolute top-0 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-b-md z-10">TOP SELLER</div>}
                            
                            {/* Header with background color */}
                            <div className={`h-24 rounded-lg flex items-center justify-center ${plan.bgColor}`}>
                                <Image src={plan.logo} alt={`${plan.name} logo`} width={180} height={60}/>
                            </div>

                            {/* Content with dividers */}
                            <div className="p-4 space-y-4 bg-white rounded-t-lg">
                                {plan.values.map((val, idx) => (
                                    <div key={idx} className="h-12 flex items-center justify-center text-lg text-center border-b border-black/10 last:border-b-0">
                                        {val === true ? <Check className="text-green-400"/> : val === false ? <X className="text-red-400"/> : <p className="text-black">{val}</p>}
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
          <p className="text-gray-200 text-lg">
            To know more about <span className="text-[#22D2EE]">Add-Ons for Business Packages</span>, fill out the form and our executive will contact you.
          </p>
          <form className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Company Name" className="col-span-2 md:col-span-1 bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"/>
            <input type="text" placeholder="Mobile No." className="col-span-2 md:col-span-1 bg-gray-800/50 border border-gray-700 rounded-md p-3 placeholder-gray-500"/>
            <select className="col-span-2 bg-gray-800/50 border border-gray-700 rounded-md p-3 text-gray-500">
              <option>No. of Vehicles</option>
            </select>
            <button type="submit" className="col-span-2 mt-2 bg-[#0891B2] text-white py-3 rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}


// Section 5: Comprehensive Legal Coverage for Fleets
function LotsCoverage() {
    const stats = [
        { icon: <Truck />, text: <><span className="text-[#22D2EE]">Over 800+ logistics partners onboarded,</span> expanding reach across the transport industry.</> },
        { icon: <Scale />, text: <><span className="text-[#22D2EE]">Providing legal assistance</span> to 600K+ private and commercial vehicles.</> },
        { icon: <MapPin />, text: <><span className="text-[#22D2EE]">Over 200K+ Roadside Legal Cases</span> successfully handled.</> },
        { icon: <Check />, text: <><span className="text-[#22D2EE]">150K+ challans resolved,</span> saving customers over ₹50Cr+ in penalties and legal fees.</> }
    ];
  return (
    <div className="py-24 px-4 md:px-26 max-w-8xl">
      <div className="mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-16">
          Comprehensive Legal Coverage for Fleets
        </h2>
        <div className="grid md:grid-cols-4 gap-18">
            {stats.map((stat, i) => (
                <div key={i} className="border border-gray-600 p-6 flex flex-col">
                    <div className="text-gray-400 mb-4">{stat.icon}</div>
                    <p className="text-gray-300 text-xl pb-32">{stat.text}</p>
                </div>
            ))}
        </div>
        <div className="mt-24 relative rounded-lg overflow-hidden text-center p-16 flex flex-col items-center justify-center">
            <Image src="/road-forest.jpg" alt="Road in a forest" layout="fill" className="object-cover z-0 opacity-30"/>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative z-20">
                <h3 className="text-3xl text-white">Connect with us to know more at</h3>
                <a href="mailto:Sales@lawyered.in" className="inline-block mt-6 bg-[#0891B2] text-white font-bold text-2xl px-12 py-4">Sales@lawyered.in</a>
            </div>
        </div>
      </div>
    </div>
  );
}

// A helper Link component for reusable styling
// const Link = ({ href, children }: { href: string, children: React.ReactNode }) => (
//     <a href={href} className="text-brand-cyan hover:underline">{children}</a>
// );


// Assembling the page
export default function Lots247Page() {
  return (
    <>
      <LotsHero />
      <LotsInfrastructure />
      <LotsPricing />
      <LotsForm />
      <LotsCoverage />
      <News/>
    </>
  );
}