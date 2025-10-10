"use client";
import Image from "next/image";
import React, { useState } from 'react';

export function VisionMission() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-16 md:py-24 px-4 md:px-24 bg-brand-dark">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-2">
        {/* Mobile: Heading */}
        <div className="order-1 md:hidden text-center">
          <h2 className="text-2xl font-semibold text-[#22D2EE] mb-6">Vision & Mission</h2>
        </div>
        {/* Mobile: Image */}
        <div
          className="order-2 md:hidden justify-self-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? "/vision9.png" : "/vision8.png"}
            alt="Cityscape"
            width={450}
            height={350}
            className=""
          />
        </div>
        {/* Mobile: Content */}
        <div className="order-3 md:hidden text-center">
          <p className="text-gray-300 leading-relaxed text-base">
           Our mission is to build India’s first Gen AI-powered Legal Risk Management platform for mobility. We are creating the legal infrastructure that keeps vehicles, fleets, and businesses compliant and protected—resolving risks before they disrupt lives or operations. By making compliance proactive, we reduce financial strain, prevent downtime, and give both individuals and enterprises the confidence to move forward without legal uncertainty.
Our vision is to extend this framework beyond mobility into every sector where recurring legal risks hold people and businesses back. From finance and real estate to healthcare and e-commerce, we aim to embed legal infrastructure directly into everyday operations. Lawyered is not just making legal help more accessible—we are redefining how law is practiced and experienced in India. Affordable, preventive, and always-on legal solutions will become the default, setting a new benchmark for trust, efficiency, and ease of use.
          </p>
        </div>
        {/* Desktop: Original combined content (hidden on mobile) */}
        <div className="hidden md:block md:order-1 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#22D2EE] mb-6">Vision & Mission</h2>
          <p className="text-gray-300 leading-relaxed text-base">
           Our mission is to build India’s first Gen AI-powered Legal Risk Management platform for mobility. We are creating the legal infrastructure that keeps vehicles, fleets, and businesses compliant and protected—resolving risks before they disrupt lives or operations. By making compliance proactive, we reduce financial strain, prevent downtime, and give both individuals and enterprises the confidence to move forward without legal uncertainty.
Our vision is to extend this framework beyond mobility into every sector where recurring legal risks hold people and businesses back. From finance and real estate to healthcare and e-commerce, we aim to embed legal infrastructure directly into everyday operations. Lawyered is not just making legal help more accessible—we are redefining how law is practiced and experienced in India. Affordable, preventive, and always-on legal solutions will become the default, setting a new benchmark for trust, efficiency, and ease of use.
          </p>
        </div>
        {/* Desktop: Image (hidden on mobile) */}
        <div
          className="hidden md:block md:order-2 justify-self-center md:justify-self-end"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? "/vision9.png" : "/vision8.png"}
            alt="Cityscape"
            width={450}
            height={350}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
