import type { Metadata } from "next"
import ConsultancyClient from "./consultancy-client"

export const metadata: Metadata = {
  title: "Studio Poetics Consultancy Services",
  description: "Experimental interaction design consultancy specializing in spatial interfaces, technology strategy, and sustainable innovation. We help organizations adopt emerging tech with strategies built to last.",
  keywords: "design consultancy, technology strategy, innovation consulting, creative problem solving, design thinking",
  openGraph: {
    title: "Studio Poetics Consultancy Services",
    description: "Experimental interaction design consultancy specializing in spatial interfaces and sustainable technology strategy.",
    url: "https://poetics.studio/consultancy",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-consultancy.jpg",
        width: 1200,
        height: 630,
        alt: "Studio Poetics Consultancy Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Poetics Consultancy Services",
    description: "Experimental interaction design consultancy specializing in spatial interfaces and sustainable technology strategy.",
    images: ["/og-consultancy.jpg"],
  },
}

export default function ConsultancyPage() {
  return <ConsultancyClient />
}