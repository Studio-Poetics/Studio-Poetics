"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

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
      ease: [0.25, 0.25, 0.25, 1],
      staggerChildren: 0.15,
    },
  },
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ConversationalUIPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Back Navigation */}
          <motion.div 
            className="absolute top-8 left-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/consultancy" 
              className="inline-flex items-center text-gray-600 hover:text-[#fb4e4e] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Consultancy
            </Link>
          </motion.div>

          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase">
                UX Design & Financial Technology
              </span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Conversational UI for<br />
              <span className="text-[#fb4e4e] bricolage-font">Micro-Investing</span><br />
              in Gold
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 font-normal max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Designing intuitive conversation interfaces that make gold micro-investing 
              accessible, human, and financially empowering for everyday users.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <AnimatedSection>
        <section className="py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeIn}>
                <h2 className="text-4xl md:text-5xl font-light mb-8">
                  Making <span className="text-[#fb4e4e] bricolage-font">Finance</span> Conversational
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Traditional investment platforms often intimidate new users with complex interfaces 
                  and financial jargon. Our challenge was to design a conversational UI that transforms 
                  gold micro-investing into natural, friendly dialogue.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Through careful conversation design and user psychology research, we created an 
                  interface that feels less like a financial product and more like getting advice 
                  from a trusted friend who happens to know a lot about gold investing.
                </p>
              </motion.div>
              
              <motion.div 
                className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden"
                variants={fadeIn}
              >
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Conversational UI Interface"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Challenge */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-light text-center mb-16"
              variants={fadeIn}
            >
              The <span className="text-[#fb4e4e] bricolage-font">Challenge</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Financial Anxiety</h3>
                <p className="text-gray-700">
                  Many users feel overwhelmed by investment decisions and fear making costly mistakes with their money.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Complex Terminology</h3>
                <p className="text-gray-700">
                  Traditional platforms use financial jargon that creates barriers for new investors.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Trust & Education</h3>
                <p className="text-gray-700">
                  Users need to understand gold investing while building confidence in the platform.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Design Process */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-light text-center mb-16"
              variants={fadeIn}
            >
              Design <span className="text-[#fb4e4e] bricolage-font">Process</span>
            </motion.h2>

            <div className="space-y-20">
              {/* User Research */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={fadeIn}>
                  <div className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase mb-4">
                    01. User Research
                  </div>
                  <h3 className="text-3xl font-light mb-6">Understanding Financial Behavior</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    We conducted in-depth interviews with potential users to understand their financial 
                    habits, concerns, and communication preferences. Key insights included the importance 
                    of educational content and the need for transparency in financial recommendations.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li>• 24 user interviews across different demographics</li>
                    <li>• Analysis of existing investment app usage patterns</li>
                    <li>• Identification of emotional triggers and barriers</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden"
                  variants={fadeIn}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="User Research Process"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Conversation Design */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden order-2 lg:order-1"
                  variants={fadeIn}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Conversation Design"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.div className="order-1 lg:order-2" variants={fadeIn}>
                  <div className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase mb-4">
                    02. Conversation Design
                  </div>
                  <h3 className="text-3xl font-light mb-6">Crafting Natural Dialogue</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    We developed conversation flows that mirror how people naturally discuss money 
                    with trusted advisors. The tone is warm, supportive, and educational rather 
                    than sales-focused.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Persona development for the AI assistant</li>
                    <li>• Conversation flow mapping for various scenarios</li>
                    <li>• Error handling and clarification strategies</li>
                  </ul>
                </motion.div>
              </div>

              {/* Interface Design */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={fadeIn}>
                  <div className="text-[#fb4e4e] text-sm font-medium tracking-widest uppercase mb-4">
                    03. Interface Design
                  </div>
                  <h3 className="text-3xl font-light mb-6">Visual Conversation Framework</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    The visual design supports the conversational experience with clear message 
                    hierarchies, gentle animations, and intuitive input methods that make complex 
                    financial concepts feel approachable.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Chat interface optimized for financial content</li>
                    <li>• Interactive elements for investment amounts</li>
                    <li>• Visual feedback for investment progress</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden"
                  variants={fadeIn}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Interface Design"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Key Features */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-light text-center mb-16"
              variants={fadeIn}
            >
              Key <span className="text-[#fb4e4e] bricolage-font">Features</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Smart Onboarding</h3>
                <p className="text-gray-700 mb-4">
                  Conversational onboarding that learns user preferences and financial goals 
                  through natural dialogue.
                </p>
                <div className="text-[#fb4e4e] text-sm font-medium">Interactive • Educational</div>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Micro-Investment Guidance</h3>
                <p className="text-gray-700 mb-4">
                  AI-powered suggestions for small, regular investments based on spending 
                  patterns and financial capacity.
                </p>
                <div className="text-[#fb4e4e] text-sm font-medium">Personalized • Smart</div>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Educational Content</h3>
                <p className="text-gray-700 mb-4">
                  Contextual learning materials delivered through conversation, making 
                  gold investing knowledge accessible.
                </p>
                <div className="text-[#fb4e4e] text-sm font-medium">Contextual • Accessible</div>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
                <p className="text-gray-700 mb-4">
                  Visual and conversational updates on investment performance with 
                  clear, jargon-free explanations.
                </p>
                <div className="text-[#fb4e4e] text-sm font-medium">Clear • Motivating</div>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Safety Features</h3>
                <p className="text-gray-700 mb-4">
                  Built-in safeguards and confirmation dialogues that protect users 
                  from impulsive financial decisions.
                </p>
                <div className="text-[#fb4e4e] text-sm font-medium">Protective • Thoughtful</div>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Support Integration</h3>
                <p className="text-gray-700 mb-4">
                  Seamless escalation to human advisors when complex questions 
                  require personal attention.
                </p>
                <div className="text-[#fb4e4e] text-sm font-medium">Human • Supportive</div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Results */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-light text-center mb-16"
              variants={fadeIn}
            >
              Project <span className="text-[#fb4e4e] bricolage-font">Impact</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="text-center p-8"
                variants={fadeIn}
              >
                <div className="text-4xl font-light text-[#fb4e4e] mb-4">73%</div>
                <div className="text-lg font-medium mb-2">User Confidence Increase</div>
                <div className="text-gray-600 text-sm">
                  Users reported feeling more confident about gold investing after using the conversational interface.
                </div>
              </motion.div>

              <motion.div 
                className="text-center p-8"
                variants={fadeIn}
              >
                <div className="text-4xl font-light text-[#fb4e4e] mb-4">85%</div>
                <div className="text-lg font-medium mb-2">Completion Rate</div>
                <div className="text-gray-600 text-sm">
                  High onboarding completion rate compared to traditional investment apps.
                </div>
              </motion.div>

              <motion.div 
                className="text-center p-8"
                variants={fadeIn}
              >
                <div className="text-4xl font-light text-[#fb4e4e] mb-4">4.8</div>
                <div className="text-lg font-medium mb-2">User Satisfaction</div>
                <div className="text-gray-600 text-sm">
                  Average rating from user testing sessions and post-launch feedback.
                </div>
              </motion.div>

              <motion.div 
                className="text-center p-8"
                variants={fadeIn}
              >
                <div className="text-4xl font-light text-[#fb4e4e] mb-4">40%</div>
                <div className="text-lg font-medium mb-2">Support Reduction</div>
                <div className="text-gray-600 text-sm">
                  Decrease in customer support queries due to better user understanding.
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Learnings */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-light text-center mb-16"
              variants={fadeIn}
            >
              Key <span className="text-[#fb4e4e] bricolage-font">Learnings</span>
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm mb-8"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Trust Through Transparency</h3>
                <p className="text-gray-700">
                  Users valued transparency about how recommendations were generated. Showing the 
                  reasoning behind investment suggestions built trust and encouraged engagement.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm mb-8"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Education as Empowerment</h3>
                <p className="text-gray-700">
                  Providing contextual education within the conversation flow made users feel 
                  empowered rather than dependent on the platform for decisions.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-xl font-semibold mb-4">Emotional Intelligence Matters</h3>
                <p className="text-gray-700">
                  The conversational AI needed to recognize and respond appropriately to user 
                  emotions, especially anxiety and excitement around financial decisions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-20 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-8"
              variants={fadeIn}
            >
              Interested in <span className="text-[#fb4e4e] bricolage-font">Conversational</span> Design?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-8 leading-relaxed"
              variants={fadeIn}
            >
              Let's explore how conversational interfaces can transform your product experience 
              and build deeper connections with your users.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-[#fb4e4e] text-white px-8 py-4 rounded-full hover:bg-[#e63e3e] transition-colors text-lg font-medium"
              >
                Start a Conversation
                <ExternalLink className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}