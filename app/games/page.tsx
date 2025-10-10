import type { Metadata } from "next"
import GamesClient from "./games-client"

export const metadata: Metadata = {
  title: "Studio Poetics Games & Interactive Experiences",
  description: "Playful explorations that transform complex concepts into delightful, interactive experiences that foster curiosity and connection. Warm and gentle games including Monsoon Stories and Valley of Flowers.",
  keywords: "indie games, interactive experiences, narrative games, experimental games, monsoon stories, valley of flowers",
  openGraph: {
    title: "Studio Poetics Games & Interactive Experiences", 
    description: "Playful explorations that transform complex concepts into delightful, interactive experiences that foster curiosity and connection.",
    url: "https://poetics.studio/games",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-games.jpg",
        width: 1200,
        height: 630,
        alt: "Studio Poetics Games & Interactive Experiences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Poetics Games & Interactive Experiences",
    description: "Playful explorations that transform complex concepts into delightful, interactive experiences.",
    images: ["/og-games.jpg"],
  },
}

export default function GamesPage() {
  return <GamesClient />
}