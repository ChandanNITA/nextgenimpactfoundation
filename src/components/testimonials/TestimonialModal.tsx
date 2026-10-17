import { useState } from 'react'
import { X, Send, CheckCircle2, AlertCircle, Loader2, HeartHandshake } from 'lucide-react'
import { submitTestimonial, type SubmitTestimonialInput } from '@/services/testimonials'

interface TestimonialModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitted?: () => void
}

const ROLE_PRESETS = [
  'Beneficiary / Student',
  'Grassroots Volunteer',
  'Individual Donor',
  'Community Partner / Elder',
  'CSR / Corporate Partner',
  'Event Participant',
  'Other',
]

export function TestimonialModal({ isOpen, onClose, onSubmitted }: TestimonialModalProps) {
  const [formData, setFormData] = useState<SubmitTestimonialInput>({
    name: '',
    role: ROLE_PRESETS[0],
    quote: '',
    email: '',
    program: '',
    image: '',
    consent: true,
  })

  const [customRole, setCustomRole] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!formData.name.trim()) {
      setErrorMsg('Please provide your name.')
      return
    }
    if (!formData.quote.trim() || formData.quote.trim().length < 15) {
      setErrorMsg('Please share a meaningful testimonial (at least 15 characters).')
      return
    }
    if (!formData.consent) {
      setErrorMsg('Consent is required to submit your testimonial.')
      return
    }

    const resolvedRole = formData.role === 'Other' && customRole.trim() ? customRole.trim() : formData.role

    setIsSubmitting(true)
    try {
      const res = await submitTestimonial({
        ...formData,
        role: resolvedRole,
      })
      setSuccessMsg(res.message)
      if (onSubmitted) onSubmitted()
      setTimeout(() => {
        // Reset and close after feedback
        setFormData({
          name: '',
          role: ROLE_PRESETS[0],
          quote: '',
          email: '',
          program: '',
          image: '',
          consent: true,
        })
      }, 3000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while submitting. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-light-gray bg-white p-6 shadow-2xl sm:p-8 z-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 rounded-full p-2 text-mid-gray transition-colors hover:bg-navy-50 hover:text-navy-900"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-title" className="font-heading text-xl font-bold text-navy-900 sm:text-2xl">
              Share Your Experience
            </h3>
            <p className="text-xs text-mid-gray sm:text-sm">
              Your voice inspires others to support and create real impact.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-green-800 border border-green-200">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Submission Received!</p>
              <p className="text-xs text-green-700 mt-1">{successMsg}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 rounded-full bg-green-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-800 border border-red-200">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <p className="text-xs sm:text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        {!successMsg && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="testi-name" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="testi-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>

            {/* Role / Relationship */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="testi-role" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                  Relationship with NGO <span className="text-red-500">*</span>
                </label>
                <select
                  id="testi-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-light-gray px-3.5 py-2.5 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                >
                  {ROLE_PRESETS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {formData.role === 'Other' && (
                <div>
                  <label htmlFor="testi-custom-role" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                    Specify Your Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="testi-custom-role"
                    required
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="e.g. Mentor / Partner"
                    className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  />
                </div>
              )}

              <div>
                <label htmlFor="testi-program" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                  Associated Program (Optional)
                </label>
                <input
                  type="text"
                  id="testi-program"
                  value={formData.program || ''}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  placeholder="e.g. Education For All, Green Drive"
                  className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>
            </div>

            {/* Email (Private) */}
            <div>
              <label htmlFor="testi-email" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                Email Address <span className="text-xs text-mid-gray font-normal">(Private for verification only)</span>
              </label>
              <input
                type="email"
                id="testi-email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>

            {/* Testimonial Quote */}
            <div>
              <label htmlFor="testi-quote" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                Your Story / Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                id="testi-quote"
                required
                rows={4}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Tell us about how NextGen Impact touched your life or what inspired you during your journey with us..."
                className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600 leading-relaxed"
              />
            </div>

            {/* Photo URL (Optional) */}
            <div>
              <label htmlFor="testi-image" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                Profile Photo URL <span className="text-xs text-mid-gray font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                id="testi-image"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/your-photo.jpg"
                className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-2.5 text-sm text-navy-900 placeholder:text-mid-gray/60 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-xs text-mid-gray leading-relaxed">
                  I confirm this is my genuine experience and authorize NextGen Impact Foundation to review and publish this testimonial on their website.
                </span>
              </label>
            </div>

            {/* Submission Actions */}
            <div className="pt-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-light-gray px-6 py-2.5 text-sm font-semibold text-mid-gray transition-colors hover:bg-navy-50 hover:text-navy-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

