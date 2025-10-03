// app/components/Platforms.tsx

import Image from "next/image";
import Link from "next/link";
 
export function Platforms() {
  return (
    <div className="relative md:py-24 px-4 md:px-26">
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <Image
          src="/Frame2.png"
          alt="Background Frame"
          width={1000}
          height={1000}
          className="object-contain translate-y-20"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-8xl">
          <h2 className="text-6xl font-semibold mb-4" style={{ color: '#22D2EE' }}>
            Platforms
          </h2>
          <p className="text-gray-300 max-w-8xl text-xl leading-relaxed">
         India’s mobility sector is a key industry comprising commercial fleet operators, logistics providers, ride-hailing services, and private vehicle owners, the public VAHAN dashboard displaying roughly 40.24 crore total vehicle registrations (and growing). The legal complexities in this sector are vast and often result in operational disruptions, financial losses, and compliance risks. A combination of stringent regulations, fragmented enforcement policies, and a growing number of vehicles on the road has intensified the legal challenges faced by stakeholders in this space.
          </p>

          <div className="mt-16 grid md:grid-cols-2">
            {/* LOTS 247 Card */}
            <div className="flex flex-col items-center gap-6">
              <div className="h-20"> 
                <Image
                  src="/lots-247-logo.png"
                  alt="LOTS 247 Logo"
                  width={200}
                  height={50}
                />
              </div>
              {/* NOTE: I am removing the mb-6 from the paragraph, as gap-6 already handles the spacing */}
              <p className="text-gray-300 text-xl max-w-lg">
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
            {/* THE FIX: Added "gap-6" here to match the column above */}
            <div className="flex flex-col items-center gap-6">
              <div className="h-20">
                <Image
                  src="/challanpay-logo.png"
                  alt="ChallanPay Logo"
                  width={200}
                  height={50}
                />
              </div>
              {/* NOTE: I am removing the mb-6 from the paragraph, as gap-6 already handles the spacing */}
              <p className="text-gray-300 text-xl max-w-lg">
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