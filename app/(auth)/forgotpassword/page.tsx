'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="bg-bg-card rounded-2xl p-8 shadow-elevated border border-border-default">
      {/* Mobile logo */}
      <div className="lg:hidden text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-accent-gold">VaultX</h1>
      </div>

      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Reset Password</h2>
        <p className="text-text-secondary text-sm">
          Enter your email address and we&apos;ll send you reset instructions.
        </p>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-16 h-16 rounded-full bg-status-success/10 border border-status-success/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-status-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-text-primary text-center font-medium">
            Check your email for reset instructions.
          </p>
          <p className="text-text-muted text-sm text-center">
            We sent a password reset link to{' '}
            <span className="text-accent-gold">{email}</span>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-accent-gold hover:bg-accent-gold-light text-text-inverse font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-glow"
          >
            Send Reset Link
          </button>
        </form>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/auth/login"
          className="text-text-muted hover:text-text-secondary text-sm transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    </div>
  )
}
