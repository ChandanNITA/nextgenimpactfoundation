'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { PartnerFormValues } from '@/lib/validations'

export function PartnerForm() {
  const [formData, setFormData] = useState<PartnerFormValues>({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: 'corporate',
    partnershipType: 'csr',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrors({})
    setResponseMsg('')

    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

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
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        organizationType: 'corporate',
        partnershipType: 'csr',
        message: '',
      })
    } catch {
      setStatus('error')
      setResponseMsg('Something went wrong. Please check your connection.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-light-gray bg-white p-6 shadow-sm sm:p-8">
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="orgName" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="orgName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
            placeholder="Company / NGO / Institution"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.organizationName && <p className="mt-1 text-xs text-red-600">{errors.organizationName}</p>}
        </div>

        <div>
          <label htmlFor="contactName" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Contact Person Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.contactName && <p className="mt-1 text-xs text-red-600">{errors.contactName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="p-email" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="p-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@company.com"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="p-phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="p-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="orgType" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Organization Type <span className="text-red-500">*</span>
          </label>
          <select
            id="orgType"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          >
            <option value="corporate">Corporate / Business</option>
            <option value="ngo">Non-Profit / NGO</option>
            <option value="educational">Educational Institution</option>
            <option value="government">Government Body</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="partType" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Partnership Interest <span className="text-red-500">*</span>
          </label>
          <select
            id="partType"
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          >
            <option value="csr">CSR Funding & Sponsorship</option>
            <option value="program">Joint Program Implementation</option>
            <option value="employee">Employee Volunteering</option>
            <option value="in-kind">In-Kind / Resource Donation</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="p-message" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Message / Proposal Outline <span className="text-red-500">*</span>
        </label>
        <textarea
          id="p-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Briefly describe your proposal or how you would like to collaborate..."
          className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-700 disabled:opacity-50 sm:w-auto"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending Proposal...
          </>
        ) : (
          'Submit Partnership Inquiry'
        )}
      </button>
    </form>
  )
}

