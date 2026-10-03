import { ORG } from './constants'

// ============================================================
// NextGen Impact Foundation — Schema.org Structured Data
// ============================================================

/**
 * Organization JSON-LD schema.
 * Placed in root layout for site-wide visibility.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: ORG.name,
    url: ORG.url,
    logo: `${ORG.url}/logo.png`,
    description: ORG.description,
    foundingDate: `${ORG.foundedYear}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG.address.city,
      addressRegion: ORG.address.state,
      addressCountry: ORG.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: ORG.email,
      telephone: ORG.phone,
      contactType: 'customer service',
    },
    sameAs: Object.values(ORG.social),
  }
}

/**
 * WebSite schema for search engines.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG.name,
    url: ORG.url,
    description: ORG.description,
  }
}

/**
 * BreadcrumbList schema generator.
 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

