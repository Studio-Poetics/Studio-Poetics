"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Target, Users, Lightbulb, TrendingUp, Shield, Clock, CheckCircle } from "lucide-react"
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

export default function TechnologyStrategyClient() {
  const [activeService, setActiveService] = useState("assessment")

  const services = {
    assessment: {
      title: "Technology Readiness Assessment",
      duration: "2-3 weeks",
      description: "A comprehensive evaluation of your current technology landscape and readiness for emerging tech adoption.",
      process: [
        "Current technology audit",
        "Team capability assessment", 
        "Market opportunity analysis",
        "Risk and readiness evaluation",
        "Prioritized roadmap creation"
      ],
      deliverables: [
        "Technology readiness report",
        "Capability gap analysis",
        "Strategic recommendations",
        "Implementation timeline"
      ]
    },
    workshops: {
      title: "Executive Strategy Workshops",
      duration: "1-2 days",
      description: "Intensive collaborative sessions that align leadership teams around technology strategy and future vision.",
      process: [
        "Pre-workshop stakeholder interviews",
        "Facilitated strategy sessions",
        "Emerging technology exploration",
        "Decision-making frameworks",
        "Action plan development"
      ],
      deliverables: [
        "Aligned technology vision",
        "Strategic decision framework",
        "Investment priorities",
        "Team action plans"
      ]
    },
    planning: {
      title: "Long-term Strategic Planning",
      duration: "6-12 weeks",
      description: "Comprehensive strategic planning that positions your organization for sustainable technology adoption over 3-5 years.",
      process: [
        "Industry trend analysis",
        "Scenario planning exercises",
        "Technology investment modeling",
        "Capability building roadmap",
        "Performance metrics design"
      ],
      deliverables: [
        "5-year technology strategy",
        "Investment framework",
        "Capability roadmap",
        "Success metrics"
      ]
    }
  }

  const approaches = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Beyond the Hype",
      description: "We cut through marketing noise to focus on technologies that actually solve real problems for your organization.",
      principles: ["Evidence-based evaluation", "Real-world case studies", "Honest risk assessment", "Practical timelines"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Sustainable Adoption",
      description: "Our strategies prioritize long-term value over short-term gains, ensuring your technology investments remain valuable.",
      principles: ["Future-proof planning", "Gradual implementation", "Team capability building", "Continuous adaptation"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-Centered Strategy",
      description: "Technology serves people, not the other way around. We ensure your strategy considers human impact and adoption.",
      principles: ["Change management focus", "User experience priority", "Team engagement", "Cultural alignment"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Business Value Focus",
      description: "Every technology decision should drive clear business value. We help you identify and measure what matters.",
      principles: ["ROI clarity", "Measurable outcomes", "Strategic alignment", "Risk mitigation"]
    }
  ]

  const emergingTech = [
    {
      category: "Artificial Intelligence",
      maturity: "Early Adoption",
      applications: ["Process automation", "Customer insights", "Decision support", "Content generation"],
      considerations: ["Data requirements", "Ethical implications", "Team training", "Gradual implementation"]
    },
    {
      category: "Spatial Computing",
      maturity: "Experimental",
      applications: ["Remote collaboration", "Training simulation", "Data visualization", "Customer experience"],
      considerations: ["Hardware investment", "Content creation", "User acceptance", "Technical integration"]
    },
    {
      category: "Blockchain & Web3",
      maturity: "Selective Adoption",
      applications: ["Supply chain transparency", "Digital identity", "Smart contracts", "Community building"],
      considerations: ["Regulatory landscape", "Energy consumption", "Technical complexity", "Market volatility"]
    },
    {
      category: "IoT & Edge Computing",
      maturity: "Mainstream",
      applications: ["Operational efficiency", "Predictive maintenance", "Environmental monitoring", "User analytics"],
      considerations: ["Security protocols", "Data management", "Network infrastructure", "Privacy compliance"]
    }
  ]

  const successStories = [
    {
      client: "Mid-size Manufacturing Company",
      challenge: "Needed to modernize operations but unsure about Industry 4.0 investments",
      solution: "12-week strategic planning engagement focusing on gradual automation adoption",
      outcome: "30% efficiency improvement over 18 months with controlled investment risk"
    },
    {
      client: "Educational Institution",
      challenge: "Pressure to adopt multiple new technologies without clear strategy",
      solution: "Technology readiness assessment and prioritized roadmap development",
      outcome: "Focused technology adoption that improved student outcomes while reducing costs"
    },
    {
      client: "Healthcare Organization",
      challenge: "Balancing innovation with regulatory compliance and patient safety",
      solution: "Executive workshops and phased implementation planning",
      outcome: "Successful digital transformation with zero compliance issues"
    }
  ]

  const currentService = services[activeService as keyof typeof services]

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
                TECHNOLOGY
                <br />
                <span className="text-[#fb4e4e] bricolage-font">STRATEGY</span>
                <br />
                WORKSHOPS
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We help businesses navigate emerging technology without the hype or fear. Our strategic workshops and consulting focus on sustainable adoption—strategies that last, not trends that fade.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20" variants={staggerContainer}>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">200+</div>
                <div className="text-gray-600">Organizations Guided</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">85%</div>
                <div className="text-gray-600">Strategy Success Rate</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">15</div>
                <div className="text-gray-600">Technology Domains</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-2">3-5</div>
                <div className="text-gray-600">Year Planning Horizon</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Approach */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Our <span className="text-[#fb4e4e] bricolage-font">Approach</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {approaches.map((approach, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="text-[#fb4e4e] mb-4">{approach.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{approach.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{approach.description}</p>
                  <ul className="space-y-2">
                    {approach.principles.map((principle, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-[#fb4e4e] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{principle}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-8 text-center" variants={fadeIn}>
              Our <span className="text-[#fb4e4e] bricolage-font">Services</span>
            </motion.h2>
            <motion.p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto" variants={fadeIn}>
              Choose the engagement model that best fits your organization's needs and timeline.
            </motion.p>
            
            {/* Service Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-lg">
                {Object.entries(services).map(([key, service]) => (
                  <button
                    key={key}
                    onClick={() => setActiveService(key)}
                    className={`px-6 py-3 rounded-md transition-all duration-300 ${
                      activeService === key
                        ? 'bg-[#fb4e4e] text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <motion.div
              key={activeService}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">{currentService.title}</h3>
                  <span className="bg-[#fb4e4e] text-white px-3 py-1 rounded-full text-sm">
                    {currentService.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{currentService.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#fb4e4e]" />
                    Process Overview
                  </h4>
                  <ul className="space-y-3">
                    {currentService.process.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-[#fb4e4e] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#fb4e4e]" />
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {currentService.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#fb4e4e] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt={currentService.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Emerging Technologies */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Emerging <span className="text-[#fb4e4e] bricolage-font">Technologies</span> We Track
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {emergingTech.map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#fb4e4e] transition-all duration-300"
                  variants={fadeIn}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{tech.category}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tech.maturity === 'Mainstream' ? 'bg-green-100 text-green-700' :
                      tech.maturity === 'Early Adoption' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tech.maturity}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Applications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.applications.map((app, idx) => (
                        <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Considerations:</h4>
                    <ul className="space-y-1">
                      {tech.considerations.map((consideration, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-[#fb4e4e] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Success Stories */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-16 text-center" variants={fadeIn}>
              Success <span className="text-[#fb4e4e] bricolage-font">Stories</span>
            </motion.h2>
            
            <div className="space-y-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-2xl"
                  variants={fadeIn}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-semibold text-[#fb4e4e] mb-2">Client</h3>
                      <p className="text-gray-700">{story.client}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#fb4e4e] mb-2">Challenge</h3>
                      <p className="text-gray-700">{story.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#fb4e4e] mb-2">Solution</h3>
                      <p className="text-gray-700 mb-4">{story.solution}</p>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-green-700 mb-1">Outcome</h4>
                        <p className="text-green-600 text-sm">{story.outcome}</p>
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
              Ready to Plan Your Tech Future?
            </motion.h2>
            <motion.p className="text-xl mb-8 opacity-90" variants={fadeIn}>
              Let's cut through the hype and build a technology strategy that actually works for your organization. No buzzwords, just practical guidance.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                href="/contact"
                className="bg-white text-[#fb4e4e] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Start Strategy Discussion
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/workshops"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#fb4e4e] transition-colors"
              >
                View Our Workshops
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}