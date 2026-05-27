'use client'

import { useActionState } from 'react'
import { Card, Button, Input } from '@/components/ui'
import { updateUserSettings } from '@/lib/actions/dashboard'
import type { IUser } from '@/lib/models/User'
import { CheckCircle, AlertCircle, User, Mail, Lock } from 'lucide-react'

interface SettingsFormProps {
  user: IUser
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateUserSettings, null)

  return (
    <div className="space-y-4">
      {state?.success && (
        <div className="flex items-center gap-2 bg-status-success/10 border border-status-success/30 rounded-lg px-4 py-3">
          <CheckCircle className="w-4 h-4 text-status-success shrink-0" />
          <p className="text-status-success text-sm font-medium">Settings saved successfully.</p>
        </div>
      )}
      {state?.error && (
        <div className="flex items-center gap-2 bg-status-danger/10 border border-status-danger/30 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-status-danger shrink-0" />
          <p className="text-status-danger text-sm">{state.error}</p>
        </div>
      )}

      <Card variant="elevated">
        <h2 className="text-base font-semibold text-text-primary mb-5 flex items-center gap-2">
          <User className="w-4 h-4 text-accent-gold" />
          Profile Information
        </h2>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">First Name</label>
              <input
                name="fname"
                type="text"
                defaultValue={user.fname}
                required
                className="w-full px-4 py-3 bg-bg-card border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Last Name</label>
              <input
                name="lname"
                type="text"
                defaultValue={user.lname}
                required
                className="w-full px-4 py-3 bg-bg-card border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className="w-full px-4 py-3 bg-bg-card border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          <div className="pt-2 border-t border-border-default">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent-gold" />
              Change Password
              <span className="text-text-muted text-xs font-normal">(optional)</span>
            </h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">New Password</label>
              <input
                name="password"
                type="password"
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 bg-bg-card border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isPending}
            >
              {isPending ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
