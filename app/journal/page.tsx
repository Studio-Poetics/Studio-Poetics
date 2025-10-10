import type { Metadata } from "next"
import JournalClient from "./journal-client"

export const metadata: Metadata = {
  title: "Design Journal | Studio Poetics",
  description: "Thoughtful explorations on design, technology, and the poetry of everyday objects. Read our latest insights on sense-making practices and creative innovation.",
  keywords: "design journal, design thinking, technology, everyday objects, creative writing, design insights",
  openGraph: {
    title: "Design Journal | Studio Poetics",
    description: "Thoughtful explorations on design, technology, and the poetry of everyday objects.",
    url: "https://poetics.studio/journal",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-journal.jpg",
        width: 1200,
        height: 630,
        alt: "Design Journal | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Journal | Studio Poetics",
    description: "Thoughtful explorations on design, technology, and the poetry of everyday objects.",
    images: ["/og-journal.jpg"],
  },
}

export default function JournalPage() {
  return <JournalClient />
}