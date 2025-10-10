import type { Metadata } from "next"
import DigitalExperienceClient from "./digital-experience-client"

export const metadata: Metadata = {
  title: "Digital Experience Design | Studio Poetics",
  description: "We design digital experiences that feel human, not just functional. From mobile apps to web platforms, we create interfaces that connect people with technology in meaningful, delightful ways.",
  keywords: "digital experience design, UX design, interface design, user experience, digital products, human-centered design, experimental interfaces",
  openGraph: {
    title: "Digital Experience Design | Studio Poetics",
    description: "Digital experiences that feel human, not just functional. We create interfaces that connect people with technology meaningfully.",
    url: "https://poetics.studio/digital-experience-design",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-digital-experience.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Experience Design | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Experience Design | Studio Poetics",
    description: "Digital experiences that feel human, not just functional.",
    images: ["/og-digital-experience.jpg"],
  },
}

export default function DigitalExperienceDesignPage() {
  return <DigitalExperienceClient />
}