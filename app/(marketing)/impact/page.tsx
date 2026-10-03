import { generatePageMetadata } from '@/lib/metadata'
import { ImpactCounter } from '@/components/home/ImpactCounter'
import { CheckCircle2, TrendingUp, Users, Award } from 'lucide-react'
import Link from 'next/link'

export const metadata = generatePageMetadata({
  title: 'Our Impact',
  description: 'See the measurable impact NextGen Impact Foundation has made across education, empowerment, environment, and community development.',
  path: '/impact',
})

export default function ImpactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Real Numbers, Real Change
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Our Impact &amp; Transparency</h1>
          <p className="mt-4 text-lg text-navy-100">
            We measure our success by the lives transformed, communities strengthened, and young leaders created.
          </p>
        </div>
      </section>

      {/* Main Counter Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ImpactCounter />
      </section>

      {/* Impact Breakdown Cards */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy-900">Where Your Support Goes</h2>
            <p className="mt-2 text-base text-mid-gray">Direct allocation breakdown of resources and volunteer effort.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
              <div className="inline-flex rounded-2xl bg-green-50 p-4 text-green-600">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Education &amp; Kits</h3>
              <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                45% of total program funding goes directly toward educational materials, textbooks, digital kits, and student scholarships.
              </p>
            </div>

            <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
              <div className="inline-flex rounded-2xl bg-navy-50 p-4 text-navy-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Youth Mentorship</h3>
              <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                30% is dedicated to vocational skilling, leadership workshops, career guidance, and mentor pairing for young adults.
              </p>
            </div>

            <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
              <div className="inline-flex rounded-2xl bg-gold-50 p-4 text-gold-600">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Grassroots Drives</h3>
              <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                25% funds community health camps, clean water installations, and environmental tree plantation initiatives across cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl font-bold">Help Us Multiply Our Impact</h2>
          <p className="mt-4 text-base text-green-100">
            Every contribution directly empowers a child or youth in need.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/donate" className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-green-700 hover:bg-green-50">
              Donate Now
            </Link>
            <Link href="/volunteer" className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white hover:text-green-700">
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
