"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function ExperimentClient({ experiment }: { experiment: any }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12"
    >
      <div className="mb-8">
        <h1 className="text-5xl font-normal">{experiment.title}</h1>
        <div className="accent-bar"></div>
      </div>
      <div className="border-t border-gray-200 mb-12"></div>
      <div className="relative aspect-[16/9] mb-12">
        <Image
          src={experiment.image}
          alt={experiment.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-xl text-gray-600 mb-12">{experiment.description}</p>
        <div className="space-y-6">
          {experiment.content.map((block: any, index: number) => (
            <motion.div key={index} variants={itemVariants}>
              {block.type === "paragraph" && (
                <p className="text-gray-800">{block.text}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 