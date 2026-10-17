import { useState, useEffect, useCallback } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const HERO_IMAGES = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'Children and volunteers waving hands at NextGen Impact Foundation event',
  },
  {
    src: '/images/hero/hero-2.jpg',
    alt: 'Smiling children receiving English learning books',
  },
  {
    src: '/images/hero/hero-3.jpg',
    alt: 'Group of children supported by NextGen Impact programs',
  },
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }, [])

  // Auto-play slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section
      aria-label="Impact Photo Highlights"
      className="relative min-h-[65vh] w-full overflow-hidden bg-navy-950 sm:min-h-[78vh] lg:min-h-[85vh]"
    >
      {/* Pure Unobstructed Image Carousel with Smooth Crossfade */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover object-center"
          />
          {/* Subtle bottom-edge vignette only for slide dot visibility — 0% overlay on faces */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/60 to-transparent" />
        </div>
      ))}

      {/* Slide Controls (Arrows) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-navy-950/50 p-3 text-white backdrop-blur-md transition-all hover:bg-navy-900/80 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-navy-950/50 p-3 text-white backdrop-blur-md transition-all hover:bg-navy-900/80 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2.5">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              idx === currentIndex
                ? 'w-8 bg-green-400 shadow-sm'
                : 'w-2.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
