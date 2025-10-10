import type { Metadata } from "next"
import ExperimentsClient from "./experiments-client"

export const metadata: Metadata = {
  title: "Experiments | Studio Poetics",
  description: "Explorative prototypes and speculative designs that push the boundaries of technology, interaction, and human experience. See our latest experimental projects and research.",
  keywords: "experiments, prototypes, speculative design, interaction design, technology research, innovation",
  openGraph: {
    title: "Experiments | Studio Poetics",
    description: "Explorative prototypes and speculative designs that push the boundaries of technology, interaction, and human experience.",
    url: "https://poetics.studio/experiments",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-experiments.jpg",
        width: 1200,
        height: 630,
        alt: "Experiments | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiments | Studio Poetics",
    description: "Explorative prototypes and speculative designs that push the boundaries of technology, interaction, and human experience.",
    images: ["/og-experiments.jpg"],
  },
}

export default function ExperimentsPage() {
  return <ExperimentsClient />
}