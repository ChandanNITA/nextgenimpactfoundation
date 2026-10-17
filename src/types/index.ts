// ============================================================
// NextGen Impact Foundation — TypeScript Type Definitions
// ============================================================

// ----- Impact -----

export interface ImpactMetric {
  label: string
  value: number
  suffix?: string
  prefix?: string
}

// ----- Programs -----

export type ProgramCategory =
  | 'education'
  | 'empowerment'
  | 'support'
  | 'environment'
  | 'community'

export type ProgramStatus = 'active' | 'completed' | 'upcoming'

export interface Program {
  id: string
  title: string
  slug: string
  tagline: string
  description: string
  category: ProgramCategory
  image: string
  coverImage: string
  location: string
  beneficiaries: number
  status: ProgramStatus
  impactMetrics: ImpactMetric[]
  startDate: string
  createdAt: string
}

// ----- Events -----

export type EventLocationType = 'in-person' | 'online' | 'hybrid'
export type EventStatus = 'upcoming' | 'ongoing' | 'completed'

export interface NGOEvent {
  id: string
  title: string
  slug: string
  description: string
  date: string
  endDate?: string
  location: string
  locationType: EventLocationType
  image: string
  registrationUrl?: string
  registrationDeadline?: string
  status: EventStatus
  category: string
  capacity?: number
}

// ----- Blog -----

export interface Author {
  name: string
  role: string
  image?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: Author
  image: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  readingTime: number
  featured: boolean
}

// ----- Stories -----

export interface Story {
  id: string
  slug: string
  name: string
  program: string
  quote: string
  story: string
  image?: string
  location: string
  date: string
}

// ----- Team -----

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
  order: number
}

// ----- Testimonials -----

export type TestimonialStatus = 'pending' | 'approved' | 'rejected'

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  image?: string
  program?: string
  status?: TestimonialStatus
  email?: string
  consent?: boolean
  createdAt?: string
  approvedAt?: string
}

// ----- Partners -----

export interface Partner {
  id: string
  name: string
  logo: string
  website: string
  tier: 'gold' | 'silver' | 'bronze' | 'community'
}

// ----- Navigation -----

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

// ----- Forms -----

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface VolunteerFormData {
  name: string
  email: string
  phone: string
  city: string
  age?: number
  skills: string[]
  availability: 'weekdays' | 'weekends' | 'both'
  commitment: string
  motivation: string
}

export interface PartnerFormData {
  organizationName: string
  contactName: string
  email: string
  phone?: string
  organizationType: string
  partnershipType: string
  message: string
}

export interface NewsletterFormData {
  email: string
}

// ----- API Responses -----

export interface ApiResponse<T = undefined> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

