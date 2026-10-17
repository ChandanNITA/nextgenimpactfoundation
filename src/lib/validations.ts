import { z } from 'zod'

// ============================================================
// NextGen Impact Foundation — Form Validation Schemas (Zod)
// ============================================================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const volunteerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  city: z.string().min(2, 'City is required').max(100),
  age: z.number().min(16, 'You must be at least 16 years old').max(100).optional(),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  availability: z.enum(['weekdays', 'weekends', 'both']),
  commitment: z.string().min(5, 'Please describe your time commitment').max(500),
  motivation: z.string().min(10, 'Please share your motivation').max(1000),
})

export const partnerFormSchema = z.object({
  organizationName: z.string().min(2, 'Organization name is required').max(200),
  contactName: z.string().min(2, 'Contact name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organizationType: z.string().min(1, 'Please select organization type'),
  partnershipType: z.string().min(1, 'Please select partnership type'),
  message: z.string().min(10, 'Please describe your partnership interest').max(2000),
})

export const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Export inferred types for form components
export type ContactFormValues = z.infer<typeof contactFormSchema>
export type VolunteerFormValues = z.infer<typeof volunteerFormSchema>
export type PartnerFormValues = z.infer<typeof partnerFormSchema>
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>
