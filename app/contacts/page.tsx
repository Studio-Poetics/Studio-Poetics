"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, Clock } from "lucide-react"
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

export default function ContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">CONTACT</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      {/* Contact Information */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl mb-6">Get in Touch</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Have a project in mind? We'd love to hear from you. Whether you're looking to start a new design
                project or just want to learn more about our work, our team is here to help.
              </p>
              <p>
                Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a href="mailto:hello@poetics.studio" className="text-gray-600 hover:text-[#fb4e4e]">
                    hello@poetics.studio
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <a href="tel:+918299711749" className="text-gray-600 hover:text-[#fb4e4e]">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Studio Location</h3>
                  <p className="text-gray-600">Goa, Prayagraj</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Hours</h3>
                  <p className="text-gray-600">Monday to Friday: 10:00 - 15:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="relative aspect-[4/3]">
              <Image src="/placeholder.svg?height=800&width=1000" alt="Contact" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Form */}
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6">Send us a Message</h2>
          <div className="accent-bar"></div>

          <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 focus:border-[#fb4e4e] focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 focus:border-[#fb4e4e] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 focus:border-[#fb4e4e] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 focus:border-[#fb4e4e] focus:outline-none"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatedSection>

      {/* Studio Visit Section - Commented Out
      <AnimatedSection>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6">Visit Our Studio</h2>
          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div>
              <p className="mb-6">
                Experience our creative space firsthand. Schedule a visit to our studio and see where the magic
                happens. We'd love to show you around and discuss your project in person.
              </p>
              <Link
                href="/studio-visit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                Schedule a Visit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3]">
              <Image src="/placeholder.svg?height=800&width=1000" alt="Studio" fill className="object-cover" />
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
      */}
    </div>
  )
} 