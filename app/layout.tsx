import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import ClientLayout from "./clientLayout"
import { MenuProvider } from "./menu-context"



export const metadata: Metadata = {
  title: "Studio Poetics | Design Studio",
  description: "A design studio exploring the beauty in everyday objects and experiences. We translate complexity into clarity through games, UX, furniture, and hardware innovation.",
  keywords: "design studio, sense-making, design practice, innovation, creative studio, UX design, game design, furniture design",
  generator: 'poetics',
  metadataBase: new URL('https://poetics.studio'),
  openGraph: {
    title: "Studio Poetics | Design Studio",
    description: "A design studio exploring the beauty in everyday objects and experiences. We translate complexity into clarity through innovative design.",
    url: "https://poetics.studio",
    siteName: "Studio Poetics",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Studio Poetics | Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Poetics | Design Studio",
    description: "A design studio exploring the beauty in everyday objects and experiences.",
    images: ["/og-home.jpg"],
    creator: "@studiopoetics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
      </head>
      <MenuProvider>
        <ClientLayout>{children}</ClientLayout>
      </MenuProvider>
    </html>
  )
}
