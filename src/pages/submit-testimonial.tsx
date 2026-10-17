import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartHandshake, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { submitTestimonial, type SubmitTestimonialInput } from '@/services/testimonials'

const ROLE_PRESETS = [
  'Beneficiary / Student',
  'Grassroots Volunteer',
  'Individual Donor',
  'Community Partner / Elder',
  'CSR / Corporate Partner',
  'Event Participant',
  'Other',
]

export default function SubmitTestimonialPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.')
      return
    }
    if (!formData.quote.trim() || formData.quote.trim().length < 15) {
      setErrorMsg('Please share a testimonial with at least 15 characters.')
      return
    }
    if (!formData.consent) {
      setErrorMsg('Consent is required to submit your review.')
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
      setFormData({
        name: '',
        role: ROLE_PRESETS[0],
        quote: '',
        email: '',
        program: '',
        image: '',
        consent: true,
      })
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-navy-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl w-full">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="rounded-3xl border border-light-gray bg-white p-6 shadow-xl sm:p-10">
          <div className="flex items-center gap-4 border-b border-light-gray pb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 shrink-0">
              <HeartHandshake className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
                Community Stories
              </span>
              <h1 className="font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
                Share Your Experience
              </h1>
              <p className="mt-1 text-xs text-mid-gray sm:text-sm">
                Has NextGen Impact Foundation touched your life or organization? We'd love to hear your story.
              </p>
            </div>
          </div>

          {successMsg ? (
            <div className="mt-8 rounded-2xl bg-green-50 p-6 border border-green-200 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-3 font-heading text-xl font-bold text-green-900">Thank You!</h2>
              <p className="mt-2 text-sm text-green-800">{successMsg}</p>
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  to="/"
                  className="rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Return to Home
                </Link>
                <button
                  type="button"
                  onClick={() => setSuccessMsg('')}
                  className="rounded-full border border-green-600 px-6 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-100"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {errorMsg && (
                <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-800 border border-red-200 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                    Relationship with NGO <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    {ROLE_PRESETS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.role === 'Other' && (
                  <div>
                    <label htmlFor="customRole" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                      Specify Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customRole"
                      required
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="e.g. Program Mentor"
                      className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="program" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                    Program Involved (Optional)
                  </label>
                  <input
                    type="text"
                    id="program"
                    value={formData.program || ''}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="e.g. Education For All, Youth Lead"
                    className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                  Email Address <span className="text-xs font-normal text-mid-gray">(Private, not published)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div>
                <label htmlFor="quote" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                  Your Testimonial / Story <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="quote"
                  required
                  rows={5}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Share your personal experience, how the foundation supported you, or the transformation you observed..."
                  className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600 leading-relaxed"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                  Profile Photo URL <span className="text-xs font-normal text-mid-gray">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="image"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

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
                    I confirm that this experience is genuine and consent to NextGen Impact Foundation reviewing and publishing it on their official channels.
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-base font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting for Review...
                    </>
                  ) : (
                    'Submit Testimonial for Review'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

