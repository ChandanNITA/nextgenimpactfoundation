import Link from 'next/link'
import Image from 'next/image'
import { ORG } from '@/lib/constants'
import { programs } from '@/data/programs'
import { blogPosts } from '@/data/blog'
import { HeroSlider } from '@/components/home/HeroSlider'
import { ImpactCounter } from '@/components/home/ImpactCounter'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { BlogCard } from '@/components/blog/BlogCard'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { CheckCircle2, ArrowRight, Heart } from 'lucide-react'

export default function HomePage() {
  const featuredPrograms = programs.slice(0, 2)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Auto-Changing Impact Photos */}
      <HeroSlider />

      {/* 2. Pillars Strip */}
      <section className="bg-green-600 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-4 text-center text-white sm:gap-10">
          {ORG.pillars.map((pillar) => (
            <span key={pillar} className="text-xs font-bold uppercase tracking-widest sm:text-sm">
              {pillar}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
          Who We Are
        </span>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Empowering the Next Generation
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-mid-gray sm:text-xl">
          We believe every young person deserves equal opportunity to learn, grow, and lead. Through our five pillars — Educate, Empower, Support, Environment, and Community — we drive sustainable grassroots change across India.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/about" className="rounded-full bg-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700">
            Read Our Story
          </Link>
          <Link href="/volunteer" className="rounded-full border-2 border-navy-600 px-6 py-3 text-sm font-semibold text-navy-600 hover:bg-navy-50">
            Join as Volunteer
          </Link>
        </div>
      </section>

      {/* 4. Animated Impact Counters */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-navy-600">
              Grassroots Reach
            </span>
            <h2 className="mt-1 font-heading text-3xl font-bold text-navy-900">Our Impact in Numbers</h2>
          </div>
          <ImpactCounter />
        </div>
      </section>

      {/* 5. Ground Photo Showcase ("Real Stories, Real Smiles") */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
              Youth Today, Impact Tomorrow
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Real Stories, Real Smiles
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-mid-gray">
              Direct glimpses from our ground initiatives — distributing study kits, empowering young learners, and building resilient communities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group overflow-hidden rounded-2xl border border-light-gray bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/hero/hero-1.jpg"
                  alt="Community gathering with children and volunteers"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-600">
                  Community Drive
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy-900">
                  Mobilizing Change Together
                </h3>
                <p className="mt-2 text-sm text-mid-gray">
                  Bringing volunteers and local youth together to build supportive, active communities.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group overflow-hidden rounded-2xl border border-light-gray bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/hero/hero-2.jpg"
                  alt="Children holding Good English books with big smiles"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Education For All
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy-900">
                  Nurturing Young Minds
                </h3>
                <p className="mt-2 text-sm text-mid-gray">
                  Distributing essential learning kits and books to ensure no child is left behind.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group overflow-hidden rounded-2xl border border-light-gray bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/hero/hero-3.jpg"
                  alt="Children gathered under a tree receiving study support"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
                  Grassroots Impact
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy-900">
                  Reaching Every Corner
                </h3>
                <p className="mt-2 text-sm text-mid-gray">
                  Conducting open-air learning sessions and empowering youth in rural regions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Programs Preview */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-600">Our Key Initiatives</span>
              <h2 className="font-heading text-3xl font-bold text-navy-900">Programs Making a Difference</h2>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-green-600"
            >
              View All Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Carousel */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600">Beneficiary &amp; Volunteer Voices</span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 sm:text-4xl">Stories of Change</h2>
          </div>
          <TestimonialsSlider />
        </div>
      </section>

      {/* 8. Latest News & Blog */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-600">From the Field</span>
              <h2 className="font-heading text-3xl font-bold text-navy-900">Latest Articles &amp; Updates</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-green-600"
            >
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Donation Banner */}
      <section className="bg-green-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <Heart className="mx-auto h-12 w-12 text-white/90" />
          <h2 className="mt-4 font-heading text-3xl font-extrabold sm:text-4xl">Your Support Empowers Lives</h2>
          <p className="mt-4 text-lg text-green-100">
            A small contribution of ₹500 provides an entire study kit to a child in need.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-green-700 hover:bg-green-50 shadow-md"
            >
              Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white hover:bg-white hover:text-green-700"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Newsletter Section */}
      <section className="bg-navy-950 py-16 text-white border-t border-navy-900">
        <div className="mx-auto max-w-4xl px-4 text-center flex flex-col items-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Stay Updated with Our Journey</h2>
          <p className="mt-2 text-sm text-navy-200 mb-6 max-w-xl">
            Subscribe to our monthly newsletter to receive project recaps, volunteer stories, and impact reports.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
