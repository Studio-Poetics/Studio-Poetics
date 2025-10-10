"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Eye, Layers, Zap, Monitor, Building, Home, Museum } from "lucide-react"
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

export default function HolographicClient() {
  const [activeTab, setActiveTab] = useState("museums")

  const applications = {
    museums: {
      title: "Museums & Galleries",
      icon: <Museum className="w-8 h-8" />,
      description: "Transform static exhibits into dynamic, interactive experiences that adapt to visitor interests.",
      features: [
        "Interactive artifact storytelling",
        "Multi-language content adaptation", 
        "Visitor behavior analytics",
        "Contextual information display",
        "Group interaction capabilities"
      ],
      caseStudy: {
        title: "Science City Interactive Pavilion",
        description: "We installed 12 Glasscape units throughout Science City Kolkata, creating an interconnected narrative experience about climate science.",
        results: ["200% increase in visitor engagement", "45% longer average visit duration", "95% positive visitor feedback"]
      }
    },
    offices: {
      title: "Corporate Offices",
      icon: <Building className="w-8 h-8" />,
      description: "Enhance collaboration and productivity with holographic meeting spaces and information displays.",
      features: [
        "3D data visualization",
        "Remote collaboration holograms",
        "Interactive presentation tools",
        "Real-time information displays",
        "Privacy-focused design"
      ],
      caseStudy: {
        title: "Future Workspace Initiative",
        description: "A 6-month pilot program with a tech startup, transforming their meeting rooms with holographic collaboration tools.",
        results: ["30% more effective remote meetings", "50% faster design iteration", "Improved team satisfaction"]
      }
    },
    homes: {
      title: "Residential Spaces",
      icon: <Home className="w-8 h-8" />,
      description: "Bring the magic of holography into living spaces for entertainment, education, and daily information.",
      features: [
        "Family photo and video displays",
        "Educational content for children",
        "Ambient information panels",
        "Interactive art installations",
        "Home automation interfaces"
      ],
      caseStudy: {
        title: "Connected Family Home",
        description: "A year-long installation in a family home, studying how holographic displays integrate into daily life.",
        results: ["Improved family interaction time", "Enhanced learning engagement", "Seamless daily routine integration"]
      }
    }
  }

  const technicalSpecs = [
    {
      spec: "Display Resolution",
      value: "4K per layer",
      description: "Crystal clear imagery with depth"
    },
    {
      spec: "Viewing Angle",
      value: "270 degrees",
      description: "Multi-person viewing capability"
    },
    {
      spec: "Depth Layers",
      value: "Up to 8 layers",
      description: "Rich 3D content display"
    },
    {
      spec: "Response Time",
      value: "< 16ms",
      description: "Real-time interaction"
    },
    {
      spec: "Operating Hours",
      value: "24/7 capable",
      description: "Commercial grade reliability"
    },
    {
      spec: "Power Consumption",
      value: "150W average",
      description: "Energy efficient operation"
    }
  ]

  const glascapeFeatures = [
    {
      title: "Pepper's Ghost Technology",
      description: "Our advanced implementation of Pepper's Ghost creates stunning floating holograms visible from multiple angles without special glasses.",
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: "Multi-Layer Projection",
      description: "Stack multiple transparent layers to create complex 3D scenes with incredible depth and detail.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: "Interactive Sensing",
      description: "Built-in sensors detect hand gestures, eye tracking, and proximity for natural interaction with holographic content.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Modular Design",
      description: "Scalable system that can be configured for small displays or large installation walls.",
      icon: <Monitor className="w-6 h-6" />
    }
  ]

  const currentApplication = applications[activeTab as keyof typeof applications]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative pt-20 pb-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <span className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase mb-4 block">
                Product
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8">
                <span className="text-[#fb4e4e] bricolage-font">GLASSCAPE</span>
                <br />
                HOLOGRAPHIC
                <br />
                DISPLAYS
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Our proprietary holographic display system transforms museums, offices, and homes with immersive 3D experiences. 
                Years of research and development have created displays that feel magical yet practical for everyday use.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20" variants={staggerContainer}>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">500+</div>
                <div className="text-gray-600">Units Deployed</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">25</div>
                <div className="text-gray-600">Partner Locations</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">3</div>
                <div className="text-gray-600">Years Development</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Glasscape Features */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Glasscape <span className="text-[#fb4e4e] bricolage-font">Technology</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {glascapeFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="text-[#fb4e4e] mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Applications */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-8 text-center" variants={fadeIn}>
              Real-World <span className="text-[#fb4e4e] bricolage-font">Applications</span>
            </motion.h2>
            <motion.p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto" variants={fadeIn}>
              From intimate home installations to large-scale museum experiences, Glasscape adapts to any environment.
            </motion.p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-lg">
                {Object.entries(applications).map(([key, app]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${
                      activeTab === key
                        ? 'bg-[#fb4e4e] text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {app.icon}
                    {app.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-3xl font-bold mb-4">{currentApplication.title}</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{currentApplication.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    {currentApplication.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-[#fb4e4e] rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fb4e4e] bg-opacity-10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-[#fb4e4e]">Case Study: {currentApplication.caseStudy.title}</h4>
                  <p className="text-gray-700 mb-4">{currentApplication.caseStudy.description}</p>
                  <div className="space-y-1">
                    {currentApplication.caseStudy.results.map((result, idx) => (
                      <div key={idx} className="text-sm text-gray-600">• {result}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt={currentApplication.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Technical Specifications */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Technical <span className="text-[#fb4e4e] bricolage-font">Specifications</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200"
                  variants={fadeIn}
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{spec.spec}</h3>
                  <div className="text-2xl font-bold text-[#fb4e4e] mb-1">{spec.value}</div>
                  <p className="text-sm text-gray-600">{spec.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Development Process */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              From Concept to <span className="text-[#fb4e4e] bricolage-font">Reality</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeIn}>
                <h3 className="text-3xl font-bold mb-6">Three Years of Innovation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  Glasscape began as an experimental project to make holographic displays practical for everyday use. 
                  Through hundreds of prototypes and installations, we've refined the technology to be both magical and reliable.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#fb4e4e] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Research & Prototyping</h4>
                      <p className="text-gray-600 text-sm">Experimenting with projection techniques and materials</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#fb4e4e] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Field Testing</h4>
                      <p className="text-gray-600 text-sm">Real-world installations and user feedback integration</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#fb4e4e] text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Commercial Production</h4>
                      <p className="text-gray-600 text-sm">Scaling for museums, offices, and residential installations</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden"
                variants={fadeIn}
              >
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Glasscape development process"
                  fill
                  className="object-cover"
                />
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
              Experience Glasscape
            </motion.h2>
            <motion.p className="text-xl mb-8 opacity-90" variants={fadeIn}>
              Ready to transform your space with holographic displays? Let's discuss how Glasscape can create immersive experiences for your specific needs.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                href="/contact"
                className="bg-white text-[#fb4e4e] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Request Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/spatial-interaction-design"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#fb4e4e] transition-colors"
              >
                Spatial Design Services
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}