import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experimental Gaming Hardware | Studio Poetics",
  description: "We design cozy, warm games for unconventional surfaces—fridge doors, coffee tables, kitchen appliances. Play reimagined for the spaces where we actually live, creating intimate gaming experiences in everyday objects.",
  keywords: "experimental gaming, hardware games, kitchen games, fridge door games, table games, everyday gaming, cozy games, warm games",
  openGraph: {
    title: "Experimental Gaming Hardware | Studio Poetics",
    description: "Cozy games for unconventional surfaces. We embed play into everyday objects—kitchen tables, fridge doors, appliances.",
    url: "https://poetics.studio/experimental-gaming-hardware",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-gaming-hardware.jpg",
        width: 1200,
        height: 630,
        alt: "Experimental Gaming Hardware | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experimental Gaming Hardware | Studio Poetics",
    description: "Cozy games for unconventional surfaces. Play reimagined for everyday living spaces.",
    images: ["/og-gaming-hardware.jpg"],
  },
}

import ExperimentalGamingClient from "./experimental-gaming-client"

export default function ExperimentalGamingHardwarePage() {
  return <ExperimentalGamingClient />
}