import { useParams, Link, Navigate } from 'react-router-dom'
import { getBlogPostBySlug } from '@/data/blog'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

export default function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPostBySlug(slug ?? '')

  if (!post) return <Navigate to="/blog" replace />

  return (
    <article className="flex flex-col">
      <section className="bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            to="/blog"
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

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-light-gray shadow-md">
          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <div className="mt-10 prose prose-lg max-w-none text-navy-900 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

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

