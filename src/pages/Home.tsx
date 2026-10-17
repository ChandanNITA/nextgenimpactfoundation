import { Link } from 'react-router-dom'

import { ORG } from '@/lib/constants'
import { programs } from '@/data/programs'
import { blogPosts } from '@/data/blog'
import { HeroSlider } from '@/components/home/HeroSlider'
import { ImpactCounter } from '@/components/home/ImpactCounter'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { BlogCard } from '@/components/blog/BlogCard'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { ArrowRight, Heart, BookOpen, Laptop, TreePine, Sparkles, ShieldCheck, Check } from 'lucide-react'

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
          We believe every young person deserves equal opportunity to learn, grow, and lead. Through our five pillars &mdash; Educate, Empower, Support, Environment, and Community &mdash; we drive sustainable grassroots change across India.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/about" className="rounded-full border-2 border-navy-600 px-6 py-3 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-600 hover:text-white">
            Read Our Story
          </Link>
          <Link to="/volunteer" className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
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
              Direct glimpses from our ground initiatives &mdash; distributing study kits, empowering young learners, and building resilient communities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative h-64 w-full overflow-hidden">
                <img src="/images/hero/hero-1.jpg" alt="Community gathering with children and volunteers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-600">
                  Community Drive
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy-900 group-hover:text-green-600 transition-colors">
                  Mobilizing Change Together
                </h3>
                <p className="mt-2 text-sm text-mid-gray/90 leading-relaxed">
                  Bringing volunteers and local youth together to build supportive, active communities.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative h-64 w-full overflow-hidden">
                <img src="/images/hero/hero-2.jpg" alt="Children holding Good English books with big smiles" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Education For All
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy-900 group-hover:text-green-600 transition-colors">
                  Nurturing Young Minds
                </h3>
                <p className="mt-2 text-sm text-mid-gray/90 leading-relaxed">
                  Distributing essential learning kits and books to ensure no child is left behind.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 sm:col-span-2 lg:col-span-1">
              <div className="relative h-64 w-full overflow-hidden">
                <img src="/images/hero/hero-3.jpg" alt="Children gathered under a tree receiving study support" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
                  Grassroots Impact
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy-900 group-hover:text-green-600 transition-colors">
                  Reaching Every Corner
                </h3>
                <p className="mt-2 text-sm text-mid-gray/90 leading-relaxed">
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
              to="/programs"
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
      <section className="bg-white py-20" id="testimonials">
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
              to="/blog"
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

      {/* 9. Impact Giving Plans / Donation Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 py-24 text-white">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-navy-600/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-green-400" />
              Make a Direct Difference
            </div>
            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Your Support Empowers Lives
            </h2>
            <p className="mt-4 text-base text-navy-200 sm:text-lg leading-relaxed">
              Choose an impact plan to sponsor education, digital tools, or community wellness. Every rupee goes directly to grassroots initiatives.
            </p>
          </div>

          {/* 3 Impact Plan Cards */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
            {/* Plan 1: ₹500 */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.08]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-navy-800/80 px-3 py-1 text-xs font-semibold text-green-400">
                    Basic Need
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">₹500</span>
                  <span className="text-xs text-navy-300 ml-1.5">/ one-time support</span>
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold text-white">Study Kit for 1 Child</h3>
                <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                  Provides a complete year-long study package containing notebooks, textbooks, geometry set, stationery, and a durable school bag.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-navy-100 border-t border-white/10 pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Complete textbooks &amp; notebooks
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Essential stationery &amp; pencil box
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    80G Tax Exemption receipt
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to="/donate?amount=500"
                  className="block w-full rounded-full border border-green-500/60 bg-green-500/10 py-3 text-center text-sm font-semibold text-green-400 transition-all hover:bg-green-600 hover:text-white"
                >
                  Sponsor with ₹500
                </Link>
              </div>
            </div>

            {/* Plan 2: ₹1,000 (Most Popular - Featured) */}
            <div className="relative flex flex-col justify-between rounded-3xl border-2 border-green-500 bg-gradient-to-b from-navy-900 to-navy-950 p-7 shadow-[0_12px_45px_rgba(34,197,94,0.18)] transition-all duration-300 hover:-translate-y-2">
              {/* Most Popular Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-md">
                ⭐ Most Popular Impact
              </div>

              <div>
                <div className="flex items-center justify-between pt-1">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">
                    High Reach
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
                    <Laptop className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">₹1,000</span>
                  <span className="text-xs text-navy-300 ml-1.5">/ empowers 5 students</span>
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold text-white">Digital Literacy for 5 Kids</h3>
                <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                  Funds 1 month of dedicated computer lab access, internet connectivity, and digital skills mentoring for 5 rural students.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-navy-100 border-t border-white/10 pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Hands-on computer training
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Certified instructor mentorship
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Personalized progress report
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to="/donate?amount=1000"
                  className="block w-full rounded-full bg-green-600 py-3 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-green-500 hover:shadow-green-600/30"
                >
                  Donate ₹1,000 Now
                </Link>
              </div>
            </div>

            {/* Plan 3: ₹2,500 */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.08]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-navy-800/80 px-3 py-1 text-xs font-semibold text-green-400">
                    Community Scale
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                    <TreePine className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">₹2,500</span>
                  <span className="text-xs text-navy-300 ml-1.5">/ community drive</span>
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold text-white">Healthcare &amp; Green Drive</h3>
                <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                  Provides essential medical screenings and hygiene kits to 5 underserved families, and plants 25 native trees in community parks.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-navy-100 border-t border-white/10 pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Doctor consultation &amp; health kits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Plants &amp; protects 25 native trees
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    Direct community impact audit
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to="/donate?amount=2500"
                  className="block w-full rounded-full border border-green-500/60 bg-green-500/10 py-3 text-center text-sm font-semibold text-green-400 transition-all hover:bg-green-600 hover:text-white"
                >
                  Sponsor with ₹2,500
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Action & Trust Strip */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:px-8">
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15 text-green-400 shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Eligible for 80G Tax Deductions</p>
                <p className="text-xs text-navy-300">All Indian donations receive instant tax exemption certificates via email.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/volunteer"
                className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                Become a Volunteer
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 hover:text-green-300 underline underline-offset-4"
              >
                Or Enter Custom Amount <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
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