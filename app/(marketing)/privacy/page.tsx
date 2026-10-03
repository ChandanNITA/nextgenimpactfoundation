import { generatePageMetadata } from '@/lib/metadata'
import { ORG } from '@/lib/constants'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${ORG.name}. Learn how we collect, use, and protect your personal information.`,
  path: '/privacy',
  noIndex: false,
})

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-navy-950 py-16 text-center text-white">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
      </section>
      <article className="prose prose-lg mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-mid-gray">
          <strong>{ORG.name}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard
          your personal information when you visit our website.
        </p>
        <h2 className="font-heading text-navy-600">Information We Collect</h2>
        <p className="text-mid-gray">
          We may collect personal information that you voluntarily provide, including your name,
          email address, phone number, and any other information submitted through our contact,
          volunteer, or donation forms.
        </p>
        <h2 className="font-heading text-navy-600">How We Use Your Information</h2>
        <ul className="text-mid-gray">
          <li>To respond to your inquiries and requests</li>
          <li>To process volunteer applications</li>
          <li>To send updates about our programs (with your consent)</li>
          <li>To improve our website and services</li>
        </ul>
        <h2 className="font-heading text-navy-600">Data Protection</h2>
        <p className="text-mid-gray">
          We implement appropriate security measures to protect your personal information.
          We do not sell, trade, or share your personal data with third parties without your consent.
        </p>
        <h2 className="font-heading text-navy-600">Contact</h2>
        <p className="text-mid-gray">
          For questions about this policy, contact us at{' '}
          <a href={`mailto:${ORG.email}`} className="text-navy-600 hover:underline">{ORG.email}</a>.
        </p>
      </article>
    </div>
  )
}

