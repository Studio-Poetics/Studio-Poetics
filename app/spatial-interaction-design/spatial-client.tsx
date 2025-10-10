"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Home, Building, Users, Zap, Eye, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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

export default function SpatialClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.div variants={fadeIn} className="max-w-4xl">
              <h1 className="text-6xl md:text-7xl font-light mb-8 text-gray-900">
                Spatial Interaction Design
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
                We transform physical spaces into responsive interactive environments through holographic displays, embedded sensors, and architectural integration. Our spatial design practice merges digital experiences with the built environment.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[#fb4e4e] text-white px-8 py-4 rounded-lg hover:bg-[#e63e3e] transition-colors text-lg font-medium"
              >
                Start Your Spatial Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-4xl font-light mb-6 text-gray-900">Our Spatial Approach</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We design experiences that respond to human presence, environmental conditions, and social dynamics within architectural spaces.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div variants={fadeIn} className="bg-gray-50 p-8 rounded-lg">
                <Layers className="w-12 h-12 text-[#fb4e4e] mb-6" />
                <h3 className="text-xl font-medium mb-4 text-gray-900">Layered Experiences</h3>
                <p className="text-gray-700">
                  We create multi-layered interactive experiences that reveal different content based on proximity, time, and user behavior.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn} className="bg-gray-50 p-8 rounded-lg">
                <Eye className="w-12 h-12 text-[#fb4e4e] mb-6" />
                <h3 className="text-xl font-medium mb-4 text-gray-900">Contextual Awareness</h3>
                <p className="text-gray-700">
                  Our systems understand environmental context - lighting, weather, occupancy - to create appropriately responsive experiences.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div variants={fadeIn} className="bg-gray-50 p-8 rounded-lg">
                <Zap className="w-12 h-12 text-[#fb4e4e] mb-6" />
                <h3 className="text-xl font-medium mb-4 text-gray-900">Seamless Integration</h3>
                <p className="text-gray-700">
                  Technology becomes invisible, embedded naturally within existing architectural elements and spatial flows.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-4xl font-light mb-6 text-gray-900">Spatial Applications</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                From museums to homes, our spatial designs create meaningful connections between people and places.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm">
                <Building className="w-12 h-12 text-[#fb4e4e] mb-6" />
                <h3 className="text-xl font-medium mb-4 text-gray-900">Museums & Exhibitions</h3>
                <p className="text-gray-700 mb-6">
                  Interactive displays that adapt to visitor interest, creating personalized learning journeys through cultural and historical content.
                </p>
                <Link href="/holographic-displays" className="text-[#fb4e4e] hover:text-[#e63e3e] font-medium">
                  Learn about Glasscape →
                </Link>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm">
                <Home className="w-12 h-12 text-[#fb4e4e] mb-6" />
                <h3 className="text-xl font-medium mb-4 text-gray-900">Residential Spaces</h3>
                <p className="text-gray-700 mb-6">
                  Home environments that respond to daily rhythms, weather patterns, and family activities through subtle ambient interactions.
                </p>
                <Link href="/experimental-gaming-hardware" className="text-[#fb4e4e] hover:text-[#e63e3e] font-medium">
                  Explore Cozy Gaming →
                </Link>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm">
                <Users className="w-12 h-12 text-[#fb4e4e] mb-6" />
                <h3 className="text-xl font-medium mb-4 text-gray-900">Commercial Environments</h3>
                <p className="text-gray-700 mb-6">
                  Office spaces, retail environments, and hospitality venues that enhance human interaction and productivity through responsive design.
                </p>
                <Link href="/technology-strategy" className="text-[#fb4e4e] hover:text-[#e63e3e] font-medium">
                  Strategy Consulting →
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Technology Integration */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div variants={fadeIn}>
                <h2 className="text-4xl font-light mb-6 text-gray-900">Technology That Disappears</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Our spatial interactions feel natural because we embed technology within existing architectural elements. 
                  Holographic displays emerge from walls, surfaces respond to touch, and environments adapt to human presence 
                  without calling attention to the technology itself.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Holographic projection systems integrated into architecture</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Ambient sensors that respond to environmental conditions</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Touch-responsive surfaces embedded in furniture and walls</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Adaptive lighting and sound that responds to human activity</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn} className="relative">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Spatial interaction technology integration"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-4xl font-light mb-6 text-gray-900">Working with Architects & Designers</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We collaborate closely with interior designers and architects from the earliest design phases, 
                ensuring that interactive technology enhances rather than disrupts spatial design intentions.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.1}>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl font-medium mb-6 text-gray-900">Design Integration Process</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">1. Spatial Analysis</h4>
                    <p className="text-gray-700">We study how people move through and use your space to identify interaction opportunities.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">2. Concept Development</h4>
                    <p className="text-gray-700">Together we develop interaction concepts that support your spatial design goals.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">3. Technical Integration</h4>
                    <p className="text-gray-700">We design technical systems that integrate seamlessly with architectural elements.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">4. Testing & Refinement</h4>
                    <p className="text-gray-700">We prototype and test interactions to ensure they feel natural and enhance the experience.</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl font-medium mb-6 text-gray-900">Partnership Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Enhanced spatial experiences that support your design vision</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Technical expertise in emerging spatial technologies</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Collaborative design process that respects architectural integrity</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Ongoing support for technical maintenance and updates</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-3"></div>
                    <p className="text-gray-700">Competitive advantage through innovative spatial experiences</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#fb4e4e] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <AnimatedSection>
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl font-light mb-6">Ready to Transform Your Space?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Let's explore how spatial interaction design can enhance your architectural project. 
                We work with spaces of all scales, from intimate residential projects to large institutional installations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-3 bg-white text-[#fb4e4e] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/holographic-displays" 
                  className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#fb4e4e] transition-colors text-lg font-medium"
                >
                  Explore Glasscape
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}