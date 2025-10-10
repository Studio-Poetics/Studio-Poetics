import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Holographic Displays & Glasscape | Studio Poetics",
  description: "Glasscape is our proprietary holographic display system for museums, homes, and offices. We create immersive holographic experiences that transform physical spaces through our in-house developed display technology.",
  keywords: "holographic displays, Glasscape, hologram technology, museum displays, interactive holograms, spatial computing, 3D displays",
  openGraph: {
    title: "Holographic Displays & Glasscape | Studio Poetics",
    description: "Glasscape - our proprietary holographic display system for immersive spatial experiences in museums, homes, and offices.",
    url: "https://poetics.studio/holographic-displays",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-glasscape.jpg",
        width: 1200,
        height: 630,
        alt: "Glasscape Holographic Displays | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Holographic Displays & Glasscape | Studio Poetics",
    description: "Glasscape - proprietary holographic display technology for immersive spatial experiences.",
    images: ["/og-glasscape.jpg"],
  },
}

import HolographicClient from "./holographic-client"

export default function HolographicDisplaysPage() {
  return <HolographicClient />
}