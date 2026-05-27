import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/getAuthUser'
import DashboardSidebar from '@/components/layouts/DashboardSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthUser()
  if (!user) redirect('/auth/login')

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-60 min-h-screen overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
