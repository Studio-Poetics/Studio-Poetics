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

export default function WorkshopsService() {
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
              DESIGN WORKSHOPS
              <br />
              & EDUCATION.
            </h1>
            <p className="text-sm max-w-xs">
              Immersive, hands-on learning experiences for universities, organizations, and curious individuals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Meta */}
      <AnimatedSection>
        <div className="flex justify-center gap-8 my-8">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">DELIVERABLES</div>
            <div className="case-study-meta-value">Workshop Materials, Curriculum, Certificates</div>
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
                    Our sense-making workshops translate complex technological shifts into accessible insights, helping 
                    participants understand and navigate the intersection of emerging technologies and human experience. 
                    We create immersive learning environments that foster critical thinking about technology's role in society.
                  </p>
                  <p>
                    Rather than simply teaching tools or techniques, we focus on developing frameworks for understanding 
                    how technology shapes human behavior, relationships, and culture. Participants learn to design with 
                    intention, creating technology that serves human needs rather than the other way around.
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
                <Image
                  src="/placeholder.svg"
                  alt="Workshops overview"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Workshop Types */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl mb-12" variants={fadeIn}>
              Workshop Categories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Technology & Society</h3>
                <p className="text-gray-600 mb-4">
                  Critical examinations of how emerging technologies impact social structures, relationships, 
                  and cultural practices. We explore both opportunities and challenges of technological change.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• AI Ethics and Human-Centered Design</li>
                  <li>• Digital Wellbeing and Calm Technology</li>
                  <li>• Future of Work and Human-AI Collaboration</li>
                  <li>• Privacy, Surveillance, and Digital Rights</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Design for Emerging Tech</h3>
                <p className="text-gray-600 mb-4">
                  Hands-on workshops that teach design principles specific to new technological paradigms, 
                  focusing on human-centered approaches to innovation.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Tangible User Interface Design</li>
                  <li>• Ambient and Peripheral Interaction Design</li>
                  <li>• IoT Product Experience Design</li>
                  <li>• AR/VR for Real-World Applications</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Innovation Frameworks</h3>
                <p className="text-gray-600 mb-4">
                  Strategic workshops that help organizations develop frameworks for evaluating and 
                  implementing new technologies in ways that align with their values and goals.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Technology Assessment Methods</li>
                  <li>• Ethical Innovation Processes</li>
                  <li>• Change Management for Tech Adoption</li>
                  <li>• Stakeholder Engagement Strategies</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg">
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Creative Prototyping</h3>
                <p className="text-gray-600 mb-4">
                  Practical workshops that teach rapid prototyping methods for testing ideas and concepts 
                  in the intersection of technology and human experience.
                </p>
                <ul className="text-sm text-gray-500">
                  <li>• Physical Computing for Designers</li>
                  <li>• Experience Prototyping Methods</li>
                  <li>• Service Design for Tech Products</li>
                  <li>• Speculative Design and Future Scenarios</li>
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
              Our Approach
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-3xl text-[#fb4e4e] mb-3">01</div>
                <h3 className="text-lg mb-3">Context Setting</h3>
                <p className="text-sm text-gray-600">
                  We begin by understanding the participants' backgrounds and creating shared frameworks 
                  for discussing technology and its implications.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-3xl text-[#fb4e4e] mb-3">02</div>
                <h3 className="text-lg mb-3">Experiential Learning</h3>
                <p className="text-sm text-gray-600">
                  Through hands-on activities, case studies, and group discussions, participants experience 
                  concepts rather than just hearing about them.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-3xl text-[#fb4e4e] mb-3">03</div>
                <h3 className="text-lg mb-3">Critical Reflection</h3>
                <p className="text-sm text-gray-600">
                  We encourage participants to question assumptions and develop their own informed 
                  perspectives on technology's role in society.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="border border-gray-200 p-6 rounded-lg">
                <div className="text-3xl text-[#fb4e4e] mb-3">04</div>
                <h3 className="text-lg mb-3">Action Planning</h3>
                <p className="text-sm text-gray-600">
                  Workshops conclude with practical steps participants can take to apply insights 
                  and continue learning in their own contexts.
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
                <Link href="/consultancy/india-blockchain-week" className="group">
                  <div className="relative aspect-[4/3] mb-6">
                    <Image
                      src="/placeholder.svg"
                      alt="India Blockchain Week"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl mb-2 group-hover:text-[#fb4e4e] transition-colors">
                    India Blockchain Week
                  </h3>
                  <p className="text-gray-600">
                    Complete branding and website development for a major blockchain event.
                  </p>
                </Link>
              </motion.div>
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
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 className="text-4xl mb-6" variants={fadeIn}>
              Ready to Make Sense of Technology's Future?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Join our workshops to develop critical frameworks for understanding and shaping technology's role in 
              human experience. Learn to design with intention and create more thoughtful technological futures.
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
