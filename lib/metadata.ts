import type { Metadata } from 'next'
import { ORG } from './constants'

// ============================================================
// NextGen Impact Foundation — Metadata Builder
// ============================================================

interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
}

/**
 * Generate consistent metadata for any page.
 * Handles title, description, OG tags, Twitter cards, and canonical URL.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image = '/og-default.jpg',
  keywords = [],
  noIndex = false,
}: PageMeta): Metadata {
  const fullTitle = path === '/' ? `${ORG.name} — ${ORG.tagline}` : `${title} | ${ORG.name}`
  const canonicalUrl = `${ORG.url}${path}`
  const ogImageUrl = image.startsWith('http') ? image : `${ORG.url}${image}`

  return {
    title: fullTitle,
    description,
    keywords: [ORG.name, 'NGO', 'nonprofit', 'youth empowerment', 'social impact', ...keywords],
    authors: [{ name: ORG.name }],
    creator: ORG.name,
    publisher: ORG.name,
    metadataBase: new URL(ORG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: ORG.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${ORG.name} — ${title}`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

