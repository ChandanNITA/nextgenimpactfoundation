import type { MetadataRoute } from 'next'
import { ORG } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${ORG.url}/sitemap.xml`,
  }
}

