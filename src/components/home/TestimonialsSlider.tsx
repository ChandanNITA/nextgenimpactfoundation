import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote, HeartHandshake, Loader2, RefreshCw, User } from 'lucide-react'
import { getApprovedTestimonials } from '@/services/testimonials'
import { TestimonialModal } from '@/components/testimonials/TestimonialModal'
import type { Testimonial } from '@/types'

export function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getApprovedTestimonials()
      setTestimonials(data)
      setIndex(0)
    } catch (err: any) {
      setError(err?.message || 'Unable to load stories. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  const current = testimonials[index]

  return (
    <div className="relative mx-auto max-w-4xl" id="testimonials">
      {/* Testimonial Submission Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={() => {
          // Re-fetch in case instant approval was simulated
          fetchTestimonials()
        }}
      />

      {/* 1. Loading Skeleton State */}
      {isLoading && (
        <div className="relative mx-auto max-w-4xl rounded-3xl bg-navy-950 p-8 text-white shadow-xl sm:p-12 animate-pulse">
          <div className="h-12 w-12 rounded-xl bg-navy-900" />
          <div className="mt-6 space-y-3">
            <div className="h-5 w-3/4 rounded bg-navy-900" />
            <div className="h-5 w-5/6 rounded bg-navy-900" />
            <div className="h-5 w-1/2 rounded bg-navy-900" />
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-navy-900 pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-navy-900" />
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-navy-900" />
                <div className="h-3 w-40 rounded bg-navy-900" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-full bg-navy-900" />
              <div className="h-10 w-10 rounded-full bg-navy-900" />
            </div>
          </div>
        </div>
      )}

      {/* 2. Error State */}
      {!isLoading && error && (
        <div className="rounded-3xl border border-light-gray bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Quote className="h-7 w-7" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">
            Unable to Load Community Stories
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-mid-gray">
            {error}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={fetchTestimonials}
              className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-navy-700"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Try Again
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full border border-navy-600 px-5 py-2.5 text-xs font-semibold text-navy-600 hover:bg-navy-50"
            >
              Share Your Story
            </button>
          </div>
        </div>
      )}

      {/* 3. Empty State (When no approved testimonials exist) */}
      {!isLoading && !error && testimonials.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-light-gray bg-gradient-to-br from-navy-50 to-white p-8 text-center shadow-lg sm:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
            <HeartHandshake className="h-8 w-8" />
          </div>

          <h3 className="mt-5 font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
            Be the First to Share Your Experience
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-mid-gray leading-relaxed">
            We believe in 100% genuine voices. We don't display fabricated reviews. If NextGen Impact Foundation has made a difference in your education, community, or life, we would be honored to feature your story.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:scale-105"
            >
              <HeartHandshake className="h-4 w-4" />
              Share Your Story
            </button>
            <button
              onClick={fetchTestimonials}
              className="inline-flex items-center gap-1.5 rounded-full border border-light-gray bg-white px-5 py-3.5 text-xs font-semibold text-navy-700 hover:bg-navy-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Check Updates
            </button>
          </div>
        </div>
      )}

      {/* 4. Active Carousel State */}
      {!isLoading && !error && testimonials.length > 0 && current && (
        <div>
          <div className="relative rounded-3xl bg-navy-950 p-8 text-white shadow-2xl sm:p-12 transition-all">
            <Quote className="h-12 w-12 text-green-500/30" />

            <div className="min-h-[160px] flex flex-col justify-between">
              <p className="mt-4 text-lg sm:text-xl font-normal leading-relaxed text-navy-100 italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between border-t border-navy-800 pt-6 gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {current.image ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-green-500 shrink-0 bg-navy-900">
                      <img
                        src={current.image}
                        alt={current.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // Fallback to avatar if image fails to load
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 border-2 border-green-500 text-green-400 font-bold shrink-0">
                      {current.name.charAt(0).toUpperCase() || <User className="h-6 w-6" />}
                    </div>
                  )}

                  <div>
                    <h4 className="font-heading text-base font-bold text-white">{current.name}</h4>
                    <p className="text-xs text-navy-300">{current.role}</p>
                    {current.program && (
                      <span className="mt-1 inline-block text-[10px] text-green-400 uppercase tracking-wider font-semibold">
                        {current.program}
                      </span>
                    )}
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-3">
                  {testimonials.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prev}
                        type="button"
                        aria-label="Previous quote"
                        className="rounded-full bg-navy-800 p-2.5 text-white transition-colors hover:bg-navy-700"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="text-xs text-navy-400">
                        {index + 1} / {testimonials.length}
                      </span>
                      <button
                        onClick={next}
                        type="button"
                        aria-label="Next quote"
                        className="rounded-full bg-navy-800 p-2.5 text-white transition-colors hover:bg-navy-700"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                    className="rounded-full border border-green-500/50 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400 hover:bg-green-500 hover:text-white transition-all ml-2"
                  >
                    + Share Your Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
