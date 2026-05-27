import { cookies } from 'next/headers'
import AdminSidebar from '@/components/layouts/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('adminLoggedIn')?.value === 'true'

  if (!isAdmin) {
    // Just render children — the admin page will show login form
    return <div className="min-h-screen bg-bg-primary">{children}</div>
  }

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <AdminSidebar />
      <main className="flex-1 lg:ml-60 min-h-screen overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
