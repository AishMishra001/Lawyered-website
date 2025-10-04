"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const navLinksLeft = [
    { href: "/ceo-message", label: "CEO'S MESSAGE" },
    { href: "/lots-247", label: "LOTS247" },
    { href: "/challan-pay", label: "CHALLANPAY" },
  ];
  const navLinksRight = [
    { href: "/about-us", label: "ABOUT US" },
    { href: "/blogs", label: "BLOGS" },
    { href: "/contact-us", label: "CONTACT US" },
  ];

  const allLinks = [...navLinksLeft, ...navLinksRight];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setHasMouseMoved(true);
      window.removeEventListener("mousemove", handleMouseMove);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-[#14141A]"
    >
      <nav className="w-full py-5 px-4 md:px-8">
        {/* Desktop Menu */}
        <div className="hidden md:flex w-full justify-center items-center gap-12">
          {navLinksLeft.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-gray-300 text-lg font-normal uppercase tracking-wider hover:text-white whitespace-nowrap transition-opacity duration-300 ${
                hasMouseMoved ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/lawyered-logo.png"
                alt="Lawyered Logo"
                width={300}
                height={50}
                priority
              />
            </Link>
          </div>
          {navLinksRight.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-gray-300 text-lg font-normal uppercase tracking-wider hover:text-white whitespace-nowrap transition-opacity duration-300 ${
                hasMouseMoved ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/lawyered-logo.png"
                alt="Lawyered Logo"
                width={200}
                height={35}
                priority
              />
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#14141A] absolute w-full">
          <div className="flex flex-col items-center px-4 pt-2 pb-8 space-y-4">
            {allLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 text-lg font-normal uppercase tracking-wider hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}