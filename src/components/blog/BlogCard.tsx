import { Link } from 'react-router-dom'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
    >
      {/* Top Image */}
      <div className="relative h-56 w-full overflow-hidden bg-navy-900">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-heading text-xl font-bold text-navy-900 transition-colors duration-200 group-hover:text-green-600 line-clamp-1">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-mid-gray/90 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}
