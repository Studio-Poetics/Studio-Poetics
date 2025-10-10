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

export default function GameDesignDevelopment() {
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
              Creating ambient games and playful experiences that blend seamlessly into everyday life, turning ordinary objects into gentle companions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <AnimatedSection>
        <div className="case-study-meta flex justify-center gap-8 my-8">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DELIVERABLES</div>
            <div className="case-study-meta-value">Game Concepts, Prototypes, Full Development, User Testing, Launch Support</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">TEAM</div>
            <div className="case-study-meta-value">2-4 members</div>
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
                    We specialize in ambient and object-based games that exist quietly in the background of life. 
                    Rather than demanding attention, our games provide gentle moments of discovery and delight—
                    embedded in smart lamps, interactive frames, or everyday household objects.
                  </p>
                  <p>
                    Our approach to game design prioritizes calm technology principles, creating experiences that 
                    are peripherally aware, socially connective, and respectful of human attention. We believe 
                    the best games are those that enhance life rather than escape from it.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Ambient game design overview"
                  fill
                  className="object-cover rounded-lg"
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
              Our Design Process
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">01</div>
                <h3 className="text-xl mb-4">Context Research</h3>
                <p className="text-gray-600">
                  We study the environment and daily rhythms where the game will live, understanding how people 
                  move through and interact with their spaces.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">02</div>
                <h3 className="text-xl mb-4">Gentle Mechanics</h3>
                <p className="text-gray-600">
                  We design game mechanics that feel natural and unobtrusive, creating interactions that respect 
                  attention and blend with existing behaviors.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">03</div>
                <h3 className="text-xl mb-4">Ambient Integration</h3>
                <p className="text-gray-600">
                  We prototype and test how the game fits into real-world contexts, ensuring it enhances rather 
                  than disrupts daily life.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">04</div>
                <h3 className="text-xl mb-4">Living Development</h3>
                <p className="text-gray-600">
                  We build and refine the experience through iterative testing in real environments, allowing 
                  the game to evolve with its users.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Game Types */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Types of Games We Create
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={fadeIn} className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Object Games</h3>
                <p className="text-gray-600">
                  Playful experiences embedded in everyday objects—smart lamps that respond to mood, 
                  interactive picture frames that tell stories, or furniture that subtly gamifies daily routines.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Ambient Narratives</h3>
                <p className="text-gray-600">
                  Stories that unfold slowly over time through environmental cues, creating gentle mysteries 
                  that live alongside daily life rather than demanding immediate attention.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Social Connectors</h3>
                <p className="text-gray-600">
                  Games that gently connect people across distances through shared ambient experiences, 
                  creating moments of connection without the pressure of active participation.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Mindful Interactions</h3>
                <p className="text-gray-600">
                  Contemplative games that encourage reflection and presence, using subtle interactions to 
                  create moments of mindfulness within busy lives.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Learning Companions</h3>
                <p className="text-gray-600">
                  Educational experiences that support skill development through gentle, persistent presence 
                  rather than intensive learning sessions.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Wellness Games</h3>
                <p className="text-gray-600">
                  Experiences that support mental and physical wellbeing through subtle encouragement and 
                  ambient feedback, respecting personal boundaries and preferences.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Technology Approach */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl mb-6">Our Technology Philosophy</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    We believe technology should be calm, respectful, and human-centered. Our games use advanced 
                    technologies like IoT sensors, machine learning, and ambient computing—but always in service 
                    of creating more human, not less human, experiences.
                  </p>
                  <p>
                    Privacy, consent, and user agency are fundamental to our approach. We design systems that 
                    put users in control and respect their boundaries while creating genuinely helpful and 
                    delightful experiences.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Technology philosophy illustration"
                  fill
                  className="object-cover rounded-lg"
                />
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
              Ready to Create Gentle Gaming Experiences?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Let's design games that enhance life rather than escape from it—creating moments of joy, 
              connection, and discovery within the rhythms of everyday life.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                href="/contact"
                className="inline-flex items-center text-lg border-b-2 border-[#fb4e4e] pb-1 hover:text-[#fb4e4e]"
              >
                Start Your Game Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
