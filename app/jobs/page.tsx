"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Calendar, MapPin, Clock } from "lucide-react"
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
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

export default function JobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">JOBS</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      {/* Introduction */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl mb-6">Join Our Team</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                We're always looking for talented individuals who share our passion for design and innovation.
                Join our team and be part of creating meaningful experiences that make a difference.
              </p>
              <p>
                At Studio Poetics, you'll work in a collaborative environment where creativity is valued and
                personal growth is encouraged. We believe in fostering a culture of learning and experimentation.
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeIn}>
            <div className="relative aspect-[4/3]">
              <Image src="/placeholder.svg?height=800&width=1000" alt="Team" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Current Openings */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6">Current Openings</h2>
          <div className="accent-bar"></div>

          <div className="mt-8 space-y-8">
            {/* New Internship Position */}
            <div className="border border-gray-200 p-6 hover:border-[#fb4e4e] transition-colors">
              <h3 className="text-2xl mb-4">2D Illustration Intern</h3>
              
              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>June–September 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Remote / Hybrid (Allahabad/Goa)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Part-time | 3–4 months</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none mb-6">
                <p>Looking for illustrators to join our studio for a summer internship.</p>
                <ul>
                  <li>You'll sketch, develop visuals for projects, and explore ideas with our team.</li>
                  <li>Animation skills are a plus, not a requirement.</li>
                </ul>
                
                <p className="font-medium mt-6">To apply:</p>
                <ul>
                  <li>Send 3–5 samples or your portfolio to hello@poetics.studio</li>
                  <li>Subject: "Illustration Internship – [Your Name]"</li>
                </ul>
                
                <p className="text-[#fb4e4e] mt-6">Deadline: June 25, 2025</p>
              </div>

              <a
                href="mailto:hello@poetics.studio?subject=Illustration Internship"
                className="inline-flex items-center gap-2 text-sm hover:text-[#fb4e4e]"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Commented Out Previous Positions
            <div className="border border-gray-200 p-6 hover:border-[#fb4e4e] transition-colors">
              <h3 className="text-2xl mb-4">Senior Product Designer</h3>
              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Full-time</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                We're looking for a Senior Product Designer to lead design initiatives and mentor team members.
                5+ years of experience in product design required.
              </p>
              <Link href="/jobs/senior-product-designer" className="inline-flex items-center gap-2 text-sm hover:text-[#fb4e4e]">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="border border-gray-200 p-6 hover:border-[#fb4e4e] transition-colors">
              <h3 className="text-2xl mb-4">UX Researcher</h3>
              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Full-time</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Join our research team to conduct user studies and provide insights that shape our design decisions.
                3+ years of UX research experience required.
              </p>
              <Link href="/jobs/ux-researcher" className="inline-flex items-center gap-2 text-sm hover:text-[#fb4e4e]">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            */}
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Benefits */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6">Benefits</h2>
          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-xl mb-4">Growth & Learning</h3>
              <p className="text-gray-600">
                Continuous learning opportunities through workshops, conferences, and mentorship programs.
              </p>
            </div>

            <div>
              <h3 className="text-xl mb-4">Work-Life Balance</h3>
              <p className="text-gray-600">
                Flexible working hours and remote work options to help you maintain a healthy work-life balance.
              </p>
            </div>

            <div>
              <h3 className="text-xl mb-4">Creative Environment</h3>
              <p className="text-gray-600">
                Work on diverse projects in a collaborative environment that encourages creativity and innovation.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* No Openings */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6">No Suitable Openings?</h2>
          <div className="accent-bar"></div>

          <div className="mt-8">
            <p className="text-gray-600 mb-6">
              Don't see a position that matches your skills? We're always interested in meeting talented
              individuals. Send us your portfolio and tell us why you'd be a great fit for our team.
            </p>
            <a
              href="mailto:hello@poetics.studio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  )
}

// Current Job Openings Data
const currentOpenings = [
  {
    title: "Senior Interaction Designer",
    slug: "senior-interaction-designer",
    location: "Goa, India",
    type: "Full-time",
    tags: ["Design", "Technology"],
    description:
      "We're looking for an experienced interaction designer to lead projects at the intersection of physical and digital experiences, with a focus on creating meaningful interactions with everyday objects and spaces.",
    responsibilities: [
      "Lead the design process for interactive installations, products, and digital experiences",
      "Collaborate with multidisciplinary teams including researchers, technologists, and clients",
      "Develop prototypes that explore novel interactions and experiences",
      "Mentor junior designers and contribute to the studio's design approach",
      "Document and communicate design decisions and processes",
    ],
  },
  {
    title: "Design Researcher",
    slug: "design-researcher",
    location: "Prayagraj, India",
    type: "Full-time",
    tags: ["Research", "Strategy"],
    description:
      "Join our team as a design researcher to uncover insights that inform our design process and help us better understand the relationship between people, objects, and environments.",
    responsibilities: [
      "Plan and conduct qualitative research including interviews, observations, and participatory design sessions",
      "Analyze research data to identify patterns, insights, and opportunities",
      "Translate research findings into actionable design directions",
      "Collaborate with designers to integrate research into the design process",
      "Document and present research findings to team members and clients",
    ],
  },
  {
    title: "Creative Technologist",
    slug: "creative-technologist",
    location: "Goa, India",
    type: "Full-time",
    tags: ["Technology", "Making"],
    description:
      "We're seeking a creative technologist who can bridge the gap between concept and implementation, bringing ideas to life through a combination of hardware, software, and physical making.",
    responsibilities: [
      "Develop prototypes and functional systems for interactive installations and products",
      "Collaborate with designers to explore technical possibilities and constraints",
      "Work with a variety of technologies including sensors, microcontrollers, and digital fabrication tools",
      "Document technical processes and create specifications for production",
      "Stay current with emerging technologies and their potential applications",
    ],
  },
]

// Internship Data
const internships = [
  {
    title: "Design Research Intern",
    slug: "design-research-intern",
    location: "Prayagraj, India",
    duration: "3 months",
    startDate: "January 2024",
    description:
      "Assist our research team in planning and conducting user research, analyzing data, and communicating insights.",
  },
  {
    title: "Interaction Design Intern",
    slug: "interaction-design-intern",
    location: "Goa, India",
    duration: "6 months",
    startDate: "June 2024",
    description:
      "Work alongside our design team on interactive projects, contributing to concept development, prototyping, and user testing.",
  },
]
