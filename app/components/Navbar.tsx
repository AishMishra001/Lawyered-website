// app/components/Navbar.tsx

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const navLinksLeft = [
    { href: "/ceo-message", label: "CEO'S MESSAGE" },
    { href: "/lots-247", label: "LOTS247" },
    { href: "/challan-pay", label: "CHALLANPAY" },
  ];
  const navLinksRight = [
    { href: "#", label: "ABOUT US" },
    { href: "#", label: "BLOGS" },
    { href: "#", label: "CONTACT US" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 group bg-[#14141A]">
      <nav className="w-full py-5 px-4 md:px-8">
        <div className="w-full flex justify-center items-center gap-22"> {/* Increased gap */}
          
          {/* Left Links */}
          {navLinksLeft.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-300 text-lg font-normal uppercase tracking-wider hover:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Increased font size and adjusted weight
            >
              {link.label}
            </Link>
          ))}

          {/* Centered & Enlarged Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/lawyered-logo.png" 
                alt="Lawyered Logo" 
                width={450} // Increased logo width
                height={75} // Adjusted height for proportion
                priority 
              />
            </Link>
          </div>

          {/* Right Links */}
          {navLinksRight.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-300 text-lg font-normal uppercase tracking-wider hover:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Increased font size and adjusted weight
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}