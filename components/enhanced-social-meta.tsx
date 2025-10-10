import Head from 'next/head'

interface SocialMetaProps {
  title: string
  description: string
  image: string
  url: string
  type?: string
  twitterHandle?: string
  publishedDate?: string
  author?: string
  tags?: string[]
}

export function EnhancedSocialMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterHandle = '@studiopoetics',
  publishedDate,
  author = 'Studio Poetics',
  tags = []
}: SocialMetaProps) {
  return (
    <Head>
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Studio Poetics" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {type === 'article' && publishedDate && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          <meta property="article:author" content={author} />
          <meta property="article:publisher" content="Studio Poetics" />
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* LinkedIn specific */}
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="linkedin:owner" content="Studio Poetics" />

      {/* WhatsApp/Telegram optimization */}
      <meta property="og:image:secure_url" content={image} />
      
      {/* Pinterest Rich Pins */}
      <meta name="pinterest-rich-pin" content="true" />
      <meta property="og:rich_attachment" content="true" />

      {/* Instagram/TikTok friendly */}
      <meta property="ig:image" content={image} />
      
      {/* Threads (Meta) */}
      <meta property="fb:app_id" content="your-app-id" />
      
      {/* Additional semantic tags for AI */}
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preload critical resources */}
      <link rel="preload" href={image} as="image" />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="en" href={url} />
      
      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#fb4e4e" />
      <meta name="msapplication-TileColor" content="#fb4e4e" />
      
      {/* Apple specific */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Studio Poetics" />
      
      {/* Structured data for social platforms */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": url,
            "image": image,
            "publisher": {
              "@type": "Organization",
              "name": "Studio Poetics",
              "url": "https://poetics.studio",
              "logo": "https://poetics.studio/logo.png",
              "sameAs": [
                "https://instagram.com/studiopoetics",
                "https://twitter.com/studiopoetics",
                "https://linkedin.com/company/studiopoetics"
              ]
            }
          })
        }}
      />
    </Head>
  )
}