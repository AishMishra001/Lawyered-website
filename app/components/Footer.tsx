import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-16 px-4 md:px-26">
      <div className="max-w-8xl mx-auto grid md:grid-cols-4 gap-8 text-gray-400">
        {/* Column 1: Info */}
        <div className="col-span-1 flex flex-col items-start">
          <Image src="/lawyered-logo.png" alt="Lawyered Logo" width={270} height={95} className="-ml-6" />
          <p className="text-sm">Sproutech Solutions Private Limited</p>
          <p className="text-sm mt-2">India Accelerator Coworking, Lower Ground Floor, LG-007-02, MGF Metropolis Mall, MG Road, Gurugram, Haryana 122002</p>
          <p className="text-sm mt-4">T: 99-88-44-1033 E: info@lawyered.in</p>
        </div>

        {/* Column 2 & 3: Links */}
        <div className="col-span-1 md:col-start-3 grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">HOME</Link></li>
              <li><Link href="#" className="hover:text-white">CEO&apos;S MESSAGE</Link></li>
              <li><Link href="#" className="hover:text-white">LOTS 247</Link></li>
              <li><Link href="#" className="hover:text-white">CHALLANPAY</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
             <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">ABOUT US</Link></li>
              <li><Link href="#" className="hover:text-white">BLOGS</Link></li>
              <li><Link href="#" className="hover:text-white">CONTACT US</Link></li>
            </ul>
          </div>
        </div>

        {/* Column 4: Social */}
        <div className="col-span-1">
          <div className="flex space-x-4">
            <Link href="#"><Facebook size={20} className="hover:text-white" /></Link>
            <Link href="#"><Instagram size={20} className="hover:text-white" /></Link>
            <Link href="#"><Linkedin size={20} className="hover:text-white" /></Link>
            <Link href="#"><Twitter size={20} className="hover:text-white" /></Link>
            <Link href="#"><Youtube size={20} className="hover:text-white" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}