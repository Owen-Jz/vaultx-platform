'use client'

import { useActionState } from 'react'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { adminLogin } from '@/lib/actions/admin'
import { cn } from '@/components/ui'

const inputClass = cn(
  'w-full px-4 py-3 rounded-lg text-sm',
  'bg-bg-elevated border border-border-default',
  'text-text-primary placeholder:text-text-muted',
  'focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30',
  'transition-colors'
)

const labelClass = 'block text-xs font-medium text-text-secondary mb-1.5'

export default function AdminLoginClient() {
  const [state, formAction, isPending] = useActionState(adminLogin, null)

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-accent-gold" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-text-primary">VaultX Admin</h1>
            <p className="text-sm text-text-muted mt-0.5">Restricted access — sign in to continue</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-bg-card border border-border-default rounded-2xl p-6">
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="admin"
                className={inputClass}
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={inputClass}
                autoComplete="current-password"
                required
              />
            </div>

            {state && 'error' in state && state.error && (
              <div className="bg-status-danger/10 border border-status-danger/30 rounded-lg px-4 py-3">
                <p className="text-sm text-status-danger">{state.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={cn(
                'w-full flex items-center justify-center gap-2',
                'bg-accent-gold text-bg-primary font-semibold',
                'py-3 rounded-lg text-sm',
                'hover:bg-accent-gold/90 transition-colors',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Unauthorized access is prohibited and monitored.
        </p>
      </div>
    </div>
  )
}
