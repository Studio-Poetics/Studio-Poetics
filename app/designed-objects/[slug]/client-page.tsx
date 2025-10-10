"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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

export default function ObjectDetailPage({ object }: { object: any }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/designed-objects" className="inline-flex items-center gap-2 mb-8 hover:text-[#fb4e4e]">
          <ArrowLeft size={16} /> Back to Designed Objects
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative aspect-square">
            <Image
              src={object.images[selectedImage] || "/placeholder.svg"}
              alt={object.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {object.images.map((image, index) => (
              <motion.div
                key={index}
                className={`relative aspect-square cursor-pointer ${selectedImage === index ? "ring-2 ring-[#fb4e4e]" : ""}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${object.title} - view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-4xl font-normal mb-2">{object.title}</h1>
          <div className="accent-bar"></div>
          <p className="text-lg mb-8">{object.longDescription}</p>

          <div className="mb-8">
            <h3 className="text-xl mb-4">Details</h3>
            <ul className="space-y-2">
              {object.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#fb4e4e] mr-2">—</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <motion.button
              className="px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Request Quote
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-3xl mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {object.relatedProducts.map((slug, index) => (
            <motion.div key={index} className="bento-item" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <div className="relative aspect-square">
                <Image src="/placeholder.svg" alt="Related Product" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-normal mb-2">Related Product Title</h3>
                <Link href={`/designed-objects/${slug}`} className="inline-block text-sm hover:text-[#fb4e4e]">
                  View Object
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
