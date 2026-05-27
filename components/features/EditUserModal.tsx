'use client'

import { useState, useTransition } from 'react'
import { Modal, Button, cn } from '@/components/ui'
import { updateUserStats } from '@/lib/actions/admin'

interface AdminUserRow {
  _id: string
  fname: string
  lname: string
  email?: string
  stats?: { total: number; profit: number; btc: number }
}

interface EditUserModalProps {
  user: AdminUserRow
  onClose: () => void
  onSuccess: () => void
}

export default function EditUserModal({ user, onClose, onSuccess }: EditUserModalProps) {
  const [total, setTotal] = useState<string>(String(user.stats?.total ?? 0))
  const [btc, setBtc] = useState<string>(String(user.stats?.btc ?? 0))
  const [profit, setProfit] = useState<string>(String(user.stats?.profit ?? 0))
  const [error, setError] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const totalVal = parseFloat(total)
    const btcVal = parseFloat(btc)
    const profitVal = parseFloat(profit)

    if (isNaN(totalVal) || totalVal < 0) {
      setError('Total Balance must be a non-negative number.')
      return
    }
    if (isNaN(btcVal) || btcVal < 0) {
      setError('BTC Holdings must be a non-negative number.')
      return
    }
    if (isNaN(profitVal)) {
      setError('Profit must be a valid number.')
      return
    }

    startTransition(async () => {
      try {
        const userId = (user as any)._id?.toString() ?? (user as any).id
        const result = await updateUserStats(userId, {
          total: totalVal,
          btc: btcVal,
          profit: profitVal,
        })
        if (result.success) {
          onSuccess()
          onClose()
        } else {
          setError('Failed to update user stats.')
        }
      } catch {
        setError('An unexpected error occurred.')
      }
    })
  }

  const inputClass = cn(
    'w-full px-4 py-3 rounded-lg text-sm',
    'bg-bg-elevated border border-border-default',
    'text-text-primary placeholder:text-text-muted',
    'focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30',
    'transition-colors'
  )

  const labelClass = 'block text-xs font-medium text-text-secondary mb-1.5'

  return (
    <Modal
      open
      onClose={onClose}
      title={`Edit Stats — ${user.fname} ${user.lname}`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <p className="text-xs text-text-muted -mt-1">{user.email}</p>

        <div>
          <label className={labelClass}>Total Balance (USD)</label>
          <input
            type="number"
            className={inputClass}
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className={labelClass}>BTC Holdings</label>
          <input
            type="number"
            className={inputClass}
            value={btc}
            onChange={(e) => setBtc(e.target.value)}
            min="0"
            step="0.00000001"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Profit (USD)</label>
          <input
            type="number"
            className={inputClass}
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
            step="0.01"
            required
          />
        </div>

        {error && (
          <div className="bg-status-danger/10 border border-status-danger/30 rounded-lg px-4 py-3">
            <p className="text-sm text-status-danger">{error}</p>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            loading={isPending}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
