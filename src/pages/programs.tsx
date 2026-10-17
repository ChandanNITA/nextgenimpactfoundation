import { programs } from '@/data/programs'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { Link } from 'react-router-dom'

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Our Key Initiatives
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Our Programs</h1>
          <p className="mt-4 text-lg text-navy-100">
            Targeted grassroots programs engineered for long-term social transformation.
          </p>
        </div>
      </section>

      {/* Grid of Programs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-green-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl font-bold">Have a Program Idea or Want to Partner?</h2>
          <p className="mt-4 text-base text-green-100">
            We collaborate with local schools, NGOs, and corporate CSR partners to launch new initiatives.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/partner" className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-green-700 hover:bg-green-50">
              Partner With Us
            </Link>
            <Link to="/donate" className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white hover:text-green-700">
              Support a Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
