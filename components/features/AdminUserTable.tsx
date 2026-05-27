'use client'

import { useState } from 'react'
import { Search, Users, DollarSign } from 'lucide-react'
import { Card, Badge, Button, cn } from '@/components/ui'
import EditUserModal from './EditUserModal'

type AdminUserRow = {
  _id: string
  fname: string
  lname: string
  email: string
  date_joined: string | Date
  role?: string
  stats?: { total: number; profit: number; btc: number }
}

interface AdminUserTableProps {
  users: Array<{ user: AdminUserRow; stats?: { total: number; profit: number; btc: number } }>
}

function getInitials(fname: string, lname: string) {
  return `${fname?.[0] ?? ''}${lname?.[0] ?? ''}`.toUpperCase()
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val)
}

export default function AdminUserTable({ users }: AdminUserTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const flatUsers: AdminUserRow[] = users.map(({ user, stats }) => ({ ...user, stats }))

  const filtered = flatUsers.filter((u) => {
    const q = searchQuery.toLowerCase()
    return (
      u.fname?.toLowerCase().includes(q) ||
      u.lname?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    )
  })

  const totalBalance = flatUsers.reduce((sum, u) => sum + (u.stats?.total ?? 0), 0)

  const thClass = 'py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider'
  const tdClass = 'py-3 px-4 text-sm text-text-primary align-middle'

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-lg text-sm',
              'bg-bg-elevated border border-border-default',
              'text-text-primary placeholder:text-text-muted',
              'focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30',
              'transition-colors'
            )}
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {flatUsers.length} users
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            {formatCurrency(totalBalance)} total
          </span>
        </div>
      </div>

      {/* Desktop table */}
      <Card variant="default" className="hidden md:block overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="border-b border-border-default bg-bg-elevated">
              <tr>
                <th className={thClass}>User</th>
                <th className={thClass}>Email</th>
                <th className={thClass}>Balance</th>
                <th className={thClass}>BTC</th>
                <th className={thClass}>Profit</th>
                <th className={thClass}>Joined</th>
                <th className={thClass}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted text-sm">
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const id = (u as any)._id?.toString() ?? (u as any).id
                  return (
                    <tr
                      key={id}
                      className="hover:bg-bg-elevated/50 transition-colors group"
                    >
                      <td className={tdClass}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-accent-gold">
                              {getInitials(u.fname, u.lname)}
                            </span>
                          </div>
                          <span className="font-medium text-text-primary">
                            {u.fname} {u.lname}
                          </span>
                        </div>
                      </td>
                      <td className={cn(tdClass, 'text-text-secondary')}>{u.email}</td>
                      <td className={tdClass}>
                        <span className="text-status-success font-semibold">
                          {formatCurrency(u.stats?.total ?? 0)}
                        </span>
                      </td>
                      <td className={tdClass}>
                        <span className="text-accent-gold font-mono text-xs">
                          {(u.stats?.btc ?? 0).toFixed(6)} BTC
                        </span>
                      </td>
                      <td className={tdClass}>
                        <span
                          className={cn(
                            'font-semibold',
                            (u.stats?.profit ?? 0) >= 0
                              ? 'text-status-success'
                              : 'text-status-danger'
                          )}
                        >
                          {formatCurrency(u.stats?.profit ?? 0)}
                        </span>
                      </td>
                      <td className={cn(tdClass, 'text-text-muted text-xs')}>
                        {u.date_joined
                          ? new Date(u.date_joined).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'N/A'}
                      </td>
                      <td className={tdClass}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditUser(u)}
                        >
                          Edit Stats
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
            {/* Totals footer */}
            {filtered.length > 0 && (
              <tfoot className="border-t border-border-default bg-bg-elevated">
                <tr>
                  <td className={cn(tdClass, 'font-semibold text-text-secondary')} colSpan={2}>
                    Totals ({filtered.length} users)
                  </td>
                  <td className={cn(tdClass, 'font-bold text-status-success')}>
                    {formatCurrency(filtered.reduce((s, u) => s + (u.stats?.total ?? 0), 0))}
                  </td>
                  <td className={cn(tdClass, 'font-semibold text-accent-gold font-mono text-xs')}>
                    {filtered.reduce((s, u) => s + (u.stats?.btc ?? 0), 0).toFixed(6)} BTC
                  </td>
                  <td className={cn(tdClass, 'font-bold text-status-success')}>
                    {formatCurrency(filtered.reduce((s, u) => s + (u.stats?.profit ?? 0), 0))}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </Card>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <Card variant="default" className="py-10 text-center">
            <p className="text-text-muted text-sm">No users found</p>
          </Card>
        ) : (
          filtered.map((u) => {
            const id = (u as any)._id?.toString() ?? (u as any).id
            return (
              <Card key={id} variant="default" className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-accent-gold">
                        {getInitials(u.fname, u.lname)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        {u.fname} {u.lname}
                      </p>
                      <p className="text-xs text-text-muted">{u.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditUser(u)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Balance</p>
                    <p className="text-sm font-semibold text-status-success">
                      {formatCurrency(u.stats?.total ?? 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">BTC</p>
                    <p className="text-xs font-mono text-accent-gold">
                      {(u.stats?.btc ?? 0).toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Profit</p>
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        (u.stats?.profit ?? 0) >= 0
                          ? 'text-status-success'
                          : 'text-status-danger'
                      )}
                    >
                      {formatCurrency(u.stats?.profit ?? 0)}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {/* Edit Modal */}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </>
  )
}
