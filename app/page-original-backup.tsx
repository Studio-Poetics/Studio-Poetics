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
  const [activeProject, setActiveProject] = useState<string>('project-1')
  const [activeFilter, setActiveFilter] = useState<string>('ux')

  const filteredProjects = showcaseProjects.filter(project => project.category.toLowerCase() === activeFilter)
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
          <h1>Experimental <span className="text-[#fb4e4e] bricolage-font">Interaction Design</span> Studio</h1>
          <p className="text-xl">
            We design interactions that don't exist yet. From holographic displays in living rooms to games that live on kitchen tables, we explore how technology becomes more human. Our experimental approach spans spatial interfaces, cozy gaming hardware, and workshops that help organizations navigate emerging tech with strategies built to last.
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
              Our <span className="text-[#fb4e4e] bricolage-font">services</span>
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl text-justify" variants={fadeIn}>
              We craft new forms of interaction across three focused areas: spatial interfaces for museums and interiors, experimental gaming hardware for everyday objects, and strategic workshops that demystify emerging technology.
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
                  <Link href={`/${item.slug}`} className="block">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 justify-items-center">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                >
                  <div className="w-full max-w-48 h-24 md:h-32 flex items-center justify-center p-3 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-150 opacity-80 hover:opacity-100 mx-auto">
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
                  <div className="text-base text-center mt-4 text-gray-800 font-medium">
                    {client.name}
                  </div>
                  {/* Client type label - subtle */}
                  <div className="text-sm text-center mt-1 text-gray-500 uppercase tracking-wide">
                    {client.type}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>


      {/* Recent Inquiries - Light Theme Magazine Style */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="mb-16">
              <motion.h2 className="text-4xl mb-4" variants={fadeIn}>
                Recent <span className="text-[#fb4e4e] bricolage-font">projects</span>
              </motion.h2>
            </div>

            {/* Filter Navigation */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-3">
                {projectFilters.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(filter.slug)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter.slug
                        ? 'bg-[#fb4e4e] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Large Preview Image */}
              <div className="relative">
                <div className="sticky top-8">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
                    <Image
                      src={filteredProjects.find(p => p.id === activeProject)?.image || filteredProjects[0]?.image || "/placeholder.svg"}
                      alt={filteredProjects.find(p => p.id === activeProject)?.title || "Project"}
                      fill
                      className="object-cover transition-all duration-700 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/10"></div>

                    {/* Project Label Overlay */}
                    <div className="absolute bottom-8 left-8">
                      <div className="text-white/90 text-sm mb-2 font-medium">FEATURED PROJECT</div>
                      <h3 className="text-white text-2xl lg:text-3xl font-bold bricolage-font">
                        {filteredProjects.find(p => p.id === activeProject)?.title || filteredProjects[0]?.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Project List */}
              <div className="space-y-0">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`border-b border-gray-200 py-8 cursor-pointer transition-all duration-300 ${
                      activeProject === project.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'
                    }`}
                    onMouseEnter={() => setActiveProject(project.id)}
                    onClick={() => setActiveProject(project.id)}
                    variants={fadeIn}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[#fb4e4e] text-sm font-mono font-medium">
                        /{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
                        {project.category}
                      </span>
                    </div>

                    <h4 className="text-2xl lg:text-3xl font-bold mb-3 bricolage-font leading-tight text-black">
                      {project.title}
                    </h4>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-md">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Link
                        href={project.link}
                        className="text-[#fb4e4e] text-sm font-medium hover:underline transition-colors"
                      >
                        Explore →
                      </Link>
                      <span className="text-gray-500 text-xs font-medium">
                        {project.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Offerings Section - Subtle Modern */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-12" variants={fadeIn}>
              Our <span className="text-[#fb4e4e] bricolage-font">offerings</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-[#fb4e4e] hover:shadow-lg transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <h3 className="text-2xl mb-4 font-semibold text-gray-900">Experimental Gaming Hardware</h3>
                <p className="text-gray-600 leading-relaxed">We design cozy, warm games for unconventional surfaces—fridge doors, coffee tables, kitchen appliances. Play reimagined for the spaces where we actually live.</p>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-[#fb4e4e] hover:shadow-lg transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <h3 className="text-2xl mb-4 font-semibold text-gray-900">Spatial Interaction Design</h3>
                <p className="text-gray-600 leading-relaxed">Our holographic displays transform museums, homes, and offices into interactive spaces. We partner with architects and interior designers to embed responsive technology into the built environment.</p>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-[#fb4e4e] hover:shadow-lg transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <h3 className="text-2xl mb-4 font-semibold text-gray-900">Technology Strategy</h3>
                <p className="text-gray-600 leading-relaxed">We help businesses navigate emerging tech with long-lasting strategies. Our workshops with students and professionals explore what's next—without the hype or fear.</p>
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
    title: "Spatial Interaction Design",
    slug: "spatial-interaction-design",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "02",
    title: "Experimental Gaming Hardware",
    slug: "experimental-gaming-hardware",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "03",
    title: "Holographic Display Systems",
    slug: "holographic-displays",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "04",
    title: "Technology Strategy Workshops",
    slug: "technology-strategy",
    image: "/placeholder.svg?height=600&width=1000",
  },
  {
    date: "05",
    title: "Digital Experience Design",
    slug: "digital-experience-design",
    image: "/placeholder.svg?height=600&width=1000",
  },
]

// Project filters for magazine-style showcase
const projectFilters = [
  { name: "UX", slug: "ux" },
  { name: "Games", slug: "games" },
  { name: "Spatial Design", slug: "glasscape" },
  { name: "Workshops", slug: "workshops" },
]

// Showcase projects data
const showcaseProjects = [
  {
    id: 'project-1',
    title: 'India Blockchain Week',
    category: 'UX',
    description: 'Complete branding, website, and NFT development for a major blockchain event. Creating immersive experiences that bridge technology and culture.',
    image: '/ibwcover.jpg',
    year: '2024',
    link: '/consultancy/india-blockchain-week'
  },
  {
    id: 'project-2',
    title: 'Reclaim Protocol Workshop',
    category: 'Workshops',
    description: 'A workshop on the Reclaim Protocol, creating human-centered interfaces for AI systems that prioritize transparency and trust.',
    image: '/placeholder.svg?height=800&width=600',
    year: '2024',
    link: '/consultancy/reclaim-protocol-workshop'
  },
  {
    id: 'project-3',
    title: 'Interactive Zen Garden',
    category: 'Spatial Design',
    description: 'An experimental digital garden that responds to user interaction, blending meditative experiences with modern interface design.',
    image: '/raw1.png',
    year: '2024',
    link: 'https://glasscape.in'
  },
  {
    id: 'project-4',
    title: 'Conversational UI for Micro-investing',
    category: 'UX',
    description: 'Designing conversation interfaces for micro-gold investing platforms, making financial technology more accessible and human.',
    image: '/placeholder.svg?height=800&width=600',
    year: '2023',
    link: '/consultancy/conversational-ui-for-micro-investing'
  },
  {
    id: 'project-5',
    title: 'Monsoon Stories',
    category: 'Games',
    description: 'A warm, cozy third-person game about reliving 100 monsoons and the stories within them from different perspectives. Currently in development.',
    image: '/placeholder.svg?height=800&width=600',
    year: '2024',
    link: 'https://www.instagram.com/100_monsoon_stories/'
  },
  {
    id: 'project-6',
    title: 'Material Interface Experiments',
    category: 'Spatial Design',
    description: 'Exploring how digital interfaces can feel more tactile and responsive through creative use of materials and textures.',
    image: '/placeholder.svg?height=800&width=600',
    year: '2024',
    link: 'https://glasscape.in'
  },
  {
    id: 'project-7',
    title: 'Community Innovation Labs',
    category: 'Workshops',
    description: 'Collaborative workshops that bring together diverse communities to co-create solutions for local challenges.',
    image: '/placeholder.svg?height=800&width=600',
    year: '2024',
    link: '/workshops'
  },
  {
    id: 'project-8',
    title: 'Valley of Flowers',
    category: 'Games',
    description: 'An exploration game set in the mystical Valley of Flowers, where players discover hidden stories and connections between flora, seasons, and communities.',
    image: '/placeholder.svg?height=800&width=600',
    year: '2024',
    link: '/games'
  }
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