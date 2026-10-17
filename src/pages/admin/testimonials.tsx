import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  Lock,
  Loader2,
  Database,
  ArrowLeft,
  AlertCircle,
  Eye,
  RefreshCw,
  PlusCircle,
  Quote,
} from 'lucide-react'
import {
  getAllTestimonialsAdmin,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  verifyAdminPasscode,
  DEFAULT_ADMIN_PASSCODE,
  isSupabaseConfigured,
  submitTestimonial,
} from '@/services/testimonials'
import type { Testimonial, TestimonialStatus } from '@/types'

const AUTH_STORAGE_KEY = 'nextgen_admin_auth'

export default function AdminTestimonialsPage() {
  const [passcode, setPasscode] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) || ''
    }
    return ''
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => verifyAdminPasscode(passcode))
  const [passcodeInput, setPasscodeInput] = useState('')
  const [authError, setAuthError] = useState('')

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState<'all' | TestimonialStatus>('pending')
  const [isLoading, setIsLoading] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const loadData = useCallback(async () => {
    if (!isAuthenticated) return
    setIsLoading(true)
    try {
      const data = await getAllTestimonialsAdmin(passcode)
      setTestimonials(data)
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to fetch testimonials.' })
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, passcode])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, loadData])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    if (verifyAdminPasscode(passcodeInput)) {
      setPasscode(passcodeInput)
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_STORAGE_KEY, passcodeInput)
    } else {
      setAuthError('Incorrect administrative passcode. Please verify your credentials.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    setPasscode('')
    setIsAuthenticated(false)
    setTestimonials([])
  }

  const handleApprove = async (id: string) => {
    setActionLoadingId(id)
    try {
      await approveTestimonial(id, passcode)
      setNotification({ type: 'success', message: 'Testimonial approved and published live!' })
      await loadData()
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Approval failed.' })
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleReject = async (id: string) => {
    setActionLoadingId(id)
    try {
      await rejectTestimonial(id, passcode)
      setNotification({ type: 'success', message: 'Testimonial rejected.' })
      await loadData()
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Rejection failed.' })
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this testimonial?')) return
    setActionLoadingId(id)
    try {
      await deleteTestimonial(id, passcode)
      setNotification({ type: 'success', message: 'Testimonial deleted permanently.' })
      await loadData()
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Deletion failed.' })
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleAddSamplePending = async () => {
    try {
      await submitTestimonial({
        name: 'Sunita Mehra',
        role: 'Beneficiary, Women Vocational Training',
        quote:
          'Learning tailoring through NextGen Impact allowed me to start my own small enterprise from home. I can now fund my children schooling independently.',
        email: 'sunita.test@example.com',
        program: 'empower-women',
        consent: true,
      })
      setNotification({ type: 'success', message: 'Sample pending testimonial created for review!' })
      await loadData()
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to create sample.' })
    }
  }

  const filteredTestimonials = testimonials.filter((t) => (filter === 'all' ? true : (t.status || 'pending') === filter))
  const pendingCount = testimonials.filter((t) => (t.status || 'pending') === 'pending').length
  const approvedCount = testimonials.filter((t) => t.status === 'approved').length
  const rejectedCount = testimonials.filter((t) => t.status === 'rejected').length

  // Render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-light-gray bg-white p-8 shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100 text-navy-600">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-center font-heading text-2xl font-bold text-navy-900">
            Admin Moderation Gate
          </h1>
          <p className="mt-1 text-center text-xs text-mid-gray">
            Authenticate to review and publish community testimonials.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {authError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {authError}
              </div>
            )}
            <div>
              <label htmlFor="pass" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
                Administrative Passcode
              </label>
              <input
                type="password"
                id="pass"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="mt-1.5 w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy-900 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
              <p className="mt-1.5 text-[11px] text-mid-gray">
                Default dev key: <code className="bg-navy-50 px-1 py-0.5 rounded font-mono text-navy-700">{DEFAULT_ADMIN_PASSCODE}</code> (customizable via <code className="text-navy-700">VITE_ADMIN_PASSCODE</code>)
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-navy-600 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-700 shadow-md"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 border-t border-light-gray pt-4 text-center">
            <Link to="/" className="text-xs font-medium text-navy-600 hover:text-green-600">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Render Admin Dashboard
  return (
    <div className="min-h-screen bg-navy-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation & Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-light-gray pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-navy-600 hover:text-green-600">
                <ArrowLeft className="h-3.5 w-3.5" /> Site Home
              </Link>
              <span className="text-xs text-mid-gray">•</span>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800">
                <ShieldCheck className="h-3 w-3" /> Moderation Active
              </span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-extrabold text-navy-900 sm:text-3xl">
              Testimonials Moderation
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddSamplePending}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-light-gray px-4 py-2 text-xs font-semibold text-navy-800 shadow-sm hover:bg-navy-50"
            >
              <PlusCircle className="h-3.5 w-3.5 text-green-600" /> + Add Sample Pending
            </button>
            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-light-gray px-4 py-2 text-xs font-semibold text-navy-800 shadow-sm hover:bg-navy-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full bg-navy-100 px-4 py-2 text-xs font-semibold text-navy-700 hover:bg-navy-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Database Status Banner */}
        <div className="mt-6 flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between border bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isSupabaseConfigured ? 'bg-green-100 text-green-700' : 'bg-gold-100 text-gold-700'}`}>
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-navy-900">
                Backend Engine: {isSupabaseConfigured ? 'Supabase PostgreSQL (Live Connected)' : 'Local Persistence Engine (Active Dev Mode)'}
              </p>
              <p className="text-[11px] text-mid-gray">
                {isSupabaseConfigured
                  ? 'All records are queried directly from your Supabase production database.'
                  : 'Operating locally via browser storage. To connect Supabase, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.'}
              </p>
            </div>
          </div>
          <Link
            to="/#testimonials"
            className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
          >
            <Eye className="h-3.5 w-3.5" /> View Public Carousel
          </Link>
        </div>

        {/* Notifications */}
        {notification && (
          <div
            className={`mt-4 flex items-center justify-between rounded-xl p-4 text-xs font-semibold border ${
              notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="text-xs underline ml-2">
              Dismiss
            </button>
          </div>
        )}

        {/* Tabs / Filter Controls */}
        <div className="mt-6 flex border-b border-light-gray space-x-2">
          <button
            onClick={() => setFilter('pending')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              filter === 'pending'
                ? 'border-gold-500 text-gold-700'
                : 'border-transparent text-mid-gray hover:text-navy-900'
            }`}
          >
            Pending Review
            <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-bold text-gold-800">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              filter === 'approved'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-mid-gray hover:text-navy-900'
            }`}
          >
            Approved &amp; Live
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">
              {approvedCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              filter === 'rejected'
                ? 'border-red-600 text-red-700'
                : 'border-transparent text-mid-gray hover:text-navy-900'
            }`}
          >
            Rejected
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800">
              {rejectedCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              filter === 'all'
                ? 'border-navy-600 text-navy-900'
                : 'border-transparent text-mid-gray hover:text-navy-900'
            }`}
          >
            All ({testimonials.length})
          </button>
        </div>

        {/* List of Testimonials */}
        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-navy-600" />
            <p className="mt-2 text-xs text-mid-gray">Loading testimonials...</p>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-light-gray bg-white p-12 text-center shadow-sm">
            <Quote className="mx-auto h-12 w-12 text-navy-200" />
            <h3 className="mt-3 font-heading text-lg font-bold text-navy-900">
              No {filter !== 'all' ? filter : ''} testimonials found
            </h3>
            <p className="mt-1 text-xs text-mid-gray max-w-sm mx-auto">
              {filter === 'pending'
                ? 'All pending submissions have been reviewed! New submissions will appear here automatically.'
                : 'No testimonials currently match this filter category.'}
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {filteredTestimonials.map((item) => {
              const status = item.status || 'pending'
              const isWorking = actionLoadingId === item.id

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-light-gray bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                          status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gold-100 text-gold-800 animate-pulse'
                        }`}
                      >
                        {status}
                      </span>
                      {item.program && (
                        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[11px] font-medium text-navy-600">
                          {item.program}
                        </span>
                      )}
                      {item.createdAt && (
                        <span className="text-[11px] text-mid-gray">
                          Submitted on {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-heading text-base font-bold text-navy-900">
                        {item.name}
                        <span className="ml-2 text-xs font-normal text-mid-gray">({item.role})</span>
                      </h4>
                      {item.email && (
                        <p className="text-[11px] text-navy-600">Contact: {item.email}</p>
                      )}
                    </div>

                    <p className="text-sm text-navy-800 italic bg-navy-50/50 p-3 rounded-xl border border-light-gray">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 md:flex-col md:items-end">
                    {status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        disabled={isWorking}
                        className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Approve &amp; Publish
                      </button>
                    )}

                    {status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(item.id)}
                        disabled={isWorking}
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isWorking}
                      title="Permanently Delete"
                      className="inline-flex items-center gap-1 rounded-full p-2 text-mid-gray hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

