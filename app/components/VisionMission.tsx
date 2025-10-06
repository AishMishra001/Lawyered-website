import Image from "next/image";
import React from 'react';

export function VisionMission() {
  return (
    <div className="py-16 md:py-24 px-4 md:px-24 bg-brand-dark">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-2">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#22D2EE] mb-6">Vision & Mission</h2>
          <p className="text-gray-300 leading-relaxed text-base">
           Our mission is to build India’s first Gen AI-powered Legal Risk Management platform for mobility. We are creating the legal infrastructure that keeps vehicles, fleets, and businesses compliant and protected—resolving risks before they disrupt lives or operations. By making compliance proactive, we reduce financial strain, prevent downtime, and give both individuals and enterprises the confidence to move forward without legal uncertainty.
Our vision is to extend this framework beyond mobility into every sector where recurring legal risks hold people and businesses back. From finance and real estate to healthcare and e-commerce, we aim to embed legal infrastructure directly into everyday operations. Lawyered is not just making legal help more accessible—we are redefining how law is practiced and experienced in India. Affordable, preventive, and always-on legal solutions will become the default, setting a new benchmark for trust, efficiency, and ease of use.
          </p>
        </div>
        <div className="order-1 md:order-2 justify-self-center md:justify-self-end">
          <Image src="/vision-mission-img.png" alt="Cityscape" width={500} height={400} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}