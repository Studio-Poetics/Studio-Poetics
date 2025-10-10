"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function SpatialDesign() {
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
            <h1 className="text-6xl md:text-7xl font-normal mb-6">
              FORMS, SPACE
              <br />
              & PEOPLE
            </h1>
            <p className="text-sm max-w-xs">
              Designing kinetic and sensory spatial experiences that move and respond, creating living environments that adapt to human needs and emotions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <AnimatedSection>
        <div className="case-study-meta flex justify-center gap-8 my-8">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DELIVERABLES</div>
            <div className="case-study-meta-value">Space Concepts, 3D Models, Installation Designs, Sensor Integration, User Experience Maps</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">TEAM</div>
            <div className="case-study-meta-value">4-6 members</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">PRICING</div>
            <div className="case-study-meta-value">
              <span className="text-[#fb4e4e]">Contact for details</span>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Overview Section */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl mb-6">Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    We create spatial experiences that live and breathe—environments that move, adapt, and respond 
                    to the people within them. Our work blends architecture, interaction design, and emerging 
                    technologies to create spaces that feel more like living organisms than static structures.
                  </p>
                  <p>
                    From kinetic installations that shift with the rhythm of human activity to sensory environments 
                    that respond to mood and presence, we design spaces that enhance the relationship between forms, 
                    space, and the people who inhabit them. Every project considers the poetics of movement, light, 
                    sound, and touch.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Spatial design overview"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Design Approaches */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Our Design Approaches
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Kinetic Environments</h3>
                <p className="text-gray-600 mb-4">
                  Spaces that move and transform in response to human presence, creating dynamic experiences 
                  that evolve throughout the day and adapt to different activities and moods.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Responsive architectural elements</li>
                  <li>• Adaptive lighting systems</li>
                  <li>• Movement-triggered transformations</li>
                  <li>• Time-based spatial changes</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Sensory Integration</h3>
                <p className="text-gray-600 mb-4">
                  Multi-sensory experiences that engage sight, sound, touch, and even smell to create immersive 
                  environments that communicate through atmosphere rather than explicit interfaces.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Atmospheric lighting design</li>
                  <li>• Spatial audio experiences</li>
                  <li>• Tactile surface interactions</li>
                  <li>• Scent and air quality design</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Human-Centered Flow</h3>
                <p className="text-gray-600 mb-4">
                  Spaces designed around natural human movement patterns and social behaviors, creating 
                  environments that feel intuitive and support both individual reflection and group interaction.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Movement pattern analysis</li>
                  <li>• Social interaction mapping</li>
                  <li>• Privacy gradient design</li>
                  <li>• Activity-based zoning</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Living Systems</h3>
                <p className="text-gray-600 mb-4">
                  Integration of natural elements and biological systems that create spaces that literally live 
                  and grow, blending technology with nature to create environments that feel organic.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Biophilic design integration</li>
                  <li>• Living wall systems</li>
                  <li>• Natural light optimization</li>
                  <li>• Air purification systems</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 className="text-4xl mb-6" variants={fadeIn}>
              Ready to Create Living Spaces?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Let's design environments that move, respond, and adapt—creating spaces that enhance 
              the relationship between forms, space, and the people who inhabit them.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                href="/contact"
                className="inline-flex items-center text-lg border-b-2 border-[#fb4e4e] pb-1 hover:text-[#fb4e4e]"
              >
                Begin Your Spatial Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
