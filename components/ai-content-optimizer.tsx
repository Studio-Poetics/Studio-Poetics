"use client"

import { ReactNode } from 'react'

// AI-friendly content wrapper with semantic markup
export function AIContentSection({ 
  title, 
  children, 
  type = 'section',
  importance = 'normal',
  topics = []
}: {
  title?: string
  children: ReactNode
  type?: 'hero' | 'section' | 'article' | 'aside' | 'navigation'
  importance?: 'high' | 'normal' | 'low'
  topics?: string[]
}) {
  const getAriaLabel = () => {
    switch (type) {
      case 'hero': return 'Main content introduction'
      case 'article': return 'Article content'
      case 'aside': return 'Supplementary information'
      case 'navigation': return 'Navigation menu'
      default: return 'Content section'
    }
  }

  const getRole = () => {
    switch (type) {
      case 'hero': return 'banner'
      case 'article': return 'article'
      case 'aside': return 'complementary'
      case 'navigation': return 'navigation'
      default: return 'region'
    }
  }

  return (
    <section 
      role={getRole()}
      aria-label={getAriaLabel()}
      data-content-type={type}
      data-importance={importance}
      data-topics={topics.join(',')}
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {title && (
        <header>
          <h2 itemProp="name">{title}</h2>
        </header>
      )}
      <div itemProp="text">
        {children}
      </div>
    </section>
  )
}

// AI-friendly image component with comprehensive metadata
export function AIOptimizedImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  topics = [],
  context = '',
  importance = 'normal'
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  topics?: string[]
  context?: string
  importance?: 'critical' | 'normal' | 'decorative'
}) {
  return (
    <figure 
      itemScope 
      itemType="https://schema.org/ImageObject"
      data-image-topics={topics.join(',')}
      data-image-context={context}
      data-image-importance={importance}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        itemProp="contentUrl"
        loading={importance === 'critical' ? 'eager' : 'lazy'}
        decoding="async"
        aria-describedby={caption ? `caption-${src}` : undefined}
      />
      {caption && (
        <figcaption 
          id={`caption-${src}`}
          itemProp="caption"
        >
          {caption}
        </figcaption>
      )}
      
      {/* Hidden metadata for AI */}
      <meta itemProp="description" content={alt} />
      <meta itemProp="keywords" content={topics.join(', ')} />
      {width && <meta itemProp="width" content={width.toString()} />}
      {height && <meta itemProp="height" content={height.toString()} />}
    </figure>
  )
}

// FAQ Component optimized for AI search
export function AIFAQSection({ 
  title = "Frequently Asked Questions",
  faqs 
}: {
  title?: string
  faqs: Array<{ question: string; answer: string; category?: string }>
}) {
  return (
    <section 
      itemScope 
      itemType="https://schema.org/FAQPage"
      aria-label="Frequently Asked Questions"
    >
      <h2>{title}</h2>
      {faqs.map((faq, index) => (
        <div 
          key={index}
          itemScope 
          itemType="https://schema.org/Question"
          data-faq-category={faq.category}
        >
          <h3 itemProp="name">{faq.question}</h3>
          <div 
            itemScope 
            itemType="https://schema.org/Answer" 
            itemProp="acceptedAnswer"
          >
            <p itemProp="text">{faq.answer}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

// Voice search optimized content
export function VoiceSearchOptimized({ 
  children, 
  naturalLanguageQueries = [] 
}: {
  children: ReactNode
  naturalLanguageQueries?: string[]
}) {
  return (
    <div 
      data-voice-queries={naturalLanguageQueries.join('|')}
      data-content-format="conversational"
    >
      {children}
      
      {/* Hidden content for voice search */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {naturalLanguageQueries.map((query, index) => (
          <span key={index} data-voice-query={query}>
            {query}
          </span>
        ))}
      </div>
    </div>
  )
}

// AI-friendly navigation breadcrumbs
export function AIBreadcrumbs({ 
  breadcrumbs 
}: {
  breadcrumbs: Array<{ name: string; url: string; isActive?: boolean }>
}) {
  return (
    <nav 
      aria-label="Breadcrumb navigation"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol>
        {breadcrumbs.map((crumb, index) => (
          <li 
            key={index}
            itemScope 
            itemType="https://schema.org/ListItem" 
            itemProp="itemListElement"
          >
            <meta itemProp="position" content={(index + 1).toString()} />
            {crumb.isActive ? (
              <span itemProp="name" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <a href={crumb.url} itemProp="item">
                <span itemProp="name">{crumb.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}