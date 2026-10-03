'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ORG } from '@/lib/constants'
import { CheckCircle2, ShieldCheck, Heart, Copy, Check } from 'lucide-react'

const DONATION_PRESETS = [
  { amount: 500, label: '₹500', impact: 'Provides a complete study kit (books & stationery) for 1 child' },
  { amount: 1000, label: '₹1,000', impact: 'Funds 1 month of digital literacy training for 5 students' },
  { amount: 2500, label: '₹2,500', impact: 'Plants & protects 25 native trees in green drives' },
  { amount: 5000, label: '₹5,000', impact: 'Sponsors a full annual merit scholarship for an underprivileged girl student' },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount

  const upiId = 'nextgenimpact@upi'

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/30">
            100% Direct Impact
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Empower a Future Today</h1>
          <p className="mt-4 text-lg text-green-100">
            Your generous contribution fuels education, healthcare camps, and environmental stewardship across India.
          </p>
        </div>
      </section>

      {/* Preset Amounts & Impact Calculator */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-light-gray bg-white p-6 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-navy-900 text-center">Choose Donation Amount</h2>
          <p className="mt-2 text-center text-sm text-mid-gray">Select a preset or enter a custom amount</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {DONATION_PRESETS.map((preset) => {
              const isSelected = selectedAmount === preset.amount && !customAmount
              return (
                <button
                  key={preset.amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(preset.amount)
                    setCustomAmount('')
                  }}
                  className={`rounded-2xl border p-4 text-center transition-all ${
                    isSelected
                      ? 'border-green-600 bg-green-50 text-green-800 ring-2 ring-green-600'
                      : 'border-light-gray bg-white text-navy-900 hover:border-navy-300'
                  }`}
                >
                  <span className="block font-heading text-2xl font-bold">{preset.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
              Or Enter Custom Amount (₹)
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="e.g. 10000"
              className="mt-2 w-full rounded-xl border border-light-gray px-4 py-3 text-lg font-bold text-navy-900 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Impact Statement Box */}
          <div className="mt-8 rounded-2xl bg-navy-50 p-6 border border-navy-100 flex items-center gap-4">
            <Heart className="h-8 w-8 text-green-600 shrink-0" />
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-navy-600">Your Impact</span>
              <p className="mt-1 font-heading text-base font-bold text-navy-900">
                A donation of ₹{activeAmount ? activeAmount.toLocaleString() : 0} directly supports youth education and community programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options (UPI, QR & Bank Details) */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-navy-900">Payment Options</h2>
            <p className="mt-2 text-sm text-mid-gray">Instant transfer via UPI or direct Bank Transfer</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* UPI Option */}
            <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  Instant Payment (India)
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold text-navy-900">UPI / QR Code Transfer</h3>
                <p className="mt-2 text-sm text-mid-gray">Scan via Google Pay, PhonePe, Paytm, or any BHIM UPI app.</p>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-light-gray bg-navy-50/50 p-4">
                  <code className="font-mono text-base font-bold text-navy-900">{upiId}</code>
                  <button
                    onClick={copyUpi}
                    className="inline-flex items-center gap-1 rounded-lg bg-navy-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-700"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy UPI'}
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-light-gray pt-4 text-xs text-mid-gray">
                ✓ Instant receipt generation upon confirmation.
              </div>
            </div>

            {/* Bank Details Option */}
            <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm">
              <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-800">
                Direct Bank Wire
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold text-navy-900">Bank Transfer Details</h3>

              <div className="mt-6 space-y-3 text-sm text-navy-900">
                <div className="flex justify-between border-b border-light-gray pb-2">
                  <span className="text-mid-gray">Account Name</span>
                  <span className="font-semibold">{ORG.name}</span>
                </div>
                <div className="flex justify-between border-b border-light-gray pb-2">
                  <span className="text-mid-gray">Bank Name</span>
                  <span className="font-semibold">State Bank of India</span>
                </div>
                <div className="flex justify-between border-b border-light-gray pb-2">
                  <span className="text-mid-gray">Account Number</span>
                  <span className="font-mono font-bold">XXXX XXXXX XXXX</span>
                </div>
                <div className="flex justify-between border-b border-light-gray pb-2">
                  <span className="text-mid-gray">IFSC Code</span>
                  <span className="font-mono font-bold">SBIN000XXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mid-gray">Branch</span>
                  <span className="font-semibold">Main Branch, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Exemption Section */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-light-gray bg-white p-8 shadow-sm flex flex-col gap-6 md:flex-row md:items-center">
          <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold text-navy-900">Tax Exemption under 80G</h3>
            <p className="mt-2 text-sm leading-relaxed text-mid-gray">
              All monetary donations to <strong>{ORG.name}</strong> are eligible for tax deduction benefits under Section 80G of the Indian Income Tax Act. Tax receipts are issued via email within 5 business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
