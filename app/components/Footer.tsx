"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function Footer() {
  const [hovered, setHovered] = useState('');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  return (
    <>
      <footer className="border-t border-gray-800 py-12 md:py-8  mt-2 lg:mt-22 px-4 md:px-26">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-8 text-black dark:text-white font-bold dark:font-normal justify-center md:justify-start">
          {/* Column 1: Info */}
          <div className="col-span-2 flex flex-col text-xs lg:text-sm items-center md:items-start text-center md:text-left justify-between">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src={theme === "dark" ? "/lawyered-logo.png" : "/lawyered-logo2.png"}
                alt="Lawyered Logo"
                width={theme === "dark" ? 280 : 120}
                height={theme === "dark" ? 100 : 45}
                className={theme === "dark" ? "md:-ml-6 w-64 h-auto" : "w-28 h-auto"}
              />
              <p className="mb-1 md:mb-0">Sproutech Solutions Private Limited</p>
              <p>India Accelerator Coworking, Lower Ground Floor, LG-007-02, MGF <br className="hidden md:block" />Metropolis Mall, MG Road, Gurugram, Haryana 122002</p>
            </div>
            <p className="text-center md:text-left mt-1 md:mt-0">T: 99-88-44-1033 E: info@lawyered.in</p>
          </div>
          
          {/* START: Wrapper for Links & Social Icons */}
          <div className="col-span-2 flex flex-col md:flex-row items-center md:items-start">
            
            {/* Column 2 & 3: Links */}
            {/* The class w-full was changed to w-fit here */}
            <div className="w-fit md:w-2/3 grid grid-cols-2 gap-16 md:gap-0 text-sm lg:mt-4">
              <div>
                <ul className="space-y-3 md:space-y-4">
                  <li><Link href="/" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">HOME</Link></li>
                  <li><Link href="/ceo-message" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">CEO&#39;S MESSAGE</Link></li>
                  <li><Link href="/lots-247" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">LOTS247</Link></li>
                  <li><Link href="/challan-pay" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">CHALLANPAY</Link></li>
                </ul>
              </div>
              <div>
                 <ul className="space-y-3 md:space-y-4">
                  <li><Link href="/about" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">ABOUT US</Link></li>
                  <li><Link href="/blogs" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">BLOGS</Link></li>
                  <li><Link href="/contact" className="text-black dark:text-white font-bold dark:font-normal hover:text-[#22D2EE] hover:font-bold">CONTACT US</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Column 4: Social */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start mt-8 lg:mt-4 lg:mr-18">
              <div className="flex justify-start items-start space-x-3 md:space-x-4">
                <a href="https://www.facebook.com/share/1FE5v6q9Vz/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered('facebook')} onMouseLeave={() => setHovered('')}>
                  <Image src={hovered === 'facebook' ? '/facebook4.png' : '/facebook3.png'} alt="Facebook" width={25} height={25} className="w-6 md:w-7 h-auto" />
                </a>
                <a href="https://www.instagram.com/lawyered.in" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered('instagram')} onMouseLeave={() => setHovered('')}>
                  <Image src={hovered === 'instagram' ? '/instagram4.png' : '/instagram3.png'} alt="Instagram" width={25} height={25} className="w-6 md:w-7 h-auto" />
                </a>
                <a href="https://www.linkedin.com/company/lawyered/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered('linkedin')} onMouseLeave={() => setHovered('')}>
                  <Image src={hovered === 'linkedin' ? '/linkedin4.png' : '/linkedin3.png'} alt="LinkedIn" width={25} height={25} className="w-6 md:w-7 h-auto" />
                </a>
                <a href="https://x.com/LawyeredIN" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered('twitter')} onMouseLeave={() => setHovered('')}>
                  <Image src={hovered === 'twitter' ? '/twitter5.png' : '/twitter3.png'} alt="Twitter" width={25} height={25} className="w-6 md:w-7 h-auto" />
                </a>
                <a className="" href="https://www.youtube.com/@LawyeredIN/videos" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered('youtube')} onMouseLeave={() => setHovered('')}>
                  <Image src={hovered === 'youtube' ? '/youtube6.png' : '/youtube5.png'} alt="YouTube" width={25} height={25} className="w-8 md:w-10 h-auto" />
                </a>
              </div>
            </div>

          </div>
          {/* END: Wrapper */}
          </div>
        </div>
      </footer>
      
      <div className="border-t border-gray-700 py-4 md:py-6 px-4 md:px-26">
        <p className="text-center text-black dark:text-white font-bold dark:font-normal text-sm md:text-base">
          © 2025 Lawyered. All Rights Reserved |{' '}
          <Link href="/privacy-policy" className="hover:text-[#22D2EE] hover:font-bold">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="/terms-and-conditions" className="hover:text-[#22D2EE] hover:font-bold">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </>
  );
}
