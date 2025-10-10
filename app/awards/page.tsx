import type { Metadata } from "next"
import AwardsClient from "./awards-client"

export const metadata: Metadata = {
  title: "Awards | Studio Poetics",
  description: "Meet our award-winning designers who create spaces that leave lasting impressions. Recognized by Red Dot, Good Design, and international design competitions.",
  keywords: "award-winning designers, design awards, Red Dot Design Award, Good Design Award, creative team",
  openGraph: {
    title: "Awards | Studio Poetics",
    description: "Meet our award-winning designers who create spaces that leave lasting impressions.",
    url: "https://poetics.studio/awards",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-awards.jpg",
        width: 1200,
        height: 630,
        alt: "Awards | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awards | Studio Poetics",
    description: "Meet our award-winning designers who create spaces that leave lasting impressions.",
    images: ["/og-awards.jpg"],
  },
}

export default function AwardsPage() {
  return <AwardsClient />
}
