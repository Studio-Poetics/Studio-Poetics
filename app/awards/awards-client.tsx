"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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

export default function AwardsClient() {
  const [expandedDesigners, setExpandedDesigners] = useState<{ [key: number]: boolean }>({})

  const toggleExpanded = (index: number) => {
    setExpandedDesigners(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

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
              OUR
              <br />
              AWARDED
              <br />
              DESIGNERS
            </h1>
            <p className="text-sm max-w-xs">
              Studio Poetics has a team of award-winning designers, each with a passion for creating spaces that leave a
              lasting impression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Designer Profiles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {designers.map((designer, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="bg-gray-100 text-black p-12">
                      <motion.div variants={fadeIn}>
                        <h2 className="text-4xl mb-6">{designer.name}</h2>
                        <p className="mb-8">{designer.bio}</p>

                        <div className="space-y-4 mb-8">
                          {(expandedDesigners[index] ? designer.awards : designer.awards.slice(0, 8)).map((award, i) => (
                            <div key={i}>
                              <div className="text-sm opacity-80">{award.title}</div>
                              <div className="flex justify-between">
                                <span>{award.organization}</span>
                                <span>{award.year}</span>
                              </div>
                            </div>
                          ))}
                          {designer.awards.length > 8 && (
                            <button
                              onClick={() => toggleExpanded(index)}
                              className="text-sm opacity-80 hover:opacity-100 underline transition-opacity"
                            >
                              {expandedDesigners[index] ? 'Show less' : `See more (${designer.awards.length - 8} more awards)`}
                            </button>
                          )}
                        </div>

                        <Link
                          href={`/designers/${designer.slug}`}
                          className="inline-flex items-center text-sm border-b border-black pb-1 hover:opacity-80"
                        >
                          GET PERSONALIZED ADVICE <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </motion.div>
                    </div>

                    <motion.div className="relative aspect-[3/4]" variants={fadeIn}>
                      <Image src={designer.image || "/placeholder.svg"} alt={designer.name} fill className="object-cover" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div className="relative aspect-[3/4]" variants={fadeIn}>
                      <Image src={designer.image || "/placeholder.svg"} alt={designer.name} fill className="object-cover" />
                    </motion.div>

                    <div className="bg-gray-100 text-black p-12">
                      <motion.div variants={fadeIn}>
                        <h2 className="text-4xl mb-6">{designer.name}</h2>
                        <p className="mb-8">{designer.bio}</p>

                        <div className="space-y-4 mb-8">
                          {(expandedDesigners[index] ? designer.awards : designer.awards.slice(0, 8)).map((award, i) => (
                            <div key={i}>
                              <div className="text-sm opacity-80">{award.title}</div>
                              <div className="flex justify-between">
                                <span>{award.organization}</span>
                                <span>{award.year}</span>
                              </div>
                            </div>
                          ))}
                          {designer.awards.length > 8 && (
                            <button
                              onClick={() => toggleExpanded(index)}
                              className="text-sm opacity-80 hover:opacity-100 underline transition-opacity"
                            >
                              {expandedDesigners[index] ? 'Show less' : `See more (${designer.awards.length - 8} more awards)`}
                            </button>
                          )}
                        </div>

                        <Link
                          href={`/designers/${designer.slug}`}
                          className="inline-flex items-center text-sm border-b border-black pb-1 hover:opacity-80"
                        >
                          GET PERSONALIZED ADVICE <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Pride in Every Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <AnimatedSection>
              <motion.div variants={fadeIn} className="text-8xl font-light text-gray-200">
                PRIDE
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div variants={fadeIn} className="text-8xl font-light text-gray-200">
                IN
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.div variants={fadeIn} className="text-8xl font-light text-gray-200">
                EVERY
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <motion.div variants={fadeIn} className="text-8xl font-light text-gray-200">
                DETAIL
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* More Projects CTA */}
      <section className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <motion.div variants={fadeIn} className="flex justify-between items-center">
              <Link href="/consultancy" className="text-xl hover:text-[#fb4e4e]">
                VIEW MORE PROJECTS
              </Link>
              <ArrowRight className="h-6 w-6" />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

const designers = [
  {
    name: "Pranshu Kumar Chaudhary",
    slug: "pranshu-chaudhary",
    bio: "With over 10 years of experience in interaction design and product design, Pranshu brings a unique perspective that blends technology with warmth and everyday objects and spaces.",
    image: "/Pranshu_Kumar_Chaudhary.png?height=1000&width=600",
    awards: [
      {
        title: "Red Dot Design Award",
        organization: "Red Dot",
        year: "2020",
      },
      {
        title: "Good Design Award",
        organization: "Good Design",
        year: "2020",
      },
      {
        title: "German Design Award",
        organization: "German Design Council",
        year: "2021",
      },
      {
        title: "London International Creative Competition",
        organization: "LICC",
        year: "2020",
      },
      {
        title: "IXDA Engaging Project",
        organization: "Interaction Design Association",
        year: "2021",
      },
      {
        title: "The Architecture MasterPrize",
        organization: "Architecture MasterPrize",
        year: "2020",
      },
      {
        title: "Creative Communications Award",
        organization: "Creative Communications",
        year: "2020",
      },
      {
        title: "FICCI-BAF Awards Best in XR",
        organization: "FICCI-BAF",
        year: "2025",
      },
      {
        title: "Muse Creative: Augmented Reality",
        organization: "Muse Creative Awards",
        year: "2021",
      },
      {
        title: "Muse Creative: Service Apps",
        organization: "Muse Creative Awards",
        year: "2021",
      },
      {
        title: "Muse Creative: Business Apps",
        organization: "Muse Creative Awards",
        year: "2021",
      },
    ],
  },
  {
    name: "R M Udhayan",
    slug: "rm-udhayan",
    bio: "A visionary game designer and 3D artist who transforms virtual environments into immersive experiences. Featured in major publications for VR-driven digital preservation and AR artwork exhibitions worldwide.",
    image: "/udhayan.jpg?height=1000&width=600",
    awards: [
      {
        title: "Featured in The Hindu & Hindustan Times",
        organization: "Digital Preservation with VR & 3D Scan",
        year: "2017",
      },
      {
        title: "SAE India CAD Modelling",
        organization: "First Place",
        year: "2011",
      },
      {
        title: "Film Showcase",
        organization: "IDSFFK",
        year: "2017",
      },
      {
        title: "Film Showcase",
        organization: "Chitrakatha",
        year: "2017",
      },
      {
        title: "Film Showcase",
        organization: "Alpavirama",
        year: "2020",
      },
      {
        title: "Film Showcase",
        organization: "KIMFF",
        year: "2020",
      },
      {
        title: "BAF Awards",
        organization: "Best use of XR in Museum category",
        year: "2025",
      },
    ],
  },
]

const featuredProjects = [
  {
    title: "White Terracotta",
    category: "Residential Architecture",
    year: "2021",
    image: "/placeholder.svg?height=800&width=800",
  },
  {
    title: "Showroom Jolly",
    category: "Commercial Architecture",
    year: "2021",
    image: "/placeholder.svg?height=800&width=800",
  },
  {
    title: "D&D Clinic",
    category: "Commercial Architecture",
    year: "2022",
    image: "/placeholder.svg?height=800&width=800",
  },
  {
    title: "Allure Beauty Salon",
    category: "Commercial Architecture",
    year: "2022",
    image: "/placeholder.svg?height=800&width=800",
  },
]