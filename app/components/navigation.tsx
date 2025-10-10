"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-normal">
            STUDIO POETICS
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:text-[#fb4e4e]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/consultancy" className="hover:text-[#fb4e4e]">
              CONSULTANCY
            </Link>
            <Link href="/services" className="hover:text-[#fb4e4e]">
              SERVICES
            </Link>
            <Link href="/games" className="hover:text-[#fb4e4e]">
              GAMES
            </Link>
            <Link href="/exhibitions" className="hover:text-[#fb4e4e]">
              EXHIBITIONS
            </Link>
            <Link href="/talks" className="hover:text-[#fb4e4e]">
              TALKS & LECTURES
            </Link>
            <Link href="/contacts" className="hover:text-[#fb4e4e]">
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="flex flex-col items-center space-y-6 py-12">
            <Link href="/consultancy" className="text-3xl hover:underline" onClick={() => setIsMenuOpen(false)}>
              CONSULTANCY
            </Link>
            <Link href="/services" className="text-3xl hover:underline" onClick={() => setIsMenuOpen(false)}>
              SERVICES
            </Link>
            <Link href="/games" className="text-3xl hover:underline" onClick={() => setIsMenuOpen(false)}>
              GAMES
            </Link>
            <Link href="/exhibitions" className="text-3xl hover:underline" onClick={() => setIsMenuOpen(false)}>
              EXHIBITIONS
            </Link>
            <Link href="/talks" className="text-3xl hover:underline" onClick={() => setIsMenuOpen(false)}>
              TALKS & LECTURES
            </Link>
            <Link href="/contacts" className="text-3xl hover:underline" onClick={() => setIsMenuOpen(false)}>
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 