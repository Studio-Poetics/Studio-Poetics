"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

interface JournalArticleProps {
  article: {
    title: string
    date: string
    category: string
    excerpt: string
    image: string
    content: Array<{
      type: "paragraph" | "list" | "subheading"
      text?: string
      items?: string[]
    }>
  }
}

export default function JournalArticleClient({ article }: JournalArticleProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link href="/journal" className="inline-flex items-center text-sm hover:text-[#fb4e4e] mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journal
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-[#fb4e4e] mb-4">{article.category}</div>
            <h1 className="text-4xl md:text-5xl font-normal mb-4">{article.title}</h1>
            <div className="text-sm text-gray-600">{article.date}</div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-12">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="space-y-6">
            {article.content.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {block.type === "paragraph" && (
                  <p className="text-lg leading-relaxed text-gray-800">{block.text}</p>
                )}
                {block.type === "subheading" && (
                  <h2 className="text-2xl font-normal mt-8 mb-4 text-gray-900">{block.text}</h2>
                )}
                {block.type === "list" && block.items && (
                  <ul className="list-disc pl-6 space-y-2">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-lg leading-relaxed text-gray-800">{item}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  )
} 