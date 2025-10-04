import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="absolute inset-0 z-10 hidden md:flex justify-start items-center">
        <div className="relative w-7/12 h-full rotate-180">
          <Image
            src="/Frame.png"
            alt="Background Frame"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Main content container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 gap-4 pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-semibold text-white leading-tight max-w-7xl mx-auto">
          Identifying & Resolving Recurring <br />
          Legal Risk For Mobility
        </h1>
        <p className="mt-4 text-lg md:text-3xl text-gray-300 max-w-3xl mx-auto">
          Innovating & Building Scalable Technology Platforms
        </p>

        <div className="w-full max-w-7xl mt-8 md:mt-16">
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-5">
            <Image
              src="/founder-photo.png"
              alt="Himanshu Gupta, Founder & CEO"
              width={150}
              height={150}
              className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <div className="text-center md:text-left flex flex-col justify-between">

              <div>

              <p className="text-white text-base md:text-lg">
                A note from our founder & CEO,
              </p>
              <p className="text-white font-bold text-base md:text-lg">
                Himanshu Gupta
              </p>
              </div>
              <Link
                href="/ceo-message"
                className="text-white underline block text-sm md:text-lg hover:underline pt-14 font-semibold"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}