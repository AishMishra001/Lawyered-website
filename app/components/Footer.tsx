"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [hovered, setHovered] = useState('');

  return (
    <>
      <footer className="border-t border-gray-800 py-16 px-4 md:px-26">
        <div className="max-w-8xl mx-auto grid md:grid-cols-4 gap-8 text-white">
          {/* Column 1: Info */}
          <div className="col-span-2 flex flex-col text-base items-start">
            <Image src="/lawyered-logo.png" alt="Lawyered Logo" width={280} height={100} className="-ml-6" />
            <p >Sproutech Solutions Private Limited</p>
            <p >India Accelerator Coworking, Lower Ground Floor, LG-007-02, MGF <br />Metropolis Mall, MG Road, Gurugram, Haryana 122002</p>
            <p >T: 99-88-44-1033 E: info@lawyered.in</p>
          </div>

          {/* Column 2 & 3: Links */}
          <div className="col-span-1 grid grid-cols-2 gap-8 text-sm">
            <div>
              <ul className="space-y-4">
                <li><Link href="#" className="text-white hover:text-[#22D2EE] hover:font-bold">HOME</Link></li>
                <li><Link href="/ceo-message" className="text-white hover:text-[#22D2EE] hover:font-bold">CEO&apos;S MESSAGE</Link></li>
                <li><Link href="/lots-247" className="text-white hover:text-[#22D2EE] hover:font-bold">LOTS247</Link></li>
                <li><Link href="/challan-pay" className="text-white hover:text-[#22D2EE] hover:font-bold">CHALLANPAY</Link></li>
              </ul>
            </div>
            <div>
               <ul className="space-y-4">
                <li><Link href="/about-us" className="text-white hover:text-[#22D2EE] hover:font-bold">ABOUT US</Link></li>
                <li><Link href="/blogs" className="text-white hover:text-[#22D2EE] hover:font-bold">BLOGS</Link></li>
                <li><Link href="/contact-us" className="text-white hover:text-[#22D2EE] hover:font-bold">CONTACT US</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="col-span-1">
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/1FE5v6q9Vz/" onMouseEnter={() => setHovered('facebook')} onMouseLeave={() => setHovered('')}>
                <Image src={hovered === 'facebook' ? '/facebook2.png' : '/facebook.png'} alt="Facebook" width={25} height={25} />
              </Link>
              <Link href="https://www.instagram.com/lawyered.in" onMouseEnter={() => setHovered('instagram')} onMouseLeave={() => setHovered('')}>
                <Image src={hovered === 'instagram' ? '/Instagram2.png' : '/Instagram.png'} alt="Instagram" width={25} height={25} />
              </Link>
              <Link href="https://www.linkedin.com/company/lawyered/" onMouseEnter={() => setHovered('linkedin')} onMouseLeave={() => setHovered('')}>
                <Image src={hovered === 'linkedin' ? '/Linkedin2.png' : '/Linkedin.png'} alt="LinkedIn" width={25} height={25} />
              </Link>
              <Link href="https://x.com/LawyeredIN" onMouseEnter={() => setHovered('twitter')} onMouseLeave={() => setHovered('')}>
                <Image src={hovered === 'twitter' ? '/twitter2.png' : '/twitter.png'} alt="Twitter" width={25} height={25} />
              </Link>
              <Link href="https://www.youtube.com/@LawyeredIN/videos" onMouseEnter={() => setHovered('youtube')} onMouseLeave={() => setHovered('')}>
                <Image src={hovered === 'youtube' ? '/youtube2.png' : '/youtube.png'} alt="YouTube" width={25} height={25} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="border-t border-gray-700 py-6 px-4 md:px-26">
        <p className="text-center text-white text-base">
          © 2025 Lawyered. All Rights Reserved |{' '}
          <Link href="/privacy-policy" className="hover:text-[#22D2EE] hover:font-bold">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="/terms-and-conditions" className="hover:text-[#22D2EE] hover:font-bold">
            Terms
          </Link>
        </p>
      </div>
    </>
  );
}