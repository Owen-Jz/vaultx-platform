'use client'

import { useState } from 'react'
import { Users, ArrowDownToLine, ArrowUpFromLine, Download, LogOut } from 'lucide-react'
import { Badge, Button, cn } from '@/components/ui'
import AdminUserTable from '@/components/features/AdminUserTable'
import AdminDepositQueue from '@/components/features/AdminDepositQueue'
import AdminWithdrawQueue from '@/components/features/AdminWithdrawQueue'
import { adminLogout } from '@/lib/actions/admin'

type Tab = 'users' | 'deposits' | 'withdrawals'

type PlainUser = { _id: string; fname: string; lname: string; email: string; date_joined: string | Date; role?: string }
type PlainStats = { total: number; profit: number; btc: number }
type PlainDeposit = { _id: string; userId: string; crypto: string; amount: number; total: number; status: 'pending' | 'approved' | 'rejected'; date: string | Date; type: string; userName: string; userEmail: string }
type PlainWithdrawal = { _id: string; userId: string; crypto: string; amount: number; total: number; status: 'pending' | 'approved' | 'rejected'; date: string | Date; walletAddress: string; userName: string; userEmail: string }

interface AdminDashboardClientProps {
  users: Array<{ user: PlainUser; stats?: PlainStats }>
  deposits: PlainDeposit[]
  withdrawals: PlainWithdrawal[]
}

export default function AdminDashboardClient({
  users,
  deposits,
  withdrawals,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('users')

  const pendingDeposits = deposits.filter((d) => d.status === 'pending').length
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending').length

  const tabs: {
    label: string
    value: Tab
    icon: React.ReactNode
    count?: number
    badgeVariant?: 'warning' | 'default'
  }[] = [
    {
      label: 'Users',
      value: 'users',
      icon: <Users className="w-4 h-4" />,
      count: users.length,
      badgeVariant: 'default',
    },
    {
      label: 'Deposits',
      value: 'deposits',
      icon: <ArrowDownToLine className="w-4 h-4" />,
      count: pendingDeposits,
      badgeVariant: pendingDeposits > 0 ? 'warning' : 'default',
    },
    {
      label: 'Withdrawals',
      value: 'withdrawals',
      icon: <ArrowUpFromLine className="w-4 h-4" />,
      count: pendingWithdrawals,
      badgeVariant: pendingWithdrawals > 0 ? 'warning' : 'default',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-sm text-text-muted mt-0.5">
            Manage users, deposits and withdrawals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <form action={adminLogout}>
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 bg-bg-elevated rounded-xl w-fit border border-border-default">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
              activeTab === tab.value
                ? 'bg-accent-gold text-bg-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <Badge
                variant={tab.badgeVariant === 'warning' ? 'warning' : 'default'}
                className="text-xs px-1.5 py-0"
              >
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'users' && <AdminUserTable users={users} />}
        {activeTab === 'deposits' && <AdminDepositQueue deposits={deposits} />}
        {activeTab === 'withdrawals' && <AdminWithdrawQueue withdrawals={withdrawals} />}
      </div>
    </div>
  )
}
