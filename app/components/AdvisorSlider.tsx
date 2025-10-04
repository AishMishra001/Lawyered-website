"use client";
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function AdvisorsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const advisors = [
    { name: "Pramod kumar singh", title: "Advisor", img: "/about10.png" },
    { name: "Sandeep Dinodiya", title: "Technology Advisor", img: "/about11.png" },
    { name: "Mahavir Pratap Sharma", title: "Advisor", img: "/about12.png" },
    { name: "Hon'ble Justice K. Kannan ( Rtd.)", title: "Advisor", img: "/about13.png" },
    { name: "Anil Gupta", title: "Advisor", img: "/about14.png" },
    { name: "Amandeep Singh", title: "Advisors", img: "/about15.png" },
    { name: "Mahendra Arya", title: "Advisor", img: "/about16.png" },
    { name: "Abhishek Gupta", title: "Advisor", img: "/about17.png" },
    { name: "Manish Raj Singhania", title: "Advisor", img: "/about18.png" },
    { name: "Saharsh Damani", title: "Mentor", img: "/about19.png" },
    { name: "KK Agarwal", title: "Advisor", img: "/about20.png" },
    { name: "Sarabjeet Singh Waraich", title: "Advisor", img: "/about21.png" },
    { name: "Munish Bhatia", title: "Acceleration Partner", img: "/about22.png" },
    { name: "Mona Singh", title: "Acceleration Partner", img: "/about23.png" },
    { name: "Deepak Nagpal", title: "Acceleration Partner", img: "/about24.png" },
    { name: "Arindam Mukhopadyay", title: "Advisor", img: "/about25.png" },
    { name: "John Thomas", title: "Strategic Partner", img: "/about26.png" },
  ];

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="py-24 px-4 md:px-26">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-brand-cyan">Our Advisors</h2>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-2 border border-gray-700 rounded-full hover:bg-white/10"><ArrowLeft size={20}/></button>
            <button onClick={scrollNext} className="p-2 border border-gray-700 rounded-full hover:bg-white/10"><ArrowRight size={20}/></button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {advisors.map((advisor, i) => (
              <div key={i} className="flex-shrink-0 flex-grow-0 basis-1/5 text-center px-4">
                <Image src={advisor.img} alt={advisor.name} width={200} height={200} className="rounded-full mx-auto"/>
                <h3 className="text-lg font-bold text-white mt-4">{advisor.name}</h3>
                <p className="text-sm text-gray-400">{advisor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}