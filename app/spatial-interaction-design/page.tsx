import type { Metadata } from "next"
import SpatialClient from "./spatial-client"

export const metadata: Metadata = {
  title: "Spatial Interaction Design | Studio Poetics",
  description: "We transform physical spaces into responsive interactive environments through holographic displays, embedded sensors, and architectural integration. Partnering with interior designers and architects to create spatial experiences.",
  keywords: "spatial design, interactive spaces, holographic displays, architectural technology, environmental design, responsive environments",
  openGraph: {
    title: "Spatial Interaction Design | Studio Poetics",
    description: "Transforming physical spaces into responsive interactive environments through experimental technology and architectural integration.",
    url: "https://poetics.studio/spatial-interaction-design",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-spatial-design.jpg",
        width: 1200,
        height: 630,
        alt: "Spatial Interaction Design | Studio Poetics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spatial Interaction Design | Studio Poetics",
    description: "Transforming physical spaces into responsive interactive environments through experimental technology.",
    images: ["/og-spatial-design.jpg"],
  },
}

export default function SpatialInteractionDesignPage() {
  return <SpatialClient />
}