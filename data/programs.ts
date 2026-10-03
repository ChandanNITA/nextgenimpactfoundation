import type { Program } from '@/types'

// ============================================================
// Programs Data — Static content (Git-managed)
// ============================================================

export const programs: Program[] = [
  {
    id: 'education-for-all',
    title: 'Education For All',
    slug: 'education-for-all',
    tagline: 'Breaking barriers to quality education',
    description:
      'Providing accessible, quality education to underprivileged children through after-school programs, digital literacy workshops, and scholarship support.',
    category: 'education',
    image: '/images/programs/education.jpg',
    coverImage: '/images/programs/education-cover.jpg',
    location: 'Multiple Cities, India',
    beneficiaries: 2500,
    status: 'active',
    impactMetrics: [
      { label: 'Students Supported', value: 2500 },
      { label: 'Schools Partnered', value: 15 },
      { label: 'Scholarships Awarded', value: 120 },
    ],
    startDate: '2024-01-15',
    createdAt: '2024-01-01',
  },
  {
    id: 'youth-empowerment',
    title: 'Youth Empowerment Hub',
    slug: 'youth-empowerment',
    tagline: 'Skilling the next generation of leaders',
    description:
      'Equipping young people with leadership, communication, and vocational skills through mentorship programs, workshops, and career guidance.',
    category: 'empowerment',
    image: '/images/programs/empowerment.jpg',
    coverImage: '/images/programs/empowerment-cover.jpg',
    location: 'Delhi NCR, India',
    beneficiaries: 1200,
    status: 'active',
    impactMetrics: [
      { label: 'Youth Trained', value: 1200 },
      { label: 'Mentors Engaged', value: 80 },
      { label: 'Jobs Placed', value: 350 },
    ],
    startDate: '2024-03-01',
    createdAt: '2024-02-15',
  },
  {
    id: 'green-earth-initiative',
    title: 'Green Earth Initiative',
    slug: 'green-earth-initiative',
    tagline: 'Building a sustainable tomorrow',
    description:
      'Driving environmental awareness and action through tree plantation drives, clean-up campaigns, and sustainability education in schools and communities.',
    category: 'environment',
    image: '/images/programs/environment.jpg',
    coverImage: '/images/programs/environment-cover.jpg',
    location: 'Pan-India',
    beneficiaries: 5000,
    status: 'active',
    impactMetrics: [
      { label: 'Trees Planted', value: 10000 },
      { label: 'Clean-up Drives', value: 45 },
      { label: 'Schools Reached', value: 30 },
    ],
    startDate: '2024-06-05',
    createdAt: '2024-05-20',
  },
  {
    id: 'community-connect',
    title: 'Community Connect',
    slug: 'community-connect',
    tagline: 'Strengthening communities from within',
    description:
      'Building stronger communities through health camps, awareness drives, women empowerment workshops, and local capacity-building programs.',
    category: 'community',
    image: '/images/programs/community.jpg',
    coverImage: '/images/programs/community-cover.jpg',
    location: 'Rural Maharashtra & UP',
    beneficiaries: 3200,
    status: 'active',
    impactMetrics: [
      { label: 'Families Supported', value: 3200 },
      { label: 'Health Camps', value: 25 },
      { label: 'Workshops Conducted', value: 60 },
    ],
    startDate: '2024-04-01',
    createdAt: '2024-03-15',
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}

export function getProgramsByCategory(category: Program['category']): Program[] {
  return programs.filter((p) => p.category === category)
}

export function getActivePrograms(): Program[] {
  return programs.filter((p) => p.status === 'active')
}

