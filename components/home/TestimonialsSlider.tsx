'use client'

import { useState } from 'react'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  const current = testimonials[index]

  return (
    <div className="relative mx-auto max-w-4xl rounded-3xl bg-navy-950 p-8 text-white shadow-xl sm:p-12">
      <Quote className="h-12 w-12 text-green-500/30" />
      
      <div className="min-h-[160px] flex flex-col justify-between">
        <p className="mt-4 text-lg sm:text-xl font-normal leading-relaxed text-navy-100">
          &ldquo;{current.quote}&rdquo;
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-navy-800 pt-6">
          <div className="flex items-center gap-4">
            {current.image && (
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-green-500">
                <Image src={current.image} alt={current.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <h4 className="font-heading text-base font-bold text-white">{current.name}</h4>
              <p className="text-xs text-navy-300">{current.role}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous quote"
              className="rounded-full bg-navy-800 p-2.5 text-white transition-colors hover:bg-navy-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next quote"
              className="rounded-full bg-navy-800 p-2.5 text-white transition-colors hover:bg-navy-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

