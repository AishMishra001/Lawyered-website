"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  "70,000+ lawyers Network",
  "600,000+ Vehicles covered",
  "200,000+ Legal matters resolved",
];

export function AboutHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 3000); // scrolls every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="relative w-1/2 h-1/2">
          <Image src="/Frame.png" alt="background frame" fill className="object-contain opacity-100 scale-135"/>
        </div>
      </div>
      <div className="relative px-4 md:px-26 z-10 max-w-8xl mx-auto py-56 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-4 pl-20">
          <h1 className="text-2xl md:text-5xl font-semibold text-white">About Us</h1>
          
          <div className="relative h-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute text-xl md:text-2xl text-gray-300 whitespace-nowrap"
              >
                {stats[index]}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
        <div className="flex justify-center">
          <Image src="/aboutus.png" alt="About Us Sticker" width={400} height={200} className="object-contain"/>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <div className="flex gap-2 mt-4">
            {stats.map((_, i) => (
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