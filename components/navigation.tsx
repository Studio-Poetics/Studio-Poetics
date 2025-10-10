"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { motion } from "framer-motion"

export default function Navigation({ isMenuOpen, toggleMenu }) {
  return (
    <>
      {/* Hamburger menu button */}
      <button
        className={`hamburger fixed z-50 ${isMenuOpen ? "is-active" : ""}`}
        style={{
          top: 'calc(var(--topbar-height, 44px) + 18px)',
          right: '4%',
          transform: 'translateY(-50%)'
        }}
        aria-label="Menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Full-page menu overlay */}
      <motion.div
        className={`fixed inset-0 bg-white z-40 ${isMenuOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl mb-6 border-b pb-2">MAIN</h2>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-3xl hover:underline" onClick={toggleMenu}>
                  HOME
                </Link>
                <Link href="/consultancy" className="text-3xl hover:underline" onClick={toggleMenu}>
                  CONSULTANCY
                </Link>
                <Link href="/games" className="text-3xl hover:underline" onClick={toggleMenu}>
                  GAMES
                </Link>
                <Link href="/journal" className="text-3xl hover:underline" onClick={toggleMenu}>
                  JOURNAL
                </Link>
                <Link href="/experiments" className="text-3xl hover:underline" onClick={toggleMenu}>
                  EXPERIMENTS
                </Link>
                <Link href="/about" className="text-3xl hover:underline" onClick={toggleMenu}>
                  ABOUT
                </Link>
                <Link href="/awards" className="text-3xl hover:underline" onClick={toggleMenu}>
                  AWARDS
                </Link>
              </nav>
            </div>

            <div>
              <h2 className="text-2xl mb-6 border-b pb-2">EXPLORE</h2>
              <nav className="flex flex-col space-y-4">
                <Link href="/calendar" className="text-xl hover:underline" onClick={toggleMenu}>
                  Calendar
                </Link>
                <Link href="/exhibitions" className="text-xl hover:underline" onClick={toggleMenu}>
                  Exhibitions
                </Link>
                <Link href="/workshops" className="text-xl hover:underline" onClick={toggleMenu}>
                  Workshops
                </Link>
              </nav>
            </div>

            <div>
              <h2 className="text-2xl mb-6 border-b pb-2">INFORMATION</h2>
              <nav className="flex flex-col space-y-4">
                <Link href="/contact" className="text-xl hover:underline" onClick={toggleMenu}>
                  Contact
                </Link>
                <Link href="/jobs" className="text-xl hover:underline" onClick={toggleMenu}>
                  Jobs
                </Link>
              </nav>
            </div>

            <div>
              <h2 className="text-2xl mb-6 border-b pb-2">CONNECT</h2>
              <div className="flex flex-col space-y-4">
                <p className="text-xl bricolage-font">studio poetics</p>
                <p className="text-xl">Goa / Prayagraj, India</p>
                <p className="text-xl">hello@poetics.studio</p>
                <div className="flex gap-4 mt-4">
                  <Link
                    href="https://instagram.com/studio.poetics"
                    className="text-xl hover:underline"
                    onClick={toggleMenu}
                  >
                    Instagram
                  </Link>
                  <Link
                    href="https://youtube.com"
                    className="text-xl hover:underline"
                    onClick={toggleMenu}
                  >
                    YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
