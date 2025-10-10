"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Clock, BookOpen, Briefcase, Lightbulb, Target, Heart } from "lucide-react"
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

export default function WorkshopsClient() {
  const [activeTab, setActiveTab] = useState<string>('upcoming')

  const upcomingWorkshops = [
    {
      title: "Blockchain for Beginners: Building Trust in Digital Systems",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Studio Poetics, Goa",
      participants: "12-15 people",
      level: "Beginner",
      price: "₹2,500",
      description: "Learn the fundamentals of blockchain technology and explore how it can create transparent, trustworthy systems for your organization.",
      topics: ["Blockchain basics", "Smart contracts", "Decentralized applications", "Use cases for businesses"],
      image: "/placeholder.svg?height=300&width=400",
      featured: true
    },
    {
      title: "AI Ethics Workshop: Designing Responsible Technology",
      date: "April 8, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Virtual",
      participants: "20-25 people",
      level: "Intermediate",
      price: "₹1,800",
      description: "Explore the ethical implications of AI and learn frameworks for developing responsible AI systems.",
      topics: ["AI bias", "Algorithmic fairness", "Privacy concerns", "Ethical frameworks"],
      image: "/placeholder.svg?height=300&width=400",
      featured: false
    },
    {
      title: "Design Thinking for Social Impact",
      date: "April 22, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Studio Poetics, Goa",
      participants: "15-20 people",
      level: "All levels",
      price: "₹3,000",
      description: "Apply design thinking methodologies to create solutions for real social challenges in your community.",
      topics: ["Human-centered design", "Problem framing", "Prototyping", "Community engagement"],
      image: "/placeholder.svg?height=300&width=400",
      featured: true
    }
  ]

  const pastWorkshops = [
    {
      title: "Understanding Web3: Beyond the Hype",
      date: "February 15, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Virtual",
      participants: "18 people",
      level: "Intermediate",
      description: "Demystified Web3 technologies and explored practical applications for businesses and creators.",
      topics: ["Web3 fundamentals", "DeFi basics", "NFTs explained", "Future of internet"],
      image: "/placeholder.svg?height=300&width=400",
      testimonial: {
        text: "This workshop gave me clarity on Web3 technologies without the overwhelming technical jargon. Perfect for business professionals!",
        author: "Priya Sharma, Product Manager"
      }
    },
    {
      title: "IoT and Smart Cities: Building Connected Communities",
      date: "January 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Science City, Kolkata",
      participants: "25 people",
      level: "Beginner",
      description: "Explored how Internet of Things can create smarter, more sustainable urban environments.",
      topics: ["IoT basics", "Smart city applications", "Sensor networks", "Data privacy"],
      image: "/placeholder.svg?height=300&width=400",
      testimonial: {
        text: "The hands-on activities made complex concepts accessible. I left with actionable ideas for my city planning work.",
        author: "Rajesh Kumar, Urban Planner"
      }
    }
  ]

  const workshopTypes = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Corporate Workshops",
      description: "Help your team understand and adopt emerging technologies strategically.",
      features: ["Custom curriculum", "On-site delivery", "Follow-up consulting", "Team building"]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Public Learning Sessions",
      description: "Open workshops for individuals to explore new technologies in a supportive environment.",
      features: ["Mixed skill levels", "Community building", "Affordable pricing", "Regular schedule"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Co-creation",
      description: "Collaborative sessions where communities design solutions for local challenges.",
      features: ["Participatory design", "Local focus", "Cross-sector collaboration", "Implementation support"]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative pt-20 pb-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8">
                COMMUNITY
                <br />
                <span className="text-[#fb4e4e] bricolage-font">INNOVATION</span>
                <br />
                LABS
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Collaborative spaces where diverse communities co-create solutions for local challenges. 
                We bridge technology, design, and social impact through participatory innovation and hands-on learning.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20" variants={staggerContainer}>
              {[
                { number: "500+", label: "Participants" },
                { number: "25+", label: "Workshops" },
                { number: "8", label: "Cities" },
                { number: "15", label: "Organizations" }
              ].map((stat, index) => (
                <motion.div key={index} className="text-center" variants={fadeIn}>
                  <div className="text-4xl font-bold text-[#fb4e4e] mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Workshop Types */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Our <span className="text-[#fb4e4e] bricolage-font">Approach</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workshopTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="text-[#fb4e4e] mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Workshop Listings */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-3 rounded-md transition-all duration-300 ${
                    activeTab === 'upcoming'
                      ? 'bg-[#fb4e4e] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upcoming Workshops
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 rounded-md transition-all duration-300 ${
                    activeTab === 'past'
                      ? 'bg-[#fb4e4e] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Past Workshops
                </button>
              </div>
            </div>

            {/* Upcoming Workshops */}
            {activeTab === 'upcoming' && (
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {upcomingWorkshops.map((workshop, index) => (
                  <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      workshop.featured ? 'border-[#fb4e4e] bg-gradient-to-r from-red-50 to-white' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                      <div className="lg:col-span-2">
                        {workshop.featured && (
                          <div className="inline-block bg-[#fb4e4e] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                            Featured Workshop
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-4">{workshop.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{workshop.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-[#fb4e4e]" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-[#fb4e4e]" />
                            <span>{workshop.participants}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Target className="w-4 h-4 mr-2 text-[#fb4e4e]" />
                            <span>{workshop.level}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Heart className="w-4 h-4 mr-2 text-[#fb4e4e]" />
                            <span>{workshop.price}</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                          <div className="flex flex-wrap gap-2">
                            {workshop.topics.map((topic, idx) => (
                              <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            href="/contact"
                            className="bg-[#fb4e4e] text-white px-6 py-3 rounded-lg hover:bg-[#e63e3e] transition-colors flex items-center justify-center"
                          >
                            Register Now
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            Learn More
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="sticky top-8">
                          <div className="bg-gray-100 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-[#fb4e4e] mb-2">{workshop.date.split(' ')[1]}</div>
                            <div className="text-sm text-gray-600 mb-1">{workshop.date.split(' ')[0]}</div>
                            <div className="text-sm text-gray-600 mb-4">{workshop.date.split(' ')[2]}</div>
                            <div className="text-sm text-gray-700">📍 {workshop.location}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Past Workshops */}
            {activeTab === 'past' && (
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {pastWorkshops.map((workshop, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-4">{workshop.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{workshop.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-medium">Date:</span> {workshop.date}
                        </div>
                        <div>
                          <span className="font-medium">Participants:</span> {workshop.participants}
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {workshop.level}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {workshop.location}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Topics Covered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {workshop.topics.map((topic, idx) => (
                            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {workshop.testimonial && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm italic mb-2">"{workshop.testimonial.text}"</p>
                          <p className="text-xs text-gray-600 font-medium">— {workshop.testimonial.author}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-[#fb4e4e] text-white">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeIn}>
              Ready to Learn Together?
            </motion.h2>
            <motion.p className="text-xl mb-8 opacity-90" variants={fadeIn}>
              Join our community of learners, makers, and changemakers. Whether you're looking to understand new technologies or solve local challenges, we're here to support your journey.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                href="/contact"
                className="bg-white text-[#fb4e4e] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Book a Workshop
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#fb4e4e] transition-colors"
              >
                Learn About Us
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}