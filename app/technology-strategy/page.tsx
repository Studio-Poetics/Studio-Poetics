import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Technology Strategy Workshops | Studio Poetics",
  description: "We help businesses navigate emerging technology without the hype or fear. Our strategic workshops and consulting focus on sustainable adoption—strategies that last, not trends that fade.",
  keywords: "technology strategy, emerging tech consulting, strategic planning, technology adoption, innovation strategy, future planning",
  openGraph: {
    title: "Technology Strategy Workshops | Studio Poetics",
    description: "Strategic guidance for sustainable technology adoption. We help organizations navigate emerging tech without hype or fear.",
    url: "https://poetics.studio/technology-strategy",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-tech-strategy.jpg",
        width: 1200,
        height: 630,
        alt: "Technology Strategy Workshops | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Strategy Workshops | Studio Poetics",
    description: "Strategic guidance for sustainable technology adoption without the hype.",
    images: ["/og-tech-strategy.jpg"],
  },
}

import TechnologyStrategyClient from "./technology-strategy-client"

export default function TechnologyStrategyPage() {
  return <TechnologyStrategyClient />
}