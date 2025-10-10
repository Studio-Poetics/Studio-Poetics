"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"

export default function AlternativeHome() {
  const [activeService, setActiveService] = useState<number | null>(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      number: "01",
      title: "Spatial Interaction Design",
      subtitle: "Interactive Environments & Holographic Systems",
      description: "Our holographic displays transform museums, homes, and offices into interactive spaces. We partner with architects and interior designers to embed responsive technology into the built environment, creating experiences that feel natural and intuitive.",
      meta: "Status: Active Development\nRecent: Science City Kolkata\nFocus: Museum & Interior Design",
      link: "/spatial-interaction-design"
    },
    {
      id: 2,
      number: "02",
      title: "Experimental Gaming Hardware",
      subtitle: "Cozy Interactive Surfaces",
      description: "We design cozy, warm games for unconventional surfaces—fridge doors, coffee tables, kitchen appliances. Play reimagined for the spaces where we actually live, creating intimate gaming experiences.",
      meta: "Status: Prototyping\nCurrent: Monsoon Stories\nPlatform: Everyday Objects",
      link: "/experimental-gaming-hardware"
    },
    {
      id: 3,
      number: "03",
      title: "Holographic Display Systems",
      subtitle: "Advanced Projection Technology",
      description: "Cutting-edge holographic technology that creates immersive visual experiences for museums, exhibitions, and commercial spaces. Our Glasscape technology brings digital content into physical reality.",
      meta: "Status: Available\nTechnology: Glasscape\nApplications: Museums, Events",
      link: "/holographic-displays"
    },
    {
      id: 4,
      number: "04",
      title: "Technology Strategy Workshops",
      subtitle: "Future Planning & Education",
      description: "We help organizations navigate emerging tech with long-lasting strategies through hands-on workshops and strategic planning sessions. Education that builds lasting understanding, not just hype.",
      meta: "Status: Ongoing\nPartners: NID, Universities\nFocus: Strategic Planning",
      link: "/technology-strategy"
    },
    {
      id: 5,
      number: "05",
      title: "Digital Experience Design",
      subtitle: "Human-Centered Interfaces",
      description: "Comprehensive digital experiences including websites, applications, and interactive systems designed with empathy and accessibility at the core. Technology that serves people, not the other way around.",
      meta: "Status: Client Work\nRecent: India Blockchain Week\nSpecialty: Web & Mobile",
      link: "/digital-experience-design"
    }
  ]

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

          --color-brand-salmon: #fb4e4e;
          --color-brand-salmon-dark: #e03e3e;
          --color-brand-salmon-light: #ff6b6b;
          --color-brand-salmon-bg: rgba(251, 78, 78, 0.15);

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
          min-height: 100vh;
          position: relative;
        }

        /* Vertical Right Menu */
        .vertical-right-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 60px;
          height: 100vh;
          background: var(--color-black);
          z-index: 50;
          display: flex;
          justify-content: center;
          align-items: center;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .vertical-menu-text {
          color: var(--color-black);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .vertical-menu-text:hover {
          color: var(--color-brand-salmon);
        }

        /* Menu Overlay */
        .main-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--color-white);
          z-index: 60;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          overflow-y: auto;
        }

        .main-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .main-menu-content {
          padding: var(--space-8);
          max-width: 1600px;
          margin: 0 auto;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .menu-close {
          position: absolute;
          top: var(--space-8);
          right: var(--space-8);
          background: none;
          border: none;
          font-size: var(--text-4xl);
          cursor: pointer;
          color: var(--color-gray-600);
          transition: var(--transition-fast);
          z-index: 70;
        }

        .menu-close:hover {
          color: var(--color-black);
        }

        .menu-title {
          font-size: var(--text-5xl);
          font-weight: 900;
          margin-bottom: var(--space-8);
          color: var(--color-black);
        }

        .main-menu-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: var(--space-16);
        }

        .main-menu-link {
          display: block;
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--color-black);
          text-decoration: none;
          padding: var(--space-4) 0;
          border-bottom: 2px solid var(--color-gray-200);
          transition: var(--transition-fast);
        }

        .main-menu-link:hover {
          background: var(--color-brand-salmon);
          color: var(--color-white);
          border-bottom-color: var(--color-brand-salmon);
          padding-left: var(--space-4);
          padding-right: var(--space-4);
          margin-left: calc(-1 * var(--space-4));
          margin-right: calc(-1 * var(--space-4));
        }

        /* Main Content */
        .experimental-main {
          width: calc(100% - 60px);
          min-height: 100vh;
        }

        /* Hero Section */
        .experimental-hero {
          padding: var(--space-24) var(--space-8);
          border-bottom: 1px solid var(--color-gray-200);
          background: var(--color-white);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-8);
          align-items: center;
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
          font-size: var(--text-2xl);
          color: var(--color-gray-700);
          margin-bottom: var(--space-8);
          font-weight: 700;
          letter-spacing: -0.01em;
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

        /* Hero Video Section */
        .hero-video-wrap {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          border-radius: var(--space-2);
          background: var(--color-black);
        }

        .hero-video-el {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
          padding: var(--space-8);
        }

        /* Cards */
        .experimental-card {
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          padding: var(--space-6);
          cursor: pointer;
          transition: var(--transition-base);
          position: relative;
          overflow: hidden;
          min-height: 280px;
        }

        .experimental-card:hover {
          background: var(--color-gray-50);
          border-color: var(--color-brand-salmon);
          border-width: 2px;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        /* Featured Detail Card - Top Left */
        .experimental-card.featured {
          grid-column: 1 / span 2;
          grid-row: 1 / span 2;
          background: var(--color-white);
          border-color: var(--color-brand-salmon);
          min-height: auto;
          padding: var(--space-8);
        }

        /* Service Grid Positioning - Clockwise arrangement */
        .service-01 {
          grid-column: 3;
          grid-row: 1;
        }

        .service-02 {
          grid-column: 3;
          grid-row: 2;
        }

        .service-03 {
          grid-column: 3;
          grid-row: 3;
        }

        .service-04 {
          grid-column: 2;
          grid-row: 3;
        }

        .service-05 {
          grid-column: 1;
          grid-row: 3;
        }

        .experimental-card.featured .card-number {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-4);
        }

        .experimental-card.featured .card-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-4);
        }

        .experimental-card.featured .card-subtitle {
          font-size: var(--text-lg);
          margin-bottom: var(--space-6);
        }

        .experimental-card.featured .card-description {
          font-size: var(--text-base);
          line-height: 1.7;
          margin-bottom: var(--space-6);
        }

        .experimental-card.featured .card-meta {
          font-size: var(--text-sm);
          margin-bottom: var(--space-6);
        }

        .experimental-card.featured:hover {
          background: var(--color-brand-salmon);
          color: var(--color-white);
        }

        .experimental-card.featured:hover .card-title,
        .experimental-card.featured:hover .card-subtitle,
        .experimental-card.featured:hover .card-description,
        .experimental-card.featured:hover .card-meta {
          color: var(--color-white);
        }

        /* Default highlighted card */
        .experimental-card.highlighted {
          background: var(--color-gray-50);
          border-color: var(--color-brand-salmon);
          border-width: 2px;
        }

        .card-header {
          margin-bottom: var(--space-4);
        }

        .card-number {
          display: block;
          font-size: var(--text-xl);
          font-weight: 500;
          color: var(--color-brand-salmon);
          margin-bottom: var(--space-2);
          font-family: var(--font-mono);
        }

        .card-title {
          font-size: var(--text-xl);
          font-weight: 800;
          margin-bottom: var(--space-2);
          color: var(--color-black);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .card-subtitle {
          font-size: var(--text-xs);
          color: var(--color-gray-600);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .card-description {
          font-size: var(--text-sm);
          color: var(--color-gray-700);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }

        .card-meta {
          font-size: var(--text-xs);
          color: var(--color-gray-500);
          line-height: 1.5;
          font-family: var(--font-mono);
        }

        /* Featured card specific styling */
        .experimental-card.featured .card-number {
          font-size: var(--text-3xl);
        }

        .experimental-card.featured .card-title {
          font-size: var(--text-3xl);
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .experimental-card.featured .card-subtitle {
          font-size: var(--text-sm);
        }

        .experimental-card.featured .card-description {
          font-size: var(--text-base);
          margin-bottom: var(--space-6);
        }

        /* Highlighted state for active cards */
        .experimental-card.highlighted {
          background: var(--color-gray-50);
          border-color: var(--color-brand-salmon);
          border-width: 2px;
        }

        /* Client Logo Section */
        .client-section {
          background: var(--color-white);
          padding: var(--space-20) var(--space-8);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .client-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-16);
          align-items: center;
        }

        .client-text h2 {
          font-size: var(--text-6xl);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: var(--space-4);
          color: var(--color-black);
        }

        .client-text p {
          font-size: var(--text-lg);
          color: var(--color-gray-600);
          line-height: 1.6;
          margin-bottom: var(--space-6);
        }

        .client-logos {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          align-items: center;
        }

        .client-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          border-radius: var(--space-2);
          transition: var(--transition-fast);
          height: 80px;
          position: relative;
          cursor: pointer;
        }

        .client-logo:hover {
          border-color: var(--color-brand-salmon);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .client-logo img {
          max-width: 100%;
          max-height: 50px;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.7;
          transition: var(--transition-fast);
        }

        .client-logo:hover img {
          filter: grayscale(0%);
          opacity: 1;
        }

        /* Client Name Tooltip */
        .client-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-black);
          color: var(--color-white);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--space-1);
          font-size: var(--text-xs);
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          margin-bottom: var(--space-1);
          z-index: 10;
        }

        .client-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--color-black);
        }

        .client-logo:hover .client-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-4px);
        }

        /* Footer */
        .site-footer {
          background: var(--color-gray-900);
          color: var(--color-white);
          padding: var(--space-8);
          width: 100%;
          position: relative;
        }

        .footer-content {
          padding: var(--space-16) var(--space-8);
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Footer Hero Section */
        .footer-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-12);
          margin-bottom: var(--space-16);
        }

        .footer-socials h3 {
          font-size: var(--text-xl);
          font-weight: 500;
          margin-bottom: var(--space-6);
          color: var(--color-white);
        }

        .social-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }

        .social-btn {
          border: 1px solid var(--color-white);
          color: var(--color-white);
          text-decoration: none;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--space-6);
          font-size: var(--text-xs);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: var(--transition-fast);
        }

        .social-btn:hover {
          background: var(--color-brand-salmon);
          border-color: var(--color-brand-salmon);
          color: var(--color-white);
        }

        .glasscape-title {
          font-size: var(--text-xl);
          font-weight: 500;
          margin-bottom: var(--space-6);
          color: var(--color-white);
          background: linear-gradient(45deg, var(--color-brand-salmon), var(--color-brand-salmon-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glasscape-btn {
          display: inline-block;
          border: 1px solid var(--color-white);
          color: var(--color-white);
          text-decoration: none;
          padding: var(--space-3) var(--space-8);
          border-radius: var(--space-6);
          font-size: var(--text-base);
          font-weight: 500;
          margin-bottom: var(--space-4);
          transition: var(--transition-fast);
        }

        .glasscape-btn:hover {
          background: var(--color-brand-salmon);
          border-color: var(--color-brand-salmon);
          color: var(--color-white);
        }

        .glasscape-description {
          color: var(--color-gray-400);
          line-height: 1.6;
          max-width: 500px;
        }

        /* Main Footer Sections */
        .footer-main {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-8);
          margin-bottom: var(--space-12);
        }

        /* About Section */
        .footer-about {
          margin-bottom: var(--space-12);
        }

        /* Contact Section */
        .footer-contact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-8);
          margin-bottom: var(--space-12);
          padding-top: var(--space-8);
          border-top: 1px solid var(--color-gray-700);
        }

        .footer-section h3 {
          font-size: var(--text-lg);
          font-weight: 600;
          margin-bottom: var(--space-4);
          color: var(--color-white);
        }

        .footer-section p {
          color: var(--color-gray-300);
          margin-bottom: var(--space-2);
          font-size: var(--text-sm);
        }

        .footer-link {
          display: block;
          color: var(--color-gray-300);
          text-decoration: none;
          font-size: var(--text-sm);
          margin-bottom: var(--space-2);
          transition: var(--transition-fast);
        }

        .footer-link:hover {
          background: var(--color-brand-salmon);
          color: var(--color-white);
          padding-left: var(--space-2);
          padding-right: var(--space-2);
          margin-left: calc(-1 * var(--space-2));
          margin-right: calc(-1 * var(--space-2));
        }

        .footer-btn {
          display: inline-block;
          border: 1px solid var(--color-white);
          color: var(--color-white);
          text-decoration: none;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--space-6);
          font-size: var(--text-sm);
          margin-top: var(--space-2);
          transition: var(--transition-fast);
        }

        .footer-btn:hover {
          background: var(--color-brand-salmon);
          border-color: var(--color-brand-salmon);
          color: var(--color-white);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4);
          color: var(--color-gray-400);
          font-size: var(--text-xs);
        }

        .footer-legal {
          display: flex;
          gap: var(--space-4);
        }

        .footer-legal a {
          color: var(--color-gray-400);
          text-decoration: none;
          transition: var(--transition-fast);
        }

        .footer-legal a:hover {
          background: var(--color-brand-salmon);
          color: var(--color-white);
          padding: var(--space-1) var(--space-2);
          margin: calc(-1 * var(--space-1)) calc(-1 * var(--space-2));
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .vertical-right-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: auto;
            z-index: 60;
            background: var(--color-white);
            border-bottom: 1px solid var(--color-gray-200);
            padding: var(--space-3) var(--space-4);
          }

          .vertical-menu-text {
            writing-mode: initial;
            transform: none;
            padding: var(--space-2) 0;
            background: transparent;
            border: none;
            border-radius: 0;
            box-shadow: none;
            font-size: var(--text-base);
            font-weight: 600;
            color: var(--color-black);
            text-align: center;
            width: 100%;
          }

          .experimental-main {
            width: 100%;
            padding-top: 80px;
          }

          .experimental-hero {
            padding: var(--space-6) var(--space-4);
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .hero-content {
            order: 2;
          }

          .hero-video-side {
            order: 1;
          }

          .hero-video-wrap {
            height: 250px;
          }

          .experimental-title {
            font-size: var(--text-4xl);
          }

          .experimental-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: var(--space-3);
            padding: var(--space-4);
            height: auto;
          }

          .experimental-card.featured {
            display: none;
          }

          .service-card {
            min-height: 120px;
          }

          .service-01, .service-02, .service-03, .service-04, .service-05 {
            grid-column: auto;
            grid-row: auto;
          }

          .vertical-menu-text {
            font-size: var(--text-xs);
          }

          /* Menu Overlay Mobile */
          .main-menu-nav {
            grid-template-columns: 1fr;
            gap: var(--space-4);
            padding: var(--space-4);
          }

          .main-menu-link {
            font-size: var(--text-lg);
            padding: var(--space-3) 0;
            margin: 0;
            border-bottom: 1px solid var(--color-gray-200);
          }

          .main-menu-link:hover {
            padding-left: 0;
            padding-right: 0;
            margin-left: 0;
            margin-right: 0;
            padding: var(--space-3) var(--space-4);
            margin: 0 calc(-1 * var(--space-4));
          }

          /* Footer Responsive */
          .footer-hero {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }

          .footer-contact {
            grid-template-columns: 1fr;
          }

          .footer-main {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .social-buttons {
            gap: var(--space-2);
          }

          .social-btn {
            font-size: 10px;
            padding: var(--space-1) var(--space-3);
          }

          /* Client Section Responsive */
          .client-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
          }

          .client-text h2 {
            font-size: var(--text-4xl);
          }

          .client-logos {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-4);
          }

          .client-logo {
            height: 60px;
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
        {/* Vertical Right Menu */}
        <div className="vertical-right-menu">
          <div
            className="vertical-menu-text"
            onClick={() => setIsMenuOpen(true)}
          >
            Navigation
          </div>
        </div>

        {/* Main Menu Overlay */}
        <div className={`main-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
          <button
            className="menu-close"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
          <div className="main-menu-content">
            <h2 className="menu-title">Navigation</h2>
            <nav className="main-menu-nav">
              <Link href="/" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/spatial-interaction-design" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Spatial Interaction Design
              </Link>
              <Link href="/experimental-gaming-hardware" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Experimental Gaming Hardware
              </Link>
              <Link href="/holographic-displays" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Holographic Display Systems
              </Link>
              <Link href="/technology-strategy" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Technology Strategy Workshops
              </Link>
              <Link href="/digital-experience-design" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Digital Experience Design
              </Link>
              <Link href="/projects" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Projects
              </Link>
              <Link href="/about" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/team" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Team
              </Link>
              <Link href="/contact" className="main-menu-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="experimental-main">
          {/* Hero Section */}
          <div className="experimental-hero experimental-fade-in">
            {/* Left Side - Content */}
            <div className="hero-content">
              <h1 className="experimental-title">Studio Poetics +</h1>
              <h2 className="experimental-subtitle">Experimental Interaction Design Studio</h2>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-gray-600)' }}>2023</span>
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

            {/* Right Side - Video */}
            <div className="hero-video-wrap">
              <video className="hero-video-el" autoPlay muted loop playsInline preload="auto" poster="poster.jpg">
                <source src="/your-video.webm" type="video/webm" />
                <source src="/your-video.mp4" type="video/mp4" />
                {/* Fallback content if video is not supported */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--color-white)',
                  fontSize: 'var(--text-lg)'
                }}>
                  Video not supported
                </div>
              </video>
            </div>
          </div>

          {/* Services Grid */}
          <div
            id="services"
            className="experimental-grid experimental-slide-up"
            onMouseLeave={() => setActiveService(0)}
          >
            {/* Featured Detail Card - Top Left, shows active service details */}
            <div className="experimental-card featured">
              <div className="card-header">
                <span className="card-number">{services[activeService || 0].number}</span>
                <h3 className="card-title">{services[activeService || 0].title}</h3>
                <p className="card-subtitle">{services[activeService || 0].subtitle}</p>
              </div>
              <div className="card-description">
                {services[activeService || 0].description}
              </div>
              <div className="card-meta">
                {services[activeService || 0].meta.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < services[activeService || 0].meta.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
              <Link
                href={services[activeService || 0].link}
                className="experimental-btn experimental-btn--primary"
              >
                Learn More
              </Link>
            </div>

            {/* Service 01 - Top Right */}
            <div
              className={`experimental-card service-01 ${activeService === 0 ? 'highlighted' : ''}`}
              onMouseEnter={() => setActiveService(0)}
              onClick={() => window.location.href = services[0].link}
            >
              <div className="card-header">
                <span className="card-number">{services[0].number}</span>
                <h3 className="card-title">{services[0].title}</h3>
                <p className="card-subtitle">{services[0].subtitle}</p>
              </div>
              <div className="card-description">
                {services[0].description}
              </div>
            </div>

            {/* Service 02 - Middle Right */}
            <div
              className={`experimental-card service-02 ${activeService === 1 ? 'highlighted' : ''}`}
              onMouseEnter={() => setActiveService(1)}
              onClick={() => window.location.href = services[1].link}
            >
              <div className="card-header">
                <span className="card-number">{services[1].number}</span>
                <h3 className="card-title">{services[1].title}</h3>
                <p className="card-subtitle">{services[1].subtitle}</p>
              </div>
              <div className="card-description">
                {services[1].description}
              </div>
            </div>

            {/* Service 03 - Bottom Right */}
            <div
              className={`experimental-card service-03 ${activeService === 2 ? 'highlighted' : ''}`}
              onMouseEnter={() => setActiveService(2)}
              onClick={() => window.location.href = services[2].link}
            >
              <div className="card-header">
                <span className="card-number">{services[2].number}</span>
                <h3 className="card-title">{services[2].title}</h3>
                <p className="card-subtitle">{services[2].subtitle}</p>
              </div>
              <div className="card-description">
                {services[2].description}
              </div>
            </div>

            {/* Service 04 - Bottom Center */}
            <div
              className={`experimental-card service-04 ${activeService === 3 ? 'highlighted' : ''}`}
              onMouseEnter={() => setActiveService(3)}
              onClick={() => window.location.href = services[3].link}
            >
              <div className="card-header">
                <span className="card-number">{services[3].number}</span>
                <h3 className="card-title">{services[3].title}</h3>
                <p className="card-subtitle">{services[3].subtitle}</p>
              </div>
              <div className="card-description">
                {services[3].description}
              </div>
            </div>

            {/* Service 05 - Bottom Left */}
            <div
              className={`experimental-card service-05 ${activeService === 4 ? 'highlighted' : ''}`}
              onMouseEnter={() => setActiveService(4)}
              onClick={() => window.location.href = services[4].link}
            >
              <div className="card-header">
                <span className="card-number">{services[4].number}</span>
                <h3 className="card-title">{services[4].title}</h3>
                <p className="card-subtitle">{services[4].subtitle}</p>
              </div>
              <div className="card-description">
                {services[4].description}
              </div>
            </div>
          </div>

          {/* Client Logo Section */}
          <section className="client-section">
            <div className="client-content">
              <div className="client-text">
                <h2>Trusted by forward-thinking organizations</h2>
                <p>We work with universities, startups, and established companies who share our vision of thoughtful technology integration and human-centered design.</p>
              </div>

              <div className="client-logos">
                <div className="client-logo">
                  <div className="client-tooltip">National Institute of Design</div>
                  <img src="/logos/NID.jpg" alt="National Institute of Design" />
                </div>
                <div className="client-logo">
                  <div className="client-tooltip">Hashed Emergent</div>
                  <img src="/logos/Hashed-Emergent.webp" alt="Hashed Emergent" />
                </div>
                <div className="client-logo">
                  <div className="client-tooltip">India Blockchain Week</div>
                  <img src="/logos/india blockchain week.svg" alt="India Blockchain Week" />
                </div>
                <div className="client-logo">
                  <div className="client-tooltip">Jar App</div>
                  <img src="/logos/jar app.png" alt="Jar App" />
                </div>
                <div className="client-logo">
                  <div className="client-tooltip">Science City Kolkata</div>
                  <img src="/logos/science city kolkata.jpeg" alt="Science City Kolkata" />
                </div>
                <div className="client-logo">
                  <div className="client-tooltip">Reclaim Protocol</div>
                  <img src="/logos/reclaim protocol.png" alt="Reclaim Protocol" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            {/* Social Media and Glasscape Section */}
            <div className="footer-hero">
              <div className="footer-socials">
                <h3>We are on socials</h3>
                <div className="social-buttons">
                  <Link href="https://instagram.com" className="social-btn">INSTAGRAM</Link>
                  <Link href="https://facebook.com" className="social-btn">FACEBOOK</Link>
                  <Link href="https://twitter.com" className="social-btn">TWITTER</Link>
                  <Link href="https://youtube.com" className="social-btn">YOUTUBE</Link>
                  <Link href="https://telegram.org" className="social-btn">TELEGRAM</Link>
                </div>
              </div>

              <div className="footer-glasscape">
                <h3 className="glasscape-title">Experience Reality Reimagined — Discover Glasscape</h3>
                <Link href="https://glasscape.in" target="_blank" rel="noopener noreferrer" className="glasscape-btn">
                  Explore Glasscape
                </Link>
                <p className="glasscape-description">
                  Step into the extraordinary with our breakthrough holographic technology — where digital art meets
                  physical reality in a mesmerizing dance of light and dimension.
                </p>
              </div>
            </div>

            {/* Main Footer Sections */}
            <div className="footer-main">
              <div className="footer-section">
                <h3>Resources</h3>
                <Link href="/games" className="footer-link">Games</Link>
                <Link href="/workbooks" className="footer-link">Workbooks</Link>
                <a href="/catalogue.pdf" download className="footer-link">Catalogue</a>
              </div>

              <div className="footer-section">
                <h3>Exhibitions and Events</h3>
                <Link href="/exhibitions" className="footer-link">Exhibitions</Link>
                <Link href="/calendar" className="footer-link">Calendar</Link>
              </div>

              <div className="footer-section">
                <h3>Learn</h3>
                <Link href="/workshop" className="footer-link">Workshops</Link>
                <Link href="/academic" className="footer-link">Academic Workshop</Link>
                <Link href="/professional" className="footer-link">Professional Workshop</Link>
              </div>

              <div className="footer-section">
                <h3>Research and Resources</h3>
                <Link href="/journal" className="footer-link">The Studio Poetics Journal</Link>
                <Link href="/workshops" className="footer-link">Studio Workshops</Link>
              </div>
            </div>

            {/* About Section */}
            <div className="footer-about">
              <div className="footer-section">
                <h3>About</h3>
                <Link href="/jobs" className="footer-link">Jobs</Link>
                <Link href="/contact" className="footer-link">Contacts</Link>
              </div>
            </div>

            {/* Contact Information */}
            <div className="footer-contact">
              <div className="contact-info">
                <h3>Contact Us</h3>
                <p>Poetics Research and Innovation Studio LLP, India</p>
                <p>hello@poetics.studio</p>
              </div>

              <div className="hours-info">
                <h3>Hours</h3>
                <p>Open Mon-Fri, 09:00–15:00</p>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="footer-legal">
                <Link href="/policies">Privacy Policies</Link>
                <Link href="/license">License Agreement</Link>
              </div>
              <div>© Studio Poetics {new Date().getFullYear()}</div>
              <div>Designed by Studio Poetics</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}