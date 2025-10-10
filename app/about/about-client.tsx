"use client"

import Image from "next/image"
import Link from "next/link"

export default function AboutClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">ABOUT</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="relative">
          <div className="relative aspect-[4/5]">
            <Image src="/fish_frame.png?height=1000&width=900" alt="Studio space" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 border border-[hsl(var(--accent))] translate-x-4 translate-y-4 z-[-1]"></div>
        </div>
        <div>
          <h2 className="text-3xl mb-6">Our Studio</h2>
          <div className="accent-bar"></div>
          <div className="space-y-4 text-lg">
            <p>
              We design interactions that don't exist yet. Founded in 2023, Studio Poetics is an experimental interaction design studio exploring how technology becomes more human through three focused practices.
            </p>
            <p>
              Our holographic displays transform museums, homes, and offices into responsive environments. We partner with architects and interior designers to embed interactive technology that feels natural, not intrusive.
            </p>
            <p>
              We also develop cozy gaming hardware for everyday objects—kitchen tables, fridge doors, toasters. These aren't just gadgets; they're invitations to play in the spaces where we actually live.
            </p>
          </div>
        </div>
      </div>

      {/* Our Experimental Approach */}
      <div className="mb-24" id="philosophy">
        <h2 className="text-3xl mb-6">Our Experimental Approach</h2>
        <div className="accent-bar"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4 text-lg">
            <p>
              Our experimental approach means we don't follow established patterns. We build prototypes first, test with real people, and iterate until the interaction feels right. Every project teaches us something new about how humans and technology can work together.
            </p>
            <p>
              We also run strategic workshops that help organizations navigate emerging technology without the hype or fear. Our focus is on sustainable adoption—strategies that last, not trends that fade.
            </p>
          </div>
          <div className="relative mt-0">
            <div className="relative aspect-[16/9]">
              <Image
                src="/placeholder.svg?height=450&width=800"
                alt="Experimental approach illustration"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 border border-[hsl(var(--accent))] -translate-x-4 -translate-y-4 z-[-1]"></div>
          </div>
        </div>
      </div>

      {/* How We Play */}
      <div className="mb-24" id="how-we-play">
        <h2 className="text-3xl mb-6">How We Play</h2>
        <div className="accent-bar"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-[#fb4e4e]">Hardware-First Thinking</h3>
            <p>
              We build physical prototypes to understand how interfaces feel in real spaces. Our holographic displays and gaming hardware exist in the world, not just on screens.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-[#fb4e4e]">Partner Strategically</h3>
            <p>
              We work closely with interior designers for spatial installations, businesses navigating tech adoption, and educational institutions exploring interactive learning.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-[#fb4e4e]">Long-term Strategy</h3>
            <p>
              We focus on sustainable technology adoption that adapts over time. Our solutions grow stronger with use, rather than becoming obsolete.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainability Mindset */}
      <div className="mb-24" id="sustainability">
        <h2 className="text-3xl mb-6">Sustainability Mindset</h2>
        <div className="accent-bar"></div>
        <div className="space-y-6 text-lg">
          <p>
            Our approach to sustainability focuses on creating resilient solutions that can adapt and thrive even when times are chaotic and everything keeps changing. We build businesses, projects, and services that last by designing for flexibility, longevity, and the ability to evolve.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-3 text-[#fb4e4e]">Long-term Thinking</h3>
              <p>
                Our solutions grow stronger with time, adapting to changing needs rather than requiring replacement. We optimize for resilience, not just efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3 text-[#fb4e4e]">Regenerative Design</h3>
              <p>
                We create technologies that give back more than they take—enriching communities, empowering creativity, fostering connection across differences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl mb-6">Our Founding Team</h2>
        <div className="accent-bar"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="">
              <div className="relative aspect-[3/4]">
                <Image src={member.image || "/Pranshu_Kumar_Chaudhary.png"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-[#fb4e4e] text-sm mb-4">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extended Team */}
      <div className="mb-24">
        <h2 className="text-3xl mb-6">Our Extended Family</h2>
        <div className="accent-bar"></div>
        
        {/* Interns Section */}
        <div className="mb-12">
          <h3 className="text-2xl mb-6 text-[#fb4e4e]">Learning Adventurers (Interns)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interns.map((intern, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="relative aspect-square mb-3">
                  <Image 
                    src={intern.image || "/placeholder-user.jpg"} 
                    alt={intern.name} 
                    fill 
                    className="object-cover rounded-md" 
                  />
                </div>
                <h4 className="font-medium text-lg mb-1">{intern.name}</h4>
                <p className="text-sm text-[#fb4e4e] mb-2">{intern.university}</p>
                <p className="text-sm text-gray-600 mb-2">{intern.duration}</p>
                <p className="text-sm">{intern.work}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Consultants */}
        <div>
          <h3 className="text-2xl mb-6 text-[#fb4e4e]">Project Collaborators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultants.map((consultant, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="relative aspect-square mb-3">
                  <Image 
                    src={consultant.image || "/placeholder-user.jpg"} 
                    alt={consultant.name} 
                    fill 
                    className="object-cover rounded-md" 
                  />
                </div>
                <h4 className="font-medium text-lg mb-1">{consultant.name}</h4>
                <p className="text-sm text-gray-600">{consultant.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div>
          <h2 className="text-3xl mb-6">Contact Us</h2>
          <div className="accent-bar"></div>
          <div className="space-y-4">
            <p className="text-lg">
              We welcome inquiries, collaborations, and conversations about our work and philosophy.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> hello@poetics.studio
              </p>
              <p>
                <strong>Studio:</strong> Studio Poetics, Goa / Pryaagraj, India
              </p>
              <p>
                <strong>Hours:</strong> Monday–Friday, 10:00–18:00
              </p>
            </div>
            <div className="pt-4">
              <p className="mb-2">
                <strong>Follow Us</strong>
              </p>
              <div className="flex gap-4">
                <Link href="https://instagram.com" className="hover:text-[hsl(var(--accent))]">
                  Instagram
                </Link>
                <Link href="https://twitter.com" className="hover:text-[hsl(var(--accent))]">
                  Twitter
                </Link>
                <Link href="https://pinterest.com" className="hover:text-[hsl(var(--accent))]">
                  Pinterest
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-square">
            <Image src="/placeholder.svg?height=800&width=800" alt="Studio space" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 border border-[hsl(var(--accent))] translate-x-4 translate-y-4 z-[-1]"></div>
        </div>
      </div>
    </div>
  )
}

// Interns data
const interns = [
  {
    name: "Kirthana",
    university: "JKLU University - Transdisciplinary Design",
    duration: "June - August 2024",
    work: "Experimental interfaces and hardware development",
    image: "/Karthika.png",
  },
  {
    name: "Komal",
    university: "IIT Jodhpur",
    duration: "June 2025",
    work: "Storytelling and 3D animation",
    image: "/komal.png",
  },
  {
    name: "Priyanshi Shah",
    university: "United Institute of Design (UID)",
    duration: "June - September 2025",
    work: "Game design, animation, 3D modelling",
    image: "/Priyanshi.png",
  },
  {
    name: "Karthika P.",
    university: "National Institute of Design - Animation Design",
    duration: "June - November 2025",
    work: "2D animation and illustrations",
    image: "/Kirthana.png",
  },
]

// Project consultants data
const consultants = [
  {
    name: "Nikhil Rai",
    specialization: "Logo design, branding illustrations",
    image: "/nikhil.png",
  },
]

// Founding team data
const team = [
  {
    name: "R M Udahayan",
    role: "Chief Dreamer & Game Wizard",
    bio: "Dreams in 3D, builds cozy games that feel like warm hugs. Transforms everyday visuals into magical virtual environments through play, paintings and design.",
    image: "/udhayan.jpg?height=900&width=600",
  },
  {
    name: "Pranshu Chaudhary",
    role: "Playful Futurist & Chief Tinkerer",
    bio: "Professional daydreamer bridging wild ideas and beautiful realities. The beating heart of our experimental spirit and cultural curiosity.",
    image: "/Pranshu_Kumar_Chaudhary.png?height=900&width=600",
  },
  {
    name: "Monalisa Thakur",
    role: "Material Alchemist & Chief Storyteller",
    bio: "Finds poetics in pixels and materials. Crafts stories through textures, colors, and forms—creating designs you can feel with your soul.",
    image: "/monalisa.png?height=900&width=600",
  },
]