"use client"
// app/reward-Bot/page.tsx
import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"

const RewardBot = () => {
  const [imageSize, setImageSize] = useState(200);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) { // Small mobile screens
        setImageSize(220);
      } else if (window.innerWidth < 768) { // Larger mobile screens
        setImageSize(230);
      } else if (window.innerWidth < 1024) { // Tablets
        setImageSize(240);
      } else if (window.innerWidth < 1280) { // Small laptops
        setImageSize(250);
      } else { // Desktops and larger screens
        setImageSize(300);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleRedirect = () => {
    window.open('https://www.challanpay.in/', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <Image src="/reward.png" alt="Reward" width={imageSize} height={imageSize} className="cursor-pointer" onClick={handleRedirect} />
    </div>
  )
}

export default RewardBot
