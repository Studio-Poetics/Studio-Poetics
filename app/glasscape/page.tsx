"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Glasscape() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null)
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [showContactForm, setShowContactForm] = useState(false)
  const [formType, setFormType] = useState<'quote' | 'demo'>('quote')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const letters = [
    { letter: 'A', video: '/videos/letter-A.mp4', title: 'AMPLITUDE', desc: 'Wave patterns' },
    { letter: 'B', video: '/videos/letter-B.mp4', title: 'BEAM', desc: 'Light projection' },
    { letter: 'C', video: '/videos/letter-C.mp4', title: 'CRYSTAL', desc: 'Transparent form' },
    { letter: 'D', video: '/videos/letter-D.mp4', title: 'DEPTH', desc: 'Dimensional space' },
    { letter: 'E', video: '/videos/letter-E.mp4', title: 'ENERGY', desc: 'Force field' },
    { letter: 'F', video: '/videos/letter-F.mp4', title: 'FLUX', desc: 'Dynamic flow' }
  ]

  const collections = [
    {
      id: 1,
      name: "Holographic Displays",
      category: "Interactive Technology",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Revolutionary holographic display technology that brings digital content into physical space with stunning clarity and depth.",
      features: ["4K Resolution", "360° Viewing", "Real-time Interaction", "Wireless Connectivity"],
      contact: "holographic@studio-poetics.com"
    },
    {
      id: 2,
      name: "Spatial Interfaces",
      category: "Design Innovation",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Cutting-edge spatial interface designs that redefine how users interact with digital environments through gesture and movement.",
      features: ["Gesture Control", "Spatial Mapping", "AR Integration", "Multi-user Support"],
      contact: "spatial@studio-poetics.com"
    },
    {
      id: 3,
      name: "Glass Art Series",
      category: "Artistic Collection",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Exquisite glass art pieces that explore transparency, light refraction, and the boundary between digital and physical aesthetics.",
      features: ["Handcrafted Glass", "LED Integration", "Custom Sizing", "Limited Edition"],
      contact: "art@studio-poetics.com"
    }
  ]

  const handleLetterClick = (letter: string, video: string) => {
    setSelectedLetter(letter)
    setIsVideoPlaying(true)
    // You can add video playback logic here
  }

  // Collection hover functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (hoveredCollection !== null) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [hoveredCollection]: ((prev[hoveredCollection] || 0) + 1) % collections[hoveredCollection].images.length
        }))
      }, 800) // Change image every 800ms on hover
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [hoveredCollection, collections])

  const openCollectionPopup = (collectionId: number) => {
    setSelectedCollection(collectionId)
  }

  const closeCollectionPopup = () => {
    setSelectedCollection(null)
    setShowContactForm(false)
    setSubmitStatus('idle')
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const openContactForm = (type: 'quote' | 'demo', collectionName: string) => {
    setFormType(type)
    setShowContactForm(true)
    const prefillMessage = type === 'quote' 
      ? `Hi! I'm interested in getting a quote for the ${collectionName} collection. Could you please provide more details about pricing and availability?`
      : `Hi! I'd like to schedule a demo for the ${collectionName} collection. When would be a good time to showcase this technology?`
    
    setFormData({
      name: '',
      email: '',
      company: '',
      message: prefillMessage
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Using Formspree for GitHub Pages compatibility
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: formType,
          collection: collections.find(c => c.id === selectedCollection)?.name
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          setShowContactForm(false)
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        
        .pixel-font {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .modern-sans {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        .neon-green {
          background-color: #ADFF2F;
          color: #000000;
        }
        
        .typography-section {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        
        .typography-section:hover {
          background-color: #ADFF2F;
          color: #000000;
        }
        
        .typography-section .extra-text {
          opacity: 0;
          transition: opacity 0.3s ease;
          max-height: 0;
          overflow: hidden;
        }
        
        .typography-section:hover .extra-text {
          opacity: 1;
          max-height: 100px;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .glasscape-letter {
          display: inline-block;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .glasscape-letter:hover {
          transform: translateY(-5px) scale(1.05);
          background: linear-gradient(45deg, 
            #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(173, 255, 47, 0.2),
            0 0 40px rgba(138, 43, 226, 0.15);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
          animation: iridescent-shimmer 3s ease-in-out infinite;
        }
        
        @keyframes iridescent-shimmer {
          0%, 100% {
            background-position: 0% 50%;
            filter: drop-shadow(0 0 10px rgba(255, 0, 110, 0.4)) brightness(1.1);
          }
          20% {
            background-position: 25% 25%;
            filter: drop-shadow(0 0 12px rgba(131, 56, 236, 0.4)) brightness(1.2);
          }
          40% {
            background-position: 75% 75%;
            filter: drop-shadow(0 0 15px rgba(58, 134, 255, 0.4)) brightness(1.3);
          }
          60% {
            background-position: 100% 50%;
            filter: drop-shadow(0 0 12px rgba(6, 255, 165, 0.4)) brightness(1.2);
          }
          80% {
            background-position: 50% 100%;
            filter: drop-shadow(0 0 10px rgba(255, 190, 11, 0.4)) brightness(1.1);
          }
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #ADFF2F, #32CD32, #00FF32);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glitch {
          position: relative;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #00ff00;
          z-index: -1;
        }
        
        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #ff0000;
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% { transform: translate(0); }
          15%, 49% { transform: translate(-2px, -1px); }
        }
        
        @keyframes glitch-2 {
          0%, 20%, 21%, 62%, 63%, 99%, 100% { transform: translate(0); }
          21%, 62% { transform: translate(2px, 1px); }
        }
        
        .pixelated-pattern {
          background-image: 
            repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 50% / 20px 20px,
            repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 50% / 20px 20px;
          background-position: 0 0, 10px 10px;
        }
      `}</style>
      
      <div className="w-full bg-white text-black modern-sans overflow-x-hidden">
        {/* Hero Section - Full Viewport with Video Background */}
        <section className="min-h-screen w-full relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/bg.mp4" type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>
          </div>

          
          {/* Content Container */}
          <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 md:px-8">
            <div className="max-w-4xl text-center">
              {/* Glass Background for Text */}
              <div className="backdrop-blur-md bg-white/20 rounded-3xl border border-white/30 p-8 md:p-12 shadow-2xl">
                <motion.h1 
                  className="pixel-font text-[60px] md:text-[100px] lg:text-[140px] leading-[55px] md:leading-[90px] lg:leading-[130px] font-black mb-6 md:mb-8 text-black"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="glitch" data-text="GLASSCAPE">GLASSCAPE</div>
                </motion.h1>
                
                {/* Subtext */}
                <motion.p 
                  className="text-lg md:text-xl leading-relaxed mb-8 text-black/80 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  How to craft unforgettable experiences using holographic displays and transparent video technology.
                </motion.p>
                
                {/* CTA Button */}
                <motion.div 
                  className="neon-green inline-block px-6 md:px-8 py-3 md:py-4 cursor-pointer transform hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="pixel-font text-black text-base md:text-lg font-black">EXPLORE GLASSCAPE</div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="pixel-font text-sm text-gray-600 mb-2">SCROLL TO EXPLORE</div>
            <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent mx-auto animate-pulse"></div>
          </motion.div>
        </section>
        
        {/* Typography Sections */}
        <section className="w-full py-8 md:py-16 space-y-0">
          <div className="w-full">
            <div className="typography-section text-[32px] md:text-[50px] lg:text-[80px] leading-[30px] md:leading-[50px] lg:leading-[80px] font-black modern-sans border-b-2 border-gray-200 py-4 md:py-8 px-4 md:px-8">
              HOLOGRAPHIC
              <div className="extra-text text-xs md:text-sm font-medium mt-2 md:mt-4 max-w-md">
                Three-dimensional light projections that create stunning visual depth and presence.
              </div>
            </div>
            <div className="typography-section text-[32px] md:text-[50px] lg:text-[80px] leading-[30px] md:leading-[50px] lg:leading-[80px] font-black modern-sans border-b-2 border-gray-200 py-4 md:py-8 px-4 md:px-8">
              IMMERSIVE
              <div className="extra-text text-xs md:text-sm font-medium mt-2 md:mt-4 max-w-md">
                Complete sensory engagement that transports viewers into new realities.
              </div>
            </div>
            
            <div className="typography-section text-[32px] md:text-[50px] lg:text-[80px] leading-[30px] md:leading-[50px] lg:leading-[80px] font-black modern-sans border-b-2 border-gray-200 py-4 md:py-8 px-4 md:px-8">
              TRANSPARENT
              <div className="extra-text text-xs md:text-sm font-medium mt-2 md:mt-4 max-w-md">
                Loud and bold, or quietly confident, cut through the noise with clarity.
              </div>
            </div>
            
            <div className="typography-section text-[32px] md:text-[50px] lg:text-[80px] leading-[30px] md:leading-[50px] lg:leading-[80px] font-black modern-sans border-b-2 border-gray-200 py-4 md:py-8 px-4 md:px-8">
            SPATIAL
            <div className="extra-text text-xs md:text-sm font-medium mt-2 md:mt-4 max-w-md">
              Dynamic positioning that creates depth and movement in physical space.
            </div>
          </div>
          </div>
        </section>
        
        {/* Scrolling Keywords Section */}
        <section className="w-full overflow-hidden bg-black text-white py-4">
          <div className="flex animate-scroll whitespace-nowrap">
            <div className="flex items-center space-x-6 text-base md:text-lg font-light">
              <span>Display-driven design</span>
              <span className="text-xl">😊</span>
              <span>Immersive storytelling</span>
              <span className="text-xl">😊</span>
              <span>Holographic innovation</span>
              <span className="text-xl">😊</span>
              <span>Spatial computing</span>
              <span className="text-xl">😊</span>
              <span>Transparent video tech</span>
              <span className="text-xl">😊</span>
              <span>Future interaction</span>
              <span className="text-xl">😊</span>
              <span>Digital reality merge</span>
              <span className="text-xl">😊</span>
              <span>Experience reimagined</span>
              <span className="text-xl">😊</span>
              {/* Duplicate for seamless loop */}
              <span>Display-driven design</span>
              <span className="text-xl">😊</span>
              <span>Immersive storytelling</span>
              <span className="text-xl">😊</span>
              <span>Holographic innovation</span>
              <span className="text-xl">😊</span>
              <span>Spatial computing</span>
              <span className="text-xl">😊</span>
              <span>Transparent video tech</span>
              <span className="text-xl">😊</span>
              <span>Future interaction</span>
              <span className="text-xl">😊</span>
              <span>Digital reality merge</span>
              <span className="text-xl">😊</span>
              <span>Experience reimagined</span>
              <span className="text-xl">😊</span>
            </div>
          </div>
        </section>
        
        {/* Graphic Wrap Section */}
        <section className="w-full py-6 md:py-12">
          <div className="relative mb-6 md:mb-8">
            <div className="w-full h-[400px] md:h-[600px] bg-white relative overflow-hidden">
              {/* Pixelated cloth/wrap pattern */}
              <div className="absolute inset-0 pixelated-pattern opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-center text-center">
                  <div className="pixel-font text-2xl md:text-4xl font-black glitch mb-6" data-text="See it Thruuu">See it Thruuu</div>
                  {/* Large GLASSCAPE text - Responsive sizing */}
                  <div className="text-[60px] md:text-[120px] lg:text-[160px] font-black text-gray-300/50 glitch pixel-font leading-none" data-text="GLASSCAPE">
                    {['G', 'L', 'A', 'S', 'S', 'C', 'A', 'P', 'E'].map((letter, index) => (
                      <span 
                        key={index}
                        className="glasscape-letter"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Interactive Alphabet & Video Section */}
        <section className="w-full py-8 md:py-16 mt-6 md:mt-8">
          <div className="w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Interactive Letter Display */}
            <div className="bg-gray-50 p-6 md:p-12 relative cursor-pointer transition-all duration-300 hover:bg-gray-100">
              {/* Technical drawing lines */}
              <div className="absolute top-4 left-4 right-4 h-px bg-gray-300"></div>
              <div className="absolute bottom-4 left-4 right-4 h-px bg-gray-300"></div>
              <div className="absolute top-4 left-4 bottom-4 w-px bg-gray-300"></div>
              <div className="absolute top-4 right-4 bottom-4 w-px bg-gray-300"></div>
              
              {/* Video overlay when playing */}
              {isVideoPlaying && selectedLetter && (
                <div className="absolute inset-4 bg-black rounded-lg overflow-hidden z-10">
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src={letters.find(l => l.letter === selectedLetter)?.video} type="video/mp4" />
                  </video>
                  <button 
                    onClick={() => setIsVideoPlaying(false)}
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-black/70"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <div className="text-center relative">
                <div className="text-[100px] md:text-[200px] leading-none font-serif font-light text-gray-800 mb-4">
                  {selectedLetter || 'B'}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600">
                  {selectedLetter ? letters.find(l => l.letter === selectedLetter)?.title : 'GLASSCAPE'}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {selectedLetter ? letters.find(l => l.letter === selectedLetter)?.desc : 'The letter'}
                </div>
                <div className="absolute top-4 md:top-8 left-4 md:left-8 text-xs text-gray-400">
                  {selectedLetter ? `00${letters.findIndex(l => l.letter === selectedLetter) + 1}/06` : '002/06'}
                </div>
                <div className="absolute top-4 md:top-8 right-4 md:right-8 text-xs text-gray-400">STUDIO</div>
              </div>
            </div>
            
            {/* Right: Interactive Letter Grid and Project Info */}
            <div>
              {/* Interactive Letter Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {letters.map((item, index) => (
                  <motion.div 
                    key={item.letter} 
                    className={`aspect-square flex items-center justify-center text-3xl md:text-6xl font-black cursor-pointer transition-all duration-300 ${
                      selectedLetter === item.letter 
                        ? 'bg-green-400 text-black scale-105' 
                        : index % 2 === 0 
                          ? 'bg-black text-white hover:bg-gray-800' 
                          : 'bg-white text-black border-4 border-black hover:border-gray-600'
                    }`}
                    onClick={() => handleLetterClick(item.letter, item.video)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.letter}
                  </motion.div>
                ))}
              </div>
              
              {/* A-Z Project Info */}
              <div className="bg-black text-white p-4 md:p-8">
                <div className="pixel-font text-green-400 text-sm mb-2">A–Z PROJECT</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Holographic Library</h3>
                <p className="text-sm mb-6 text-gray-300 leading-relaxed">
                  Click any letter to preview its holographic video. Experience our library of transparent video letters for your next project.
                </p>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                  <Link href="#" className="pixel-font text-sm font-bold text-green-400 hover:text-green-300 underline">
                    Download library Now
                  </Link>
                  <div className="pixel-font text-sm text-gray-500">
                    {selectedLetter ? `Playing: ${selectedLetter}` : 'Select a letter'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Collections Section */}
        <section className="bg-black text-white w-full py-8 md:py-16">
          <div className="w-full px-4 md:px-8">
              <h2 className="pixel-font text-2xl md:text-4xl font-black mb-8 md:mb-12 text-left">
                OUR COLLECTIONS
              </h2>
              
            <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8">
              {collections.map((collection, index) => (
                <div 
                  key={collection.id}
                  className="cursor-pointer transition-all duration-300 hover:transform hover:scale-105 w-full sm:w-80 md:w-72 lg:w-80 xl:w-72 2xl:w-80"
                  onMouseEnter={() => {
                    setHoveredCollection(index)
                    setCurrentImageIndex(prev => ({ ...prev, [index]: 0 }))
                  }}
                  onMouseLeave={() => setHoveredCollection(null)}
                  onClick={() => openCollectionPopup(collection.id)}
                >
                  <div className="aspect-square bg-gray-800 mb-4 overflow-hidden rounded-lg relative">
                    <Image
                      src={collection.images[currentImageIndex[index] || 0]}
                      alt={collection.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    {hoveredCollection === index && (
                      <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
                        <div className="pixel-font text-green-400 text-sm">CLICK TO VIEW</div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-green-400 font-bold mb-1 pixel-font">{collection.name}</h3>
                  <p className="text-xs text-gray-400">{collection.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Collection Popup Modal */}
        {selectedCollection && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 md:p-4">
            <div className="bg-white text-black w-full max-w-6xl h-full max-h-[95vh] md:max-h-[90vh] rounded-lg relative overflow-hidden">
              {/* Close Button */}
              <button 
                onClick={closeCollectionPopup}
                className="absolute top-3 md:top-6 right-3 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors text-lg md:text-xl"
              >
                ✕
              </button>
              
              {(() => {
                const collection = collections.find(c => c.id === selectedCollection)
                if (!collection) return null
                
                return (
                  <div className="h-full flex flex-col">
                    {/* Large Image Slider - Takes most of the space */}
                    <div className="relative bg-gray-100 h-[50%] md:h-[60%]">
                      <Image
                        src={collection.images[currentImageIndex[selectedCollection - 1] || 0]}
                        alt={collection.name}
                        fill
                        className="object-cover"
                        sizes="95vw"
                        priority
                      />
                      
                      {/* Slider Navigation */}
                      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
                        {collection.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(prev => ({ 
                              ...prev, 
                              [selectedCollection - 1]: index 
                            }))}
                            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                              (currentImageIndex[selectedCollection - 1] || 0) === index 
                                ? 'bg-green-400 scale-125' 
                                : 'bg-white/70 hover:bg-white/90'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Image Navigation Arrows */}
                      <button 
                        onClick={() => {
                          const currentIndex = currentImageIndex[selectedCollection - 1] || 0
                          const newIndex = currentIndex === 0 ? collection.images.length - 1 : currentIndex - 1
                          setCurrentImageIndex(prev => ({ ...prev, [selectedCollection - 1]: newIndex }))
                        }}
                        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors text-sm md:text-base"
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => {
                          const currentIndex = currentImageIndex[selectedCollection - 1] || 0
                          const newIndex = (currentIndex + 1) % collection.images.length
                          setCurrentImageIndex(prev => ({ ...prev, [selectedCollection - 1]: newIndex }))
                        }}
                        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors text-sm md:text-base"
                      >
                        →
                      </button>
                    </div>
                    
                    {/* Compact Collection Details - Bottom section */}
                    <div className="p-3 md:p-6 bg-white h-[50%] md:h-[40%] overflow-y-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                        {/* Left: Collection Info */}
                        <div className="lg:col-span-2">
                          <span className="text-sm text-gray-500 uppercase tracking-wide">{collection.category}</span>
                          <h2 className="text-2xl font-black mb-3 pixel-font">{collection.name}</h2>
                          <p className="text-gray-700 mb-4 leading-relaxed text-sm">{collection.description}</p>
                          
                          {/* Features */}
                          <div>
                            <h3 className="text-lg font-bold mb-3">Key Features</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {collection.features.map((feature, index) => (
                                <div key={index} className="flex items-center">
                                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                                  <span className="text-xs">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right: Contact */}
                        <div>
                          <div className="bg-gray-50 p-4 rounded-lg h-full">
                            <h3 className="text-lg font-bold mb-3 pixel-font">Get in Touch</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                              Contact our team for pricing and availability.
                            </p>
                            
                            <div className="space-y-3">
                              <div className="text-xs">
                                <span className="font-medium">Email:</span>
                                <a href={`mailto:${collection.contact}`} className="text-green-600 ml-2 hover:underline block">
                                  {collection.contact}
                                </a>
                              </div>
                              
                              <button 
                                onClick={() => openContactForm('quote', collection.name)}
                                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors pixel-font text-xs"
                              >
                                REQUEST QUOTE
                              </button>
                              
                              <button 
                                onClick={() => openContactForm('demo', collection.name)}
                                className="w-full border-2 border-black text-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition-colors text-xs"
                              >
                                SCHEDULE DEMO
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        {/* Contact Form Overlay */}
        {showContactForm && selectedCollection && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white text-black w-full max-w-lg rounded-lg relative overflow-hidden">
              {/* Close Button */}
              <button 
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors text-sm"
              >
                ✕
              </button>
              
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-black pixel-font mb-2">
                    {formType === 'quote' ? 'REQUEST QUOTE' : 'SCHEDULE DEMO'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {collections.find(c => c.id === selectedCollection)?.name} Collection
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 text-4xl mb-4">✓</div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your.email@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    {/* Simple honeypot spam protection */}
                    <input
                      type="text"
                      name="_gotcha"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {submitStatus === 'error' && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                        Failed to send message. Please try again or email us directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors pixel-font disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'SENDING...' : (formType === 'quote' ? 'SEND QUOTE REQUEST' : 'SEND DEMO REQUEST')}
                    </button>

                    <div className="text-xs text-gray-500 text-center">
                      Protected by honeypot spam filter. We'll respond within 24 hours.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <footer className="bg-black text-white w-full py-12 md:py-20">
          <div className="w-full px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8 md:mb-16">
              {/* Left: Created by Studio Poetics */}
              <div className="text-center md:text-left text-base font-bold text-gray-300">
                <div className="mb-3 pixel-font text-sm">CREATED BY STUDIO POETICS</div>
                <div className="pixel-font text-sm">GLASSCAPE EXPERIENCE</div>
              </div>
              
              {/* Center: Main CTA */}
              <div className="text-center">
                <div className="neon-green inline-block px-6 md:px-12 py-4 md:py-8 mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className="pixel-font text-black text-2xl md:text-4xl font-black leading-tight">START</div>
                  <div className="pixel-font text-black text-2xl md:text-4xl font-black leading-tight">CREATING</div>
                  <div className="pixel-font text-black text-2xl md:text-4xl font-black leading-tight">NOW</div>
                </div>
                <div className="text-sm text-gray-400 max-w-sm mx-auto">
                  Begin your holographic journey with Studio Poetics
                </div>
              </div>
              
              {/* Right: Glasscape info */}
              <div className="text-center md:text-right text-base font-bold text-gray-300">
                <div className="mb-3 pixel-font text-sm">GLASSCAPE</div>
                <div className="pixel-font text-sm">HOLOGRAPHIC</div>
              </div>
            </div>
            
            {/* Bottom section */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <div className="text-sm text-gray-500">© 2025 Studio Poetics</div>
              <div className="text-sm text-gray-500">Designed by Studio Poetics</div>
            </div>
          </div>
        </footer>
        
      </div>
    </>
  )
}