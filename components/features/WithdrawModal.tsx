'use client'

import { useActionState } from 'react'
import { Modal, Button } from '@/components/ui'
import { requestWithdrawal } from '@/lib/actions/dashboard'
import { CheckCircle, AlertCircle } from 'lucide-react'

const CRYPTO_OPTIONS = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'XRP']

interface WithdrawModalProps {
  open: boolean
  onClose: () => void
}

export default function WithdrawModal({ open, onClose }: WithdrawModalProps) {
  const [state, formAction, isPending] = useActionState(requestWithdrawal, null)

  return (
    <Modal open={open} onClose={onClose} title="Request Withdrawal">
      {state?.success ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-status-success/10 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-status-success" />
          </div>
          <div>
            <p className="text-text-primary font-semibold text-base">Withdrawal request submitted</p>
            <p className="text-text-muted text-sm mt-1">Pending admin approval. Funds will be sent to your wallet once processed.</p>
          </div>
          <Button variant="secondary" size="md" onClick={onClose} className="w-full mt-2">
            Close
          </Button>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-5">
          {state?.error && (
            <div className="flex items-center gap-2 bg-status-danger/10 border border-status-danger/30 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 text-status-danger shrink-0" />
              <p className="text-status-danger text-sm">{state.error}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Cryptocurrency
            </label>
            <select
              name="crypto"
              required
              className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
            >
              <option value="" disabled>Select cryptocurrency</option>
              {CRYPTO_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Amount (USD)
            </label>
            <input
              name="amount"
              type="number"
              min="10"
              step="0.01"
              required
              placeholder="Enter withdrawal amount"
              className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Wallet Address
            </label>
            <input
              name="walletAddress"
              type="text"
              required
              placeholder="Enter your wallet address"
              className="w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors font-mono text-sm"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isPending}
            className="w-full mt-1"
          >
            {isPending ? 'Submitting…' : 'Request Withdrawal'}
          </Button>
        </form>
      )}
    </Modal>
  )
}
