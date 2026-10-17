import { ORG } from '@/lib/constants'

export default function TermsPage() {
  return (
    <div>
      <section className="bg-navy-950 py-16 text-center text-white">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Terms &amp; Conditions</h1>
      </section>
      <article className="prose prose-lg mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-mid-gray">
          By accessing and using the <strong>{ORG.name}</strong> website, you agree to the
          following terms and conditions.
        </p>
        <h2 className="font-heading text-navy-600">Use of Website</h2>
        <p className="text-mid-gray">
          This website is provided for informational purposes about {ORG.name} and its
          programs. You may not use this website for any unlawful purpose.
        </p>
        <h2 className="font-heading text-navy-600">Intellectual Property</h2>
        <p className="text-mid-gray">
          All content, logos, and materials on this website are the property of {ORG.name}
          and are protected by applicable intellectual property laws.
        </p>
        <h2 className="font-heading text-navy-600">Donations</h2>
        <p className="text-mid-gray">
          Donations made through this website are voluntary and non-refundable unless
          otherwise agreed. Tax receipts will be provided as applicable under Indian tax law.
        </p>
        <h2 className="font-heading text-navy-600">Disclaimer</h2>
        <p className="text-mid-gray">
          While we strive to keep information accurate, {ORG.name} makes no warranties
          about the completeness or accuracy of the content on this website.
        </p>
        <h2 className="font-heading text-navy-600">Contact</h2>
        <p className="text-mid-gray">
          For questions, contact us at{' '}
          <a href={`mailto:${ORG.email}`} className="text-navy-600 hover:underline">{ORG.email}</a>.
        </p>
      </article>
    </div>
  )
}

