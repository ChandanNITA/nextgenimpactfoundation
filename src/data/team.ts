import type { TeamMember } from '@/types'

// ============================================================
// Team Data — Only Founder and Co-Founder
// ============================================================

export const teamMembers: TeamMember[] = [
  {
    id: 'founder',
    name: 'Founder Name',
    role: 'Founder & President',
    bio: 'A passionate social entrepreneur committed to youth empowerment, education, and community impact.',
    image: '/images/hero/hero-1.jpg',
    socialLinks: {
      linkedin: '#',
      email: 'info@nextgenimpact.org',
    },
    order: 1,
  },
  {
    id: 'co-founder',
    name: 'Shubham Kumar',
    role: 'Co-Founder',
    bio: 'Dedicated youth leader and co-founder driving grassroots operations, community mobilization, and field initiatives.',
    image: '/images/team/shubham-kumar.jpg',
    socialLinks: {
      linkedin: '#',
      email: 'shubham@nextgenimpact.org',
    },
    order: 2,
  },
]
