// app/components/Platforms.tsx

import Image from "next/image";

export function Platforms() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <Image
          src="/Frame2.png"
          alt="Background Frame"
          width={1000}
          height={1000}
          className="object-contain translate-y-20"
        />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold mb-4" style={{ color: '#22D2EE' }}>
            Platforms
          </h2>
          <p className="text-gray-300 max-w-4xl leading-relaxed">
            India&apos;s mobility sector is a key industry comprising commercial
            fleet operators, logistics providers, ride-hailing services, and
            private vehicle owners... The legal complexities in this sector are
            vast and often result in operational disruptions, financial losses,
            and compliance risks.
          </p>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {/* LOTS 247 Card */}
            <div className="flex flex-col gap-6">
              <div className="h-20"> 
                <Image
                  src="/lots-247-logo.png"
                  alt="LOTS 247 Logo"
                  width={200}
                  height={50}
                />
              </div>
              {/* NOTE: I am removing the mb-6 from the paragraph, as gap-6 already handles the spacing */}
              <p className="text-gray-300">
                LOTS247 is not just a legal solution; it is a mission-critical,
                technology-driven new SaaS (Service-as-a-Software) designed to
                eliminate roadside legal issues in real time- India&apos;s first
                road side legal assistance platform.
              </p>
              <button className="mt-auto border border-gray-600 text-white py-2 px-6 rounded-lg hover:bg-white/10 transition-colors w-fit">
                Read More
              </button>
            </div>

            {/* ChallanPay Card */}
            {/* THE FIX: Added "gap-6" here to match the column above */}
            <div className="flex flex-col gap-6">
              <div className="h-20">
                <Image
                  src="/challanpay-logo.png"
                  alt="ChallanPay Logo"
                  width={200}
                  height={50}
                />
              </div>
              {/* NOTE: I am removing the mb-6 from the paragraph, as gap-6 already handles the spacing */}
              <p className="text-gray-300">
                ChallanPay is India&apos;s first unified platform for discovering,
                resolving, and tracking traffic challans across all states and
                enforcement authorities.
              </p>
              <button className="mt-auto border border-gray-600 text-white py-2 px-6 rounded-lg hover:bg-white/10 transition-colors w-fit">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}