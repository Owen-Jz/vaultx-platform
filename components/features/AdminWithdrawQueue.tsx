'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Card, Badge, Button, cn } from '@/components/ui'
import { approveWithdrawal } from '@/lib/actions/admin'

type WithdrawalWithUser = {
  _id: string
  userId: string
  crypto: string
  amount: number
  total: number
  status: 'pending' | 'approved' | 'rejected'
  date: string | Date
  walletAddress: string
  userName: string
  userEmail: string
}

type Tab = 'all' | 'pending' | 'approved'

interface AdminWithdrawQueueProps {
  withdrawals: WithdrawalWithUser[]
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val)
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function truncateAddress(addr: string) {
  if (!addr || addr.length < 16) return addr
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`
}

export default function AdminWithdrawQueue({ withdrawals }: AdminWithdrawQueueProps) {
  const [items, setItems] = useState<WithdrawalWithUser[]>(withdrawals)
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const pendingCount = items.filter((w) => w.status === 'pending').length
  const pendingTotal = items
    .filter((w) => w.status === 'pending')
    .reduce((sum, w) => sum + (w.total ?? 0), 0)

  const filtered = items.filter((w) => {
    if (activeTab === 'pending') return w.status === 'pending'
    if (activeTab === 'approved') return w.status === 'approved'
    return true
  })

  const handleApprove = async (withdrawalId: string) => {
    setLoadingId(withdrawalId)
    try {
      const result = await approveWithdrawal(withdrawalId)
      if (result.success) {
        setItems((prev) =>
          prev.map((w) =>
            w._id === withdrawalId ? { ...w, status: 'approved' as const } : w
          )
        )
      }
    } finally {
      setLoadingId(null)
    }
  }

  const tabs: { label: string; value: Tab; count?: number }[] = [
    { label: 'All', value: 'all', count: items.length },
    { label: 'Pending', value: 'pending', count: pendingCount },
    { label: 'Approved', value: 'approved', count: items.filter((w) => w.status === 'approved').length },
  ]

  const thClass = 'py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider'
  const tdClass = 'py-3 px-4 text-sm text-text-primary align-middle'

  return (
    <div className="flex flex-col gap-4">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card variant="default" className="p-4">
          <p className="text-xs text-text-muted mb-1">Pending Count</p>
          <p className="text-2xl font-bold text-status-warning">{pendingCount}</p>
        </Card>
        <Card variant="default" className="p-4">
          <p className="text-xs text-text-muted mb-1">Pending Amount</p>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(pendingTotal)}</p>
        </Card>
        <Card variant="default" className="p-4 hidden sm:block">
          <p className="text-xs text-text-muted mb-1">Total Withdrawals</p>
          <p className="text-2xl font-bold text-text-primary">{items.length}</p>
        </Card>
      </div>

      {/* Tab filter */}
      <div className="flex gap-1 p-1 bg-bg-elevated rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2',
              activeTab === tab.value
                ? 'bg-accent-gold text-bg-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full font-bold',
                  activeTab === tab.value
                    ? 'bg-bg-primary/30 text-bg-primary'
                    : 'bg-border-default text-text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card variant="default" className="overflow-hidden !p-0">
        {filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-text-muted">
            <CheckCircle className="w-10 h-10 opacity-40" />
            <p className="text-sm">No withdrawals to show</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-border-default bg-bg-elevated">
                <tr>
                  <th className={thClass}>User</th>
                  <th className={thClass}>Crypto</th>
                  <th className={thClass}>Amount</th>
                  <th className={thClass}>Wallet Address</th>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filtered.map((withdrawal) => {
                  const id = (withdrawal as any)._id?.toString() ?? (withdrawal as any).id
                  const isLoading = loadingId === id

                  return (
                    <tr
                      key={id}
                      className="hover:bg-bg-elevated/50 transition-colors"
                    >
                      <td className={tdClass}>
                        <div>
                          <p className="font-medium text-text-primary">{withdrawal.userName}</p>
                          <p className="text-xs text-text-muted">{withdrawal.userEmail}</p>
                        </div>
                      </td>
                      <td className={tdClass}>
                        <Badge variant="info">{withdrawal.crypto}</Badge>
                      </td>
                      <td className={tdClass}>
                        <div>
                          <p className="font-semibold text-text-primary">
                            {formatCurrency(withdrawal.total ?? 0)}
                          </p>
                          <p className="text-xs text-text-muted">
                            {withdrawal.amount} {withdrawal.crypto?.split(' ')[0]}
                          </p>
                        </div>
                      </td>
                      <td className={tdClass}>
                        <span
                          className="font-mono text-xs text-text-muted bg-bg-elevated px-2 py-1 rounded max-w-[180px] inline-block truncate"
                          title={withdrawal.walletAddress}
                        >
                          {truncateAddress(withdrawal.walletAddress)}
                        </span>
                      </td>
                      <td className={cn(tdClass, 'text-text-muted text-xs')}>
                        {withdrawal.date ? formatDate(withdrawal.date) : 'N/A'}
                      </td>
                      <td className={tdClass}>
                        {withdrawal.status === 'pending' ? (
                          <Badge variant="pending">Pending</Badge>
                        ) : withdrawal.status === 'approved' ? (
                          <Badge variant="success">Approved</Badge>
                        ) : (
                          <Badge variant="danger">Rejected</Badge>
                        )}
                      </td>
                      <td className={tdClass}>
                        {withdrawal.status === 'pending' && (
                          <Button
                            variant="primary"
                            size="sm"
                            loading={isLoading}
                            onClick={() => handleApprove(id)}
                            className="bg-status-success hover:bg-status-success/80 text-bg-primary border-0"
                          >
                            {!isLoading && <CheckCircle className="w-3.5 h-3.5 mr-1" />}
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
