import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { VolunteerFormValues } from '@/lib/validations'

const SKILL_OPTIONS = [
  'Teaching & Tutoring',
  'Event Management',
  'Content & Social Media',
  'Design & Video',
  'Environmental Drives',
  'Community Outreach',
  'Healthcare Support',
  'Mentorship & Guidance',
]

export function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormValues>({
    name: '',
    email: '',
    phone: '',
    city: '',
    skills: [],
    availability: 'weekends',
    commitment: '',
    motivation: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill)
      const updated = exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill]
      return { ...prev, skills: updated }
    })
    if (errors.skills) setErrors((prev) => ({ ...prev, skills: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.skills.length === 0) {
      setErrors((prev) => ({ ...prev, skills: 'Please select at least one skill' }))
      return
    }

    setStatus('loading')
    setErrors({})
    setResponseMsg('')

    try {
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '685652ff-6252-4b26-9183-57840cc7d520';
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: (function() { const fd = new FormData(); fd.append('access_key', accessKey); fd.append('subject', 'New Volunteer Application'); fd.append('from_name', formData.name); Object.entries(formData).forEach(([k, v]) => fd.append(k, k === 'skills' ? formData.skills.join(', ') : (v as string))); return fd; })()
      })
      const data = await res.json()
      console.log('Web3Forms API Response:', data)

      if (!res.ok) {
        if (data.errors) {
          const formatted: Record<string, string> = {}
          Object.entries(data.errors).forEach(([k, v]) => {
            if (Array.isArray(v) && v[0]) formatted[k] = v[0]
          })
          setErrors(formatted)
        }
        setStatus('error')
        setResponseMsg(data.message || 'Validation error')
        return
      }

      setStatus('success')
      setResponseMsg(data.message)
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        skills: [],
        availability: 'weekends',
        commitment: '',
        motivation: '',
      })
    } catch {
      setStatus('error')
      setResponseMsg('Something went wrong. Please check your connection.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-light-gray bg-white p-6 shadow-sm sm:p-8">
      {status === 'success' && (
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <p className="text-sm font-medium">{responseMsg}</p>
        </div>
      )}

      {status === 'error' && responseMsg && !Object.keys(errors).length && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm font-medium">{responseMsg}</p>
        </div>
      )}

      {/* Personal Details */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="vol-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="vol-email" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="vol-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="vol-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="vol-city" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            City / Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="vol-city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Your City"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
        </div>
      </div>

      {/* Skills Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Areas of Interest / Skills <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-xs text-mid-gray">Select all that apply</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {SKILL_OPTIONS.map((skill) => {
            const isSelected = formData.skills.includes(skill)
            return (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-navy-50 text-navy-800 hover:bg-navy-100'
                }`}
              >
                {skill} {isSelected ? '✓' : '+'}
              </button>
            )
          })}
        </div>
        {errors.skills && <p className="mt-1.5 text-xs text-red-600">{errors.skills}</p>}
      </div>

      {/* Availability */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Availability <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex flex-wrap gap-4">
          {[
            { value: 'weekdays', label: 'Weekdays' },
            { value: 'weekends', label: 'Weekends' },
            { value: 'both', label: 'Both / Flexible' },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-navy-900 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={formData.availability === option.value}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Commitment */}
      <div>
        <label htmlFor="vol-commitment" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Time Commitment <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="vol-commitment"
          name="commitment"
          value={formData.commitment}
          onChange={handleChange}
          required
          placeholder="e.g. 3 hours per week, Saturdays only"
          className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
        />
        {errors.commitment && <p className="mt-1 text-xs text-red-600">{errors.commitment}</p>}
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="vol-motivation" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Why do you want to join NextGen Impact Foundation? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="vol-motivation"
          name="motivation"
          rows={4}
          value={formData.motivation}
          onChange={handleChange}
          required
          placeholder="Tell us briefly about your motivation..."
          className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
        />
        {errors.motivation && <p className="mt-1 text-xs text-red-600">{errors.motivation}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-50 sm:w-auto"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  )
}

