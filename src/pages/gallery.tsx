import { GalleryGrid } from '@/components/gallery/GalleryGrid'

export default function GalleryPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Fieldwork &amp; Moments
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Photo Gallery</h1>
          <p className="mt-4 text-lg text-navy-100">
            Visual glimpses from our educational distribution drives, leadership workshops, and community events.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <GalleryGrid />
      </section>
    </div>
  )
}
