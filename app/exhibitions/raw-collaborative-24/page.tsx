"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ExhibitionDetailsPage() {
  const [currentImage, setCurrentImage] = useState(1)

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev % 5) + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#fb4e4e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Link
              href="/exhibitions"
              className="inline-flex items-center text-sm mb-8 hover:opacity-80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO EXHIBITIONS
            </Link>
            <h1 className="text-6xl md:text-7xl font-normal mb-6">
              Design Futures Pavilion
            </h1>
            <p className="text-sm max-w-xs">
              RAW Collaborative 24, Gandhinagar, Gujarat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.div 
              className="relative aspect-[16/9] mb-12"
              variants={fadeIn}
            >
              <Image
                src={`/raw${currentImage}.png`}
                alt={`RAW Collaborative 24 - Image ${currentImage}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Exhibition Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
              <motion.div variants={fadeIn}>
                <h2 className="text-4xl mb-6">About the Exhibition</h2>
                <p className="mb-6">
                  At RAW Collaborative 24 edition held in Gandhinagar, Gujarat, we showcased for the first time our holographic interfaces designed for homes and offices to have a calm and meditative feel and aura around the house.
                </p>
                <p className="mb-6">
                  The Design Futures Pavilion explored the intersection of technology and human experience, presenting innovative solutions for creating harmonious living and working environments.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Location</h3>
                    <p>Gandhinagar, Gujarat</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Date</h3>
                    <p>December 2024</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn}>
                <h2 className="text-4xl mb-6">Exhibition Catalog</h2>
                <p className="mb-6">
                  Download our comprehensive exhibition catalog to learn more about the holographic interfaces and their applications in creating mindful spaces.
                </p>
                <Link
                  href="/catalog/raw-collaborative-24.pdf"
                  className="inline-flex items-center text-sm border-b border-black pb-1 hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOWNLOAD CATALOG
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.h2 className="text-4xl mb-12" variants={fadeIn}>
              Related Projects
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn}>
                <div className="relative aspect-[4/3] mb-4">
                  <Image
                    src="/project1.jpg"
                    alt="Holographic Interface Design"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl mb-2">Holographic Interface Design</h3>
                <p className="text-gray-600">Exploring the future of spatial computing</p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.div variants={fadeIn}>
                <div className="relative aspect-[4/3] mb-4">
                  <Image
                    src="/project2.jpg"
                    alt="Meditative Spaces"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl mb-2">Meditative Spaces</h3>
                <p className="text-gray-600">Creating calm environments through technology</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
} 