import { blogPosts } from '@/data/blog'
import { BlogCard } from '@/components/blog/BlogCard'

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Insights &amp; Updates
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Blog &amp; Latest News</h1>
          <p className="mt-4 text-lg text-navy-100">
            Articles, project recaps, and stories of youth impact straight from the ground.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
