import type { Story } from '@/types'

export const stories: Story[] = [
  {
    id: 'priya-sharma-story',
    slug: 'priya-sharma-story',
    name: 'Priya Sharma',
    program: 'education-for-all',
    quote: 'The study kit and scholarship gave me the confidence to pursue my dream of becoming a computer science teacher.',
    story: `
Priya comes from a small village where girls rarely completed higher secondary school due to financial constraints. When her family couldn't afford school books, Priya's education came to a halt.

Through NextGen Impact Foundation's **Education For All** program, Priya received a full educational kit, including textbooks, notebooks, and a merit scholarship covering her school fees.

Today, Priya is at the top of her class and mentors younger girls in her village, inspiring them to stay in school and dream big.
    `,
    image: '/images/hero/hero-2.jpg',
    location: 'Bihar, India',
    date: '2026-08-10',
  },
  {
    id: 'rahul-kumar-story',
    slug: 'rahul-kumar-story',
    name: 'Rahul Kumar',
    program: 'youth-empowerment',
    quote: 'Before joining the Youth Empowerment Hub, I lacked confidence. The mentorship helped me launch my own small repair business.',
    story: `
Rahul was an unemployed youth struggling to find direction after completing 12th grade. He joined NextGen Impact Foundation's **Youth Empowerment Hub**, where he completed 3 months of vocational training in electrical repairs alongside soft-skills workshops.

With guidance from our volunteer mentors, Rahul successfully started a small repair center in his home town, earning a steady income to support his family.
    `,
    image: '/images/hero/hero-1.jpg',
    location: 'Uttar Pradesh, India',
    date: '2026-07-22',
  },
  {
    id: 'sunita-devi-story',
    slug: 'sunita-devi-story',
    name: 'Sunita Devi & Community',
    program: 'community-connect',
    quote: 'The health awareness sessions and clean drinking water setup transformed our village health conditions.',
    story: `
Sunita Devi, a community leader in a rural hamlet, worked closely with our **Community Connect** team to organize health camps and install clean water filtration units.

Incidence of water-borne illnesses among children dropped by over 60% within 6 months of installation, bringing immense relief to 300 households.
    `,
    image: '/images/hero/hero-3.jpg',
    location: 'Madhya Pradesh, India',
    date: '2026-06-15',
  },
]

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug)
}

