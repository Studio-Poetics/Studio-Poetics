"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ServiceSchema, FAQSchema } from "@/components/structured-data"
import { FAQSchema as AIFAQSchema } from "@/components/ai-seo-schemas"

// Refined animation variants for art-book feel
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.25, 0.25, 1], // Custom cubic-bezier for elegant easing
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 1],
    },
  },
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.25, 0.25, 0.25, 1],
    },
  },
}

function ProjectSection({ project, index }: { project: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // Subtle parallax effect for images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <Link href={project.link} className="block group">
      <motion.section
        ref={ref}
        className="relative min-h-screen flex items-center py-32 border-b border-gray-200 cursor-pointer transition-colors duration-300 hover:bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Date Label - Top Left */}
          <motion.div 
            className="absolute top-8 left-6 text-gray-800 text-sm font-medium tracking-widest"
            variants={itemVariants}
          >
            {project.date}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Main Visual - Centered */}
            <div className="lg:col-span-8 lg:col-start-1">
              <motion.div 
                className="relative aspect-[16/10] bg-gray-100 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
                variants={imageVariants}
                style={{ y }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  quality={95}
                />
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </motion.div>
            </div>

            {/* Project Details - Right Column */}
            <motion.div 
              className="lg:col-span-4 space-y-8"
              variants={itemVariants}
            >
              {/* Project Meta */}
              <div className="space-y-6">
                {project.details.map((detail: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    className="flex flex-col space-y-1"
                    variants={itemVariants}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-gray-700 text-xs uppercase tracking-widest font-semibold">
                      {detail.label}
                    </span>
                    <span className="text-gray-900 text-sm font-normal leading-relaxed">
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Project Title and Description - Below Visual */}
          <motion.div 
            className="mt-16 max-w-4xl"
            variants={itemVariants}
          >
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight group-hover:text-[#fb4e4e] transition-colors duration-300">
                {project.title}
              </h2>
              
              {/* External Link */}
              <div className="flex items-center justify-center w-36 h-36 rounded-full border border-gray-400 group-hover:border-[#fb4e4e] transition-colors duration-300">
                <ExternalLink className="w-8 h-8 text-gray-700 group-hover:text-[#fb4e4e] transition-colors duration-300" strokeWidth={0.5} />
              </div>
            </div>

            <motion.p 
              className="text-gray-800 text-lg leading-relaxed max-w-3xl font-normal"
              variants={itemVariants}
            >
              {project.description}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </Link>
  )
}

export default function ConsultancyClient() {
  const containerRef = useRef(null)

  const consultancyFAQs = [
    {
      question: "What types of consultancy services does Studio Poetics offer?",
      answer: "We specialize in spatial interaction design, experimental gaming hardware, holographic display systems, technology strategy workshops, and sustainable innovation consulting."
    },
    {
      question: "How long does a typical consultancy project take?",
      answer: "Project duration varies from 2-3 weeks for focused sprints to 3-6 months for comprehensive transformation projects, depending on scope and complexity."
    },
    {
      question: "Do you work with startups or only established companies?",
      answer: "We work with organizations of all sizes - from early-stage startups to Fortune 500 companies, adapting our approach to each client's needs and budget."
    },
    {
      question: "What makes Studio Poetics different from other design consultancies?",
      answer: "We design interactions that don't exist yet. Our experimental approach focuses on spatial interfaces, cozy gaming hardware, and technology strategies built for long-term adaptation rather than short-term trends."
    },
    {
      question: "How do you price consultancy projects?",
      answer: "We offer flexible pricing models including project-based fees, retainer arrangements, and equity partnerships for startups, tailored to each client's situation."
    }
  ]

  return (
    <>
      <ServiceSchema />
      <AIFAQSchema faqs={consultancyFAQs} />
    <div ref={containerRef} className="bg-white text-black min-h-screen">
      {/* Page Header */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="text-center max-w-4xl px-6">
          <motion.h1 
            className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.25, 0.25, 1] }}
          >
            CONSULTANCY
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
          >
            We help organizations navigate emerging technology through spatial interfaces, 
            experimental hardware, and long-term strategic thinking that lasts beyond trends.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Project Sections */}
      {portfolioProjects.map((project, index) => (
        <ProjectSection key={project.slug} project={project} index={index} />
      ))}

      {/* Footer */}
      <motion.section 
        className="py-32 text-center border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-normal text-gray-800 mb-6">
          Interested in working together?
        </h3>
        <Link 
          href="/contact"
          className="inline-flex items-center gap-3 text-gray-900 hover:text-[#fb4e4e] transition-colors duration-300 text-lg font-medium"
        >
          Start a conversation
          <ExternalLink className="w-4 h-4" />
        </Link>
      </motion.section>
    </div>
    </>
  )
}

// Portfolio Projects Data
const portfolioProjects = [
  {
    title: "India Blockchain Week",
    slug: "india-blockchain-week",
    date: "December 2024",
    image: "/ibwcover.jpg",
    link: "/consultancy/india-blockchain-week",
    description: "A comprehensive brand ecosystem for India's premier blockchain conference. We developed a visual identity that bridged traditional Indian design elements with cutting-edge technology aesthetics, creating an inclusive space for blockchain innovation across diverse communities.",
    details: [
      { label: "Client", value: "India Blockchain Association" },
      { label: "Role", value: "Brand Strategy, Visual Identity" },
      { label: "Creative Direction", value: "Studio Poetics" },
      { label: "Development", value: "Full-stack Development" },
      { label: "Timeline", value: "6 months" },
      { label: "Impact", value: "5000+ attendees, 200+ speakers" },
    ]
  },
]