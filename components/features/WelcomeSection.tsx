'use client'

import { useState } from 'react'
import { Card } from '@/components/ui'
import type { IUser } from '@/lib/models/User'
import type { IStats } from '@/lib/models/Stats'
import { TrendingUp, TrendingDown, Wallet, Bitcoin, BarChart2, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'

interface WelcomeSectionProps {
  user: IUser
  stats: IStats
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function WelcomeSection({ user, stats }: WelcomeSectionProps) {
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  const roi =
    stats.total && stats.total > 0
      ? ((stats.profit / stats.total) * 100).toFixed(1)
      : '0.0'
  const isPositiveROI = Number(roi) >= 0

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            Welcome back,{' '}
            <span className="text-accent-gold">
              {user.fname.charAt(0).toUpperCase() + user.fname.slice(1).toLowerCase()}
            </span>
          </h1>
          <p className="text-text-muted text-sm mt-1">{today}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setDepositOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-gold text-bg-primary font-semibold text-sm hover:bg-accent-gold/90 transition-colors shadow-glow"
          >
            <ArrowDownCircle className="w-4 h-4" />
            Deposit Funds
          </button>
          <button
            onClick={() => setWithdrawOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-default text-text-primary font-semibold text-sm hover:bg-bg-elevated transition-colors"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Balance */}
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-accent-gold" />
            </div>
            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Total Balance</span>
          </div>
          <p className="text-3xl font-mono font-bold text-text-primary tracking-tight">
            {formatCurrency(stats.total)}
          </p>
          <p className="text-text-muted text-xs mt-2">All invested funds</p>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-accent-gold/5" />
        </Card>

        {/* BTC Holdings */}
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Bitcoin className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">BTC Holdings</span>
          </div>
          <p className="text-3xl font-mono font-bold text-text-primary tracking-tight">
            {Number(stats.btc).toFixed(6)}
          </p>
          <p className="text-text-muted text-xs mt-2">BTC equivalent</p>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-orange-500/5" />
        </Card>

        {/* Profit + ROI */}
        <Card variant="elevated" className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isPositiveROI ? 'bg-status-success/10' : 'bg-status-danger/10'
              }`}
            >
              {isPositiveROI ? (
                <TrendingUp className="w-5 h-5 text-status-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-status-danger" />
              )}
            </div>
            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Total Profit</span>
          </div>
          <p
            className={`text-3xl font-mono font-bold tracking-tight ${
              isPositiveROI ? 'text-status-success' : 'text-status-danger'
            }`}
          >
            {isPositiveROI ? '+' : ''}{formatCurrency(stats.profit)}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <BarChart2 className="w-3.5 h-3.5 text-text-muted" />
            <p
              className={`text-xs font-semibold ${
                isPositiveROI ? 'text-status-success' : 'text-status-danger'
              }`}
            >
              {roi}% ROI
            </p>
          </div>
          <div
            className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full ${
              isPositiveROI ? 'bg-status-success/5' : 'bg-status-danger/5'
            }`}
          />
        </Card>
      </div>

      <DepositModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  )
}
