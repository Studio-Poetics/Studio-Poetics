"use client"

import Script from 'next/script'

// Organization Schema for main pages
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Studio Poetics",
    "description": "A design studio exploring the beauty in everyday objects and experiences",
    "url": "https://poetics.studio",
    "logo": "https://poetics.studio/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "customer service",
      "email": "hello@studiopoetics.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Goa",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://instagram.com/studiopoetics",
      "https://twitter.com/studiopoetics"
    ],
    "founder": {
      "@type": "Person",
      "name": "Studio Poetics Team"
    },
    "foundingDate": "2020",
    "industry": "Design Services",
    "numberOfEmployees": "2-10"
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Article Schema for journal posts
export function ArticleSchema({ 
  title, 
  description, 
  publishedDate, 
  modifiedDate, 
  slug, 
  image 
}: {
  title: string
  description: string
  publishedDate: string
  modifiedDate?: string
  slug: string
  image?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || "https://poetics.studio/og-journal.jpg",
    "author": {
      "@type": "Organization",
      "name": "Studio Poetics"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Studio Poetics",
      "logo": {
        "@type": "ImageObject",
        "url": "https://poetics.studio/logo.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "url": `https://poetics.studio/journal/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://poetics.studio/journal/${slug}`
    }
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Event Schema for workshops/calendar
export function EventSchema({ 
  name, 
  description, 
  startDate, 
  endDate, 
  location, 
  price 
}: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  price?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate || startDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Goa",
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Studio Poetics",
      "url": "https://poetics.studio"
    },
    "offers": price ? {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://poetics.studio/contact"
    } : undefined
  }

  return (
    <Script
      id="event-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service Schema for consultancy
export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Design Consultancy Services",
    "description": "Expert consultancy services in design innovation, technology strategy, and creative problem-solving",
    "provider": {
      "@type": "Organization",
      "name": "Studio Poetics"
    },
    "serviceType": "Design Consultancy",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Identity Design"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Product Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "UX Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technology Strategy"
          }
        }
      ]
    }
  }

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Website/WebPage Schema
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Studio Poetics",
    "description": "A design studio exploring the beauty in everyday objects and experiences",
    "url": "https://poetics.studio",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://poetics.studio/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Studio Poetics"
    }
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}