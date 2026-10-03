import { generatePageMetadata } from '@/lib/metadata'
import { PartnerForm } from '@/components/forms/PartnerForm'
import { partners } from '@/data/partners'
import { Building2, Handshake, Users2, Award } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Partner With Us',
  description: 'Partner with NextGen Impact Foundation to create sustainable social impact through CSR, sponsorships, and collaborative programs.',
  path: '/partner',
})

export default function PartnerPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Collaborate for Change
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Partner With Us</h1>
          <p className="mt-4 text-lg text-navy-100">
            Empower your CSR goals and corporate social responsibility through verified, ground-level impact initiatives.
          </p>
        </div>
      </section>

      {/* Partnership Avenues */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-2xl bg-navy-50 p-4 text-navy-600">
              <Building2 className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Corporate CSR</h3>
            <p className="mt-3 text-sm leading-relaxed text-mid-gray">
              Directly sponsor education centers, environmental drives, or skill workshops with full impact audits and transparent reporting.
            </p>
          </div>

          <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-2xl bg-green-50 p-4 text-green-600">
              <Users2 className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Employee Volunteering</h3>
            <p className="mt-3 text-sm leading-relaxed text-mid-gray">
              Engage your workforce in meaningful community weekend drives, mentorship days, and plantation campaigns.
            </p>
          </div>

          <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-2xl bg-gold-50 p-4 text-gold-600">
              <Handshake className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Institutional Collaborations</h3>
            <p className="mt-3 text-sm leading-relaxed text-mid-gray">
              Partner as a university, school, or NGO to co-host youth summits, research drives, and regional health camps.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-navy-900">Trusted by Our Partners</h2>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="rounded-2xl border border-light-gray bg-white px-8 py-4 text-sm font-bold text-navy-800 shadow-sm">
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-navy-900">Partnership Inquiry Form</h2>
          <p className="mt-2 text-sm text-mid-gray">Submit your collaboration details below and our team will get in touch.</p>
        </div>
        <PartnerForm />
      </section>
    </div>
  )
}
