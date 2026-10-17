import { ORG } from './constants'

interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
}

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/og-default.jpg',
  keywords = [],
}: PageMeta) {
  const fullTitle = path === '/' ? `${ORG.name} — ${ORG.tagline}` : `${title} | ${ORG.name}`
  const canonicalUrl = `${ORG.url}${path}`
  const ogImageUrl = image.startsWith('http') ? image : `${ORG.url}${image}`

  return {
    title: fullTitle,
    description,
    keywords: [ORG.name, 'NGO', 'nonprofit', 'youth empowerment', 'social impact', ...keywords],
    canonicalUrl,
    ogImageUrl,
  }
}

