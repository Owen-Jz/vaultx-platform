import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/getAuthUser'
import { getUserStats, getUserDeposits, getUserWithdrawals } from '@/lib/actions/dashboard'
import WelcomeSection from '@/components/features/WelcomeSection'
import ActivityTable from '@/components/features/ActivityTable'
import SupportChat from '@/components/features/SupportChat'

export default async function DashboardPage() {
  const [user, stats, deposits, withdrawals] = await Promise.all([
    getAuthUser(),
    getUserStats(),
    getUserDeposits(),
    getUserWithdrawals(),
  ])

  if (!user) redirect('/auth/login')
  if (!stats) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <WelcomeSection
        user={JSON.parse(JSON.stringify(user))}
        stats={JSON.parse(JSON.stringify(stats))}
      />
      <ActivityTable
        deposits={JSON.parse(JSON.stringify(deposits))}
        withdrawals={JSON.parse(JSON.stringify(withdrawals))}
      />
      <SupportChat />
    </div>
  )
}
