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

export default function ServiceTemplate() {
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
              SERVICE
              <br />
              NAME
            </h1>
            <p className="text-sm max-w-xs">
              A brief description of the service and its value proposition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <AnimatedSection>
        <div className="case-study-meta">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DURATION</div>
            <div className="case-study-meta-value">2-4 weeks</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DELIVERABLES</div>
            <div className="case-study-meta-value">Deliverable 1, Deliverable 2, Deliverable 3</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">TEAM</div>
            <div className="case-study-meta-value">2-3 members</div>
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
                    Detailed description of the service, its process, and what clients can expect. This section should
                    provide a comprehensive understanding of how the service works and its benefits.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Service overview"
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
              {[1, 2, 3].map((step, index) => (
                <motion.div key={index} variants={fadeIn} className="bg-white p-8 rounded-lg">
                  <div className="text-4xl text-[#fb4e4e] mb-4">0{step}</div>
                  <h3 className="text-xl mb-4">Step Title</h3>
                  <p className="text-gray-600">
                    Description of this step in the process and what clients can expect during this phase.
                  </p>
                </motion.div>
              ))}
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
              {[1, 2].map((_, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Link href="#" className="group">
                    <div className="relative aspect-[4/3] mb-6">
                      <Image
                        src="/placeholder.svg"
                        alt="Case study"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl mb-2 group-hover:text-[#fb4e4e] transition-colors">
                      Case Study Title
                    </h3>
                    <p className="text-gray-600">
                      Brief description of the case study and how it relates to this service.
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 className="text-4xl mb-6" variants={fadeIn}>
              Ready to Get Started?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Let's discuss how we can help bring your vision to life through our design expertise.
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