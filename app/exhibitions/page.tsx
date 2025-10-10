"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

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

export default function ExhibitionsPage() {
  const [filter, setFilter] = useState<"all" | "current" | "upcoming" | "past">("all")
  const [currentImage, setCurrentImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev % 5) + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredExhibitions = exhibitions.filter((exhibition) => {
    if (filter === "all") return true
    return exhibition.status === filter
  })

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase">
                Curated Experiences
              </span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              studio<br />
              <span className="text-[#fb4e4e] bricolage-font">EXHIBITIONS</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 font-normal max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Spaces for dialogue, exploration, and sense-making. Our exhibitions reveal the extraordinary 
              within the ordinary, inviting visitors to engage with design in new and meaningful ways.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <AnimatedSection>
        <section className="py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    filter === "all" 
                      ? "bg-[#fb4e4e] text-white" 
                      : "bg-white text-gray-700 hover:bg-[#fb4e4e] hover:text-white border border-gray-200"
                  }`}
                >
                  All Exhibitions
                </button>
                <button
                  onClick={() => setFilter("current")}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    filter === "current" 
                      ? "bg-[#fb4e4e] text-white" 
                      : "bg-white text-gray-700 hover:bg-[#fb4e4e] hover:text-white border border-gray-200"
                  }`}
                >
                  Current
                </button>
                <button
                  onClick={() => setFilter("upcoming")}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    filter === "upcoming" 
                      ? "bg-[#fb4e4e] text-white" 
                      : "bg-white text-gray-700 hover:bg-[#fb4e4e] hover:text-white border border-gray-200"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter("past")}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    filter === "past" 
                      ? "bg-[#fb4e4e] text-white" 
                      : "bg-white text-gray-700 hover:bg-[#fb4e4e] hover:text-white border border-gray-200"
                  }`}
                >
                  Past
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Exhibition */}
      <AnimatedSection>
        <section className="py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="mb-16"
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-2">
                Featured <span className="text-[#fb4e4e] bricolage-font">EXHIBITION</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Exhibition Image */}
                <div className="lg:col-span-8">
                  <div className="relative aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden">
                    <Image
                      src={`/raw${currentImage}.png`}
                      alt="Design Futures Pavilion: RAW Collaborative 24"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#fb4e4e] text-white px-4 py-2 text-sm font-medium rounded-full">
                        PAST EXHIBITION
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exhibition Details */}
                <div className="lg:col-span-4 space-y-8">
                  <div>
                    <div className="text-sm text-[#fb4e4e] font-medium mb-2 tracking-wider uppercase">
                      December 2024
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light leading-tight mb-6">
                      Design Futures Pavilion: RAW Collaborative 24
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      At RAW Collaborative 24 edition held in Gandhinagar, Gujarat, we showcased for the first time our holographic interfaces designed for homes and offices to have a calm and meditative feel and aura around the house.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#fb4e4e]" />
                      <span className="text-gray-700">Gandhinagar, Gujarat</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-[#fb4e4e]" />
                      <span className="text-gray-700">Holographic Interfaces</span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/exhibitions/raw-collaborative-24"
                      className="inline-flex items-center justify-center w-32 h-32 border border-gray-300 rounded-full hover:border-[#fb4e4e] group transition-all duration-300"
                    >
                      <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-[#fb4e4e] transition-colors" strokeWidth={1} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* All Exhibitions */}
      <AnimatedSection>
        <section className="py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="mb-16"
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-2">
                {filter === "all" ? "All" : filter === "current" ? "Current" : filter === "upcoming" ? "Upcoming" : "Past"} <span className="text-[#fb4e4e] bricolage-font">EXHIBITIONS</span>
              </h2>
            </motion.div>

            <div className="space-y-32">
              {filteredExhibitions.map((exhibition, index) => (
                <motion.div
                  key={exhibition.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-start ${
                    index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                  }`}
                  variants={fadeIn}
                >
                  {/* Exhibition Image */}
                  <div className={`lg:col-span-7 ${index % 2 === 0 ? "" : "lg:col-start-6"}`}>
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                      <Image
                        src={exhibition.image}
                        alt={exhibition.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className={`px-4 py-2 text-sm font-medium rounded-full text-white ${
                          exhibition.status === "current" ? "bg-green-500" :
                          exhibition.status === "upcoming" ? "bg-blue-500" :
                          "bg-gray-500"
                        }`}>
                          {exhibition.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Exhibition Details */}
                  <div className={`lg:col-span-5 space-y-8 ${index % 2 === 0 ? "" : "lg:col-start-1"}`}>
                    <div>
                      <div className="text-sm text-[#fb4e4e] font-medium mb-2 tracking-wider uppercase">
                        {exhibition.date}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-light leading-tight mb-6">
                        {exhibition.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {exhibition.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#fb4e4e]" />
                        <span className="text-gray-700">{exhibition.location}</span>
                      </div>
                    </div>

                    <div className="pt-8">
                      <Link
                        href={`/exhibitions/${exhibition.slug}`}
                        className="inline-flex items-center justify-center w-32 h-32 border border-gray-300 rounded-full hover:border-[#fb4e4e] group transition-all duration-300"
                      >
                        <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-[#fb4e4e] transition-colors" strokeWidth={1} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-20 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-8"
              variants={fadeIn}
            >
              Want to <span className="text-[#fb4e4e] bricolage-font">EXHIBIT</span> with us?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-8 leading-relaxed"
              variants={fadeIn}
            >
              We welcome exhibition proposals from designers, artists, curators, and researchers whose work aligns 
              with our focus on materiality, everyday objects, and the intersection of design and technology.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[#fb4e4e] text-white px-8 py-4 rounded-full hover:bg-[#e63e3e] transition-colors text-lg font-medium"
              >
                Submit Proposal
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}

// Exhibition Data
const exhibitions = [
  {
    title: "Design Futures Pavilion: RAW Collaborative 24",
    slug: "raw-collaborative-24",
    date: "December 2024",
    location: "Gandhinagar, Gujarat",
    description: "Showcasing holographic interfaces designed for homes and offices to create calm and meditative spaces.",
    image: "/raw1.png",
    status: "past",
  },
  /*
  {
    title: "Textile Futures",
    slug: "textile-futures",
    date: "August 12 - October 30, 2022",
    location: "National Design Museum, New Delhi",
    description:
      "Exploring innovative approaches to textile design, including e-textiles, sustainable materials, and traditional craft techniques.",
    image: "/placeholder.svg?height=800&width=1000&query=textile exhibition",
    status: "past",
  },*/
]
