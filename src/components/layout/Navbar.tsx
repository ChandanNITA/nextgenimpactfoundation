import { Link } from 'react-router-dom';

import { ORG, SITE_NAV } from '@/lib/constants'
import { MobileMenu } from './MobileMenu'

// ============================================================
// Navbar — Server Component (static nav links)
// Client interactivity is isolated to MobileMenu
// ============================================================

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-gray bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label={`${ORG.name} — Home`}>
          <img src="/logo.png" alt={`${ORG.name} Logo`} className="h-11 w-11 object-contain shrink-0" />
          <span className="hidden text-lg font-bold text-navy-600 sm:block">
            {ORG.shortName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {SITE_NAV.mainLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-mid-gray transition-colors hover:text-navy-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/volunteer"
            className="rounded-full border-2 border-navy-600 px-5 py-2 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-600 hover:text-white"
          >
            Volunteer
          </Link>
          <Link
            to="/donate"
            className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Donate
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <MobileMenu />
      </nav>
    </header>
  )
}

