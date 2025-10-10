"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return;
    setIsMobile(window.innerWidth <= 768)
    if (window.innerWidth > 768) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      const handleMouseOver = (e: MouseEvent) => {
        if (
          (e.target as HTMLElement).tagName === "A" ||
          (e.target as HTMLElement).closest("a") ||
          (e.target as HTMLElement).tagName === "BUTTON" ||
          (e.target as HTMLElement).closest("button")
        ) {
          setIsHovering(true)
        } else {
          setIsHovering(false)
        }
      }
      window.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseover", handleMouseOver)
      document.body.style.cursor = "none"
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseover", handleMouseOver)
        document.body.style.cursor = "auto"
      }
    }
  }, [mounted])

  // Animation variants for cursor states
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      transition: {
        type: "tween",
        ease: "backOut",
        duration: 0.1, // Much faster for responsiveness
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      transition: {
        type: "tween",
        ease: "backOut",
        duration: 0.1, // Much faster for responsiveness
      },
    },
  }

  // Animation variants for decorative elements
  const curlyLineVariants = {
    default: {
      opacity: 0,
      scale: 0.8,
      rotate: 0,
    },
    hover: {
      opacity: 1,
      scale: 1,
      rotate: [0, 15, -15, 0],
      transition: {
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
        },
      },
    },
  }

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted || isMobile) {
    return null
  }

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        variants={cursorVariants}
        animate={isHovering ? "hover" : "default"}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[#fb4e4e] rounded-full opacity-30"></div>

          {/* Curly lines that animate on hover */}
          <motion.div
            className="absolute inset-0"
            variants={curlyLineVariants}
            animate={isHovering ? "hover" : "default"}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-[#fb4e4e] rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                  width: `${100 + i * 10}%`,
                  height: `${100 + i * 10}%`,
                  opacity: 0.5 - i * 0.05,
                }}
              ></div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Small dot that follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] w-2 h-2 bg-[#fb4e4e] rounded-full pointer-events-none"
        style={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
          transition: "transform 0.01s linear", // Direct style for immediate response
        }}
      ></motion.div>
    </>
  )
}
