import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Testimonial, TestimonialStatus } from '@/types'

// ============================================================
// Supabase Configuration
// ============================================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let supabase: SupabaseClient | null = null
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
  }
}

// Local Storage Fallback Key for development / offline testing
const LOCAL_STORAGE_KEY = 'nextgen_testimonials_v1'

// Default seed data for initial testing if no local records exist yet
const INITIAL_SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 'seed-1',
    name: 'Priya Sharma',
    role: 'Student, Education For All Program',
    quote: 'NextGen Impact changed my life. I received a scholarship and study kit that allowed me to continue my education when my family could not afford it.',
    image: '/images/testimonials/member-1.jpg',
    program: 'education-for-all',
    status: 'approved',
    consent: true,
    createdAt: '2026-09-15T10:00:00Z',
    approvedAt: '2026-09-16T12:00:00Z',
  },
  {
    id: 'seed-2',
    name: 'Rahul Kumar',
    role: 'Grassroots Volunteer',
    quote: 'Volunteering with NextGen Impact has been deeply rewarding. The community tree-planting and tutoring sessions create genuine, visible transformation on the ground.',
    image: '/images/testimonials/member-2.jpg',
    program: 'green-earth',
    status: 'approved',
    consent: true,
    createdAt: '2026-09-20T14:30:00Z',
    approvedAt: '2026-09-21T09:00:00Z',
  },
]

function getLocalStore(): Testimonial[] {
  if (typeof window === 'undefined') return INITIAL_SEED_TESTIMONIALS
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SEED_TESTIMONIALS))
      return INITIAL_SEED_TESTIMONIALS
    }
    return JSON.parse(raw)
  } catch {
    return INITIAL_SEED_TESTIMONIALS
  }
}

function saveLocalStore(items: Testimonial[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  } catch (err) {
    console.error('Failed to write to localStorage:', err)
  }
}

// ============================================================
// Public API Methods
// ============================================================

/**
 * Fetch approved testimonials for the public website.
 */
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase query error, falling back to local store:', error.message)
      } else if (data) {
        return data.map((row) => ({
          id: row.id,
          name: row.name,
          role: row.role,
          quote: row.quote,
          image: row.image,
          program: row.program,
          status: row.status as TestimonialStatus,
          createdAt: row.created_at,
          approvedAt: row.approved_at,
        }))
      }
    } catch (err) {
      console.warn('Error fetching from Supabase, falling back to local store:', err)
    }
  }

  // Fallback to local storage (filter approved only)
  const all = getLocalStore()
  return all.filter((item) => item.status === 'approved')
}

export interface SubmitTestimonialInput {
  name: string
  role: string
  quote: string
  email?: string
  program?: string
  image?: string
  consent: boolean
}

/**
 * Submit a new testimonial. It is saved strictly with status='pending'.
 */
export async function submitTestimonial(input: SubmitTestimonialInput): Promise<{ success: boolean; message: string }> {
  if (!input.name.trim() || !input.quote.trim() || !input.role.trim()) {
    throw new Error('Please fill out all required fields.')
  }
  if (!input.consent) {
    throw new Error('You must provide consent to publish your testimonial.')
  }

  const newRecord: Testimonial = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `t-${Date.now()}`,
    name: input.name.trim(),
    role: input.role.trim(),
    quote: input.quote.trim(),
    email: input.email?.trim() || undefined,
    program: input.program?.trim() || undefined,
    image: input.image?.trim() || undefined,
    status: 'pending',
    consent: true,
    createdAt: new Date().toISOString(),
  }

  if (supabase) {
    try {
      const { error } = await supabase.from('testimonials').insert([
        {
          name: newRecord.name,
          role: newRecord.role,
          quote: newRecord.quote,
          email: newRecord.email,
          program: newRecord.program,
          image: newRecord.image,
          status: 'pending',
          consent: true,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }

      return {
        success: true,
        message: 'Thank you for sharing your experience! Your testimonial will appear once reviewed by our team.',
      }
    } catch (err: any) {
      console.warn('Supabase insert failed, saving to local store:', err?.message)
      // If network/config fails, persist locally so no user input is lost
    }
  }

  // Local fallback save
  const items = getLocalStore()
  items.unshift(newRecord)
  saveLocalStore(items)

  return {
    success: true,
    message: 'Thank you for sharing your experience! Your testimonial has been submitted for verification.',
  }
}

// ============================================================
// Admin Moderation API Methods
// ============================================================

export const DEFAULT_ADMIN_PASSCODE = 'nextgen2026'

export function verifyAdminPasscode(passcode: string): boolean {
  const configured = import.meta.env.VITE_ADMIN_PASSCODE || DEFAULT_ADMIN_PASSCODE
  return passcode.trim() === configured.trim()
}

/**
 * Get all testimonials (pending, approved, rejected) for admin moderation.
 */
export async function getAllTestimonialsAdmin(passcode: string): Promise<Testimonial[]> {
  if (!verifyAdminPasscode(passcode)) {
    throw new Error('Invalid administrative authentication passcode.')
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          name: row.name,
          role: row.role,
          quote: row.quote,
          email: row.email,
          image: row.image,
          program: row.program,
          status: row.status as TestimonialStatus,
          consent: row.consent,
          createdAt: row.created_at,
          approvedAt: row.approved_at,
        }))
      }
    } catch (err) {
      console.warn('Failed to fetch admin testimonials from Supabase:', err)
    }
  }

  return getLocalStore()
}

/**
 * Approve a pending testimonial so it goes live.
 */
export async function approveTestimonial(id: string, passcode: string): Promise<void> {
  if (!verifyAdminPasscode(passcode)) {
    throw new Error('Unauthorized.')
  }

  const approvedAt = new Date().toISOString()

  if (supabase) {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: 'approved', approved_at: approvedAt })
        .eq('id', id)

      if (error) throw new Error(error.message)
      return
    } catch (err) {
      console.warn('Supabase update failed, updating local store:', err)
    }
  }

  const items = getLocalStore()
  const idx = items.findIndex((item) => item.id === id)
  if (idx !== -1) {
    items[idx].status = 'approved'
    items[idx].approvedAt = approvedAt
    saveLocalStore(items)
  }
}

/**
 * Reject a testimonial.
 */
export async function rejectTestimonial(id: string, passcode: string): Promise<void> {
  if (!verifyAdminPasscode(passcode)) {
    throw new Error('Unauthorized.')
  }

  if (supabase) {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: 'rejected' })
        .eq('id', id)

      if (error) throw new Error(error.message)
      return
    } catch (err) {
      console.warn('Supabase update failed, updating local store:', err)
    }
  }

  const items = getLocalStore()
  const idx = items.findIndex((item) => item.id === id)
  if (idx !== -1) {
    items[idx].status = 'rejected'
    saveLocalStore(items)
  }
}

/**
 * Permanently delete a testimonial.
 */
export async function deleteTestimonial(id: string, passcode: string): Promise<void> {
  if (!verifyAdminPasscode(passcode)) {
    throw new Error('Unauthorized.')
  }

  if (supabase) {
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return
    } catch (err) {
      console.warn('Supabase delete failed, deleting from local store:', err)
    }
  }

  const items = getLocalStore().filter((item) => item.id !== id)
  saveLocalStore(items)
}

