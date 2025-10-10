"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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

function ExperimentSection({ experiment, index }: { experiment: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // Subtle parallax effect for images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <Link href={`/experiments/${experiment.slug}`} className="block group">
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
            {experiment.date}
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
                  src={experiment.image}
                  alt={experiment.title}
                  fill
                  className="object-cover"
                  quality={95}
                />
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </motion.div>
            </div>

            {/* Experiment Details - Right Column */}
            <motion.div 
              className="lg:col-span-4 space-y-8"
              variants={itemVariants}
            >
              {/* Experiment Meta */}
              <div className="space-y-6">
                {experiment.details.map((detail: any, idx: number) => (
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

          {/* Experiment Title and Description - Below Visual */}
          <motion.div 
            className="mt-16 max-w-4xl"
            variants={itemVariants}
          >
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight group-hover:text-[#fb4e4e] transition-colors duration-300">
                {experiment.title}
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
              {experiment.description}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </Link>
  )
}

export default function ExperimentsClient() {
  const containerRef = useRef(null)

  return (
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
            EXPERIMENTS
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
          >
            Explorations at the intersection of design, technology, and human experience. 
            These experimental projects push boundaries and explore what's possible.
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

      {/* Experiment Sections */}
      {experimentProjects.map((experiment, index) => (
        <ExperimentSection key={experiment.slug} experiment={experiment} index={index} />
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
          Interested in experimental collaboration?
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
  )
}

// Experiment Projects Data
const experimentProjects = [
  {
    title: "Glasscape Holographic Interface",
    slug: "glasscape-holographic-interface",
    date: "December 2024",
    image: "/raw1.png",
    description: "Our experimental holographic display system that transforms physical spaces into interactive environments. A three-year research project exploring spatial computing and gesture-based interaction.",
    details: [
      { label: "Type", value: "Spatial Computing" },
      { label: "Technology", value: "Holographic Projection" },
      { label: "Applications", value: "Museums, Offices, Homes" },
      { label: "Development", value: "3 Years" },
      { label: "Status", value: "Production Ready" },
      { label: "Installations", value: "25+ Locations" },
    ]
  },
  
  /*{
    title: "Monsoon Stories Game Engine",
    slug: "monsoon-stories-engine",
    date: "September 2024",
    image: "/placeholder.svg?height=800&width=1200",
    description: "A custom game engine designed specifically for narrative-driven, weather-responsive games. Built to handle dynamic storytelling that adapts to real-world weather patterns.",
    details: [
      { label: "Type", value: "Game Technology" },
      { label: "Technology", value: "Custom Engine" },
      { label: "Applications", value: "Narrative Games" },
      { label: "Development", value: "12 Months" },
      { label: "Status", value: "Development" },
      { label: "Features", value: "Weather-Responsive" },
    ]
  }*/
]