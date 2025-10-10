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
    <header className="fixed top-0 left-0 w-full z-50 bg-[#14141A]">
      <nav className="relative w-full py-5 px-4 md:px-8">
        {/* Desktop Menu */}
        <div className="hidden md:flex w-full justify-center items-center gap-12">
          {navLinksLeft.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-white text-lg font-normal uppercase tracking-wider hover:text-[#22D2EE] hover:font-bold whitespace-nowrap transition-opacity duration-300 ${
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
              className={`text-white text-lg font-normal uppercase tracking-wider hover:text-[#22D2EE] hover:font-bold whitespace-nowrap transition-opacity duration-300 ${
                hasMouseMoved ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet Menu Bar - STABLE */}
        <div className="md:hidden lg:hidden flex justify-between items-center w-full">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/lawyered-logo.png"
                alt="Lawyered Logo"
                width={180}
                height={32}
                priority
                className="w-32 sm:w-40"
              />
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none p-2 z-50 relative"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
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

      {/* Mobile & Tablet Full Screen Menu Below Navbar */}
      {isMenuOpen && (
        <div className="md:hidden lg:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#14141A] z-30">
          <div className="flex flex-col justify-center items-center h-full px-6 py-8">
            <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
              {allLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white text-xl sm:text-2xl font-normal uppercase tracking-wider hover:text-[#22D2EE] transition-colors duration-200 w-full text-center py-3"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.5s ease forwards'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </header>
  );
}
