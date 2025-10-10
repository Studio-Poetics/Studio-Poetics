"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants for consistent animations across case studies
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

// Reusable animated section component
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export default function CaseStudyTemplate() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      {/* Back Navigation - Update href to point to case studies listing */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/consultancy" className="inline-flex items-center gap-2 mb-8 hover:text-[#fb4e4e]">
          <ArrowLeft size={16} /> Back to Case Studies
        </Link>
      </motion.div>

      {/* Hero Section - Update title and description */}
      <motion.div
        className="case-study-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-normal mb-6">Project Title</h1>
          <div className="accent-bar"></div>
          <p className="text-xl mb-8">Brief project description that captures the essence of the work.</p>
        </div>
      </motion.div>

      {/* Project Meta Information - Update with project details */}
      <AnimatedSection>
        <div className="case-study-meta">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">CLIENT</div>
            <div className="case-study-meta-value">Client Name</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">SERVICES</div>
            <div className="case-study-meta-value">Service 1, Service 2, Service 3</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">YEAR</div>
            <div className="case-study-meta-value">2024</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">WEBSITE</div>
            <div className="case-study-meta-value">
              <a href="#" className="text-[#fb4e4e] hover:underline">
                projectwebsite.com
              </a>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Overview Section - Update with project overview */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Overview
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Detailed overview of the project, its goals, and context.
          </motion.p>

          {/* Hero Image - Update src and alt */}
          <motion.div className="relative aspect-[16/9] w-full" variants={fadeIn}>
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Project overview"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Challenge Section - Update with project challenges */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            The Challenge
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Description of the challenges faced and problems solved.
          </motion.p>

          {/* Challenge Images - Update src and alt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Challenge image 1"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Challenge image 2"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Approach Section - Update with project approach */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Our Approach
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Description of the approach and methodology used.
          </motion.p>

          {/* Approach Image - Update src and alt */}
          <motion.div className="relative aspect-[16/9] w-full" variants={fadeIn}>
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Approach visualization"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Results Section - Update with project results */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Results
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Description of the results and impact achieved.
          </motion.p>

          {/* Results Stats - Update with actual metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div className="bg-gray-50 p-8 rounded-2xl" variants={fadeIn}>
              <div className="text-4xl font-bold text-[#fb4e4e] mb-2">100%</div>
              <div className="text-lg">Metric 1</div>
            </motion.div>

            <motion.div className="bg-gray-50 p-8 rounded-2xl" variants={fadeIn}>
              <div className="text-4xl font-bold text-[#fb4e4e] mb-2">50%</div>
              <div className="text-lg">Metric 2</div>
            </motion.div>

            <motion.div className="bg-gray-50 p-8 rounded-2xl" variants={fadeIn}>
              <div className="text-4xl font-bold text-[#fb4e4e] mb-2">25%</div>
              <div className="text-lg">Metric 3</div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonial Section - Update with client testimonial */}
      <AnimatedSection>
        <div className="case-study-section">
          <div className="bg-gray-50 p-12 rounded-2xl">
            <motion.div className="text-4xl text-[#fb4e4e] mb-6" variants={fadeIn}>
              "
            </motion.div>
            <motion.p className="text-xl italic mb-8" variants={fadeIn}>
              Client testimonial goes here.
            </motion.p>
            <motion.div className="flex items-center" variants={fadeIn}>
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div className="font-medium">Client Name</div>
                <div className="text-sm text-gray-600">Client Title</div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Next/Previous Project Navigation - Update with actual project links */}
      <AnimatedSection>
        <div className="border-t pt-12 mt-12">
          <div className="flex justify-between items-center">
            <motion.div variants={fadeIn}>
              <Link href="/consultancy/previous-project" className="group flex items-center gap-2 hover:text-[#fb4e4e]">
                <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                <div>
                  <div className="text-sm text-gray-500">Previous Project</div>
                  <div>Previous Project Title</div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Link href="/consultancy/next-project" className="group flex items-center gap-2 hover:text-[#fb4e4e]">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Next Project</div>
                  <div>Next Project Title</div>
                </div>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
} 