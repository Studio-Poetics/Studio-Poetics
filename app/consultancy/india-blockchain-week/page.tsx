"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
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

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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
      variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export default function IndiaBlockchainWeekCaseStudy() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/consultancy" className="inline-flex items-center gap-2 mb-8 hover:text-[#fb4e4e]">
          <ArrowLeft size={16} /> Back to Case Studies
        </Link>
      </motion.div>

      {/* Hero section */}
      <motion.div
        className="case-study-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-normal mb-6">India Blockchain Week</h1>
          <div className="accent-bar"></div>
          <p className="text-xl mb-8">
            Complete branding, website, marketing, and NFT development for India's premier blockchain event.
          </p>
        </div>
      </motion.div>

      {/* Project meta information */}
      <AnimatedSection>
        <div className="case-study-meta">
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">CLIENT</div>
            <div className="case-study-meta-value">India Blockchain Association</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">SERVICES</div>
            <div className="case-study-meta-value">Branding, Web Design, Marketing, NFT Development</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">YEAR</div>
            <div className="case-study-meta-value">2023</div>
          </motion.div>
          <motion.div className="case-study-meta-item" variants={fadeIn}>
            <div className="case-study-meta-label">WEBSITE</div>
            <div className="case-study-meta-value">
              <a href="#" className="text-[#fb4e4e] hover:underline">
                indiablockchainweek.com
              </a>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Overview section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Overview
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            India Blockchain Week is the country's premier event for blockchain technology, bringing together industry
            leaders, developers, investors, and enthusiasts. Studio Poetics was commissioned to create a comprehensive
            brand identity, website, marketing materials, and exclusive NFT collection for the event.
          </motion.p>

          <motion.div className="relative aspect-[16/9] w-full" variants={fadeIn}>
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="India Blockchain Week branding overview"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Challenge section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            The Challenge
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            The client needed a brand identity that would position India Blockchain Week as a forward-thinking,
            prestigious event while making complex blockchain concepts accessible to a wider audience. The design needed
            to balance technological innovation with cultural relevance, appealing to both international and local
            audiences.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Initial sketches and concepts"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Competitor analysis"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Approach section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Our Approach
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            Inspired by Kenya Hara's concept of "Exformation," we approached this project with the goal of making the
            invisible visible. Blockchain technology itself is abstract and complex, so our design strategy focused on
            creating tangible, visual representations of blockchain concepts.
          </motion.p>

          <motion.p className="text-lg mb-8" variants={fadeIn}>
            We developed a design system that used a combination of geometric patterns inspired by traditional Indian
            motifs and modern technological elements. The color palette balanced tech-forward blues with warm,
            culturally resonant oranges and golds.
          </motion.p>

          <motion.div className="relative aspect-[16/9] w-full" variants={fadeIn}>
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Design system and color palette"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Brand Identity section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Brand Identity
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            The logo we created represents the intersection of blockchain technology and Indian innovation. The symbol
            combines a stylized blockchain node structure with elements inspired by traditional Indian geometric
            patterns, creating a distinctive mark that works across digital and physical applications.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image src="/placeholder.svg?height=600&width=800" alt="Logo design" fill className="object-cover" />
            </motion.div>
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Brand applications"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.p className="text-lg my-8" variants={fadeIn}>
            The typography system uses a combination of a technical, precise sans-serif for headings and a highly
            readable serif for body text, creating a balance between innovation and accessibility.
          </motion.p>

          <motion.div className="relative aspect-[16/9] w-full" variants={fadeIn}>
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Typography system and brand guidelines"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Website Design section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Website Design
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            The website serves as the digital hub for the event, providing information about speakers, schedule, venues,
            and registration. We designed a responsive, intuitive interface that embodies the brand identity while
            ensuring optimal user experience.
          </motion.p>

          <motion.div className="relative aspect-[16/9] w-full" variants={fadeIn}>
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Website homepage design"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.p className="text-lg my-8" variants={fadeIn}>
            Key features include an interactive schedule builder, speaker profiles, venue maps, and seamless
            registration integration. The site also includes a dedicated section for the NFT collection, allowing users
            to browse and purchase exclusive digital assets.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Mobile responsive design"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Schedule page design"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Marketing Materials section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Marketing Campaign
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            We developed a comprehensive marketing strategy that included digital advertising, social media content,
            email campaigns, and physical promotional materials. The campaign emphasized the event's unique positioning
            at the intersection of global blockchain innovation and India's technological ecosystem.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Social media campaign"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div className="relative aspect-[4/3] w-full" variants={fadeIn}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Email newsletter design"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.p className="text-lg my-8" variants={fadeIn}>
            The campaign achieved significant engagement, with over 2 million impressions across digital platforms and a
            40% increase in registration compared to the previous year's event.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Video Showcase */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Event Promo Video
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            We created a dynamic promotional video that captured the essence of the event and highlighted key speakers
            and topics. The video was used across social media, the website, and at partner venues.
          </motion.p>

          <motion.div variants={fadeIn}>
            <div className="relative aspect-video bg-gray-100 flex items-center justify-center rounded-2xl">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[#fb4e4e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white" />
                  </svg>
                </div>
                <p className="text-gray-500">Video Placeholder - Event Promo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* NFT Collection section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            NFT Collection
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            A key component of the project was designing and developing an exclusive NFT collection for the event. These
            digital assets served as premium tickets, providing holders with special access to VIP areas, speaker
            sessions, and networking events.
          </motion.p>

          <div className="nft-display">
            <motion.h3 className="text-2xl mb-6" variants={fadeIn}>
              India Blockchain Week - Genesis Collection
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div className="nft-item" variants={fadeIn}>
                <div className="relative aspect-square w-full">
                  <Image src="/placeholder.svg?height=600&width=600" alt="NFT #001" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium">Genesis Pass #001</div>
                  <div className="text-[#fb4e4e]">0.5 ETH</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">VIP Access</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Limited Edition</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="nft-item" variants={fadeIn}>
                <div className="relative aspect-square w-full">
                  <Image src="/placeholder.svg?height=600&width=600" alt="NFT #002" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium">Genesis Pass #002</div>
                  <div className="text-[#fb4e4e]">0.5 ETH</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">VIP Access</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Limited Edition</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="nft-item" variants={fadeIn}>
                <div className="relative aspect-square w-full">
                  <Image src="/placeholder.svg?height=600&width=600" alt="NFT #003" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium">Genesis Pass #003</div>
                  <div className="text-[#fb4e4e]">0.5 ETH</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">VIP Access</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Limited Edition</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p className="text-lg mt-8" variants={fadeIn}>
              Each NFT featured unique artwork that combined blockchain motifs with elements of Indian art and culture.
              The collection sold out within 48 hours of launch, generating additional revenue for the event and
              creating a community of highly engaged attendees.
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* Results section */}
      <AnimatedSection>
        <div className="case-study-section">
          <motion.h2 className="text-3xl mb-6" variants={fadeIn}>
            Results
          </motion.h2>
          <motion.div className="accent-bar" variants={fadeIn}></motion.div>
          <motion.p className="text-lg mb-8" variants={fadeIn}>
            The comprehensive branding and marketing strategy delivered exceptional results for India Blockchain Week:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div className="bg-gray-50 p-8 rounded-2xl" variants={fadeIn}>
              <div className="text-4xl font-bold text-[#fb4e4e] mb-2">5,000+</div>
              <div className="text-lg">Attendees</div>
            </motion.div>

            <motion.div className="bg-gray-50 p-8 rounded-2xl" variants={fadeIn}>
              <div className="text-4xl font-bold text-[#fb4e4e] mb-2">100%</div>
              <div className="text-lg">NFT Collection Sold Out</div>
            </motion.div>

            <motion.div className="bg-gray-50 p-8 rounded-2xl" variants={fadeIn}>
              <div className="text-4xl font-bold text-[#fb4e4e] mb-2">40%</div>
              <div className="text-lg">Increase in Registration</div>
            </motion.div>
          </div>

          <motion.p className="text-lg" variants={fadeIn}>
            The event received widespread media coverage and established itself as the premier blockchain event in
            India. The client has already commissioned Studio Poetics to work on the next year's event, with an expanded
            scope that includes interactive installations and an augmented reality experience.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Testimonial section */}
      <AnimatedSection>
        <div className="case-study-section">
          <div className="bg-gray-50 p-12 rounded-2xl">
            <motion.div className="text-4xl text-[#fb4e4e] mb-6" variants={fadeIn}>
              "
            </motion.div>
            <motion.p className="text-xl italic mb-8" variants={fadeIn}>
              Studio Poetics transformed our vision into a cohesive, powerful brand that perfectly captured the
              innovative spirit of India Blockchain Week. Their holistic approach to design—from branding to website to
              NFTs—created a seamless experience that exceeded our expectations and helped make the event a tremendous
              success.
            </motion.p>
            <motion.div className="flex items-center" variants={fadeIn}>
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div className="font-medium">Arjun Mehta</div>
                <div className="text-sm text-gray-600">Director, India Blockchain Association</div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Next project navigation */}
      <AnimatedSection>
        <div className="border-t pt-12 mt-12">
          <div className="flex justify-between items-center">
            <motion.div variants={fadeIn}>
              <Link
                href="/consultancy/ethical-ai-interface"
                className="group flex items-center gap-2 hover:text-[#fb4e4e]"
              >
                <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                <div>
                  <div className="text-sm text-gray-500">Previous Project</div>
                  <div>Ethical AI Interface</div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Link
                href="/consultancy/sustainable-tech-packaging"
                className="group flex items-center gap-2 hover:text-[#fb4e4e]"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-500">Next Project</div>
                  <div>Sustainable Tech Packaging</div>
                </div>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
