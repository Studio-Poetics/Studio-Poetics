import type { Metadata } from "next"
import WorkshopsClient from "./workshops-client"

export const metadata: Metadata = {
  title: "Community Innovation Labs | Studio Poetics",
  description: "Collaborative spaces where diverse communities co-create solutions for local challenges, bridging technology, design, and social impact through participatory innovation.",
  keywords: "community innovation, collaborative design, workshops, participatory innovation, co-creation, social impact",
  openGraph: {
    title: "Community Innovation Labs | Studio Poetics",
    description: "Collaborative spaces where diverse communities co-create solutions for local challenges through participatory innovation.",
    url: "https://poetics.studio/workshops",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-workshops.jpg",
        width: 1200,
        height: 630,
        alt: "Community Innovation Labs | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Innovation Labs | Studio Poetics",
    description: "Collaborative spaces where diverse communities co-create solutions for local challenges through participatory innovation.",
    images: ["/og-workshops.jpg"],
  },
}

export default function WorkshopsPage() {
  return <WorkshopsClient />
}