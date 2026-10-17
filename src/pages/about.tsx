
import { Link } from 'react-router-dom'
import { ORG } from '@/lib/constants'
import { teamMembers } from '@/data/team'
import { milestones } from '@/data/impact'
import { Heart, Target, Eye, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            About NextGen Impact Foundation
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Youth Today, Impact Tomorrow
          </h1>
          <p className="mt-6 text-lg text-navy-100 sm:text-xl md:leading-relaxed">
            We are a youth-driven non-governmental organization dedicated to empowering underprivileged children and youth through education, skill-building, environmental stewardship, and community action.
          </p>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Mission */}
          <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="inline-flex rounded-2xl bg-navy-50 p-4 text-navy-600">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Our Mission</h3>
            <p className="mt-3 text-base leading-relaxed text-mid-gray">
              To dismantle educational and economic barriers for marginalized youth by providing quality learning, mentorship, and sustainable community development programs.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="inline-flex rounded-2xl bg-green-50 p-4 text-green-600">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Our Vision</h3>
            <p className="mt-3 text-base leading-relaxed text-mid-gray">
              An inclusive world where every young person has equal access to opportunity, education, self-reliance, and a clean, sustainable environment.
            </p>
          </div>

          {/* Values */}
          <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="inline-flex rounded-2xl bg-gold-50 p-4 text-gold-600">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900">Our Core Values</h3>
            <p className="mt-3 text-base leading-relaxed text-mid-gray">
              Transparency, youth empowerment, community-first action, integrity, and sustainable long-term impact in every initiative we undertake.
            </p>
          </div>
        </div>
      </section>

      {/* Our 5 Pillars */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-navy-600">
              Foundation Pillars
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
              The 5 Pillars of Our Work
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-mid-gray">
              Every initiative at NextGen Impact Foundation is anchored around five core pillars of youth and community development.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ORG.pillars.map((pillar, idx) => (
              <div key={pillar} className="rounded-2xl border border-light-gray bg-white p-6 text-center shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">{pillar}</h3>
                <p className="mt-2 text-xs text-mid-gray">
                  Driving grassroots initiatives focused on {pillar.toLowerCase()} to create self-sustaining impact.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & History */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600">Our Journey</span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
              How NextGen Impact Started
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mid-gray">
              Founded in 2024 by a passionate group of young changemakers, NextGen Impact Foundation started with a simple weekend tutoring drive for 20 children in a local courtyard.
            </p>
            <p className="mt-4 text-base leading-relaxed text-mid-gray">
              Witnessing the eagerness of children to learn and the transformative energy of youth volunteers, we expanded into a structured non-profit operating across education, vocational training, environmental plantation, and health camps.
            </p>
            <div className="mt-6 space-y-3">
              {[
                '100% Transparent & Auditor Approved',
                'Over 12,000+ Youth & Children Reached',
                'Driven by 200+ Active Youth Volunteers',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-navy-900">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 overflow-hidden rounded-3xl border border-light-gray shadow-md">
            <img
              src="/images/hero/hero-1.jpg"
              alt="NextGen Impact Foundation team and volunteers"
              
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="bg-white py-20 border-t border-light-gray">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy-900">Milestones of Progress</h2>
          </div>

          <div className="mt-12 space-y-8">
            {milestones.map((m) => (
              <div key={m.title} className="flex flex-col gap-4 rounded-2xl border border-light-gray bg-navy-50/50 p-6 sm:flex-row sm:items-center">
                <span className="shrink-0 font-heading text-3xl font-extrabold text-green-600 sm:w-24">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy-900">{m.title}</h3>
                  <p className="mt-1 text-sm text-mid-gray">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Team */}
      <section id="team" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-600">The People Behind the Mission</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 sm:text-4xl">Meet Our Leadership Team</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="overflow-hidden rounded-2xl border border-light-gray bg-white p-6 text-center shadow-sm">
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-navy-50">
                <img src={member.image} alt={member.name}  className="object-cover" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">{member.name}</h3>
              <p className="text-xs font-semibold text-green-600">{member.role}</p>
              <p className="mt-3 text-xs text-mid-gray">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl font-bold">Want to Work Together?</h2>
          <p className="mt-4 text-base text-navy-200">
            Join our mission as a volunteer, donor, or institutional partner.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/volunteer" className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-500">
              Join as Volunteer
            </Link>
            <Link to="/contact" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-navy-950">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
