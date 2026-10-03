import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { stories } from '@/data/stories'
import { Quote, ArrowRight, MapPin } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Stories of Impact',
  description: 'Real stories of change from beneficiaries, students, and community leaders.',
  path: '/stories',
})

export default function StoriesPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Real Voices
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Stories of Impact</h1>
          <p className="mt-4 text-lg text-navy-100">
            Heartfelt testimonials and case studies from those whose lives have been transformed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        {stories.map((story) => (
          <div key={story.id} className="grid grid-cols-1 gap-8 rounded-3xl border border-light-gray bg-white p-8 shadow-sm lg:grid-cols-3 lg:items-center">
            {story.image && (
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-light-gray lg:h-full">
                <Image src={story.image} alt={story.name} fill className="object-cover" />
              </div>
            )}
            
            <div className="lg:col-span-2 space-y-4">
              <Quote className="h-8 w-8 text-green-600" />
              <p className="font-heading text-xl font-bold text-navy-900 leading-snug">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="text-sm text-mid-gray line-clamp-3">{story.story.trim()}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-light-gray">
                <div>
                  <h4 className="font-heading text-base font-bold text-navy-900">{story.name}</h4>
                  <span className="inline-flex items-center gap-1 text-xs text-mid-gray">
                    <MapPin className="h-3.5 w-3.5 text-navy-600" /> {story.location}
                  </span>
                </div>
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-green-600"
                >
                  Read Full Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
