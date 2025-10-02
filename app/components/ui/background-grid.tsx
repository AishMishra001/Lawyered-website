"use client";
import React from "react";

export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-brand-dark bg-grid-white/[0.07] relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-brand-dark [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}