"use client";
import React, { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface Advisor {
  name: string;
  title: string;
  img: string;
  linkedin: string;
  description: string;
}

const AdvisorModal = ({ advisor, onClose }: { advisor: Advisor; onClose: () => void }) => {
  const nameParts = advisor.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-3xl w-full border border-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          <Image src={advisor.img} alt={advisor.name} width={150} height={150} className="rounded-full flex-shrink-0"/>
          <div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                {firstName.toUpperCase()}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-[#22D2EE]">
                {lastName.toUpperCase()}
              </span>
            </div>
            <p className="text-lg md:text-xl text-gray-300 mt-2">{advisor.title}</p>
            <a href={advisor.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 border border-gray-600 px-4 py-2 rounded-lg text-xs md:text-sm text-gray-300 hover:bg-gray-700">
              <Linkedin size={16}/> LinkedIn
            </a>
          </div>
        </div>
        <div className="text-gray-400 space-y-4 text-xs md:text-sm leading-relaxed">
          <p>{advisor.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};


export function AdvisorsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 2000 })]);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  
  const advisors: Advisor[] = [
    //{ name: "Mudit Kumar", title: "Strategic Advisor", img: "/about100.png", linkedin: "#", description: "Dummy description for Pramod kumar singh." },
    { name: "Pramod kumar singh", title: "Advisor", img: "/about111.png", linkedin: "#", description: "Dummy description for Pramod kumar singh." },
    // { name: "Sandeep Dinodiya", title: "Technology Advisor", img: "/about11.png", linkedin: "#", description: "Dummy description for Sandeep Dinodiya." },
    // { name: "Mahavir Pratap Sharma", title: "Advisor", img: "/about12.png", linkedin: "#", description: "Dummy description for Mahavir Pratap Sharma." },
    { name: "Hon'ble Justice K. Kannan ( Rtd.)", title: "Advisor", img: "/about13.png", linkedin: "#", description: "Dummy description for Hon'ble Justice K. Kannan ( Rtd.)." },
    { name: "Anil Gupta", title: "Advisor", img: "/about14.png", linkedin: "#", description: "Dummy description for Anil Gupta." },
    // { name: "Amandeep Singh", title: "Advisors", img: "/about15.png", linkedin: "#", description: "Dummy description for Amandeep Singh." },
    { name: "Mahendra Arya", title: "Advisor", img: "/about16.png", linkedin: "#", description: "Dummy description for Mahendra Arya." },
    { name: "Abhishek Gupta", title: "Advisor", img: "/about17.png", linkedin: "#", description: "Dummy description for Abhishek Gupta." },
    { name: "Manish Raj Singhania", title: "Advisor", img: "/about18.png", linkedin: "#", description: "Dummy description for Manish Raj Singhania." },
    { name: "Saharsh Damani", title: "Mentor", img: "/about19.png", linkedin: "#", description: "Dummy description for Saharsh Damani." },
    { name: "KK Agarwal", title: "Advisor", img: "/about20.png", linkedin: "#", description: "Dummy description for KK Agarwal." },
    // { name: "Sarabjeet Singh Waraich", title: "Advisor", img: "/about21.png", linkedin: "#", description: "Dummy description for Sarabjeet Singh Waraich." },
    { name: "Munish Bhatia", title: "Advisor", img: "/about22.png", linkedin: "#", description: "Dummy description for Munish Bhatia." },
    { name: "Mona Singh", title: "Advisor", img: "/about23.png", linkedin: "#", description: "Dummy description for Mona Singh." },
    { name: "Deepak Sharma", title: "Mentor", img: "/about3.png", linkedin: "https://www.linkedin.com/in/deepak-sharma-21617622/", description: "Deepak's passion for technology and innovation has led him to work with Fortune 500 companies, venture-backed startups, and many others across the globe. Deepak has a global perspective on Agile and Lean practices, product discovery techniques, design thinking, DevOps processes and more. Deepak's goal is to help organizations become more efficient and able to quickly adapt to change in order to survive in today's fast-paced world." },
    // { name: "Deepak Nagpal", title: "Acceleration Partner", img: "/about24.png", linkedin: "#", description: "Dummy description for Deepak Nagpal." },
    // { name: "Arindam Mukhopadyay", title: "Advisor", img: "/about25.png", linkedin: "#", description: "Dummy description for Arindam Mukhopadyay." },
    // { name: "John Thomas", title: "Strategic Partner", img: "/about26.png", linkedin: "#", description: "Dummy description for John Thomas." },
  ];

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="py-2 md:py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan text-center md:text-left">Our Advisors</h2>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-2 border border-gray-700 rounded-full hover:bg-white/10"><ArrowLeft size={20}/></button>
            <button onClick={scrollNext} className="p-2 border border-gray-700 rounded-full hover:bg-white/10"><ArrowRight size={20}/></button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {advisors.map((advisor, i) => (
              <div key={i} className="flex-shrink-0 flex-grow-0 basis-1/2 md:basis-1/3 lg:basis-1/5 text-center px-4 cursor-pointer">
                <Image src={advisor.img} alt={advisor.name} width={200} height={200} className="rounded-full mx-auto"/>
                <h3 className="text-base md:text-lg font-bold text-white mt-4">{advisor.name}</h3>
                <p className="text-xs md:text-sm text-gray-400">{advisor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedAdvisor && <AdvisorModal advisor={selectedAdvisor} onClose={() => setSelectedAdvisor(null)} />}
      </AnimatePresence>
    </div>
  );
}
