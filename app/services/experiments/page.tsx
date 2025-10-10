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

export default function ExperimentsService() {
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
              MATERIAL AND FUTURE
              <br />
              READY INTERFACES
            </h1>
            <p className="text-sm max-w-xs">
              Exploring new materials and designing interfaces for the future of interaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center mx-auto text-center">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">DELIVERABLES</h3>
              <p className="text-lg">Research Report, Prototypes, Documentation</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">TEAM SIZE</h3>
              <p className="text-lg">2-3 members</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">PRICING</h3>
              <p className="text-lg">Contact for details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl mb-6">Overview</h2>
              <p className="text-lg text-gray-600">
                Our Experiments service focuses on pushing the boundaries of design and technology through innovative research and prototyping. We explore emerging materials, technologies, and methodologies to create new possibilities for design.
              </p>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Experiments"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl mb-4">1. Exploration</h3>
              <p className="text-gray-600">
                We begin by exploring new materials, technologies, and design approaches. This phase involves research, testing, and initial prototyping to understand possibilities and limitations.
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4">2. Experimentation</h3>
              <p className="text-gray-600">
                Through iterative testing and refinement, we develop prototypes and explore different applications. This phase is about pushing boundaries and discovering new solutions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4">3. Documentation</h3>
              <p className="text-gray-600">
                We document our findings, processes, and outcomes to create a comprehensive record of the experiment. This includes technical specifications, design insights, and potential applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-4xl mb-12">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/consultancy/sustainable-tech-packaging" className="group">
              <div className="relative aspect-[4/3] mb-4">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Sustainable Tech Packaging"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl mb-2 group-hover:text-[#fb4e4e]">Sustainable Tech Packaging</h3>
              <p className="text-gray-600">Exploring eco-friendly materials for technology packaging</p>
            </Link>
            <Link href="/consultancy/india-blockchain-week" className="group">
              <div className="relative aspect-[4/3] mb-4">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="India Blockchain Week"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl mb-2 group-hover:text-[#fb4e4e]">India Blockchain Week</h3>
              <p className="text-gray-600">Experimental blockchain applications in design</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-black text-white p-12 rounded-lg">
            <h2 className="text-4xl mb-6">Ready to Experiment?</h2>
            <p className="text-lg mb-8 max-w-2xl">
              Let's explore new possibilities together. Contact us to discuss your experimental project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm border-b border-white pb-1 hover:opacity-80"
            >
              GET IN TOUCH <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 