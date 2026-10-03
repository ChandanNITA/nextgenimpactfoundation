import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ORG } from '@/lib/constants'
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data'
import './globals.css'

// ============================================================
// Root Metadata
// ============================================================

export const metadata: Metadata = {
  title: {
    default: `${ORG.name} — ${ORG.tagline}`,
    template: `%s | ${ORG.name}`,
  },
  description: ORG.description,
  keywords: [ORG.name, 'NGO', 'nonprofit', 'youth empowerment', 'social impact', 'education', 'environment', 'community'],
  authors: [{ name: ORG.name }],
  creator: ORG.name,
  publisher: ORG.name,
  metadataBase: new URL(ORG.url),
  openGraph: {
    type: 'website',
    siteName: ORG.name,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ============================================================
// Root Layout
// ============================================================

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
        {/* Organization Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
