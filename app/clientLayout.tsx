"use client"

import React from "react";
import Link from "next/link";
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useMenu } from "./menu-context"
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { OrganizationSchema, WebsiteSchema } from "@/components/structured-data";
import { LocalBusinessSchema } from "@/components/ai-seo-schemas";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const { isMenuOpen, toggleMenu } = useMenu()
  
  // Check if current page is Glasscape or Alternative
  const isGlasscape = pathname === '/glasscape'
  const isAlternative = pathname === '/alternative'
  const isCursorDemo = pathname === '/cursor-demo'
  const isHomepage = pathname === '/'

  if (isGlasscape || isAlternative || isCursorDemo) {
    // Standalone layout without any navigation/footer
    return (
      <body className="bg-white text-black min-h-screen">
        {children}
        {!isCursorDemo && <CustomCursor />}
      </body>
    )
  }

  // Regular layout with topbar, navigation, and footer
  return (
    <body className={`bg-white text-black min-h-screen flex flex-col ${isHomepage ? 'hide-topbar' : ''}`}>
      <GoogleAnalytics />
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />
      <div className="flex-1">
        <div className="page">
          <div className="topbar" role="banner">
            <Link href="/" className="brand"><span className="bricolage-font">studio</span> <span className="text-[#fb4e4e] bricolage-font">poetics</span></Link>
          </div>
          <div className="divider" aria-hidden="true"></div>
          <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              className="flex-1 grid-lines"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
      {/* Footer outside page container for full width */}
      <Footer />
      <CustomCursor />
    </body>
  )
}
