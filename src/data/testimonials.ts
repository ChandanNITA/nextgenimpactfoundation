import type { Testimonial } from '@/types'

// ============================================================
// Testimonials Data — Static content
// ============================================================

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Student, Education For All Program',
    quote: 'NextGen Impact changed my life. I received a scholarship that allowed me to continue my education when my family couldn\'t afford it.',
    image: '/images/testimonials/priya.jpg',
    program: 'education-for-all',
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    role: 'Volunteer',
    quote: 'Volunteering with NextGen Impact has been one of the most rewarding experiences. The team genuinely cares about making a difference.',
    image: '/images/testimonials/rahul.jpg',
  },
  {
    id: '3',
    name: 'Anjali Patel',
    role: 'Community Leader',
    quote: 'The Community Connect program brought essential health services and awareness to our village. We are grateful for their commitment.',
    image: '/images/testimonials/anjali.jpg',
    program: 'community-connect',
  },
]

