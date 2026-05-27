'use client'

import { useState } from 'react'
import { Card, Badge } from '@/components/ui'
import { ArrowDownCircle, ArrowUpCircle, Inbox } from 'lucide-react'
import { format } from 'date-fns'

// Plain (JSON-serialized) shapes — mirrors IDeposit / IWithdrawal without Mongoose Document
type PlainDeposit = {
  _id: string
  crypto: string
  amount: number
  status: string
  date: string
  type?: string
}

type PlainWithdrawal = {
  _id: string
  crypto: string
  amount: number
  status: string
  date: string
  walletAddress: string
}

interface ActivityTableProps {
  deposits: PlainDeposit[]
  withdrawals: PlainWithdrawal[]
}

type Tab = 'all' | 'deposits' | 'withdrawals'

type Transaction =
  | (PlainDeposit & { txType: 'deposit' })
  | (PlainWithdrawal & { txType: 'withdrawal' })

function getStatusVariant(
  status: string,
): 'success' | 'warning' | 'danger' | 'pending' {
  switch (status) {
    case 'approved':
      return 'success'
    case 'rejected':
      return 'danger'
    case 'pending':
    default:
      return 'pending'
  }
}

export default function ActivityTable({ deposits, withdrawals }: ActivityTableProps) {
  const [activeTab, setActiveTab] = useState<Tab>('all')

  const allTransactions: Transaction[] = [
    ...deposits.map((d) => ({ ...d, txType: 'deposit' as const })),
    ...withdrawals.map((w) => ({ ...w, txType: 'withdrawal' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filtered =
    activeTab === 'deposits'
      ? allTransactions.filter((t) => t.txType === 'deposit')
      : activeTab === 'withdrawals'
      ? allTransactions.filter((t) => t.txType === 'withdrawal')
      : allTransactions

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: allTransactions.length },
    { key: 'deposits', label: 'Deposits', count: deposits.length },
    { key: 'withdrawals', label: 'Withdrawals', count: withdrawals.length },
  ]

  return (
    <Card variant="default" className="p-0 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-border-default">
        <h2 className="text-lg font-display font-semibold text-text-primary mb-3">
          Transaction History
        </h2>
        {/* Tab switcher */}
        <div className="flex gap-1 bg-bg-primary rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-bg-elevated text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                  activeTab === tab.key
                    ? 'bg-accent-gold/20 text-accent-gold'
                    : 'bg-bg-elevated text-text-muted'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
            <Inbox className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-text-muted text-sm font-medium">No transactions yet</p>
          <p className="text-text-muted text-xs">Your transaction history will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Crypto
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr
                  key={String(tx._id)}
                  className={`border-b border-border-default/50 hover:bg-bg-elevated/40 transition-colors ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tx.txType === 'deposit' ? (
                        <ArrowDownCircle className="w-4 h-4 text-status-success shrink-0" />
                      ) : (
                        <ArrowUpCircle className="w-4 h-4 text-status-danger shrink-0" />
                      )}
                      <span className="text-sm text-text-primary capitalize font-medium">
                        {tx.txType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-semibold text-text-primary">
                      {tx.crypto}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-text-primary">
                      ${Number(tx.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(tx.status)}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-muted">
                      {format(new Date(tx.date), 'MMM d, yyyy')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
