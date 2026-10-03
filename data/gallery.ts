export interface GalleryItem {
  id: string
  title: string
  category: 'all' | 'education' | 'community' | 'events' | 'environment'
  image: string
  caption: string
  date: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Community Gathering & Waving Hands',
    category: 'community',
    image: '/images/hero/hero-1.jpg',
    caption: 'Children and youth volunteers waving hands at a community mobilization drive.',
    date: '2026-08-15',
  },
  {
    id: 'g-2',
    title: 'Distribution of Good English Books',
    category: 'education',
    image: '/images/hero/hero-2.jpg',
    caption: 'Smiling young students holding their new English textbooks with excitement.',
    date: '2026-08-20',
  },
  {
    id: 'g-3',
    title: 'Open-Air Learning Session',
    category: 'education',
    image: '/images/hero/hero-3.jpg',
    caption: 'Children gathered under a shade tree receiving study kits and backpacks.',
    date: '2026-07-10',
  },
  {
    id: 'g-4',
    title: 'Youth Leadership Workshop',
    category: 'events',
    image: '/images/hero/hero-1.jpg',
    caption: 'Interactive group session on leadership and communication skills.',
    date: '2026-06-25',
  },
  {
    id: 'g-5',
    title: 'Tree Plantation & Environmental Drive',
    category: 'environment',
    image: '/images/hero/hero-3.jpg',
    caption: 'Volunteers and children planting native saplings in rural communities.',
    date: '2026-06-05',
  },
  {
    id: 'g-6',
    title: 'Study Kit Distribution Day',
    category: 'education',
    image: '/images/hero/hero-2.jpg',
    caption: 'Happy faces after receiving essential stationery and books for the school term.',
    date: '2026-05-18',
  },
]

