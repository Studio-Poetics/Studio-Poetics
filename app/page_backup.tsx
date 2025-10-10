"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useMenu } from "./menu-context"

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

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
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

export default function Home() {
  const { toggleMenu } = useMenu()

  const [activeService, setActiveService] = useState<number | null>(null)
  const [circleAnimationKey, setCircleAnimationKey] = useState(0)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @keyframes squiggleShift {
          from { background-position-x: 0px; }
          to { background-position-x: -20px; }
        }
        .segment-squiggle {
          animation: squiggleShift 0.3s linear infinite;
        }
      `}</style>
      <div className="page">
      
      {/* Hero Section */}
      <section className="hero" role="main" aria-label="Hero">
        {/* Video row (spans both columns) */}
        <div className="video-wrap" aria-label="Hero video">
          <video className="video-el" autoPlay muted loop playsInline preload="auto" poster="poster.jpg">
            <source src="your-video.webm" type="video/webm" />
            <source src="/your-video.mp4" type="video/mp4" />
            {/* fallback text if video unsupported */}
          </video>
        </div>

        {/* Row 2: left copy */}
        <div className="left-copy" aria-label="Intro text">
          <h1>Weaving Playful Futures.</h1>
          <p className="text-lg">
            An experimental design studio weaving playful, sustainable, and meaningful futures into the fabric of everyday life.
          </p>
        </div>

        {/* Row 2: aside (next to the text) */}
        <aside className="right-col" aria-label="Quick navigation">
          <div className="segments" aria-hidden="false">
            {[
              { color: "#111", width: 64, text: "Technology" },
              { color: "#e0e0e0", width: 40, text: "Design" },
              { color: "#fb4e4e", width: 56, text: "Drama" },
              { color: "#e0e0e0", width: 40, text: "Ordinary" }
            ].map((segment, index) => (
              <div
                key={index}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <svg
                  width={segment.width}
                  height="6"
                  style={{ cursor: 'pointer', overflow: 'visible' }}
                >
                  <motion.path
                    d={hoveredSegment === index 
                      ? `M2,3 c ${segment.width/8},0,${segment.width/8},-2,${segment.width/4},-2 s ${segment.width/8},2,${segment.width/4},2 c ${segment.width/8},0,${segment.width/8},-2,${segment.width/4},-2 s ${segment.width/8},2,${segment.width/4},2`
                      : `M3,3 L${segment.width-3},3`
                    }
                    stroke={segment.color}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    animate={hoveredSegment === index ? {
                      pathOffset: [0, -20],
                      transition: { 
                        duration: 0.3, 
                        ease: "linear",
                        repeat: Infinity
                      }
                    } : {}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </svg>
                <motion.div
                  className="segment-tooltip"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={hoveredSegment === index ? { opacity: 1, y: -5, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '-35px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fb4e4e',
                    color: 'white',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 100,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  {segment.text}
                </motion.div>
              </div>
            ))}
          </div>

          <nav className="menu-links" aria-label="Hero menu links">
            <Link href="/team">Team</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">A Sense Making Studio Practice</Link>
          </nav>
        </aside>
      </section>

      {/* Our Services Section - Updated to match the design in the image */}
      <AnimatedSection>
        <section className="py-20 border-t border-b rounded-section">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-5xl mb-12" variants={fadeIn}>
              OUR SERVICES
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl text-justify" variants={fadeIn}>
              We craft experiences that blend the digital and physical, creating new ways to interact with the world. From playful games to future-ready interfaces, our services are designed to bring a sense of wonder and delight to the everyday.
            </motion.p>

            <div className="space-y-0">
              {serviceItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={fadeIn}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <Link href={`/services/${item.slug}`} className="block">
                    <div className="flex items-center justify-between py-6 border-t border-gray-200 group">
                      <div className="flex items-center gap-8">
                        <span className="text-[#fb4e4e] text-xl font-medium">{item.date}</span>
                        <h3 className="text-2xl font-normal">{item.title}</h3>
                      </div>
                      <ArrowRight className="h-6 w-6 text-[#fb4e4e] transition-transform group-hover:translate-x-2" />
                    </div>
                  </Link>

                  {/* Service image preview - only visible when hovered */}
                  {activeService === index && (
                    <motion.div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-40 z-10 pointer-events-none"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#fb4e4e] opacity-70"></div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Clients Section */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl mb-4">Trusted by Forward-Thinking Organizations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We work with universities, startups, and established companies who share our vision 
                of thoughtful technology integration.
              </p>
            </motion.div>
            
            {/* Client logos grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                >
                  <div className="w-48 h-32 flex items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-150 opacity-80 hover:opacity-100">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={160}
                      height={80}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-150"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-sm font-medium text-gray-700 text-center leading-tight">${client.name}</span>`;
                        }
                      }}
                    />
                  </div>
                  {/* Company/Institution name - always visible */}
                  <div className="text-sm text-center mt-4 text-gray-800 font-medium">
                    {client.name}
                  </div>
                  {/* Client type label - subtle */}
                  <div className="text-xs text-center mt-1 text-gray-500 uppercase tracking-wide">
                    {client.type}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Recent Projects Section */}
      <AnimatedSection>
        <section className="py-20 rounded-section">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-12">
              <motion.h2 className="text-4xl" variants={fadeIn}>
                Recent Projects
              </motion.h2>
              <motion.div variants={fadeIn}>
                <Link href="/consultancy" className="flex items-center text-sm hover:text-[#fb4e4e]">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  className={`${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                  variants={scaleUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#fb4e4e] mb-2">{study.category}</div>
                    <h3 className="text-xl font-normal mb-3">{study.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{study.description}</p>
                    <Link
                      href={`/consultancy/${study.slug}`}
                      className="flex items-center text-sm hover:text-[#fb4e4e]"
                    >
                      View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Offerings Section */}
      <AnimatedSection>
        <section className="py-20 rounded-section">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-12" variants={fadeIn}>
              Our Offerings
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white border-2 border-gray-100 p-10 rounded-[2rem] hover:border-[#fb4e4e] transition-colors"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Cozy Games & Playful Interfaces</h3>
                <p className="text-gray-700">We design delightful games and interfaces that feel like companions, embedding play into everyday objects and spaces.</p>
              </motion.div>

              <motion.div
                className="bg-white border-2 border-gray-100 p-10 rounded-[2rem] hover:border-[#fb4e4e] transition-colors"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Interactive & Kinetic Environments</h3>
                <p className="text-gray-700">We create responsive spaces that blend technology and design, transforming homes and offices into living, breathing environments.</p>
              </motion.div>

              <motion.div
                className="bg-white border-2 border-gray-100 p-10 rounded-[2rem] hover:border-[#fb4e4e] transition-colors"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <h3 className="text-2xl mb-4 text-[#fb4e4e]">Sense-Making Workshops</h3>
                <p className="text-gray-700">We host immersive workshops that demystify complex technologies and empower organizations to co-create their own playful futures.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

    </div>
    </>
  )
}


// Featured projects data
const featuredProjects = [
  {
    title: "India Blockchain Week",
    category: "BRANDING & WEBSITE 2023",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Sustainable Tech Initiative",
    category: "DESIGN SYSTEM 2023",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Digital Wellness Platform",
    category: "UX/UI DESIGN 2023",
    image: "/placeholder.svg?height=600&width=800",
  },
]

// Service items data
const serviceItems = [
  {
    date: "01",
    title: "Emerging Technology and UX consultancy",
    slug: "emerging-technology-consultancy",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "02",
    title: "Cozy Games and Play Experiences",
    slug: "game-design-development",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "03",
    title: "Material Science Explorations",
    slug: "material-interfaces",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "04",
    title: "Sensory space design",
    slug: "spatial-design",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "05",
    title: "Sense making workshops",
    slug: "workshops",
    image: "/placeholder.svg?height=600&width=1000",
  },
]

// Case studies data - updated to focus on technology and design
const caseStudies = [
  {
    title: "India Blockchain Week",
    slug: "india-blockchain-week",
    category: "BRANDING & WEBSITE",
    description: "Complete branding, website, and NFT development for a major blockchain event.",
    image: "/ibwcover.jpg",
  },
  {
    title: "Reclaim Protocol Workshop",
    slug: "reclaim-protocol-workshop",
    category: "UX/UI DESIGN",
    description: "A workshop on the Reclaim Protocol, creating human-centered interfaces for AI systems that prioritize transparency and trust.",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    title: "Conversational UI for Micro-investing",
    slug: "conversational-ui-for-micro-investing",
    category: "UX/UI DESIGN",
    description: "Designing Conversation interface for Micro-gold investing platforms.",
    image: "/placeholder.svg?height=600&width=1000",
  },
]

// Journal entries data - updated to match journal page content
const journalEntries = [
  {
    title: "Building Technology with Empathy",
    slug: "technology-with-empathy",
    category: "Technology",
    date: "March 10, 2024",
    excerpt: "We create technology that serves people—not the other way around.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    title: "The Gentle Future of Digital Interfaces",
    slug: "gentle-future-interfaces",
    category: "Design",
    date: "March 15, 2024",
    excerpt: "Exploring how minimalism and thoughtful design can create calming digital experiences that respect our attention and well-being.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    title: "Blockchain as a Design Material",
    slug: "blockchain-as-design-material",
    category: "Technology",
    date: "March 5, 2024",
    excerpt: "Understanding how blockchain can be approached as a material with unique, conceptual properties.",
    image: "/placeholder.svg?height=800&width=1200",
  },
]

// Client logos data
const clientLogos = [
  { 
    name: "National Institute of Design", 
    type: "university",
    logo: "/logos/NID.jpg",
    website: "https://www.nid.edu"
  },
  { 
    name: "Hashed Emergent", 
    type: "VC firm",
    logo: "/logos/Hashed-Emergent.webp",
    website: "https://www.hashedem.com"
  },
  { 
    name: "India Blockchain Week", 
    type: "event",
    logo: "/logos/india blockchain week.svg",
    website: "https://indiablockchainweek.com"
  },
  { 
    name: "Jar App", 
    type: "fintech",
    logo: "/logos/jar app.png",
    website: "https://jar.app"
  },
  { 
    name: "Science City Kolkata", 
    type: "cultural",
    logo: "/logos/science city kolkata.jpeg",
    website: "https://sciencecitykolkata.org.in"
  },
  { 
    name: "Reclaim Protocol", 
    type: "blockchain",
    logo: "/logos/reclaim protocol.png",
    website: "https://reclaimprotocol.org"
  },
]