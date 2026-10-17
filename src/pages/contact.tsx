import { ContactForm } from '@/components/forms/ContactForm'
import { ORG } from '@/lib/constants'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            We&apos;re Here to Help
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-navy-100">
            Have questions or want to learn more about our programs? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy-900">Get in Touch</h2>
              <p className="mt-2 text-sm text-mid-gray">
                Whether you want to volunteer, partner, or donate, we are happy to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-navy-50 p-3 text-navy-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-mid-gray">Email Us</h4>
                  <a href={`mailto:${ORG.email}`} className="mt-1 block text-base font-bold text-navy-900 hover:text-green-600">
                    {ORG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-green-50 p-3 text-green-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-mid-gray">Call Us</h4>
                  <a href={`tel:${ORG.phone}`} className="mt-1 block text-base font-bold text-navy-900 hover:text-green-600">
                    {ORG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gold-50 p-3 text-gold-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-mid-gray">Head Office</h4>
                  <p className="mt-1 text-sm font-semibold text-navy-900">
                    {ORG.address.city}, {ORG.address.state}, {ORG.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-navy-50 p-3 text-navy-600 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-mid-gray">Office Hours</h4>
                  <p className="mt-1 text-sm font-semibold text-navy-900">
                    Monday – Saturday: 9:30 AM – 6:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
