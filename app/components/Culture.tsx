"use client";
import Image from "next/image";
import React, { useState } from "react";

export function Culture() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-16 md:py-24 px-4 md:px-24 bg-brand-dark">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-2">
        <div
          className="order-2 md:order-1 justify-self-center md:justify-self-start overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? "/culture2.png" : "/culture1.png"}
            alt="Team collaborating"
            width={400}
            height={300}
            className={`transition-transform duration-300 ease-in-out ${
              isHovered ? "scale-100" : "scale-110"
            }`}
          />
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#22D2EE] mb-6">Culture</h2>
          <p className="text-gray-300 leading-relaxed text-base">
            Lawyered attracts individuals seeking knowledge, empathetic support, and a belief in the power of expert guidance. Our teams, customers, partners and stakeholders value wisdom but also resonate with our ability to offer empathetic support, finding comfort in our practice of care. By presenting new ideas and fostering creativity, Lawyered continuously cultivates a sense of admiration and aspiration. Our culture is built on empathy and expertise. We are a collective of problem-solvers, innovators, and guides, united by a shared commitment to empower our stakeholders. We believe in the transformative power of knowledge and the positive impact of compassionate support.
          </p>
        </div>
      </div>
    </div>
  );
}