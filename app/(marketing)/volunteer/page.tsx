import { generatePageMetadata } from '@/lib/metadata'
import { VolunteerForm } from '@/components/forms/VolunteerForm'
import { Heart, Clock, Award, Users } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Volunteer With Us',
  description: 'Join NextGen Impact Foundation as a volunteer. Make a difference in education, environment, and community development.',
  path: '/volunteer',
})

export default function VolunteerPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/30">
            Join the Movement
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Become a Volunteer</h1>
          <p className="mt-4 text-lg text-green-100">
            Your skills, passion, and time can shape the future of a child and transform communities.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="rounded-2xl border border-light-gray bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">Real Impact</h3>
            <p className="mt-2 text-xs text-mid-gray">Work directly on ground projects and see the immediate difference you make.</p>
          </div>

          <div className="rounded-2xl border border-light-gray bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">Vibrant Network</h3>
            <p className="mt-2 text-xs text-mid-gray">Connect with over 200+ like-minded young leaders and professional mentors.</p>
          </div>

          <div className="rounded-2xl border border-light-gray bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">Flexible Hours</h3>
            <p className="mt-2 text-xs text-mid-gray">Weekend drives, online mentoring, or event support tailored to your schedule.</p>
          </div>

          <div className="rounded-2xl border border-light-gray bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">Certificate &amp; Letter</h3>
            <p className="mt-2 text-xs text-mid-gray">Receive official certificates of volunteer service and letters of recommendation.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-navy-900">Volunteer Application Form</h2>
            <p className="mt-2 text-sm text-mid-gray">Fill out your details below and our team will get in touch with you within 48 hours.</p>
          </div>
          <VolunteerForm />
        </div>
      </section>
    </div>
  )
}
