'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { register } from '@/lib/actions/auth'

export default function SignupPage() {
  const [state, action, isPending] = useActionState(register, undefined)

  return (
    <div className="bg-bg-card rounded-2xl p-8 shadow-elevated border border-border-default">
      {/* Mobile logo */}
      <div className="lg:hidden text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-accent-gold">VaultX</h1>
      </div>

      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Create Account</h2>
        <p className="text-text-secondary text-sm">Join VaultX today and start your journey</p>
      </div>

      <form action={action} className="flex flex-col gap-5">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fname"
              className="text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              First Name
            </label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="John"
              className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition"
              required
            />
            {state?.error?.fname && (
              <p className="text-status-danger text-xs mt-1">
                {Array.isArray(state.error.fname)
                  ? state.error.fname[0]
                  : state.error.fname}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lname"
              className="text-xs font-medium text-text-secondary uppercase tracking-wider"
            >
              Last Name
            </label>
            <input
              id="lname"
              name="lname"
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition"
              required
            />
            {state?.error?.lname && (
              <p className="text-status-danger text-xs mt-1">
                {Array.isArray(state.error.lname)
                  ? state.error.lname[0]
                  : state.error.lname}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
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
            className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition"
            required
          />
          {state?.error?.email && (
            <p className="text-status-danger text-xs mt-1">
              {Array.isArray(state.error.email)
                ? state.error.email[0]
                : state.error.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium text-text-secondary uppercase tracking-wider"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition"
            required
          />
          {state?.error?.password && (
            <p className="text-status-danger text-xs mt-1">
              {Array.isArray(state.error.password)
                ? state.error.password[0]
                : state.error.password}
            </p>
          )}
          <p className="text-text-muted text-[10px] mt-0.5">
            Must contain at least 5 characters, 1 letter, 1 number, and 1 special character.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-accent-gold hover:bg-accent-gold-light text-text-inverse font-semibold py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-glow"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-text-secondary text-sm">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-accent-gold hover:text-accent-gold-light font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
