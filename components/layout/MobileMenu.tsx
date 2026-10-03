'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE_NAV } from '@/lib/constants'

// ============================================================
// MobileMenu — Client Component (manages open/close state)
// ============================================================

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-navy-600 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-16 z-50 border-b border-light-gray bg-white shadow-lg"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 px-4 py-4">
            {SITE_NAV.mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-mid-gray transition-colors hover:bg-navy-50 hover:text-navy-600"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTAs */}
            <div className="mt-4 flex flex-col gap-2 border-t border-light-gray pt-4">
              <Link
                href="/volunteer"
                onClick={() => setIsOpen(false)}
                className="rounded-full border-2 border-navy-600 px-5 py-2.5 text-center text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-600 hover:text-white"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-green-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

