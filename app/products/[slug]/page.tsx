import ProductDetailClient from "./ProductDetailClient"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// This would typically come from a database or CMS
const products = {
  "ceramic-vessel-3": {
    title: "Ceramic Vessel No. 3",
    price: "8,500",
    description: "Hand-crafted ceramic vessel with subtle texture variations.",
    longDescription:
      "This hand-crafted ceramic vessel is the result of our material exploration into subtle texture variations. Each piece is unique, with slight variations in texture and finish that catch and reflect light in different ways throughout the day. The minimalist form allows the material qualities to take center stage.",
    details: [
      "Dimensions: 25cm x 15cm x 15cm",
      "Material: Stoneware clay with matte glaze",
      "Color: Off-white",
      "Care: Wipe clean with a damp cloth",
      "Handmade in our Bangalore studio",
    ],
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    relatedProducts: ["paper-light-shade", "linen-wall-hanging", "glass-carafe"],
  },
  "paper-light-shade": {
    title: "Paper Light Shade",
    price: "5,200",
    description: "Handmade paper light shade with folded geometric pattern.",
    longDescription:
      "Our paper light shade is the culmination of extensive experimentation with folding techniques and light diffusion. The geometric pattern creates a play of light and shadow that transforms any space. Each shade is meticulously hand-folded from high-quality, acid-free paper.",
    details: [
      "Dimensions: 40cm diameter x 30cm height",
      "Material: Acid-free paper",
      "Color: Natural white",
      "Includes: Ceiling fixture and 2m cord",
      "Handmade in our Bangalore studio",
    ],
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    relatedProducts: ["ceramic-vessel-3", "wooden-tray-set", "glass-carafe"],
  },
  // Add more products as needed
}

const relatedProductsData = {
  "ceramic-vessel-3": {
    title: "Ceramic Vessel No. 3",
    price: "8,500",
    image: "/placeholder.svg?height=800&width=800",
  },
  "paper-light-shade": {
    title: "Paper Light Shade",
    price: "5,200",
    image: "/placeholder.svg?height=800&width=800",
  },
  "linen-wall-hanging": {
    title: "Linen Wall Hanging",
    price: "7,800",
    image: "/placeholder.svg?height=800&width=800",
  },
  "wooden-tray-set": {
    title: "Wooden Tray Set",
    price: "6,200",
    image: "/placeholder.svg?height=800&width=800",
  },
  "glass-carafe": {
    title: "Glass Carafe",
    price: "4,800",
    image: "/placeholder.svg?height=800&width=800",
  },
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug as keyof typeof products]
  if (!product) return notFound()
  return (
    <ProductDetailClient product={product} relatedProductsData={relatedProductsData} />
  )
}

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}
