"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export default function ThreeDCube() {
  const controls = useAnimation()
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cubeRef.current) return

      const rect = cubeRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Calculate rotation based on mouse position
      const rotateY = (x / rect.width) * 30 // -15 to 15 degrees
      const rotateX = (y / rect.height) * -30 // 15 to -15 degrees

      controls.start({
        rotateX,
        rotateY,
        transition: { type: "spring", stiffness: 100, damping: 10 },
      })
    }

    const handleMouseLeave = () => {
      controls.start({
        rotateX: 0,
        rotateY: 0,
        transition: { type: "spring", stiffness: 100, damping: 10 },
      })
    }

    const cube = cubeRef.current
    if (cube) {
      cube.addEventListener("mousemove", handleMouseMove)
      cube.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (cube) {
        cube.removeEventListener("mousemove", handleMouseMove)
        cube.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [controls])

  return (
    <div className="scene flex items-center justify-center" ref={cubeRef}>
      <motion.div className="cube" animate={controls}>
        <div className="cube-face cube-face-front">STUDIO</div>
        <div className="cube-face cube-face-back">POETICS</div>
        <div className="cube-face cube-face-right">DESIGN</div>
        <div className="cube-face cube-face-left">CREATE</div>
        <div className="cube-face cube-face-top">EXPLORE</div>
        <div className="cube-face cube-face-bottom">INNOVATE</div>
      </motion.div>
    </div>
  )
}
