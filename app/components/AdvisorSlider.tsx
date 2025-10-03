"use client";
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function AdvisorsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const advisors = Array.from({ length: 17 }, (_, i) => ({
    name: `Advisor Name ${i + 1}`,
    title: i % 2 === 0 ? "Advisor" : "Technology Advisor",
    img: `/about${10 + i}.png`,
  }));

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