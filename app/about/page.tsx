import type { Metadata } from "next"
import AboutClient from "./about-client"

export const metadata: Metadata = {
  title: "About Studio Poetics | Design Studio",
  description: "Learn about Studio Poetics, an experimental interaction design studio that creates new forms of human-technology connection through spatial interfaces, cozy gaming hardware, and strategic technology workshops.",
  keywords: "about studio poetics, design studio, sense-making, design practice, innovation studio, creative studio",
  openGraph: {
    title: "About Studio Poetics | Design Studio",
    description: "Learn about Studio Poetics, an experimental interaction design studio creating new forms of human-technology interaction.",
    url: "https://poetics.studio/about",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Studio Poetics | Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Studio Poetics | Design Studio", 
    description: "Learn about Studio Poetics, an experimental interaction design studio creating new forms of human-technology interaction.",
    images: ["/og-about.jpg"],
  },
}

export default function AboutPage() {
  return <AboutClient />
}