import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { programs, getProgramBySlug } from '@/data/programs'
import { generatePageMetadata } from '@/lib/metadata'
import { CheckCircle2, MapPin, Users, Calendar, ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return {}
  return generatePageMetadata({
    title: program.title,
    description: program.description,
    path: `/programs/${program.slug}`,
  })
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-400 hover:text-green-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Programs
          </Link>
          <div className="mt-6">
            <span className="rounded-full bg-green-600 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {program.category}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold sm:text-5xl">{program.title}</h1>
            <p className="mt-4 text-xl text-navy-200">{program.tagline}</p>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-96 overflow-hidden rounded-3xl border border-light-gray shadow-md">
              <Image src={program.image} alt={program.title} fill className="object-cover" />
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy-900">About the Initiative</h2>
              <p className="mt-4 text-base leading-relaxed text-mid-gray">{program.description}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy-900">Key Outcomes & Impact</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {program.impactMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-light-gray bg-navy-50/50 p-5">
                    <p className="font-heading text-3xl font-extrabold text-navy-600">
                      {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase text-mid-gray">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info & Action */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-light-gray bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-navy-900">Program Overview</h3>
              
              <div className="mt-6 space-y-4 text-sm text-mid-gray">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-navy-600 shrink-0" />
                  <div>
                    <span className="block font-semibold text-navy-900">Beneficiaries</span>
                    <span>{program.beneficiaries.toLocaleString()}+ youth & children</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-navy-600 shrink-0" />
                  <div>
                    <span className="block font-semibold text-navy-900">Location</span>
                    <span>{program.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-navy-600 shrink-0" />
                  <div>
                    <span className="block font-semibold text-navy-900">Status</span>
                    <span className="capitalize">{program.status}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-light-gray space-y-3">
                <Link
                  href="/donate"
                  className="block w-full rounded-full bg-green-600 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
                >
                  Support This Program
                </Link>
                <Link
                  href="/volunteer"
                  className="block w-full rounded-full border-2 border-navy-600 py-3 text-center text-sm font-semibold text-navy-600 hover:bg-navy-50"
                >
                  Volunteer for This Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
