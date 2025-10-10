"use client"

import type React from "react"

import Image from "next/image"
import { ArrowRight, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { getAllDesignedObjects } from "@/lib/data"
import Link from "next/link"

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

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
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
      variants={staggerContainer}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function DesignedObjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const designedObjects = [
    {
      title: "Ceramic Vessel No. 3",
      slug: "ceramic-vessel-3",
      category: "ceramic",
      description: "Hand-crafted ceramic vessel with subtle texture variations.",
      image: "/placeholder.svg?key=do05n",
    },
    {
      title: "Paper Light Shade",
      slug: "paper-light-shade",
      category: "paper",
      description: "Handmade paper light shade with folded geometric pattern creating intricate shadow play.",
      image: "/placeholder.svg?key=fgu7f",
    },
    {
      title: "Linen Wall Hanging",
      slug: "linen-wall-hanging",
      category: "textile",
      description: "Natural linen wall hanging with subtle tonal variations and textural elements.",
      image: "/placeholder.svg?key=v2esq",
    },
    {
      title: "Wooden Tray Set",
      slug: "wooden-tray-set",
      category: "wood",
      description:
        "Minimalist wooden trays in various sizes, hand-finished with natural oil to enhance grain patterns.",
      image: "/placeholder.svg?key=1v0i2",
    },
    {
      title: "Glass Carafe",
      slug: "glass-carafe",
      category: "glass",
      description: "Hand-blown glass carafe with subtle organic form variations and delicate proportions.",
      image: "/placeholder.svg?key=rfptx",
    },
  ]

  const objects = getAllDesignedObjects()

  const filteredObjects = designedObjects.filter((object) => {
    if (activeCategory === "all") return true
    return object.category === activeCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* Hero Section */}
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal tracking-wide">DESIGNED OBJECTS</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      {/* Introduction */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl mb-6 font-light">The Poetry of Form</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Each object in our collection is a meditation on materiality, form, and function. We explore the subtle
                qualities of materials—how they respond to light, touch, and time—to create objects that reveal their
                beauty through everyday use and contemplation.
              </p>
              <p>
                Our designed objects emerge from a process of careful observation, material exploration, and thoughtful
                iteration. Each piece is crafted with attention to detail and a commitment to finding the essential
                qualities that give an object its presence and meaning.
              </p>
            </div>
          </motion.div>
          <motion.div className="relative aspect-[4/3]" variants={imageReveal}>
            <Image src="/placeholder.svg?key=4zzbx" alt="Designed objects collection" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/5"></div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Categories */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-12">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 border ${
                activeCategory === "all" ? "bg-black text-white" : "border-black hover:bg-black hover:text-white"
              } transition-colors`}
            >
              All Objects
            </button>
            <button
              onClick={() => setActiveCategory("ceramic")}
              className={`px-6 py-2 border ${
                activeCategory === "ceramic" ? "bg-black text-white" : "border-black hover:bg-black hover:text-white"
              } transition-colors`}
            >
              Ceramic
            </button>
            <button
              onClick={() => setActiveCategory("textile")}
              className={`px-6 py-2 border ${
                activeCategory === "textile" ? "bg-black text-white" : "border-black hover:bg-black hover:text-white"
              } transition-colors`}
            >
              Textile
            </button>
            <button
              onClick={() => setActiveCategory("wood")}
              className={`px-6 py-2 border ${
                activeCategory === "wood" ? "bg-black text-white" : "border-black hover:bg-black hover:text-white"
              } transition-colors`}
            >
              Wood
            </button>
            <button
              onClick={() => setActiveCategory("glass")}
              className={`px-6 py-2 border ${
                activeCategory === "glass" ? "bg-black text-white" : "border-black hover:bg-black hover:text-white"
              } transition-colors`}
            >
              Glass
            </button>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Featured Object */}
      {activeCategory === "all" && (
        <AnimatedSection>
          <motion.div variants={fadeIn} className="mb-20">
            <div className="relative">
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <motion.div variants={imageReveal} className="w-full h-full">
                  <Image src="/placeholder.svg?key=vyu3a" alt="Ceramic Vessel No. 3" fill className="object-cover" />
                </motion.div>
              </div>
              <div className="bg-white p-8 md:p-12 md:w-1/2 md:absolute md:bottom-12 md:right-12 shadow-lg">
                <div className="inline-block bg-[#fb4e4e] text-white px-3 py-1 text-sm mb-4">FEATURED OBJECT</div>
                <h2 className="text-3xl mb-4 font-light">Ceramic Vessel No. 3</h2>
                <p className="mb-6">
                  This hand-crafted ceramic vessel is the result of our material exploration into subtle texture
                  variations. Each piece is unique, with slight variations in texture and finish that catch and reflect
                  light in different ways throughout the day. The minimalist form allows the material qualities to take
                  center stage.
                </p>
                <Link
                  href="/designed-objects/ceramic-vessel-3"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
                >
                  Explore Object <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      )}

      {/* Objects Grid */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6 font-light">
            {activeCategory === "all"
              ? "Collection"
              : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) + " Objects"}
          </h2>
          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredObjects.map((object, index) => (
              <motion.div
                key={index}
                className="group"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <motion.div className="w-full h-full" whileHover={{ scale: 1.05, transition: { duration: 0.6 } }}>
                    <Image src={object.image || "/placeholder.svg"} alt={object.title} fill className="object-cover" />
                  </motion.div>
                </div>
                <div className="p-6 border-b border-l border-r border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-light">{object.title}</h3>
                    <span className="text-xs text-gray-500 uppercase">{object.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{object.description}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/designed-objects/${object.slug}`}
                      className="inline-flex items-center text-sm hover:text-[#fb4e4e] transition-colors"
                    >
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    <button className="text-sm text-[#fb4e4e] hover:underline transition-colors">Request Quote</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Craftsmanship Section */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6 font-light">Craftsmanship</h2>
          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.div variants={imageReveal} className="w-full h-full">
                <Image src="/placeholder.svg?key=1qlb8" alt="Craftsmanship" fill className="object-cover" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl mb-4 font-light">Handcrafted with Care</h3>
              <div className="prose prose-lg max-w-none">
                <p>
                  Each object in our collection is handcrafted by skilled artisans using traditional techniques and
                  contemporary approaches. We believe in the value of the human touch—the subtle variations and
                  imperfections that give each piece its unique character and soul.
                </p>
                <p>
                  We work with a small network of craftspeople who share our commitment to quality, sustainability, and
                  thoughtful making. Many of our objects are made in limited editions or as one-of-a-kind pieces,
                  reflecting our belief in creating objects that are meant to be cherished and that improve with age.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border-l-2 border-[#fb4e4e] pl-4">
                  <h4 className="font-medium mb-2">Materials</h4>
                  <p className="text-sm text-gray-600">
                    We source our materials with care, prioritizing natural, sustainable, and locally-sourced options
                    whenever possible.
                  </p>
                </div>
                <div className="border-l-2 border-[#fb4e4e] pl-4">
                  <h4 className="font-medium mb-2">Process</h4>
                  <p className="text-sm text-gray-600">
                    Our design process involves extensive material exploration, prototyping, and refinement to achieve
                    the perfect balance of form and function.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Commission Section */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <div className="bg-gray-50 p-12 rounded-lg">
            <h2 className="text-3xl mb-6 font-light">Custom Commissions</h2>
            <div className="accent-bar"></div>
            <p className="text-lg mb-8">
              In addition to our collection, we offer custom design and fabrication services for individuals and
              organizations seeking unique objects for specific contexts and needs. Our team works closely with clients
              to understand their requirements, preferences, and constraints, developing bespoke solutions that embody
              our design philosophy while addressing specific functional and aesthetic goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl mb-3 font-light">Residential Objects</h3>
                <p className="text-gray-600">
                  Custom-designed objects and furnishings for private residences, from lighting and vessels to furniture
                  and architectural elements.
                </p>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl mb-3 font-light">Commercial Spaces</h3>
                <p className="text-gray-600">
                  Distinctive objects and installations for hospitality, retail, and corporate environments that enhance
                  the experience of space.
                </p>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl mb-3 font-light">Limited Editions</h3>
                <p className="text-gray-600">
                  Collaborative projects with brands and institutions resulting in limited edition objects that embody
                  shared values and vision.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                Inquire About Commissions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Quote Request */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6 font-light">Request Information</h2>
          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-4 font-light">Acquisition Process</h3>
              <div className="prose prose-lg max-w-none">
                <p>
                  Our designed objects are available for acquisition by individuals, collectors, and institutions. Each
                  piece comes with documentation of its creation process, materials, and care instructions.
                </p>
                <p>
                  To inquire about availability, pricing, or to arrange a viewing, please contact us using the form or
                  via email at{" "}
                  <a href="mailto:objects@studiopoetics.com" className="text-[#fb4e4e] hover:underline">
                    objects@studiopoetics.com
                  </a>
                  .
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Inquiry</h4>
                    <p className="text-gray-600">
                      Contact us with your interest in specific objects or to discuss your needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Consultation</h4>
                    <p className="text-gray-600">
                      We'll provide detailed information and arrange a viewing if desired.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#fb4e4e] text-white flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Acquisition</h4>
                    <p className="text-gray-600">
                      We'll handle all details of payment, delivery, and installation if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl mb-6 font-light">Request Quote</h3>
              <p className="mb-6">
                Please provide the following information to receive pricing and availability for our designed objects.
              </p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="object" className="block text-sm font-medium mb-1">
                    Object of Interest
                  </label>
                  <select
                    id="object"
                    name="object"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                  >
                    <option value="">Select an object</option>
                    {designedObjects.map((object, index) => (
                      <option key={index} value={object.slug}>
                        {object.title}
                      </option>
                    ))}
                    <option value="custom">Custom Commission</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                    placeholder="Please share any specific requirements or questions you may have."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
                >
                  Submit Request <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  )
}
