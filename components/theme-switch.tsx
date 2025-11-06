"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative inline-flex h-[30px] w-[60px] items-center rounded-full transition-all duration-500 focus:outline-none shadow-inner
        ${isDark
          ? "bg-gradient-to-r from-gray-700 via-gray-800 to-black"
          : "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500"
        }
      `}
    >
      {/* Knob */}
      <span
        className={`absolute left-[3px] top-[3px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white shadow-md transform transition-all duration-500 ease-in-out
          ${isDark ? "translate-x-0 bg-gray-900" : "translate-x-[30px]"}
        `}
      >
        {isDark ? (
          <Image src="/dark-mode.png" alt="Dark mode" width={16} height={16} className="transition-transform duration-500 ease-in-out" />
        ) : (
          <Image src="/light-mode.png" alt="Light mode" width={16} height={16} className="transition-transform duration-500 ease-in-out" />
        )}
      </span>

      {/* Decorative Glow */}
      {isDark ? (
        <span className="absolute inset-0 rounded-full bg-yellow-300/10 blur-md"></span>
      ) : (
        <span className="absolute inset-0 rounded-full bg-yellow-200/30 blur-sm"></span>
      )}
    </button>
  )
}
