import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPostBySlug } from '@/data/blog'
import { generatePageMetadata } from '@/lib/metadata'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  })
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="flex flex-col">
      {/* Header */}
      <section className="bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-400 hover:text-green-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="mt-6 space-y-4">
            <span className="rounded-full bg-green-600 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-navy-300 pt-2 border-t border-navy-800">
              <span>By {post.author.name} ({post.author.role})</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image & Body */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-light-gray shadow-md">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>

        <div className="mt-10 prose prose-lg max-w-none text-navy-900 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-light-gray pt-6">
          <Tag className="h-4 w-4 text-mid-gray shrink-0" />
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
              #{tag}
            </span>
          ))}
        </div>
      </section>
    </article>
  )
}

