"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"

export default function AlternativeHome() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <>
      <style>{`
        /* Core Design Tokens */
        :root {
          --color-white: #ffffff;
          --color-black: #000000;
          --color-gray-50: #fafafa;
          --color-gray-100: #f5f5f5;
          --color-gray-200: #e5e5e5;
          --color-gray-300: #d4d4d4;
          --color-gray-400: #a3a3a3;
          --color-gray-500: #737373;
          --color-gray-600: #525252;
          --color-gray-700: #404040;
          --color-gray-800: #262626;
          --color-gray-900: #171717;

          --color-electric-blue: #4040ff;
          --color-electric-blue-dark: #3030dd;
          --color-electric-blue-light: #6060ff;
          --color-electric-blue-bg: rgba(64, 64, 255, 0.1);

          --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

          --text-xs: 0.75rem;
          --text-sm: 0.875rem;
          --text-base: 1rem;
          --text-lg: 1.125rem;
          --text-xl: 1.25rem;
          --text-2xl: 1.5rem;
          --text-3xl: 1.875rem;
          --text-4xl: 2.25rem;
          --text-5xl: 3rem;
          --text-6xl: 3.75rem;
          --text-7xl: 4.5rem;
          --text-8xl: 6rem;
          --text-9xl: 8rem;

          --space-1: 0.25rem;
          --space-2: 0.5rem;
          --space-3: 0.75rem;
          --space-4: 1rem;
          --space-5: 1.25rem;
          --space-6: 1.5rem;
          --space-8: 2rem;
          --space-10: 2.5rem;
          --space-12: 3rem;
          --space-16: 4rem;
          --space-20: 5rem;
          --space-24: 6rem;
          --space-32: 8rem;

          --transition-fast: 150ms ease;
          --transition-base: 200ms ease;
          --transition-slow: 300ms ease;
        }

        /* Reset and Base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-primary);
          background: var(--color-white);
          color: var(--color-black);
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* Container Layout */
        .experimental-container {
          display: flex;
          min-height: 100vh;
          position: relative;
        }

        /* Sidebar */
        .experimental-sidebar {
          width: 300px;
          background: var(--color-gray-50);
          border-right: 1px solid var(--color-gray-200);
          padding: var(--space-8);
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 10;
          overflow-y: auto;
        }

        .experimental-brand h1 {
          font-size: var(--text-2xl);
          font-weight: 800;
          margin-bottom: var(--space-2);
          color: var(--color-black);
        }

        .experimental-brand p {
          font-size: var(--text-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--space-8);
        }

        .experimental-nav-title {
          font-size: var(--text-xs);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-gray-500);
          margin-bottom: var(--space-4);
        }

        .experimental-nav {
          list-style: none;
          margin-bottom: var(--space-8);
        }

        .experimental-nav-item {
          margin-bottom: var(--space-2);
        }

        .experimental-nav-link {
          display: block;
          padding: var(--space-2) var(--space-3);
          color: var(--color-gray-700);
          text-decoration: none;
          border-radius: var(--space-1);
          transition: var(--transition-fast);
          font-size: var(--text-sm);
        }

        .experimental-nav-link:hover {
          background: var(--color-white);
          color: var(--color-black);
        }

        .experimental-info-box {
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          border-radius: var(--space-2);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .info-box-title {
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: var(--space-2);
          color: var(--color-black);
        }

        .info-box-content {
          font-size: var(--text-xs);
          color: var(--color-gray-600);
          line-height: 1.5;
        }

        /* Main Content */
        .experimental-main {
          margin-left: 300px;
          flex: 1;
          min-height: 100vh;
        }

        /* Hero Section */
        .experimental-hero {
          padding: var(--space-24) var(--space-8);
          border-bottom: 1px solid var(--color-gray-200);
          background: linear-gradient(135deg, var(--color-white) 0%, var(--color-gray-50) 100%);
        }

        .experimental-title {
          font-size: var(--text-8xl);
          font-weight: 900;
          line-height: 0.9;
          margin-bottom: var(--space-4);
          color: var(--color-black);
          letter-spacing: -0.02em;
        }

        .experimental-subtitle {
          font-size: var(--text-xl);
          color: var(--color-gray-600);
          margin-bottom: var(--space-8);
          font-weight: 500;
        }

        .hero-description {
          font-size: var(--text-lg);
          color: var(--color-gray-700);
          line-height: 1.8;
          max-width: 600px;
          margin-bottom: var(--space-8);
        }

        .hero-actions {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .experimental-btn {
          padding: var(--space-3) var(--space-6);
          border: 2px solid var(--color-black);
          background: transparent;
          color: var(--color-black);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition-fast);
          cursor: pointer;
          font-size: var(--text-sm);
          border-radius: var(--space-1);
        }

        .experimental-btn--primary {
          background: var(--color-black);
          color: var(--color-white);
        }

        .experimental-btn--primary:hover {
          background: var(--color-gray-800);
        }

        .experimental-btn:hover {
          background: var(--color-black);
          color: var(--color-white);
        }

        /* Grid Layout */
        .experimental-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-6);
          padding: var(--space-8);
        }

        /* Cards */
        .experimental-card {
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          padding: var(--space-8);
          cursor: pointer;
          transition: var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .experimental-card:hover {
          border-color: var(--color-electric-blue);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .experimental-card.featured {
          grid-column: span 2;
          background: linear-gradient(135deg, var(--color-electric-blue-bg) 0%, var(--color-white) 100%);
          border-color: var(--color-electric-blue);
        }

        .card-header {
          margin-bottom: var(--space-6);
        }

        .card-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          margin-bottom: var(--space-2);
          color: var(--color-black);
        }

        .card-subtitle {
          font-size: var(--text-sm);
          color: var(--color-gray-600);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .card-description {
          font-size: var(--text-base);
          color: var(--color-gray-700);
          line-height: 1.7;
          margin-bottom: var(--space-6);
        }

        .card-meta {
          font-size: var(--text-xs);
          color: var(--color-gray-500);
          line-height: 1.6;
          font-family: var(--font-mono);
        }

        /* Footer */
        .site-footer {
          background: var(--color-gray-900);
          color: var(--color-white);
          padding: var(--space-8);
          margin-left: 300px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .footer-links {
          display: flex;
          gap: var(--space-6);
        }

        .footer-links a {
          color: var(--color-gray-300);
          text-decoration: none;
          font-size: var(--text-sm);
          transition: var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--color-white);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .experimental-sidebar {
            display: none;
          }

          .experimental-main, .site-footer {
            margin-left: 0;
          }

          .experimental-hero {
            padding: var(--space-6) var(--space-4);
          }

          .experimental-title {
            font-size: var(--text-4xl);
          }

          .experimental-grid {
            grid-template-columns: 1fr;
            gap: var(--space-3);
            padding: var(--space-4);
          }

          .experimental-card.featured {
            grid-column: auto;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .experimental-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }

        .experimental-slide-up {
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }
      `}</style>

      <div className="experimental-container">
        {/* Sidebar */}
        <div className="experimental-sidebar">
          <div className="experimental-brand">
            <h1><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Studio Poetics</Link></h1>
            <p>Experimental Interaction Design Studio</p>
          </div>

          <nav>
            <div className="experimental-nav-title">Services</div>
            <ul className="experimental-nav">
              <li className="experimental-nav-item">
                <Link href="/spatial-interaction-design" className="experimental-nav-link">Spatial Design</Link>
              </li>
              <li className="experimental-nav-item">
                <Link href="/experimental-gaming-hardware" className="experimental-nav-link">Gaming Hardware</Link>
              </li>
              <li className="experimental-nav-item">
                <Link href="/technology-strategy" className="experimental-nav-link">Tech Strategy</Link>
              </li>
            </ul>
          </nav>

          <div className="experimental-info-box">
            <div className="info-box-title">Our Approach</div>
            <div className="info-box-content">We design interactions that don't exist yet. From holographic displays to cozy gaming hardware, we explore how technology becomes more human.</div>
          </div>

          <div className="experimental-info-box">
            <div className="info-box-title">Recent Work</div>
            <div className="info-box-content">
              India Blockchain Week<br/>
              Interactive Zen Garden<br/>
              Monsoon Stories Game
            </div>
          </div>

          <div className="experimental-info-box">
            <div className="info-box-title">Collaborations</div>
            <div className="info-box-content">
              Universities, startups, and established companies who share our vision of thoughtful technology integration.
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="experimental-main">
          {/* Hero Section */}
          <div className="experimental-hero experimental-fade-in">
            <h1 className="experimental-title">Studio Poetics +</h1>
            <h2 className="experimental-subtitle">Experimental Interaction Design Studio</h2>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-gray-600)' }}>2019</span>
              <span style={{ margin: '0 1rem', fontSize: 'var(--text-lg)' }}>→</span>
              <span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-gray-600)' }}>∞</span>
            </div>

            <p className="hero-description">
              We design interactions that don't exist yet. From holographic displays in living rooms to games that live on kitchen tables, we explore how technology becomes more human. Our experimental approach spans spatial interfaces, cozy gaming hardware, and workshops that help organizations navigate emerging tech with strategies built to last.
            </p>

            <div className="hero-actions">
              <Link href="#services" className="experimental-btn experimental-btn--primary">Explore Services</Link>
              <Link href="/projects" className="experimental-btn">View Projects</Link>
              <Link href="/contact" className="experimental-btn">Contact Studio</Link>
            </div>
          </div>

          {/* Services Grid */}
          <div id="services" className="experimental-grid experimental-slide-up">
            {/* Spatial Design - Featured */}
            <div
              className="experimental-card featured"
              onMouseEnter={() => setActiveService(0)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-header">
                <h3 className="card-title">Spatial Interaction Design</h3>
                <p className="card-subtitle">Holographic & Environmental Systems</p>
              </div>
              <div className="card-description">
                Our holographic displays transform museums, homes, and offices into interactive spaces. We partner with architects and interior designers to embed responsive technology into the built environment, creating experiences that feel natural and intuitive.
              </div>
              <div className="card-meta">
                Status: Active Development<br/>
                Recent: Science City Kolkata<br/>
                Focus: Museum & Interior Design
              </div>
            </div>

            {/* Gaming Hardware */}
            <div
              className="experimental-card"
              onMouseEnter={() => setActiveService(1)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-header">
                <h3 className="card-title">Experimental Gaming Hardware</h3>
                <p className="card-subtitle">Cozy Interactive Surfaces</p>
              </div>
              <div className="card-description">
                We design cozy, warm games for unconventional surfaces—fridge doors, coffee tables, kitchen appliances. Play reimagined for the spaces where we actually live.
              </div>
              <div className="card-meta">
                Status: Prototyping<br/>
                Current: Monsoon Stories<br/>
                Platform: Everyday Objects
              </div>
            </div>

            {/* Technology Strategy */}
            <div
              className="experimental-card"
              onMouseEnter={() => setActiveService(2)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-header">
                <h3 className="card-title">Technology Strategy</h3>
                <p className="card-subtitle">Workshops & Future Planning</p>
              </div>
              <div className="card-description">
                We help businesses navigate emerging tech with long-lasting strategies. Our workshops explore what's next—without the hype or fear.
              </div>
              <div className="card-meta">
                Status: Ongoing<br/>
                Partners: NID, Universities<br/>
                Focus: Strategic Planning
              </div>
            </div>

            {/* UX/UI Design */}
            <div
              className="experimental-card"
              onMouseEnter={() => setActiveService(3)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-header">
                <h3 className="card-title">Digital Experience Design</h3>
                <p className="card-subtitle">Human-Centered Interfaces</p>
              </div>
              <div className="card-description">
                Conversation interfaces, blockchain applications, and micro-investing platforms designed with empathy and accessibility at the core.
              </div>
              <div className="card-meta">
                Status: Client Work<br/>
                Recent: India Blockchain Week<br/>
                Specialty: Fintech & Web3
              </div>
            </div>

            {/* Branding & Identity */}
            <div
              className="experimental-card"
              onMouseEnter={() => setActiveService(4)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-header">
                <h3 className="card-title">Brand & Visual Identity</h3>
                <p className="card-subtitle">Complete Brand Systems</p>
              </div>
              <div className="card-description">
                From concept to implementation, we create cohesive brand experiences that reflect forward-thinking organizations and their values.
              </div>
              <div className="card-meta">
                Status: Available<br/>
                Portfolio: Multiple Sectors<br/>
                Approach: Research-Driven
              </div>
            </div>

            {/* Research & Innovation */}
            <div
              className="experimental-card"
              onMouseEnter={() => setActiveService(5)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-header">
                <h3 className="card-title">Research & Innovation</h3>
                <p className="card-subtitle">Future Interface Exploration</p>
              </div>
              <div className="card-description">
                Gesture recognition, voice interfaces, spatial computing, and bio-responsive systems. We explore the boundaries of human-computer interaction.
              </div>
              <div className="card-meta">
                Status: Experimental<br/>
                Focus: Emerging Technologies<br/>
                Timeline: Long-term Vision
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <div>
              Studio Poetics — Experimental Interaction Design Studio based in India
            </div>
            <div className="footer-links">
              <Link href="/about">About</Link>
              <Link href="/team">Team</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}