"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

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

export default function PressPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* Hero Section */}
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">PRESS</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      {/* Introduction */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl mb-6">Media Resources</h2>
            <p className="text-lg mb-6">
              Welcome to the Studio Poetics press page. Here you'll find resources to help you tell our story. For press
              inquiries, please contact our media relations team.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href="#press-kit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                <Download size={18} />
                Download Press Kit
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
              >
                Contact Press Team
              </a>
            </div>
          </motion.div>
          <motion.div className="relative aspect-[4/3]" variants={fadeIn}>
            <Image src="/placeholder.svg?key=4u6pg" alt="Studio Poetics workspace" fill className="object-cover" />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* About Studio */}
      <AnimatedSection>
        <div className="mb-20">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            About Studio Poetics
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="md:col-span-2" variants={fadeIn}>
              <div className="prose prose-lg max-w-none">
                <p>
                  Studio Poetics is a sense-making design practice founded in 2023. We explore the beauty in everyday
                  objects and experiences through thoughtful design inspired by Kenya Hara's concepts of "White" and
                  "Exformation."
                </p>
                <p>
                  Our multidisciplinary team works at the intersection of design, technology, and philosophy to create
                  products, spaces, and experiences that celebrate the ordinary and reveal the extraordinary within it.
                  Based in Goa and Prayagraj, India, our studio has collaborated with clients across technology,
                  culture, education, and retail sectors.
                </p>
                <p>
                  Studio Poetics is led by Pranshu Chaudhary, whose background in engineering and design has shaped our
                  approach to finding meaning through material exploration and technological innovation. Our work has
                  been recognized by design institutions globally, and we regularly contribute to design discourse
                  through our journal, exhibitions, and speaking engagements.
                </p>
              </div>
              <div className="mt-6 p-6 bg-gray-50 border-l-4 border-[#fb4e4e]">
                <h3 className="text-xl mb-2">Boilerplate Text</h3>
                <p className="text-sm text-gray-600 mb-4">
                  The following text can be used as a standard description of Studio Poetics in articles and features:
                </p>
                <div className="relative bg-white p-4 border border-gray-200">
                  <p className="text-sm">
                    Studio Poetics is a sense-making design practice that explores the beauty in everyday objects and
                    experiences. Founded in 2023 and based in India, the studio works at the intersection of design,
                    technology, and philosophy to create products, spaces, and experiences that celebrate the ordinary
                    and reveal the extraordinary within it.
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "Studio Poetics is a sense-making design practice that explores the beauty in everyday objects and experiences. Founded in 2023 and based in India, the studio works at the intersection of design, technology, and philosophy to create products, spaces, and experiences that celebrate the ordinary and reveal the extraordinary within it.",
                        "boilerplate",
                      )
                    }
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black"
                    aria-label="Copy text"
                  >
                    {copied === "boilerplate" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn}>
              <div className="bg-black text-white p-6">
                <h3 className="text-xl mb-4">Quick Facts</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="text-[#fb4e4e] block text-sm">FOUNDED</span>
                    2023
                  </li>
                  <li>
                    <span className="text-[#fb4e4e] block text-sm">LOCATIONS</span>
                    Goa & Prayagraj, India
                  </li>
                  <li>
                    <span className="text-[#fb4e4e] block text-sm">TEAM SIZE</span>
                    12 multidisciplinary designers
                  </li>
                  <li>
                    <span className="text-[#fb4e4e] block text-sm">SPECIALTIES</span>
                    Brand Identity, Product Design, Material Research, Exhibition Design, Digital Experiences
                  </li>
                  <li>
                    <span className="text-[#fb4e4e] block text-sm">NOTABLE CLIENTS</span>
                    India Blockchain Association, National Design Museum, Ethical AI Collective
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Press Releases */}
      <AnimatedSection>
        <div className="mb-20">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Press Releases
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                className="border-t border-gray-200 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                variants={fadeIn}
              >
                <div>
                  <span className="text-sm text-gray-500">{release.date}</span>
                  <h3 className="text-xl font-normal">{release.title}</h3>
                </div>
                <div className="flex gap-4">
                  <Link href={release.link} className="inline-flex items-center gap-2 text-sm hover:text-[#fb4e4e]">
                    Read <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={release.pdf}
                    download
                    className="inline-flex items-center gap-2 text-sm hover:text-[#fb4e4e]"
                  >
                    Download PDF <Download className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Brand Assets */}
      <AnimatedSection>
        <div className="mb-20" id="press-kit">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Brand Assets
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Please use these official assets when featuring Studio Poetics in your publications. Our brand assets are
            available in various formats for different applications.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div className="border border-gray-200 p-6" variants={fadeIn}>
              <h3 className="text-xl mb-4">Logo Package</h3>
              <div className="relative aspect-video bg-gray-100 flex items-center justify-center mb-6">
                <Image src="/placeholder.svg?key=vqrjh" alt="Studio Poetics Logo" fill className="object-contain p-8" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Our logo package includes PNG, SVG, and EPS formats in both color and monochrome versions, optimized for
                various applications.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                <Download size={18} />
                Download Logo Package
              </a>
            </motion.div>

            <motion.div className="border border-gray-200 p-6" variants={fadeIn}>
              <h3 className="text-xl mb-4">Image Gallery</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="relative aspect-square bg-gray-100">
                  <Image src="/placeholder.svg?key=atwzz" alt="Studio Space" fill className="object-cover" />
                </div>
                <div className="relative aspect-square bg-gray-100">
                  <Image src="/design-team-collaboration.png" alt="Team Collaboration" fill className="object-cover" />
                </div>
                <div className="relative aspect-square bg-gray-100">
                  <Image src="/placeholder.svg?key=4yozt" alt="Material Samples" fill className="object-cover" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                High-resolution images of our studio, team, projects, and process. All images are available for
                editorial use with proper attribution.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                <Download size={18} />
                Download Image Gallery
              </a>
            </motion.div>
          </div>

          <motion.div className="border border-gray-200 p-6" variants={fadeIn}>
            <h3 className="text-xl mb-4">Complete Press Kit</h3>
            <p className="text-lg mb-6">
              Our comprehensive press kit includes everything you need to feature Studio Poetics in your publication:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <span>Company fact sheet and history</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <span>Founder and key team bios</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <span>High-resolution logos and brand assets</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <span>Studio and project photography</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <span>Recent press releases and news</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <span>Brand guidelines and usage instructions</span>
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
            >
              <Download size={20} />
              Download Complete Press Kit (ZIP, 24MB)
            </a>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Media Coverage */}
      <AnimatedSection>
        <div className="mb-20">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Media Coverage
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaCoverage.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 hover:border-[#fb4e4e] transition-colors p-6 flex flex-col"
                variants={fadeIn}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                    <Image src={item.logo || "/placeholder.svg"} alt={item.publication} fill className="object-cover" />
                  </div>
                  <span className="text-lg font-medium">{item.publication}</span>
                </div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{item.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs">{item.date}</span>
                  <div className="flex items-center text-sm hover:text-[#fb4e4e]">
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Information */}
      <AnimatedSection>
        <div className="mb-20" id="contact">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Press Contact
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeIn}>
              <p className="text-lg mb-6">
                For press inquiries, interview requests, or additional information, please contact our media relations
                team. We aim to respond to all media inquiries within 24 hours.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Media Relations</h3>
                  <p>Ananya Sharma, Head of Communications</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#fb4e4e]">Email:</span>
                  <button
                    onClick={() => copyToClipboard("press@studiopoetics.com", "email")}
                    className="group relative flex items-center"
                  >
                    press@studiopoetics.com
                    {copied === "email" ? (
                      <Check size={16} className="ml-2 text-green-500" />
                    ) : (
                      <Copy size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#fb4e4e]">Phone:</span>
                  <button
                    onClick={() => copyToClipboard("+91 98765 43210", "phone")}
                    className="group relative flex items-center"
                  >
                    +91 98765 43210
                    {copied === "phone" ? (
                      <Check size={16} className="ml-2 text-green-500" />
                    ) : (
                      <Copy size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn}>
              <div className="bg-gray-50 p-6 border-l-4 border-[#fb4e4e]">
                <h3 className="text-xl mb-4">Interview Requests</h3>
                <p className="mb-4">Our founders and design leads are available for interviews on topics including:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="mt-1 text-[#fb4e4e]" />
                    <span>Design philosophy and methodology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="mt-1 text-[#fb4e4e]" />
                    <span>Material exploration and innovation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="mt-1 text-[#fb4e4e]" />
                    <span>Technology and design intersection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="mt-1 text-[#fb4e4e]" />
                    <span>Indian design landscape and evolution</span>
                  </li>
                </ul>
                <a
                  href="mailto:press@studiopoetics.com?subject=Interview%20Request"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Request an Interview
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Events Calendar */}
      <AnimatedSection>
        <div className="mb-20">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Upcoming Events
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Studio Poetics regularly participates in design events, exhibitions, and speaking engagements. Media
            representatives are welcome to attend these events.
          </motion.p>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                className="border-t border-gray-200 py-6 grid grid-cols-1 md:grid-cols-4 gap-6"
                variants={fadeIn}
              >
                <div>
                  <span className="text-sm text-gray-500">DATE</span>
                  <div className="text-lg">{event.date}</div>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-gray-500">EVENT</span>
                  <h3 className="text-xl font-normal">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">LOCATION</span>
                  <div className="text-lg">{event.location}</div>
                  <a href={event.link} className="inline-flex items-center gap-2 text-sm hover:text-[#fb4e4e] mt-2">
                    Event Details <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection>
        <div className="mb-20">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Frequently Asked Questions
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="border-t border-gray-200 py-6" variants={fadeIn}>
                <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
            <motion.div className="border-t border-gray-200 pt-6" variants={fadeIn}></motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

// Press Releases Data
const pressReleases = [
  {
    date: "May 10, 2023",
    title: "Studio Poetics Announces New Material Research Laboratory",
    link: "/press/material-research-lab",
    pdf: "/press/material-research-lab.pdf",
  },
  {
    date: "April 2, 2023",
    title: "Studio Poetics Partners with India Blockchain Association for Major Event",
    link: "/press/blockchain-partnership",
    pdf: "/press/blockchain-partnership.pdf",
  },
  {
    date: "March 15, 2023",
    title: "Studio Poetics Launches Journal Exploring Design and Technology Intersection",
    link: "/press/journal-launch",
    pdf: "/press/journal-launch.pdf",
  },
  {
    date: "February 8, 2023",
    title: "Studio Poetics Founders Announce New Design Philosophy Framework",
    link: "/press/design-philosophy",
    pdf: "/press/design-philosophy.pdf",
  },
]

// Media Coverage Data
const mediaCoverage = [
  {
    publication: "Design Week",
    logo: "/placeholder.svg?key=7zviw",
    title: "Studio Poetics: Finding Beauty in the Ordinary",
    excerpt:
      "An in-depth look at how this emerging Indian design studio is redefining minimalism through their unique approach to everyday objects.",
    date: "April 28, 2023",
    link: "#",
  },
  {
    publication: "Tech Design Today",
    logo: "/tech-magazine-logo.png",
    title: "The Technology-Design Intersection: Studio Poetics' Innovative Approach",
    excerpt:
      "How this young studio is bridging the gap between technological innovation and thoughtful design principles.",
    date: "March 15, 2023",
    link: "#",
  },
  {
    publication: "Architecture Digest",
    logo: "/placeholder.svg?key=a216i",
    title: "White Space as Philosophy: Studio Poetics' Design Language",
    excerpt: "Exploring how Kenya Hara's influence shapes this studio's distinctive approach to space and form.",
    date: "February 22, 2023",
    link: "#",
  },
]

// Upcoming Events Data
const upcomingEvents = [
  {
    date: "June 15-18, 2023",
    title: "India Design Forum",
    description:
      "Pranshu Chaudhary will be speaking on 'Design as Sense-Making' and showcasing recent material studies.",
    location: "New Delhi, India",
    link: "#",
  },
  {
    date: "July 8, 2023",
    title: "Material Exploration Workshop",
    description: "Open studio event featuring hands-on demonstrations of our material research methodologies.",
    location: "Studio Poetics, Goa",
    link: "#",
  },
  {
    date: "August 22-25, 2023",
    title: "Technology & Design Summit",
    description:
      "Exhibiting our blockchain visualization project and participating in panel on ethical technology design.",
    location: "Mumbai, India",
    link: "#",
  },
]

// FAQs Data
const faqs = [
  {
    question: "What does 'sense-making design practice' mean?",
    answer:
      "For Studio Poetics, sense-making refers to our approach of using design to create meaning and understanding. We believe design should help people make sense of their world, connecting them more deeply to objects, spaces, and experiences through thoughtful consideration of materials, forms, and interactions.",
  },
  {
    question: "How is Studio Poetics influenced by Kenya Hara's concepts?",
    answer:
      "Kenya Hara's concepts of 'White' (representing emptiness as potential rather than absence) and 'Exformation' (the process of making the known unknown to reveal new perspectives) are foundational to our practice. We embrace emptiness as a creative force and seek to defamiliarize the ordinary to reveal its inherent beauty and meaning.",
  },
  {
    question: "What types of clients does Studio Poetics work with?",
    answer:
      "We work with clients across various sectors who share our values of thoughtfulness, quality, and meaning. This includes technology companies, cultural institutions, educational organizations, and retail brands. We're particularly interested in collaborations that allow us to explore the intersection of traditional craftsmanship and emerging technologies.",
  },
  {
    question: "Does Studio Poetics offer internships or job opportunities?",
    answer:
      "Yes, we regularly offer internships and occasionally have job openings for designers, researchers, and strategists. We look for individuals who bring diverse perspectives and a deep curiosity about how design shapes our understanding of the world. Current opportunities are listed on our Jobs page.",
  },
]
