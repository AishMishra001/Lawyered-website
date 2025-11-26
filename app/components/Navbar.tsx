"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { ThemeSwitch } from "@/components/theme-switch"
import { useMobileMenu } from "@/app/contexts/MobileMenuContext"


export function Navbar() {
  const { resolvedTheme } = useTheme()
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu()
  const [mounted, setMounted] = useState(false)
  const [hasMouseMoved, setHasMouseMoved] = useState(false)
  const [navbarHeight, setNavbarHeight] = useState(80)
  const headerRef = useRef<HTMLElement>(null)

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Measure navbar height for mobile menu positioning
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (headerRef.current) {
        setNavbarHeight(headerRef.current.offsetHeight)
      }
    }
    updateNavbarHeight()
    window.addEventListener('resize', updateNavbarHeight)
    return () => window.removeEventListener('resize', updateNavbarHeight)
  }, [mounted, resolvedTheme])

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = () => {
      setHasMouseMoved(true)
      window.removeEventListener("mousemove", handleMouseMove)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#14141A] border-b-0">
        <nav className="relative w-full py-5 px-4 md:px-8 flex justify-center items-center">
          <div className="flex-shrink-0 h-[45px] flex items-center justify-center">
            <Image
              src="/lawyered-logo.png"
              alt="Lawyered Logo"
              width={270}
              height={45}
              priority
              className="object-contain"
            />
          </div>
        </nav>
      </header>
    )
  }

  // Determine logo properties based on resolved theme
  const logoSrc = resolvedTheme === "light" ? "/lawyered-logo2.png" : "/lawyered-logo.png"
  // Use different dimensions for light mode logo
  const logoWidth = resolvedTheme === "light" ? 240 : 270  // 70% of 270 for light mode
  const logoHeight = resolvedTheme === "light" ? 38 : 45   // Adjusted proportionally
  
  // Mobile logo dimensions - manually adjustable for light mode
  const mobileLogoWidth = resolvedTheme === "light" ? 122 : 180
  const mobileLogoHeight = resolvedTheme === "light" ? 28 : 32

  const navLinksLeft = [
    { href: "/ceo-message", label: "CEO'S MESSAGE" },
    { href: "/lots-247", label: "LOTS247" },
    { href: "/challan-pay", label: "CHALLANPAY" },
  ]
  const navLinksRight = [
    { href: "/about", label: "ABOUT US" },
    { href: "/blogs", label: "BLOGS" },
    { href: "/contact", label: "CONTACT US" },
  ]

  const allLinks = [...navLinksLeft, ...navLinksRight]

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#14141A] border-b border-gray-300 dark:border-b-0">
      <nav className="relative w-full py-5 px-4 md:px-8 flex justify-center items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex w-full justify-center items-center gap-12 relative">
          {navLinksLeft.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-black dark:text-white text-lg font-normal uppercase tracking-wider hover:text-[#00A2BB] dark:hover:text-[#22D2EE] hover:font-bold whitespace-nowrap transition-opacity duration-300 ${hasMouseMoved ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
              {link.label}
            </Link>
          ))}
        
          {/* Logo in center */}
          <div className="flex-shrink-0 h-[45px] w-[270px] flex items-center justify-center">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="Lawyered Logo"
                width={logoWidth}
                height={logoHeight}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {navLinksRight.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-black dark:text-white text-lg font-normal uppercase tracking-wider hover:text-[#00A2BB] dark:hover:text-[#22D2EE] hover:font-bold whitespace-nowrap transition-opacity duration-300 ${hasMouseMoved ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* ✅ Theme toggle button on the far right */}
          <div className={`absolute right-0 flex items-center transition-opacity duration-300 ${hasMouseMoved ? "opacity-100 visible" : "opacity-0 invisible"
            }`}>
            <ThemeSwitch />
          </div>

        </div>

        {/* Mobile & Tablet Menu Bar */}
        <div className="md:hidden lg:hidden relative flex justify-center items-center w-full">
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src={resolvedTheme === "light" ? "/lawyered-logo3.png" : "/lawyered-logo.png"}
                alt="Lawyered Logo"
                width={mobileLogoWidth}
                height={mobileLogoHeight}
                priority
                className={resolvedTheme === "light" ? "" : "w-32 sm:w-40"}
                style={resolvedTheme === "light" ? { width: `${mobileLogoWidth}px`, height: `${mobileLogoHeight}px` } : {}}
              />
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black dark:text-white focus:outline-none p-2 z-50 absolute right-4"
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

      {/* Mobile & Tablet Full Screen Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden lg:hidden fixed left-0 w-full bg-background z-30"
          style={{
            top: `${navbarHeight}px`,
            height: `calc(100vh - ${navbarHeight}px)`
          }}
        >
          <div className="flex flex-col justify-start items-center h-full px-6 pt-8 pb-8">
            <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
              {allLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-black dark:text-white text-xl sm:text-2xl font-normal uppercase tracking-wider hover:text-[#00A2BB] dark:hover:text-[#22D2EE] transition-colors duration-200 w-full text-center py-3"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.5s ease forwards",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* ✅ Optional: Add theme toggle in mobile menu too */}
            <div className="mt-8">
              <ThemeSwitch />
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
  )
}
