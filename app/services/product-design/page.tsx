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

export default function ProductDesignService() {
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
              GAME DESIGN
              <br />
              & DEVELOPMENT
            </h1>
            <p className="text-sm max-w-xs">
              Designing and developing engaging play experiences across digital and non-digital platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <AnimatedSection>
        <div className="case-study-meta flex justify-center gap-8 my-8">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DELIVERABLES</div>
            <div className="case-study-meta-value">User Research, Prototypes, Design System, Production Files</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">TEAM</div>
            <div className="case-study-meta-value">3-4 members</div>
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
                    Our product design service focuses on creating meaningful experiences that bridge the gap between
                    technology and human needs. We believe that the best products are those that feel natural and
                    intuitive to use, while solving real problems in people's lives.
                  </p>
                  <p>
                    From digital interfaces to physical products, we take a holistic approach to design, considering
                    every aspect of the user experience. Our process combines user research, rapid prototyping, and
                    iterative development to create products that are both beautiful and functional.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Product design overview"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Our Process
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">01</div>
                <h3 className="text-xl mb-4">Research & Discovery</h3>
                <p className="text-gray-600">
                  We conduct user research and market analysis to understand needs, pain points, and opportunities.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">02</div>
                <h3 className="text-xl mb-4">Design & Prototyping</h3>
                <p className="text-gray-600">
                  We create and test multiple design solutions through rapid prototyping and user feedback.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">03</div>
                <h3 className="text-xl mb-4">Development & Launch</h3>
                <p className="text-gray-600">
                  We refine the design and prepare production files, ensuring quality and consistency.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Related Case Studies */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-12">
              <motion.h2 className="text-3xl" variants={fadeIn}>
                Related Case Studies
              </motion.h2>
              <motion.div variants={fadeIn}>
                <Link href="/consultancy" className="flex items-center text-sm hover:text-[#fb4e4e]">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={fadeIn}>
                <Link href="/consultancy/ethical-ai-interface" className="group">
                  <div className="relative aspect-[4/3] mb-6">
                    <Image
                      src="/placeholder.svg"
                      alt="Ethical AI Interface"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl mb-2 group-hover:text-[#fb4e4e] transition-colors">
                    Ethical AI Interface
                  </h3>
                  <p className="text-gray-600">
                    Creating human-centered interfaces for AI systems that prioritize transparency and trust.
                  </p>
                </Link>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Link href="/consultancy/sustainable-tech-packaging" className="group">
                  <div className="relative aspect-[4/3] mb-6">
                    <Image
                      src="/placeholder.svg"
                      alt="Sustainable Tech Packaging"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl mb-2 group-hover:text-[#fb4e4e] transition-colors">
                    Sustainable Tech Packaging
                  </h3>
                  <p className="text-gray-600">
                    Developing eco-friendly packaging solutions for technology products.
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* New Section: Digital and Non-Digital Games */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl mb-6">Games as Play Experience</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    Our approach to game design embraces both digital and non-digital formats. We believe games are more than just entertainment—they are powerful tools for learning, connection, and exploration. Whether it's a mobile app, a board game, or an interactive installation, we craft play experiences that invite curiosity, collaboration, and joy.
                  </p>
                  <p>
                    We design digital games for web, mobile, and emerging platforms, as well as physical games and playful objects that bring people together in the real world. Our process is rooted in playtesting, iteration, and a deep understanding of what makes experiences meaningful and memorable.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Game design overview"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 className="text-4xl mb-6" variants={fadeIn}>
              Ready to Create Something Amazing?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Let's work together to design products that make a difference in people's lives.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                href="/contact"
                className="inline-flex items-center text-lg border-b-2 border-[#fb4e4e] pb-1 hover:text-[#fb4e4e]"
              >
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
} 