use client

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

export default function MaterialInterfaces() {
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
              MATERIAL &
              <br />
              FUTURE READY INTERFACES
            </h1>
            <p className="text-sm max-w-xs">
              Designing interfaces that bridge the digital and physical worlds, creating tactile experiences that feel natural and intuitive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <AnimatedSection>
        <div className="case-study-meta flex justify-center gap-8 my-8">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DELIVERABLES</div>
            <div className="case-study-meta-value">Interface Prototypes, Material Studies, Interaction Design, Technical Specifications</div>
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
                    We specialize in creating interfaces that exist at the intersection of material and digital—
                    tangible user interfaces (TUIs), smart materials, and future-ready interaction paradigms that 
                    feel more like extensions of the natural world than technology impositions.
                  </p>
                  <p>
                    Our work explores how emerging materials, sensors, and actuators can create interfaces that 
                    respond to human touch, gesture, and presence in ways that feel organic and intuitive. We 
                    design for a future where the line between digital and physical becomes beautifully blurred.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Material interface design overview"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Interface Types */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Interface Categories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Tangible Interfaces</h3>
                <p className="text-gray-600 mb-4">
                  Physical objects that serve as digital controls—interfaces you can touch, hold, and manipulate 
                  with your hands, bringing the immediacy of physical interaction to digital systems.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Smart materials and shape-changing interfaces</li>
                  <li>• Haptic feedback systems</li>
                  <li>• Gesture-responsive surfaces</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Ambient Displays</h3>
                <p className="text-gray-600 mb-4">
                  Information that exists peripherally in the environment, communicating through subtle changes 
                  in light, texture, temperature, or movement rather than demanding direct attention.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Mood-responsive lighting systems</li>
                  <li>• Textile-based information displays</li>
                  <li>• Environmental data visualization</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Responsive Environments</h3>
                <p className="text-gray-600 mb-4">
                  Spaces that adapt and respond to human presence and behavior, creating environments that 
                  feel alive and attentive without being intrusive or demanding.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Adaptive architectural elements</li>
                  <li>• Sensor-integrated furnishings</li>
                  <li>• Climate-responsive materials</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Wearable Interactions</h3>
                <p className="text-gray-600 mb-4">
                  Personal interfaces that integrate seamlessly with clothing, jewelry, and accessories, 
                  providing intimate and contextual interactions that respect privacy and personal space.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Smart textiles and e-fabric integration</li>
                  <li>• Biometric-responsive accessories</li>
                  <li>• Subtle notification systems</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Our Design Process
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">01</div>
                <h3 className="text-lg mb-3">Material Research</h3>
                <p className="text-sm text-gray-600">
                  We explore emerging materials and their interactive properties, understanding how different 
                  textures, temperatures, and responsiveness affect human perception.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">02</div>
                <h3 className="text-lg mb-3">Sensory Mapping</h3>
                <p className="text-sm text-gray-600">
                  We map human sensory capabilities and preferences, designing interactions that feel natural 
                  and leverage our innate understanding of physical materials.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">03</div>
                <h3 className="text-lg mb-3">Rapid Prototyping</h3>
                <p className="text-sm text-gray-600">
                  We create tangible prototypes early and often, using 3D printing, electronics, and material 
                  experimentation to test ideas in the real world.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-4xl text-[#fb4e4e] mb-4">04</div>
                <h3 className="text-lg mb-3">Living Testing</h3>
                <p className="text-sm text-gray-600">
                  We test interfaces in real contexts over extended periods, understanding how they integrate 
                  into daily life and adapt to different use patterns.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Technology Focus */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Future-Ready Technologies
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Smart Materials</h3>
                <p className="text-gray-600">
                  Shape-memory alloys, thermochromic materials, piezoelectric fabrics, and other materials 
                  that change properties in response to environmental conditions or user input.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Embedded Sensing</h3>
                <p className="text-gray-600">
                  Distributed sensor networks, proximity detection, pressure sensing, and environmental 
                  monitoring integrated invisibly into everyday objects and surfaces.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4 text-[#fb4e4e]">Adaptive Responses</h3>
                <p className="text-gray-600">
                  Machine learning systems that understand user preferences and context, enabling interfaces 
                  that become more helpful and intuitive over time.
                </p>
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
              Ready to Bridge Digital and Physical?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Let's create interfaces that feel natural, intuitive, and beautifully integrated into the 
              material world around us.
            </p>
            <motion.div variants={fadeIn}>
              Explore Material Interfaces <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}