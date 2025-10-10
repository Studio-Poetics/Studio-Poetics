"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { VideoSchema, CreativeWorkSchema } from "@/components/ai-seo-schemas"

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

function GameSection({ game, index }: { game: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // Subtle parallax effect for images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.section
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
          {game.date}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Visual - Centered */}
          <div className="lg:col-span-8 lg:col-start-1">
            <Link href={game.link} className="block group">
              <motion.div 
                className="relative aspect-[16/10] bg-gray-100 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
                variants={imageVariants}
                style={{ y }}
              >
                {game.slug === "monsoon-stories" ? (
                  <video
                    src="/monsoon letters 2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover"
                    quality={95}
                  />
                )}
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </motion.div>
            </Link>
          </div>

          {/* Game Details - Right Column */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
            variants={itemVariants}
          >
            {/* Game Meta */}
            <div className="space-y-6">
              {game.details.map((detail: any, idx: number) => (
                <motion.div 
                  key={idx}
                  className="flex flex-col space-y-1"
                  variants={itemVariants}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-gray-700 text-xs uppercase tracking-widest font-semibold">
                    {detail.label}
                  </span>
                  <span className="text-gray-900 text-sm font-normal leading-relaxed">
                    {detail.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Game Title and Description - Below Visual */}
        <motion.div 
          className="mt-16 max-w-4xl"
          variants={itemVariants}
        >
          <div className="flex items-end justify-between mb-6">
            <Link href={game.link} className="group">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight group-hover:text-[#fb4e4e] transition-colors duration-300">
                {game.title}
              </h2>
            </Link>
            
            {/* External Link */}
            <Link href={game.link} className="group">
              <div className="flex items-center justify-center w-36 h-36 rounded-full border border-gray-400 group-hover:border-[#fb4e4e] transition-colors duration-300">
                <ExternalLink className="w-8 h-8 text-gray-700 group-hover:text-[#fb4e4e] transition-colors duration-300" strokeWidth={0.5} />
              </div>
            </Link>
          </div>

          <motion.p 
            className="text-gray-800 text-lg leading-relaxed max-w-3xl font-normal"
            variants={itemVariants}
          >
            {game.description}
          </motion.p>
          
          {game.slug === "monsoon-stories" && (
            <motion.div 
              className="mt-8 p-6 bg-gray-50 rounded-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium mb-4 text-gray-900">Follow the Journey</h3>
              <p className="text-gray-700 mb-4">
                Join us as we develop this cozy monsoon experience. Follow our progress, behind-the-scenes content, and community discussions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.instagram.com/100_monsoon_stories/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#fb4e4e] text-white rounded-lg hover:bg-[#e63e3e] transition-colors"
                >
                  Follow on Instagram
                </a>
                <a 
                  href="https://reddit.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Join Reddit Discussions
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default function GamesClient() {
  const containerRef = useRef(null)

  return (
    <>
      <VideoSchema 
        name="Monsoon Stories - Game Trailer"
        description="A warm, cozy third-person game about reliving 100 monsoons and the stories within them from different perspectives"
        thumbnailUrl="https://poetics.studio/monsoon-thumbnail.jpg"
        uploadDate="2024-12-01"
        duration="PT2M30S"
        url="https://poetics.studio/monsoon%20letters%202.mp4"
      />
      <CreativeWorkSchema 
        name="Monsoon Stories"
        description="A meditative gaming experience about monsoons and storytelling"
        creator="Studio Poetics"
        dateCreated="2024-12-01"
        genre="Narrative Adventure"
        url="https://www.instagram.com/100_monsoon_stories/"
      />
      <CreativeWorkSchema 
        name="Rang-o: Valley of Flowers"
        description="A charming platformer journey through a serene garden with a colorful snail"
        creator="Studio Poetics"
        dateCreated="2024-11-01"
        genre="Platform Adventure"
        url="https://www.construct.net/en/free-online-games/rang-o-73069/play"
      />
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
            GAMES
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
          >
            Studio Poetics designs and develops games that are warm and gentle in nature. Our approach towards games is to appreciate the mundane and infra-ordinary. 
            We also design experimental games for our own inhouse developed hardware. 
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

      {/* Game Sections */}
      {gameProjects.map((game, index) => (
        <GameSection key={game.slug} game={game} index={index} />
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
          Every year we take limited commisions to co-develop games or Play-things.
        </h3>
        <Link 
          href="/contact"
          className="inline-flex items-center gap-3 text-gray-900 hover:text-[#fb4e4e] transition-colors duration-300 text-lg font-medium"
        >
          Let's create something playful
          <ExternalLink className="w-4 h-4" />
        </Link>
      </motion.section>
    </div>
    </>
  )
}

// Game Projects Data
const gameProjects = [
  {
    title: "Monsoon Stories",
    slug: "monsoon-stories",
    date: "December 2024",
    image: "/placeholder.svg?height=800&width=1200",
    link: "https://www.instagram.com/100_monsoon_stories/",
    description: "A warm, cozy third-person game about reliving 100 monsoons and the stories within them from different perspectives. Each monsoon carries its own narrative, memories, and emotions, creating an intimate exploration of time, weather, and human experience. Currently in development, this meditative gaming experience invites players to slow down and immerse themselves in the gentle rhythms of seasonal change.",
    details: [
      { label: "Platform", value: "PC, Mac" },
      { label: "Genre", value: "Narrative, Exploration" },
      { label: "Technology", value: "HTML5, Custom Weather System" },
      { label: "Development", value: "Ongoing" },
      { label: "Team", value: "2 designers, 1 developer" },
      { label: "Status", value: "Work in Progress" },
      { label: "Follow", value: "@100_monsoon_stories on Instagram" },
      { label: "Community", value: "Reddit discussions available" },
    ]
  },
  {
    title: "Rang-o: Valley of Flowers",
    slug: "valley-of-flowers",
    date: "November 2024",
    image: "/placeholder.svg?height=800&width=1200",
    link: "https://www.construct.net/en/free-online-games/rang-o-73069/play",
    description: "A charming and colorful snail, on a vibrant platformer journey through a serene garden brimming with life. Navigate through lush landscapes, avoiding adorable but untouchable insects, while collecting keys and unlocking new challenges.",
    details: [
      { label: "Platform", value: "Web, Mobile" },
      { label: "Genre", value: "Exploration, Narrative" },
      { label: "Technology", value: "HTML5" },
      { label: "Development", value: "8 weeks" },
      { label: "Team", value: "1 designers/developer" },
      { label: "Status", value: "Released alpha for testing" },
    ]
  },
]