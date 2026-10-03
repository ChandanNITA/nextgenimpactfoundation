'use client'

import { useState } from 'react'
import Image from 'next/image'
import { galleryItems, type GalleryItem } from '@/data/gallery'
import { X, ZoomIn } from 'lucide-react'

const CATEGORIES = [
  { label: 'All Photos', value: 'all' },
  { label: 'Education', value: 'education' },
  { label: 'Community', value: 'community' },
  { label: 'Events', value: 'events' },
  { label: 'Environment', value: 'environment' },
]

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              activeCategory === cat.value
                ? 'bg-navy-600 text-white shadow-sm'
                : 'bg-navy-50 text-navy-800 hover:bg-navy-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl border border-light-gray bg-navy-900 shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <div className="flex justify-end">
                <span className="rounded-full bg-white/20 p-2 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4 text-white" />
                </span>
              </div>
              <div>
                <span className="rounded-full bg-green-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-navy-200">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-navy-900/80 p-2 text-white hover:bg-navy-900"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[60vh] w-full bg-black">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                {selectedImage.category.toUpperCase()}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-navy-900">
                {selectedImage.title}
              </h3>
              <p className="mt-2 text-sm text-mid-gray">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

