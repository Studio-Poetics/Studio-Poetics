"use client"

import Script from 'next/script'

// FAQ Schema for AI search optimization
export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// How-to Schema for workshops and processes
export function HowToSchema({ 
  name, 
  description, 
  steps, 
  estimatedCost, 
  supply 
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
  estimatedCost?: string
  supply?: Array<string>
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "estimatedCost": estimatedCost,
    "supply": supply?.map(item => ({
      "@type": "HowToSupply",
      "name": item
    })),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image ? {
        "@type": "ImageObject",
        "url": step.image
      } : undefined
    }))
  }

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Video Schema for AI understanding
export function VideoSchema({ 
  name, 
  description, 
  thumbnailUrl, 
  uploadDate, 
  duration, 
  url 
}: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  url: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": url,
    "embedUrl": url,
    "publisher": {
      "@type": "Organization",
      "name": "Studio Poetics",
      "logo": {
        "@type": "ImageObject",
        "url": "https://poetics.studio/logo.png"
      }
    }
  }

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema for AI navigation understanding
export function BreadcrumbSchema({ breadcrumbs }: { 
  breadcrumbs: Array<{ name: string; url: string }> 
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Local Business Schema for location-based searches
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Studio Poetics",
    "description": "A design studio exploring the beauty in everyday objects and experiences",
    "url": "https://poetics.studio",
    "telephone": "+91-98765-43210",
    "email": "hello@poetics.studio",
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Goa",
        "addressCountry": "IN",
        "addressRegion": "Goa"
      },
      {
        "@type": "PostalAddress", 
        "addressLocality": "Prayagraj",
        "addressCountry": "IN",
        "addressRegion": "Uttar Pradesh"
      }
    ],
    "geo": [
      {
        "@type": "GeoCoordinates",
        "latitude": "15.2993",
        "longitude": "74.1240"
      },
      {
        "@type": "GeoCoordinates",
        "latitude": "25.4358",
        "longitude": "81.8463"
      }
    ],
    "openingHours": "Mo-Fr 09:00-15:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "INR, USD"
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Course Schema for workshops
export function CourseSchema({ 
  name, 
  description, 
  provider, 
  courseMode, 
  duration, 
  startDate,
  location 
}: {
  name: string
  description: string
  provider: string
  courseMode: string
  duration: string
  startDate: string
  location: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://poetics.studio"
    },
    "courseMode": courseMode,
    "duration": duration,
    "startDate": startDate,
    "location": {
      "@type": "Place",
      "name": location
    },
    "teaches": [
      "Design Thinking",
      "Innovation",
      "Collaborative Design",
      "Technology Integration"
    ]
  }

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Creative Work Schema for games and projects
export function CreativeWorkSchema({ 
  name, 
  description, 
  creator, 
  dateCreated, 
  genre, 
  url 
}: {
  name: string
  description: string
  creator: string
  dateCreated: string
  genre: string
  url: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": name,
    "description": description,
    "creator": {
      "@type": "Organization",
      "name": creator
    },
    "dateCreated": dateCreated,
    "genre": genre,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Studio Poetics"
    }
  }

  return (
    <Script
      id="creative-work-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}