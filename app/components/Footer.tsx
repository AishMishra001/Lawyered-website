"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function Footer() {
  const [hovered, setHovered] = useState("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  // Use consistent default during SSR to prevent hydration mismatch
  // Default to dark mode during SSR and initial render
  const isDarkMode = !mounted || resolvedTheme === "dark";

  return (
    <>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 md:py-8 mt-2 lg:mt-22 px-4 md:px-26">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-8 text-black dark:text-white font-bold dark:font-normal justify-center md:justify-start">

            {/* Column 1: Info */}
            <div className="col-span-2 flex flex-col text-xs lg:text-sm items-center md:items-start text-center md:text-left dark:justify-between">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-64 h-auto md:ml-4">
                  <Image
                    src={isDarkMode ? "/lawyered-logo.png" : "/lawyered-logo3.png"}
                    alt="Lawyered Logo"
                    width={isDarkMode ? 220 : 220}
                    height={isDarkMode ? 70 : 70}
                    className="object-contain"
                    style={{
                      width: isDarkMode ? "220px" : "213px",
                      height: isDarkMode ? "70px" : "70px",
                      paddingLeft: isDarkMode ? "0px" : "15px"
                    }}
                  />
                </div>
                <p className="mb-1 md:mb-0 md:ml-4 font-normal"> {/* 👈 aligns text with logo */}
                  Sproutech Solutions Private Limited
                </p>
                <p className="md:ml-4 font-normal">
                  India Accelerator Coworking, Lower Ground Floor, LG-007-02, MGF{" "}
                  <br className="hidden md:block" />
                  Metropolis Mall, MG Road, Gurugram, Haryana 122002
                </p>
              </div>
              <p className="text-center md:text-left mt-1 md:mt-0 md:ml-4 dark:mt-0 font-normal">
                T: 99-88-44-1033 E: info@lawyered.in
              </p>

            </div>

            {/* START: Wrapper for Links & Social Icons */}
            <div className="col-span-2 flex flex-col md:flex-row items-center md:items-start">
              {/* Column 2 & 3: Links */}
              <div className="w-fit md:w-2/3 grid grid-cols-2 gap-16 md:gap-0 text-sm lg:mt-4">
                <div>
                  <ul className="space-y-3 md:space-y-4">
                    <li>
                      <Link
                        href="/"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        HOME
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/ceo-message"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        CEO&#39;S MESSAGE
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/lots-247"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        LOTS247
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/challan-pay"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        CHALLANPAY
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3 md:space-y-4">
                    <li>
                      <Link
                        href="/about"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        ABOUT US
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blogs"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        BLOGS
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="hover:text-[#22D2EE] hover:font-bold transition-all"
                      >
                        CONTACT US
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4: Social */}
              <div className="w-full md:w-1/3 flex justify-center md:justify-start mt-8 lg:mt-4 lg:mr-18">
                <div className="flex justify-start items-start space-x-3 md:space-x-4">
                  {[
                    { id: "facebook", link: "https://www.facebook.com/share/1FE5v6q9Vz/", img1: "/facebook3.png", img2: "/facebook4.png" },
                    { id: "instagram", link: "https://www.instagram.com/lawyered.in", img1: "/instagram3.png", img2: "/instagram4.png" },
                    { id: "linkedin", link: "https://www.linkedin.com/company/lawyered/", img1: "/linkedin3.png", img2: "/linkedin4.png" },
                    { id: "twitter", link: "https://x.com/LawyeredIN", img1: "/twitter3.png", img2: "/twitter5.png" },
                    { id: "youtube", link: "https://www.youtube.com/@LawyeredIN/videos", img1: "/youtube5.png", img2: "/youtube6.png" },
                  ].map((icon) => (
                    <a
                      key={icon.id}
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHovered(icon.id)}
                      onMouseLeave={() => setHovered("")}
                    >
                      <Image
                        src={
                          icon.id === "youtube" && !isDarkMode && hovered !== icon.id
                            ? "/youtube7.png"
                            : icon.id === "twitter" && !isDarkMode && hovered === icon.id
                            ? "/twitter6.png"
                            : hovered === icon.id
                            ? icon.img2
                            : icon.img1
                        }
                        alt={icon.id}
                        width={25}
                        height={25}
                        className={`${icon.id === "youtube" ? "w-8 md:w-10" : "w-6 md:w-7"
                          } h-auto`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* END: Wrapper */}
          </div>
        </div>
      </footer>

      <div className="border-t border-gray-200 dark:border-gray-700 py-4 md:py-6 px-4 md:px-26">
        <p className="text-center text-black dark:text-white font-normal text-sm md:text-base">
          © 2025 Lawyered. All Rights Reserved |{" "}
          <Link href="/privacy-policy" className="hover:text-[#22D2EE] hover:font-bold">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms-and-conditions" className="hover:text-[#22D2EE] hover:font-bold">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </>
  );
}
