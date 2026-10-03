import type { NGOEvent } from '@/types'

// ============================================================
// Events Data — Static content
// ============================================================

export const events: NGOEvent[] = [
  {
    id: 'tree-plantation-2026',
    title: 'Mega Tree Plantation Drive',
    slug: 'tree-plantation-2026',
    description: 'Join us for a massive tree plantation drive across 5 cities. Together, we aim to plant 5,000 trees in a single day.',
    date: '2026-10-15T09:00:00',
    endDate: '2026-10-15T16:00:00',
    location: 'Delhi, Mumbai, Bangalore, Pune, Kolkata',
    locationType: 'in-person',
    image: '/images/events/tree-plantation.jpg',
    registrationUrl: '#',
    status: 'upcoming',
    category: 'environment',
    capacity: 500,
  },
  {
    id: 'youth-leadership-summit',
    title: 'Youth Leadership Summit 2026',
    slug: 'youth-leadership-summit',
    description: 'A two-day summit bringing together young changemakers, mentors, and industry leaders for talks, workshops, and networking.',
    date: '2026-11-20T10:00:00',
    endDate: '2026-11-21T17:00:00',
    location: 'New Delhi, India',
    locationType: 'hybrid',
    image: '/images/events/leadership-summit.jpg',
    registrationUrl: '#',
    status: 'upcoming',
    category: 'empowerment',
    capacity: 300,
  },
  {
    id: 'education-fundraiser-gala',
    title: 'Education Fundraiser Gala',
    slug: 'education-fundraiser-gala',
    description: 'An evening of inspiration and generosity. Proceeds support scholarships for underprivileged students.',
    date: '2026-12-10T18:00:00',
    endDate: '2026-12-10T22:00:00',
    location: 'Mumbai, India',
    locationType: 'in-person',
    image: '/images/events/fundraiser-gala.jpg',
    registrationUrl: '#',
    status: 'upcoming',
    category: 'education',
    capacity: 200,
  },
]

export function getUpcomingEvents(): NGOEvent[] {
  return events.filter((e) => e.status === 'upcoming')
}

export function getEventBySlug(slug: string): NGOEvent | undefined {
  return events.find((e) => e.slug === slug)
}

