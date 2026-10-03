// ============================================================
// NextGen Impact Foundation — Organization Constants
// ============================================================

export const ORG = {
  name: 'NextGen Impact Foundation',
  shortName: 'NextGen Impact',
  tagline: 'Youth Today, Impact Tomorrow',
  description:
    'NextGen Impact Foundation empowers youth through education, skill-building, environmental stewardship, and community development to create lasting social impact.',
  email: 'info@nextgenimpact.org',
  phone: '+91 XXXXX XXXXX',
  address: {
    street: '',
    city: 'Your City',
    state: 'Your State',
    country: 'India',
    zip: '',
  },
  social: {
    instagram: 'https://instagram.com/nextgenimpact',
    facebook: 'https://facebook.com/nextgenimpact',
    twitter: 'https://twitter.com/nextgenimpact',
    linkedin: 'https://linkedin.com/company/nextgenimpact',
    youtube: 'https://youtube.com/@nextgenimpact',
  },
  pillars: ['Educate', 'Empower', 'Support', 'Environment', 'Community'] as const,
  foundedYear: 2024,
  url: 'https://nextgenimpact.org',
} as const

export type Pillar = (typeof ORG.pillars)[number]

// Site-wide navigation structure
export const SITE_NAV = {
  mainLinks: [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      href: '/about',
      children: [
        { label: 'Our Story', href: '/about' },
        { label: 'Mission & Vision', href: '/about#mission' },
        { label: 'Our Team', href: '/about#team' },
      ],
    },
    {
      label: 'Programs',
      href: '/programs',
      children: [
        { label: 'Education', href: '/programs?category=education' },
        { label: 'Youth Empowerment', href: '/programs?category=empowerment' },
        { label: 'Environment', href: '/programs?category=environment' },
        { label: 'Community', href: '/programs?category=community' },
        { label: 'All Programs', href: '/programs' },
      ],
    },
    { label: 'Impact', href: '/impact' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
  ],
  ctaLinks: [
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Donate', href: '/donate' },
  ],
  footerLinks: {
    organization: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Impact', href: '/impact' },
      { label: 'Stories', href: '/stories' },
    ],
    getInvolved: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Donate', href: '/donate' },
      { label: 'Partner With Us', href: '/partner' },
      { label: 'Events', href: '/events' },
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
} as const

