import Image from "next/image";
import React from 'react';

export function VisionMission() {
  return (
    <div className="py-16 md:py-24 px-4 md:px-24 bg-brand-dark">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-2">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-semibold text-[#22D2EE] mb-6">Vision & Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg md:text-2xl">
            Lawyered attracts individuals seeking knowledge, empathetic support, and a belief in the power of expert guidance. Our teams, customers, partners and stakeholders value wisdom but also resonate with our ability to offer empathetic support, finding comfort in our practice of care. By presenting new ideas and fostering creativity, Lawyered continuously cultivates a sense of admiration and aspiration. Our culture is built on empathy and expertise. We are a collective of problem-solvers, innovators, and guides, united by a shared commitment to empower our stakeholders. We believe in the transformative power of knowledge and the positive impact of compassionate support.
          </p>
        </div>
        <div className="order-1 md:order-2 justify-self-center md:justify-self-end">
          <Image src="/vision-mission-img.png" alt="Cityscape" width={550} height={420} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}