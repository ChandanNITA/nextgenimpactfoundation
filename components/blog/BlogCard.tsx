import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-light-gray bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-navy-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          {post.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-4 text-xs text-mid-gray">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </div>

          <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 group-hover:text-navy-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-mid-gray">{post.excerpt}</p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-light-gray pt-4">
          <span className="text-xs font-medium text-navy-800">By {post.author.name}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-navy-600 transition-colors hover:text-green-600"
          >
            Read Article <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

