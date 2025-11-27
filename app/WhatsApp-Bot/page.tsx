"use client"
// app/WhatsApp-Bot/page.tsx
import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useMobileMenu } from "@/app/contexts/MobileMenuContext"

const WhatsAppBot = () => {
  const { isMenuOpen } = useMobileMenu()
  const [imageSize, setImageSize] = useState(200);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) { // Small mobile screens
        setImageSize(140);
      } else if (window.innerWidth < 768) { // Larger mobile screens
        setImageSize(160);
      } else if (window.innerWidth < 1024) { // Tablets
        setImageSize(180);
      } else if (window.innerWidth < 1280) { // Small laptops
        setImageSize(190);
      } else { // Desktops and larger screens
        setImageSize(200);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleChat = () => {
    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=919289928628&text=Company+Name%3A+%0ANumber+of+Vehicles%3A+&type=phone_number&app_absent=0';
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMenuOpen ? 'hidden' : 'block'} md:block`}>
        <Image src="/whatsapp5.png" alt="WhatsApp" width={imageSize} height={imageSize} className="cursor-pointer" onClick={handleChat} />
    </div>
  )
}

export default WhatsAppBot