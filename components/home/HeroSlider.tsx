'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ORG } from '@/lib/constants'

const HERO_IMAGES = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'Children and volunteers waving hands at NextGen Impact Foundation event',
    caption: 'Empowering Communities Together',
  },
  {
    src: '/images/hero/hero-2.jpg',
    alt: 'Smiling children receiving English learning books',
    caption: 'Educating Youth for a Brighter Future',
  },
  {
    src: '/images/hero/hero-3.jpg',
    alt: 'Group of children supported by NextGen Impact programs',
    caption: 'Building Hope & Opportunities',
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
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-navy-950 px-4 py-20 text-center text-white sm:px-6 lg:px-8">
      {/* Background Image Carousel with Smooth Crossfade */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={idx === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient Overlays for High Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
          <div className="absolute inset-0 bg-navy-950/30 backdrop-blur-[1px]" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-4xl space-y-6">
        {/* Caption Badge */}
        <div className="inline-flex items-center rounded-full border border-green-400/40 bg-navy-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 backdrop-blur-md">
          {HERO_IMAGES[currentIndex].caption}
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {ORG.tagline}
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg font-normal text-navy-100 sm:text-xl md:leading-relaxed">
          {ORG.description}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Link
            href="/donate"
            className="w-full rounded-full bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-500 hover:shadow-green-600/30 sm:w-auto"
          >
            Donate Now
          </Link>
          <Link
            href="/volunteer"
            className="w-full rounded-full border-2 border-white/80 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-navy-900 sm:w-auto"
          >
            Volunteer With Us
          </Link>
        </div>
      </div>

      {/* Slide Controls (Arrows) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 z-30 hidden rounded-full bg-navy-900/60 p-3 text-white backdrop-blur-md transition-all hover:bg-navy-800/80 hover:scale-110 sm:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 z-30 hidden rounded-full bg-navy-900/60 p-3 text-white backdrop-blur-md transition-all hover:bg-navy-800/80 hover:scale-110 sm:block"
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
                ? 'w-8 bg-green-400'
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

