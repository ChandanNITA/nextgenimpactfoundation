'use client'

export default function Error({
  error,
  _error,
  reset,
}: {
  error: Error & { digest?: string }
  _error?: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-4xl font-bold text-navy-600">Something went wrong</h1>
      <p className="mt-4 max-w-md text-mid-gray">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-navy-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
      >
        Try Again
      </button>
    </div>
  )
}

