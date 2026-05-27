import { getUserDeposits } from '@/lib/actions/dashboard'
import { Card, Badge } from '@/components/ui'
import { format } from 'date-fns'
import { Inbox } from 'lucide-react'
import DepositPageClient from './DepositPageClient'

type PlainDeposit = {
  _id: string
  crypto: string
  amount: number
  status: string
  date: string
}

function getStatusVariant(
  status: string,
): 'success' | 'warning' | 'danger' | 'pending' {
  switch (status) {
    case 'approved':
      return 'success'
    case 'rejected':
      return 'danger'
    default:
      return 'pending'
  }
}

export default async function DepositPage() {
  const deposits = (await getUserDeposits()) as PlainDeposit[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Deposit History</h1>
          <p className="text-text-muted text-sm mt-1">All your deposit requests and their statuses</p>
        </div>
        <DepositPageClient />
      </div>

      <Card variant="default" className="p-0 overflow-hidden">
        {deposits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
              <Inbox className="w-6 h-6 text-text-muted" />
            </div>
            <p className="text-text-muted text-sm font-medium">No deposits yet</p>
            <p className="text-text-muted text-xs">Your deposit history will appear here once you make a request.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default bg-bg-primary/50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Date
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
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit, i) => (
                  <tr
                    key={String(deposit._id)}
                    className={`border-b border-border-default/50 hover:bg-bg-elevated/40 transition-colors ${
                      i === deposits.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {format(new Date(deposit.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-sm text-text-primary">
                        {deposit.crypto}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-text-primary">
                        ${Number(deposit.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(deposit.status)}>
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
