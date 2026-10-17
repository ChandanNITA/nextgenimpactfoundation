import { useState } from 'react'
import { Loader2, Check } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMsg('')

    try {
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '685652ff-6252-4b26-9183-57840cc7d520';
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: (function() { const fd = new FormData(); fd.append('access_key', accessKey); fd.append('subject', 'New Newsletter Subscription'); fd.append('email', email); fd.append('name', 'Newsletter Subscriber'); fd.append('message', 'Please add ' + email + ' to the mailing list.'); return fd; })()
      })
      const data = await res.json()
      console.log('Web3Forms API Response:', data)

      if (!res.ok) {
        setStatus('error')
        setMsg(data.message || 'Error subscribing')
        return
      }

      setStatus('success')
      setMsg(data.message)
      setEmail('')
    } catch {
      setStatus('error')
      setMsg('Please try again later.')
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
          className="w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === 'success' ? (
            <>
              <Check className="h-4 w-4" /> Subscribed
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      {msg && (
        <p className={`mt-2 text-xs font-medium ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
          {msg}
        </p>
      )}
    </div>
  )
}

