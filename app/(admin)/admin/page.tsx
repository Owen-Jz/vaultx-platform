import { Suspense } from 'react'
import { cookies } from 'next/headers'
import AdminDashboardClient from './AdminDashboardClient'
import AdminLoginClient from './AdminLoginClient'
import { getAllUsers, getAllDeposits, getAllWithdrawals } from '@/lib/actions/admin'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('adminLoggedIn')?.value === 'true'

  if (!isAdmin) {
    return <AdminLoginClient />
  }

  const [usersData, depositsData, withdrawalsData] = await Promise.all([
    getAllUsers(),
    getAllDeposits(),
    getAllWithdrawals(),
  ])

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-accent-gold border-t-transparent animate-spin" />
            <p className="text-text-secondary text-sm">Loading Admin Dashboard...</p>
          </div>
        </div>
      }
    >
      <AdminDashboardClient
        users={usersData}
        deposits={depositsData}
        withdrawals={withdrawalsData}
      />
    </Suspense>
  )
}
