"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Smartphone, Monitor, Tablet, Headphones, Heart, Eye, Zap, Users } from "lucide-react"
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

export default function DigitalExperienceClient() {
  const [activePlatform, setActivePlatform] = useState("mobile")

  const platforms = {
    mobile: {
      title: "Mobile Applications",
      icon: <Smartphone className="w-8 h-8" />,
      description: "Native and cross-platform mobile experiences that feel natural and delightful on every device.",
      capabilities: [
        "iOS and Android native development",
        "Cross-platform frameworks (React Native, Flutter)",
        "Progressive Web Apps (PWAs)",
        "Wearable device integration",
        "Offline-first design"
      ],
      expertise: ["Touch interactions", "Gesture design", "Performance optimization", "Platform guidelines", "Accessibility"]
    },
    web: {
      title: "Web Platforms",
      icon: <Monitor className="w-8 h-8" />,
      description: "Web applications and websites that work beautifully across all browsers and devices.",
      capabilities: [
        "Responsive web design",
        "Single-page applications (SPAs)",
        "Content management systems",
        "E-commerce platforms",
        "Web accessibility (WCAG compliance)"
      ],
      expertise: ["Modern CSS frameworks", "Performance optimization", "SEO integration", "Cross-browser compatibility", "Progressive enhancement"]
    },
    experimental: {
      title: "Experimental Interfaces",
      icon: <Headphones className="w-8 h-8" />,
      description: "Voice interfaces, AR/VR experiences, and emerging interaction paradigms that push the boundaries of digital design.",
      capabilities: [
        "Voice user interfaces (VUI)",
        "Augmented reality (AR) experiences",
        "Virtual reality (VR) applications",
        "Mixed reality interfaces",
        "Gesture-based interactions"
      ],
      expertise: ["Conversational design", "Spatial interactions", "Immersive storytelling", "Multi-modal experiences", "Emerging technologies"]
    },
    embedded: {
      title: "Embedded & IoT",
      icon: <Tablet className="w-8 h-8" />,
      description: "Interfaces for smart devices, appliances, and connected products that seamlessly integrate into daily life.",
      capabilities: [
        "Smart home interfaces",
        "Automotive dashboard design",
        "Appliance user interfaces",
        "Wearable device experiences",
        "Industrial control systems"
      ],
      expertise: ["Constraint-based design", "Physical-digital integration", "Real-time feedback", "Safety-critical interfaces", "Context awareness"]
    }
  }

  const designPrinciples = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Human-Centered",
      description: "Every design decision starts with understanding human needs, behaviors, and emotions.",
      practices: ["User research", "Empathy mapping", "Behavioral analysis", "Emotional design"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Clarity First",
      description: "Complex functionality made simple through thoughtful information architecture and visual hierarchy.",
      practices: ["Information architecture", "Visual hierarchy", "Progressive disclosure", "Cognitive load reduction"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Delightful Interactions",
      description: "Micro-interactions and animations that make using technology feel magical, not mechanical.",
      practices: ["Micro-interactions", "Animation design", "Feedback systems", "Surprise moments"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusive Design",
      description: "Experiences that work for everyone, regardless of ability, context, or device.",
      practices: ["Accessibility standards", "Universal design", "Multi-device consistency", "Cultural sensitivity"]
    }
  ]

  const projects = [
    {
      title: "Jar App - Micro-Investment Platform",
      category: "Mobile & Web",
      description: "A conversational interface that makes gold investment accessible through natural language interactions and behavioral psychology.",
      image: "/placeholder.svg?height=400&width=600",
      challenges: ["Complex financial concepts", "Trust building", "Behavioral nudging", "Regulatory compliance"],
      solutions: ["Conversational onboarding", "Visual investment tracking", "Gamified savings goals", "Educational content integration"],
      results: ["50% increase in user retention", "30% growth in investment amounts", "95% user satisfaction"]
    },
    {
      title: "Science City Interactive Exhibits",
      category: "Experimental",
      description: "Touch-screen and gesture-based interfaces for educational exhibits that adapt to different age groups and learning styles.",
      image: "/placeholder.svg?height=400&width=600",
      challenges: ["Multi-generational users", "Public environment durability", "Educational effectiveness", "Accessibility requirements"],
      solutions: ["Adaptive interfaces", "Gesture recognition", "Multi-language support", "Tactile feedback systems"],
      results: ["200% increase in exhibit engagement", "45% longer visit duration", "Improved learning outcomes"]
    },
    {
      title: "Blockchain Conference Platform",
      category: "Web",
      description: "A comprehensive event platform that made complex blockchain concepts accessible to diverse audiences.",
      image: "/placeholder.svg?height=400&width=600",
      challenges: ["Technical complexity", "Diverse audience", "Real-time interaction", "Content organization"],
      solutions: ["Progressive disclosure", "Visual explanations", "Interactive networking", "Smart content curation"],
      results: ["5000+ active participants", "90% completion rate", "Positive industry feedback"]
    }
  ]

  const process = [
    {
      phase: "Discover",
      duration: "1-2 weeks",
      activities: ["User research", "Stakeholder interviews", "Competitive analysis", "Technical assessment"],
      deliverables: ["Research findings", "User personas", "Journey maps", "Technical requirements"]
    },
    {
      phase: "Define",
      duration: "1 week",
      activities: ["Problem definition", "Design principles", "Success metrics", "Content strategy"],
      deliverables: ["Design brief", "Information architecture", "Content strategy", "Success metrics"]
    },
    {
      phase: "Design",
      duration: "3-6 weeks",
      activities: ["Wireframing", "Visual design", "Prototyping", "User testing"],
      deliverables: ["Wireframes", "Visual designs", "Interactive prototypes", "Design system"]
    },
    {
      phase: "Develop",
      duration: "4-12 weeks",
      activities: ["Frontend development", "Backend integration", "Testing", "Optimization"],
      deliverables: ["Functional application", "Documentation", "Testing reports", "Performance optimization"]
    },
    {
      phase: "Deploy",
      duration: "1-2 weeks",
      activities: ["Launch preparation", "Monitoring setup", "User onboarding", "Feedback collection"],
      deliverables: ["Live application", "Analytics dashboard", "User guides", "Support documentation"]
    }
  ]

  const currentPlatform = platforms[activePlatform as keyof typeof platforms]

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
                DIGITAL
                <br />
                <span className="text-[#fb4e4e] bricolage-font">EXPERIENCE</span>
                <br />
                DESIGN
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We design digital experiences that feel human, not just functional. From mobile apps to experimental interfaces, 
                we create technology interactions that connect people in meaningful, delightful ways.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20" variants={staggerContainer}>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">150+</div>
                <div className="text-gray-600">Digital Products</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">20</div>
                <div className="text-gray-600">Industries</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">95%</div>
                <div className="text-gray-600">User Satisfaction</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">8</div>
                <div className="text-gray-600">Platform Types</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Design Principles */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Our Design <span className="text-[#fb4e4e] bricolage-font">Principles</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                >
                  <div className="w-16 h-16 bg-[#fb4e4e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-[#fb4e4e]">{principle.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{principle.description}</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {principle.practices.map((practice, idx) => (
                      <li key={idx}>• {practice}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Platform Expertise */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-8 text-center" variants={fadeIn}>
              Platform <span className="text-[#fb4e4e] bricolage-font">Expertise</span>
            </motion.h2>
            <motion.p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto" variants={fadeIn}>
              We design for every screen and interaction model, from traditional devices to emerging interfaces.
            </motion.p>
            
            {/* Platform Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(platforms).map(([key, platform]) => (
                <button
                  key={key}
                  onClick={() => setActivePlatform(key)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    activePlatform === key
                      ? 'bg-[#fb4e4e] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {platform.icon}
                  {platform.title}
                </button>
              ))}
            </div>

            {/* Platform Details */}
            <motion.div
              key={activePlatform}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-3xl font-bold mb-4">{currentPlatform.title}</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{currentPlatform.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold mb-4">Capabilities:</h4>
                  <ul className="space-y-2">
                    {currentPlatform.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Our Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentPlatform.expertise.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt={currentPlatform.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Featured <span className="text-[#fb4e4e] bricolage-font">Projects</span>
            </motion.h2>
            
            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                  variants={fadeIn}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <span className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-[#fb4e4e]">Challenges:</h4>
                        <ul className="space-y-1 text-sm">
                          {project.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-gray-600">• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-[#fb4e4e]">Solutions:</h4>
                        <ul className="space-y-1 text-sm">
                          {project.solutions.map((solution, idx) => (
                            <li key={idx} className="text-gray-600">• {solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-700">Results:</h4>
                      <div className="space-y-1">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="text-sm text-green-600">• {result}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Process */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Our <span className="text-[#fb4e4e] bricolage-font">Process</span>
            </motion.h2>
            
            <div className="space-y-8">
              {process.map((phase, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-2xl"
                  variants={fadeIn}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#fb4e4e] text-white rounded-full flex items-center justify-center text-lg font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{phase.phase}</h3>
                          <span className="text-sm text-[#fb4e4e] font-medium">{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold mb-3">Activities:</h4>
                      <ul className="space-y-1 text-sm">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="text-gray-600">• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">Deliverables:</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                            {deliverable}
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

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-[#fb4e4e] text-white">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeIn}>
              Ready to Create Something Beautiful?
            </motion.h2>
            <motion.p className="text-xl mb-8 opacity-90" variants={fadeIn}>
              Let's design digital experiences that your users will love and remember. Whether it's a mobile app, web platform, or experimental interface, we're here to bring your vision to life.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                href="/contact"
                className="bg-white text-[#fb4e4e] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/consultancy"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#fb4e4e] transition-colors"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}