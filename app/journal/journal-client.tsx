"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Refined animation variants for art-book feel
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.25, 0.25, 1], // Custom cubic-bezier for elegant easing
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 1],
    },
  },
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.25, 0.25, 0.25, 1],
    },
  },
}

function ArticleSection({ article, index }: { article: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // Subtle parallax effect for images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.article
      ref={ref}
      className="relative min-h-screen flex items-center py-32 border-b border-gray-200"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Date Label - Top Left */}
        <motion.div 
          className="absolute top-8 left-6 text-gray-800 text-sm font-medium tracking-widest"
          variants={itemVariants}
        >
          {article.date}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Visual - Centered */}
          <div className="lg:col-span-8 lg:col-start-1">
            <Link href={`/journal/${article.slug}`} className="block group">
              <motion.div 
                className="relative aspect-[16/10] bg-gray-100 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
                variants={imageVariants}
                style={{ y }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  quality={95}
                />
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </motion.div>
            </Link>
          </div>

          {/* Article Details - Right Column */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
            variants={itemVariants}
          >
            {/* Article Meta */}
            <div className="space-y-6">
              <motion.div 
                className="flex flex-col space-y-1"
                variants={itemVariants}
              >
                <span className="text-gray-700 text-xs uppercase tracking-widest font-semibold">
                  Category
                </span>
                <span className="text-gray-900 text-sm font-normal leading-relaxed">
                  {article.category}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col space-y-1"
                variants={itemVariants}
              >
                <span className="text-gray-700 text-xs uppercase tracking-widest font-semibold">
                  Read Time
                </span>
                <span className="text-gray-900 text-sm font-normal leading-relaxed">
                  {article.readTime}
                </span>
              </motion.div>
              
              {article.tags && (
                <motion.div 
                  className="flex flex-col space-y-1"
                  variants={itemVariants}
                >
                  <span className="text-gray-700 text-xs uppercase tracking-widest font-semibold">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Article Title and Description - Below Visual */}
        <motion.div 
          className="mt-16 max-w-4xl"
          variants={itemVariants}
        >
          <div className="flex items-end justify-between mb-6">
            <Link href={`/journal/${article.slug}`} className="group">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight group-hover:text-[#fb4e4e] transition-colors duration-300">
                {article.title}
              </h2>
            </Link>
            
            {/* External Link */}
            <Link href={`/journal/${article.slug}`} className="group">
              <div className="flex items-center justify-center w-36 h-36 rounded-full border border-gray-400 group-hover:border-[#fb4e4e] transition-colors duration-300">
                <ExternalLink className="w-8 h-8 text-gray-700 group-hover:text-[#fb4e4e] transition-colors duration-300" strokeWidth={0.5} />
              </div>
            </Link>
          </div>

          <motion.p 
            className="text-gray-800 text-lg leading-relaxed max-w-3xl font-normal"
            variants={itemVariants}
          >
            {article.excerpt}
          </motion.p>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function JournalClient() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="bg-white text-black min-h-screen">
      {/* Page Header */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="text-center max-w-4xl px-6">
          <motion.h1 
            className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.25, 0.25, 1] }}
          >
            JOURNAL
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
          >
            Thoughtful explorations on design, technology, and the poetry of everyday objects. 
            Our reflections on sense-making practices and creative innovation.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Article Sections */}
      {journalArticles.map((article, index) => (
        <ArticleSection key={article.slug} article={article} index={index} />
      ))}

      {/* Footer */}
      <motion.section 
        className="py-32 text-center border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-normal text-gray-800 mb-6">
          Follow our journey of exploration and discovery
        </h3>
        <Link 
          href="/about"
          className="inline-flex items-center gap-3 text-gray-900 hover:text-[#fb4e4e] transition-colors duration-300 text-lg font-medium"
        >
          Learn more about our practice
          <ExternalLink className="w-4 h-4" />
        </Link>
      </motion.section>
    </div>
  )
}

// Journal Articles Data
const journalArticles = [
  {
    title: "Building Technology with Empathy",
    slug: "technology-with-empathy",
    category: "Technology",
    date: "March 10, 2024",
    readTime: "5 min read",
    excerpt: "We create technology that serves people—not the other way around. Exploring how empathy can guide better design decisions in our increasingly digital world.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["empathy", "human-centered design", "technology ethics"]
  },
  {
    title: "The Gentle Future of Digital Interfaces",
    slug: "gentle-future-interfaces",
    category: "Design",
    date: "March 15, 2024",
    readTime: "7 min read",
    excerpt: "Exploring how minimalism and thoughtful design can create calming digital experiences that respect our attention and well-being.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["interface design", "minimalism", "digital wellness"]
  },
  {
    title: "Blockchain as a Design Material",
    slug: "blockchain-as-design-material",
    category: "Technology",
    date: "March 5, 2024",
    readTime: "6 min read",
    excerpt: "Understanding how blockchain can be approached as a material with unique properties for creating trust, transparency, and new forms of collaboration.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["blockchain", "design thinking", "emerging technology"]
  },
  {
    title: "The Poetry of Everyday Objects",
    slug: "poetry-everyday-objects",
    category: "Philosophy",
    date: "February 28, 2024",
    readTime: "4 min read",
    excerpt: "How the mundane objects around us carry stories, memories, and meaning. Finding beauty in the overlooked details of daily life.",
    image: "/placeholder.svg?height=800&width=1200",
    tags: ["everyday objects", "philosophy", "mindfulness"]
  }
]