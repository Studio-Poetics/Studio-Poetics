"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Services */}
          <div>
            <h3 className="font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-gray-600 hover:text-[#fb4e4e]">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link href={resource.href} className="text-gray-600 hover:text-[#fb4e4e]">
                    {resource.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@poetics.studio" className="text-gray-600 hover:text-[#fb4e4e]">
                  hello@poetics.studio
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-gray-600 hover:text-[#fb4e4e]">
                  +91 98765 43210
                </a>
              </li>
              <li className="text-gray-600">Goa, Prayagraj</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates on our work and ideas.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 focus:border-[#fb4e4e] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white hover:bg-[#fb4e4e] transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600">© 2024 Studio Poetics. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-gray-600 hover:text-[#fb4e4e]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-[#fb4e4e]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const services = [
  {
    title: "Spatial Interaction Design",
    href: "/spatial-interaction-design",
  },
  {
    title: "Experimental Gaming Hardware",
    href: "/experimental-gaming-hardware",
  },
  {
    title: "Holographic Displays",
    href: "/holographic-displays",
  },
  {
    title: "Technology Strategy",
    href: "/technology-strategy",
  },
  {
    title: "Digital Experience Design",
    href: "/digital-experience-design",
  },
]

const resources = [
  {
    title: "Consultancy",
    href: "/consultancy",
  },
  {
    title: "Exhibitions",
    href: "/exhibitions",
  },
  {
    title: "Talks & Lectures",
    href: "/talks",
  },
  {
    title: "Jobs",
    href: "/jobs",
  },
] 