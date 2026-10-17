import type { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'empowering-rural-students-2026',
    title: 'Empowering Rural Students Through Digital Literacy',
    slug: 'empowering-rural-students-2026',
    excerpt: 'How our Education For All program is bridging the digital divide by introducing computer labs and interactive learning in rural schools.',
    content: `
Access to digital tools is no longer a luxury; it is a fundamental requirement for modern education. In rural parts of India, thousands of talented young minds lack basic computer access.

Through NextGen Impact Foundation's **Education For All** initiative, we recently launched digital learning centers equipped with solar-powered computer setups and offline digital learning modules.

### Key Highlights
- **1,500+ students** gained access to computer training.
- **25 teachers** trained in digital pedagogy.
- **10 solar-powered systems** installed in off-grid villages.

The response from students has been overwhelmingly positive. Children who had never touched a computer keyboard before are now learning typing, basic coding, and educational games.
    `,
    author: {
      name: 'Ananya Roy',
      role: 'Education Program Manager',
      image: '/images/team/member-1.jpg',
    },
    image: '/images/blog/digital-literacy.jpg',
    publishedAt: '2026-09-15',
    category: 'Education',
    tags: ['digital literacy', 'rural education', 'youth empowerment'],
    readingTime: 4,
    featured: true,
  },
  {
    id: 'green-earth-campaign-recap',
    title: 'Planting 10,000 Trees: The Power of Youth Action',
    slug: 'green-earth-campaign-recap',
    excerpt: 'A look back at our nationwide tree plantation drive where over 500 youth volunteers united to plant 10,000 saplings.',
    content: `
Environmental conservation begins with local action. Last month, NextGen Impact Foundation organized its largest **Green Earth Initiative** drive to date.

Youth volunteers across 5 cities gathered on a single Sunday morning to plant native saplings, install tree guards, and adopt local green spots.

### Impact at a Glance
- **10,000 saplings** planted across 12 urban and semi-urban locations.
- **500+ volunteers** participated.
- **100% native species** chosen for local biodiversity support.

Every volunteer signed a commitment to water and maintain their adopted sapling for at least 12 months.
    `,
    author: {
      name: 'Vikram Singh',
      role: 'Environmental Lead',
      image: '/images/team/member-2.jpg',
    },
    image: '/images/blog/tree-plantation.jpg',
    publishedAt: '2026-08-28',
    category: 'Environment',
    tags: ['tree plantation', 'environment', 'volunteers'],
    readingTime: 3,
    featured: false,
  },
  {
    id: 'community-health-camps',
    title: 'Healthcare at the Doorstep: Impact of Community Connect',
    slug: 'community-health-camps',
    excerpt: 'Providing free health screenings, eye checkups, and hygiene kits to over 3,000 families in underserved communities.',
    content: `
Healthcare access remains a critical challenge for underserved families in semi-urban and rural areas. NextGen Impact Foundation partnered with local doctors and medical volunteers to host multi-specialty health camps.

### What We Provided
- Free general health & eye checkups.
- Distribution of essential hygiene kits and nutrition supplements.
- Awareness sessions on maternal health and sanitation.

Over **3,200 beneficiaries** received free checkups and medicines during the campaign.
    `,
    author: {
      name: 'Dr. Meera Joshi',
      role: 'Health Program Coordinator',
      image: '/images/team/member-3.jpg',
    },
    image: '/images/blog/healthcare-camp.jpg',
    publishedAt: '2026-07-14',
    category: 'Community',
    tags: ['healthcare', 'community', 'awareness'],
    readingTime: 5,
    featured: false,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

