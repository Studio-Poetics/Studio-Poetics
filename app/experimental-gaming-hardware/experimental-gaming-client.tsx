"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Coffee, Refrigerator, Utensils, Home, Heart, Play, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

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

export default function ExperimentalGamingClient() {
  const [activeCategory, setActiveCategory] = useState("kitchen")

  const gamingPlatforms = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Kitchen Gaming",
      category: "kitchen",
      description: "Transform cooking and meal times into playful, social experiences.",
      examples: [
        "Recipe adventure games on smart countertops",
        "Timer-based cooking challenges on stovetops", 
        "Collaborative meal planning games for families",
        "Ingredient matching puzzles on cutting boards"
      ]
    },
    {
      icon: <Refrigerator className="w-8 h-8" />,
      title: "Fridge Door Experiences",
      category: "fridge",
      description: "Turn the most-visited appliance into a family gaming hub.",
      examples: [
        "Daily puzzle games that change with meals",
        "Family message boards with gamified elements",
        "Grocery list adventures and shopping quests",
        "Seasonal cooking challenges and achievements"
      ]
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Table & Surface Games", 
      category: "table",
      description: "Coffee tables, dining tables, and desks become interactive play surfaces.",
      examples: [
        "Morning coffee ritual games for gentle wake-ups",
        "Dinner table conversation starters and games",
        "Work break mini-games for productive pauses",
        "Collaborative drawing and storytelling surfaces"
      ]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Living Space Integration",
      category: "living",
      description: "Ambient gaming that responds to daily rhythms and activities.",
      examples: [
        "Morning light puzzles that help with wake-up routines",
        "Evening wind-down games that promote relaxation",
        "Background music games that respond to activities",
        "Weather-responsive games that connect to the outdoors"
      ]
    }
  ]

  const projects = [
    {
      title: "Morning Coffee Ritual",
      surface: "Coffee Machine",
      description: "A gentle wake-up game that plays while coffee brews, featuring breathing exercises and daily intention-setting through simple touch interactions.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "3-5 minutes",
      players: "1 person",
      mood: "Meditative",
      features: ["Breathing guidance", "Daily affirmations", "Progress tracking", "Seasonal variations"]
    },
    {
      title: "Dinner Table Stories",
      surface: "Dining Table",
      description: "A storytelling game that appears during family meals, prompting creative story-building and conversation through embedded LED strips and touch sensors.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "15-30 minutes",
      players: "2-6 people",
      mood: "Social",
      features: ["Story prompts", "Turn-based play", "Memory keeping", "Age-adaptive content"]
    },
    {
      title: "Fridge Door Garden",
      surface: "Refrigerator Door",
      description: "A virtual garden that grows based on healthy eating habits and family activities, creating gentle motivation for better nutrition.",
      image: "/placeholder.svg?height=400&width=600",
      duration: "Ongoing",
      players: "Whole family",
      mood: "Nurturing",
      features: ["Habit tracking", "Seasonal changes", "Family goals", "Nutritional guidance"]
    }
  ]

  const designPrinciples = [
    {
      title: "Cozy First",
      description: "Every game should feel like a warm hug, not a competitive challenge. We prioritize comfort and joy over achievement and scores."
    },
    {
      title: "Everyday Integration", 
      description: "Games seamlessly blend into daily routines, enhancing rather than interrupting the natural flow of life."
    },
    {
      title: "Family-Centered",
      description: "Designed for all ages and abilities, fostering connection and shared experiences across generations."
    },
    {
      title: "Gentle Technology",
      description: "Technology that whispers rather than shouts, using subtle interactions and ambient feedback."
    }
  ]

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "kitchen") return project.surface.includes("Coffee") || project.surface.includes("Table")
    if (activeCategory === "fridge") return project.surface.includes("Refrigerator")
    if (activeCategory === "table") return project.surface.includes("Table")
    if (activeCategory === "living") return project.surface.includes("Room")
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative pt-20 pb-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <span className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase mb-4 block">
                Service
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8">
                EXPERIMENTAL
                <br />
                <span className="text-[#fb4e4e] bricolage-font">GAMING</span>
                <br />
                HARDWARE
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We design cozy, warm games for unconventional surfaces—fridge doors, coffee tables, kitchen appliances. 
                Play reimagined for the spaces where we actually live, creating intimate gaming experiences in everyday objects.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" variants={staggerContainer}>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">15+</div>
                <div className="text-gray-600">Gaming Prototypes</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">8</div>
                <div className="text-gray-600">Household Surfaces</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">100+</div>
                <div className="text-gray-600">Families Tested</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Design Philosophy */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Our <span className="text-[#fb4e4e] bricolage-font">Philosophy</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                >
                  <div className="w-16 h-16 bg-[#fb4e4e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#fb4e4e]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Gaming Platforms */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Gaming <span className="text-[#fb4e4e] bricolage-font">Platforms</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gamingPlatforms.map((platform, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg hover:border-[#fb4e4e] transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="text-[#fb4e4e] mb-4">{platform.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{platform.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{platform.description}</p>
                  <ul className="space-y-2">
                    {platform.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Play className="w-4 h-4 text-[#fb4e4e] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-8 text-center" variants={fadeIn}>
              Featured <span className="text-[#fb4e4e] bricolage-font">Projects</span>
            </motion.h2>
            <motion.p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto" variants={fadeIn}>
              Real prototypes we've built and tested with families in their homes.
            </motion.p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#fb4e4e] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.surface}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-800">Duration:</span>
                        <div className="text-gray-600">{project.duration}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Players:</span>
                        <div className="text-gray-600">{project.players}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Mood:</span>
                        <div className="text-gray-600">{project.mood}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Technology & Materials */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Technology & <span className="text-[#fb4e4e] bricolage-font">Materials</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div className="text-center p-6" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#fb4e4e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-[#fb4e4e]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Gentle Interactions</h3>
                <p className="text-gray-600 mb-4">Touch, gesture, and proximity sensing that feels natural and unobtrusive</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Capacitive touch surfaces</li>
                  <li>• Proximity sensing</li>
                  <li>• Gentle vibration feedback</li>
                  <li>• Voice recognition</li>
                </ul>
              </motion.div>
              
              <motion.div className="text-center p-6" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#fb4e4e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#fb4e4e]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Warm Aesthetics</h3>
                <p className="text-gray-600 mb-4">Visual design that complements home environments with soft, warm lighting</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Warm LED lighting</li>
                  <li>• Natural material integration</li>
                  <li>• Subtle visual feedback</li>
                  <li>• Adaptive brightness</li>
                </ul>
              </motion.div>
              
              <motion.div className="text-center p-6" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#fb4e4e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-[#fb4e4e]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Home Integration</h3>
                <p className="text-gray-600 mb-4">Seamless integration into existing appliances and furniture</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Retrofit-friendly designs</li>
                  <li>• Wireless connectivity</li>
                  <li>• Low power consumption</li>
                  <li>• Easy maintenance</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-[#fb4e4e] text-white">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeIn}>
              Bring Play Home
            </motion.h2>
            <motion.p className="text-xl mb-8 opacity-90" variants={fadeIn}>
              Ready to transform your living space into a playful, connected environment? Let's explore how gaming can become part of your daily rhythms.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                href="/contact"
                className="bg-white text-[#fb4e4e] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/games"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#fb4e4e] transition-colors"
              >
                View Our Games
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}