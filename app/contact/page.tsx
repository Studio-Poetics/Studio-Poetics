"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Send, Mail, Phone, MapPin, Clock, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import ReCAPTCHA from "react-google-recaptcha"

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

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    mobile: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xnnvzkdp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          "g-recaptcha-response": recaptchaToken,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          mobile: "",
        })
        // Reset reCAPTCHA
        recaptchaRef.current?.reset()
        setRecaptchaToken(null)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">CONTACT</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <AnimatedSection>
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl mb-6">Get in Touch</h2>
            <p className="text-lg mb-8">
              We'd love to hear from you. Whether you're interested in collaborating, have a question about our work, or
              just want to say hello, please reach out using the form or contact details below.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#fb4e4e] mt-1" />
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p>hello@poetics.studio</p>
                  <p className="text-sm text-gray-500">For general inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#fb4e4e] mt-1" />
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p>8299711749</p>
                  <p className="text-sm text-gray-500">Monday to Friday: 10:00 am to 3:00 pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#fb4e4e] mt-1" />
                <div>
                  <h3 className="text-lg font-medium">Studio Locations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Goa</p>
                    </div>
                    <div>
                      <p className="font-medium">Prayagraj</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#fb4e4e] mt-1" />
                <div>
                  <h3 className="text-lg font-medium">Hours</h3>
                  <p>Monday to Friday: 10:00–18:00</p>
                  <p>Saturday: By appointment only</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Follow Us</h3>
              <div className="flex gap-4">
                <Link
                  href="https://instagram.com"
                  className="flex items-center gap-2 hover:text-[#fb4e4e] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Link>
                <Link
                  href="https://twitter.com"
                  className="flex items-center gap-2 hover:text-[#fb4e4e] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.div variants={fadeIn}>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl mb-6">Send a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium mb-1">
                      Mobile Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formState.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="Workshop Request">Workshop Request</option>
                      <option value="Exhibition Inquiry">Exhibition Inquiry</option>
                      <option value="Press Inquiry">Press Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb4e4e] focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="my-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LdUMGYrAAAAALq71j8k8UJlT6bB2Azpejv-91qm"
                      onChange={handleRecaptchaChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !recaptchaToken}
                    className={`flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#fb4e4e] transition-colors ${
                      (isSubmitting || !recaptchaToken) ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Specific Inquiries Section */}
      <AnimatedSection delay={0.4}>
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl mb-6">Specific Inquiries</h2>
          <div className="accent-bar"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 hover:border-[#fb4e4e] transition-colors">
              <h3 className="text-xl font-medium mb-4">Workshop Inquiries</h3>
              <p className="mb-4">
                Interested in our workshops for your university or company? Contact our education team.
              </p>
              <a href="mailto:hello@poetics.studio" className="text-[#fb4e4e] hover:underline">
                hello@poetics.studio
              </a>
            </div>

            <div className="border border-gray-200 p-6 hover:border-[#fb4e4e] transition-colors">
              <h3 className="text-xl font-medium mb-4">Exhibition Opportunities</h3>
              <p className="mb-4">
                For exhibition proposals or collaboration opportunities, reach out to our curatorial team.
              </p>
              <a href="mailto:hello@poetics.studio" className="text-[#fb4e4e] hover:underline">
                hello@poetics.studio
              </a>
            </div>

            <div className="border border-gray-200 p-6 hover:border-[#fb4e4e] transition-colors">
              <h3 className="text-xl font-medium mb-4">Press & Media</h3>
              <p className="mb-4">
                Journalists and media professionals, please contact our press office for inquiries.
              </p>
              <a href="mailto:hello@poetics.studio" className="text-[#fb4e4e] hover:underline">
                hello@poetics.studio
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  )
}
