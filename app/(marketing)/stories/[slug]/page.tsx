import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { stories, getStoryBySlug } from '@/data/stories'
import { generatePageMetadata } from '@/lib/metadata'
import { ArrowLeft, MapPin, Quote } from 'lucide-react'

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) return {}
  return generatePageMetadata({
    title: `${story.name}'s Story`,
    description: story.quote,
    path: `/stories/${story.slug}`,
    image: story.image,
  })
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  return (
    <article className="flex flex-col">
      <section className="bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-400 hover:text-green-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Stories
          </Link>
          <div className="mt-6 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-3.5 py-1 text-xs font-semibold text-navy-200">
              <MapPin className="h-3.5 w-3.5 text-green-400" /> {story.location}
            </span>
            <h1 className="font-heading text-3xl font-extrabold sm:text-5xl">{story.name}</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {story.image && (
          <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-light-gray shadow-md">
            <Image src={story.image} alt={story.name} fill className="object-cover" />
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-green-50 p-6 border-l-4 border-green-600">
          <Quote className="h-6 w-6 text-green-600 mb-2" />
          <p className="font-heading text-xl font-bold text-green-900 leading-relaxed">
            &ldquo;{story.quote}&rdquo;
          </p>
        </div>

        <div className="mt-8 prose prose-lg max-w-none text-navy-900 leading-relaxed whitespace-pre-line">
          {story.story}
        </div>
      </section>
    </article>
  )
}

