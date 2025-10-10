"use client"

import { useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  useEffect(() => {
    // Load the JavaScript files after component mounts
    const loadScript = (src: string) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }

    loadScript('/signal-canvas.js')
    loadScript('/strategy-canvas.js')
    loadScript('/form-canvas.js')
    loadScript('/character-interactions.js')

    return () => {
      // Cleanup scripts when component unmounts
      const scripts = document.querySelectorAll('script[src*="canvas.js"], script[src*="character-interactions.js"]')
      scripts.forEach(script => script.remove())
    }
  }, [])

  return (
    <>
      <Head>
        <title>Studio Poetics</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baumans&display=swap" rel="stylesheet" />
      </Head>

      <div className="container">
        <div className="left-side">
          <div className="social-icons">
            <a href="https://www.instagram.com/studio.poetics/" className="social-icon instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/studio-poetics/" className="social-icon linkedin">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-icon youtube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="right-side">
          <div className="character-navigation">
            <div className="character character-1" data-url="/about" data-text="about us">
              <img src="/img5.png" alt="Character 1" />
              <div className="character-overlay">about us</div>
            </div>
            <div className="character character-2" data-url="/contact" data-text="contact us">
              <img src="/img4.png" alt="Character 2" />
              <div className="character-overlay">contact us</div>
            </div>
            <div className="character character-3" data-url="/projects" data-text="experiments">
              <img src="/img3.png" alt="Character 3" />
              <div className="character-overlay">experiments</div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <header className="brand-header">
            <h1 className="brand-name">
              <span className="studio" data-text="studio">studio</span>
              <span className="poetics" data-text="poetics">poetics</span>
            </h1>
          </header>

          <div className="content-section">
            <div className="text-content">
              <p className="main-text">
                Poetics is the soul of making.<br />
                It&apos;s what turns a project from a product into a piece of meaning.
                It&apos;s the belief that technology, design, art and play can co-create worlds that are thoughtful, sensorial, and alive.
              </p>

              <div className="bottom-section">
                <p className="tagline">a sense-making studio practice..</p>
              </div>
            </div>

            <div className="main-character">
              <div className="character-container">
                <img src="/img1.png" alt="Main Character" className="main-character-img" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by section */}
      <section className="trusted-section">
        <div className="trusted-content">
          <h2 className="trusted-title">trusted by forward thinking organisations</h2>
          <p className="trusted-description">
            We work with organizations that value creativity, innovation, and thoughtful design.
            Our collaborative approach helps bring meaningful digital experiences to life.
          </p>
          <div className="client-logos">
            <div className="client-logo" data-client-name="NID">
              <img src="/logos/NID.png" alt="NID" />
              <div className="client-name-overlay">NID</div>
            </div>
            <div className="client-logo" data-client-name="Hashed Emergent">
              <img src="/logos/Hashed-Emergent.webp" alt="Hashed Emergent" />
              <div className="client-name-overlay">Hashed Emergent</div>
            </div>
            <div className="client-logo" data-client-name="India Blockchain Week">
              <img src="/logos/india blockchain week.svg" alt="India Blockchain Week" />
              <div className="client-name-overlay">India Blockchain Week</div>
            </div>
            <div className="client-logo" data-client-name="Reclaim Protocol">
              <img src="/logos/reclaim protocol.png" alt="Reclaim Protocol" />
              <div className="client-name-overlay">Reclaim Protocol</div>
            </div>
            <div className="client-logo" data-client-name="Jar App">
              <img src="/logos/jar app.png" alt="Jar App" />
              <div className="client-name-overlay">Jar App</div>
            </div>
            <div className="client-logo" data-client-name="Jar App">
              <img src="/logos/ncsm.png" alt="Jar App" />
              <div className="client-name-overlay">Science City Kolkata</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="section" id="section1">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Spatial</h2>
            <span className="section-number">01</span>
          </div>
          <div className="section-image">
            <div className="canvas-frame">
              <canvas id="signalCanvas"></canvas>
            </div>
          </div>
          <div className="section-text">
            <h3 className="section-subtitle">Find the right signal in the noise</h3>
            <p className="section-description">We craft holographic and immersive environments that blend the digital with the tangible.
From AR and VR spaces to hybrid installations, our work explores perception, scale, and presence.
Developed primarily in-house, we open selected projects for collaboration.</p>
            <div className="section-tags">
              <span className="tag">Pattern recognition</span>
              <span className="tag">Business intuition</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="section2">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Play</h2>
            <span className="section-number">02</span>
          </div>
          <div className="section-image">
            <div className="canvas-frame">
              <canvas id="strategyCanvas"></canvas>
            </div>
          </div>
          <div className="section-text">
            <h3 className="section-subtitle">Play is an inherent nature of human.</h3>
            <p className="section-description">We create original games that nurture calm, curiosity, and reflection.
From cosy digital worlds to playful educational experiences, our games are developed in-house as experiments in gentler forms of interaction.
We accept only a few commissions and collaborations each year.</p>
            <div className="section-tags">
              <span className="tag">Digital Games</span>
              <span className="tag">Quirky game and toys</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="section3">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Form</h2>
            <span className="section-number">03</span>
          </div>
          <div className="section-image">
            <img src="/sec1.png" alt="Design Pattern" />
          </div>
          <div className="section-text">
            <h3 className="section-subtitle">Form in Play</h3>
            <p className="section-description">We design and prototype custom interactive hardware and products.
Each piece is an exploration of material, motion, and response—physical forms that make interaction poetic.
Our hardware practice is research-driven, with limited commissions by invitation.</p>
            <div className="section-tags">
              <span className="tag">Custom Hardware</span>
              <span className="tag">Playful Hardware</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="section4">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Digital</h2>
            <span className="section-number">04</span>
          </div>
          <div className="section-image">
            <div className="canvas-frame">
              <canvas id="formCanvas"></canvas>
            </div>
          </div>
          <div className="section-text">
            <h3 className="section-subtitle">Strategic UX consultancy</h3>
            <p className="section-description">We craft digital experiences that move with clarity and emotion.
From intuitive interfaces to strategic UX systems, we help organizations shape meaningful interactions between people and technology.
This is where we collaborate closely with clients.</p>
            <div className="section-tags">
              <span className="tag">Interface Design</span>
              <span className="tag">Strategic UX</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="section5">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Evolve</h2>
            <span className="section-number">05</span>
          </div>
          <div className="section-image">
            <img src="/section5.png" alt="Evolve Pattern" />
          </div>
          <div className="section-text">
            <h3 className="section-subtitle">Community Innovation Lab</h3>
            <p className="section-description">We host workshops and labs that spark transformation through making.
From corporate innovation programs to university sessions, we help teams understand and apply emerging technologies through hands-on exploration.
This is where we open our process to others.</p>
            <div className="section-tags">
              <span className="tag">Continuous improvement</span>
              <span className="tag">Corporate/University Workshops</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color: #fff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .left-side {
          display: flex;
          justify-content: center;
          padding: 20px;
          background-color: #fff;
          z-index: 10;
        }

        .right-side {
          display: flex;
          justify-content: center;
          padding: 20px;
          background-color: #fff;
          z-index: 10;
        }

        .social-icons {
          display: flex;
          gap: 20px;
        }

        .character-navigation {
          display: flex;
          gap: 20px;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          border: 2px solid #333;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #333;
          transition: all 0.3s ease;
          background-color: white;
          margin-left: 10px;
        }

        .social-icon:hover {
          background-color: #333;
          color: white;
        }

        .social-icon svg {
          width: 24px;
          height: 24px;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .brand-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .brand-name {
          font-family: 'Baumans', cursive;
          font-weight: 900;
          line-height: 0.85;
          color: #333;
          text-transform: lowercase;
          letter-spacing: -0.02em;
          cursor: pointer;
          position: relative;
        }

        .brand-name .studio,
        .brand-name .poetics {
          position: relative;
          display: block;
        }

        .brand-name .studio::after,
        .brand-name .poetics::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          color: transparent;
          -webkit-text-stroke: 2px #ffffff;
          width: 0;
          overflow: hidden;
          transition: width 0s;
        }

        .brand-name:hover .studio::after {
          animation: writeText 2s ease-in-out forwards;
        }

        .brand-name:hover .poetics::after {
          animation: writeText 2s ease-in-out 0.5s forwards;
        }

        @keyframes writeText {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        .studio {
          display: block;
          font-weight: 400;
          font-size: clamp(60px, 20vw, 170px);
          margin-bottom: -0.1em;
        }

        .poetics {
          display: block;
          font-weight: 900;
          font-size: clamp(120px, 40vw, 350px);
        }

        .content-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .text-content {
          max-width: 600px;
        }

        .main-text {
          font-size: clamp(1rem, 4vw, 1.25rem);
          line-height: 1.6;
          color: #333;
          margin-bottom: 40px;
          margin-top: 40px;
          font-weight: 400;
        }

        .bottom-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .tagline {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.2rem, 5vw, 2rem);
          color: #999;
          font-weight: 300;
          white-space: nowrap;
        }


        .character {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: white;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 0 0 3px #e0e0e0;
          z-index: 1;
          cursor: pointer;
        }

        .character:hover {
          transform: scale(2.5);
          z-index: 10;
        }

        .character.zoomed {
          transform: scale(2.5);
          z-index: 10;
        }

        .character img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: opacity 0.3s ease;
        }

        .character-overlay {
          position: fixed;
          top: 50%;
          right: 60px;
          transform: translateY(-50%);
          background: white;
          color: #333;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 0.4rem;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          font-family: 'Bricolage Grotesque', sans-serif;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: none;
          z-index: 1000;
        }

        .character-overlay::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 4px solid white;
        }

        .character:hover .character-overlay,
        .character.zoomed .character-overlay {
          opacity: 1;
          visibility: visible;
        }

        .character:hover {
          transform: scale(2.5);
          z-index: 10;
        }

        .character.zoomed {
          transform: scale(2.5);
          z-index: 10;
        }

        .main-character {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .character-container {
          width: clamp(180px, 50vw, 280px);
          height: clamp(270px, 75vw, 420px);
          background: #ffffff;
          border-radius: 140px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          border: 10px solid #ffffff;
        }

        .main-character-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }

        .character-container::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background-image: url('/img2.png');
          background-size: cover;
          background-position: center;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .character-container:hover .main-character-img {
          opacity: 0;
        }

        .character-container:hover::after {
          opacity: 1;
        }

        /* Sections Styling */
        .section {
          min-height: 100vh;
          background-color: #ffffff;
          color: #333;
          padding: 60px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-content {
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 30px;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 10px;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(4rem, 15vw, 6rem);
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .section-number {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(4rem, 15vw, 6rem);
          font-weight: 300;
          color: #ccc;
          margin: 0;
        }

        .section-image {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-image img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .canvas-frame {
          width: 100%;
          max-width: 100%;
          height: auto;
          background: #000;
          overflow: hidden;
        }

        canvas {
          display: block;
          width: 100%;
          height: 100%;
          cursor: crosshair;
        }

        .section-text {}

        .section-subtitle {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.5rem, 5vw, 1.8rem);
          font-weight: 500;
          color: #333;
          margin-bottom: 20px;
          line-height: 1.3;
          margin-top: 20px;
        }

        .section-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 30px;
        }

        .section-tags {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag {
          background-color: #f0f0f0;
          color: #666;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Mobile-first responsive styles */
        @media (max-width: 767px) {
          .studio {
            font-size: clamp(40px, 15vw, 80px);
          }

          .poetics {
            font-size: clamp(80px, 28vw, 150px);
          }

          .main-text {
            display: none;
          }

          .right-side {
            display: none;
          }

          .content-section {
            flex-direction: column;
          }

          .main-character {
            order: 1;
            margin-bottom: 30px;
          }

          .text-content {
            order: 2;
          }

          .character:hover {
            transform: none;
          }

          .character:hover .character-overlay {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* Trusted by section */
        .trusted-section {
          background-color: #fafafa;
          padding: 80px 20px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }

        .trusted-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .trusted-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 500;
          color: #333;
          margin-bottom: 20px;
          text-transform: lowercase;
        }

        .trusted-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .client-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .client-logo {
          width: 160px;
          height: 80px;
          background: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
          position: relative;
          overflow: hidden;
        }

        .client-logo img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .client-name-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Bricolage Grotesque', sans-serif;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .client-logo:hover {
          border-color: #ccc;
          background-color: #f8f8f8;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .client-logo:hover .client-name-overlay {
          opacity: 1;
          visibility: visible;
        }

        .client-logo:hover img {
          transform: scale(1.05);
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          .container {
            flex-direction: row;
          }

          .left-side {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 80px;
            flex-direction: column;
            justify-content: center;
            padding: 0;
          }

          .right-side {
            position: fixed;
            right: 0;
            top: 0;
            height: 100vh;
            width: 80px;
            flex-direction: column;
            justify-content: center;
            padding: 0;
          }

          .social-icons {
            flex-direction: column;
          }

          .character-navigation {
            flex-direction: column;
          }

          .main-content {
            margin-left: 80px;
            margin-right: 80px;
            padding: 60px 10px;
          }

          .brand-header {
            text-align: left;
          }

          .content-section {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            gap: 60px;
            text-align: left;
            padding-right: 100px;
          }

          .text-content {
            flex: 1;
            max-width: 600px;
            margin-right: 50px;
          }

          .main-text {
            margin-top: 80px;
            margin-bottom: 80px;
            text-align: justify;
          }

          .bottom-section {
            justify-content: center;
          }

          .section {
            padding: 80px 40px;
          }

          .section-header {
            flex-direction: row;
            gap: 20px;
          }

          .section-tags {
            justify-content: flex-start;
          }

          .trusted-section {
            padding: 100px 40px;
          }

          .client-logos {
            gap: 50px;
            flex-wrap: nowrap;
            justify-content: space-between;
            max-width: 1000px;
            margin: 0 auto;
          }

          .client-logo {
            width: 180px;
            height: 90px;
          }

          .client-name-overlay {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  )
}