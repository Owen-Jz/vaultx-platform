'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card, Badge, Button, cn } from '@/components/ui'
import { approveDeposit } from '@/lib/actions/admin'

type DepositWithUser = {
  _id: string
  userId: string
  crypto: string
  amount: number
  total: number
  status: 'pending' | 'approved' | 'rejected'
  date: string | Date
  type: string
  userName: string
  userEmail: string
}

type Tab = 'all' | 'pending' | 'approved'

interface AdminDepositQueueProps {
  deposits: DepositWithUser[]
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

export default function AdminDepositQueue({ deposits }: AdminDepositQueueProps) {
  const [items, setItems] = useState<DepositWithUser[]>(deposits)
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const pendingCount = items.filter((d) => d.status === 'pending').length
  const pendingTotal = items
    .filter((d) => d.status === 'pending')
    .reduce((sum, d) => sum + (d.total ?? 0), 0)

  const filtered = items.filter((d) => {
    if (activeTab === 'pending') return d.status === 'pending'
    if (activeTab === 'approved') return d.status === 'approved'
    return true
  })

  const handleApprove = async (depositId: string) => {
    setLoadingId(depositId)
    try {
      const result = await approveDeposit(depositId)
      if (result.success) {
        setItems((prev) =>
          prev.map((d) =>
            d._id === depositId ? { ...d, status: 'approved' as const } : d
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
    { label: 'Approved', value: 'approved', count: items.filter((d) => d.status === 'approved').length },
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
          <p className="text-xs text-text-muted mb-1">Total Deposits</p>
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
            <p className="text-sm">No deposits to show</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-border-default bg-bg-elevated">
                <tr>
                  <th className={thClass}>User</th>
                  <th className={thClass}>Crypto</th>
                  <th className={thClass}>Amount</th>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {filtered.map((deposit) => {
                  const id = (deposit as any)._id?.toString() ?? (deposit as any).id
                  const isLoading = loadingId === id

                  return (
                    <tr
                      key={id}
                      className="hover:bg-bg-elevated/50 transition-colors"
                    >
                      <td className={tdClass}>
                        <div>
                          <p className="font-medium text-text-primary">{deposit.userName}</p>
                          <p className="text-xs text-text-muted">{deposit.userEmail}</p>
                        </div>
                      </td>
                      <td className={tdClass}>
                        <Badge variant="info">{deposit.crypto}</Badge>
                      </td>
                      <td className={tdClass}>
                        <div>
                          <p className="font-semibold text-text-primary">
                            {formatCurrency(deposit.total ?? 0)}
                          </p>
                          <p className="text-xs text-text-muted">
                            {deposit.amount} {deposit.crypto?.split(' ')[0]}
                          </p>
                        </div>
                      </td>
                      <td className={cn(tdClass, 'text-text-muted text-xs')}>
                        {deposit.date ? formatDate(deposit.date) : 'N/A'}
                      </td>
                      <td className={tdClass}>
                        {deposit.status === 'pending' ? (
                          <Badge variant="pending">Pending</Badge>
                        ) : deposit.status === 'approved' ? (
                          <Badge variant="success">Approved</Badge>
                        ) : (
                          <Badge variant="danger">Rejected</Badge>
                        )}
                      </td>
                      <td className={tdClass}>
                        {deposit.status === 'pending' && (
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
