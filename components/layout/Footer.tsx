import Link from 'next/link'
import Image from 'next/image'
import { ORG, SITE_NAV } from '@/lib/constants'

// ============================================================
// Footer — Server Component
// ============================================================

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-light-gray bg-navy-950 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label={`${ORG.name} — Home`}>
              <Image
                src="/logo.png"
                alt={`${ORG.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <span className="block text-lg font-bold">{ORG.shortName}</span>
                <span className="block text-xs text-navy-300">{ORG.tagline}</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-navy-300">
              {ORG.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {Object.entries(ORG.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-navy-800 p-2 text-navy-300 transition-colors hover:bg-navy-700 hover:text-white"
                  aria-label={`Follow us on ${platform}`}
                >
                  <span className="text-xs font-medium uppercase">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-300">
              Organization
            </h3>
            <ul className="space-y-2">
              {SITE_NAV.footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-300">
              Get Involved
            </h3>
            <ul className="space-y-2">
              {SITE_NAV.footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-300">
              Resources
            </h3>
            <ul className="space-y-2">
              {SITE_NAV.footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-navy-300">
              Legal
            </h3>
            <ul className="space-y-2">
              {SITE_NAV.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-navy-800 pt-8 text-center">
          <p className="text-sm text-navy-400">
            &copy; {currentYear} {ORG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

