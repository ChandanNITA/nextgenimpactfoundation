import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { ContactFormValues } from '@/lib/validations'

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrors({})
    setResponseMsg('')

    try {
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '685652ff-6252-4b26-9183-57840cc7d520';
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: (function() { const fd = new FormData(); fd.append('access_key', accessKey); fd.append('subject', formData.subject || 'New Contact Message'); fd.append('from_name', formData.name); Object.entries(formData).forEach(([k, v]) => fd.append(k, v)); return fd; })()
      })
      const data = await res.json()
      console.log('Web3Forms API Response:', data)

      if (!res.ok) {
        setStatus('error')
        setResponseMsg(data.message || 'Validation failed.')
        return
      }

      setStatus('success')
      setResponseMsg('Your message has been sent successfully!')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
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
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
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
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
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
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="How can we help?"
            className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
          {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Type your message here..."
          className="mt-1.5 w-full rounded-lg border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {/* Honeypot field for bot protection */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-700 disabled:opacity-50 sm:w-auto"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}

