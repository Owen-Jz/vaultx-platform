'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  ArrowDownCircle,
  ArrowUpCircle,
  LogOut,
} from 'lucide-react'
import { adminLogout } from '@/lib/actions/admin'

const navItems = [
  { name: 'Overview', href: '/admin', tab: null, icon: LayoutDashboard },
  { name: 'Users', href: '/admin', tab: 'users', icon: Users },
  { name: 'Deposits', href: '/admin', tab: 'deposits', icon: ArrowDownCircle },
  { name: 'Withdrawals', href: '/admin', tab: 'withdrawals', icon: ArrowUpCircle },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')

  const isActive = (href: string, tab: string | null) => {
    if (pathname !== href) return false
    if (tab === null) return currentTab === null
    return currentTab === tab
  }

  const handleAdminLogout = async () => {
    try {
      await adminLogout()
    } catch (error: unknown) {
      const err = error as { digest?: string; message?: string }
      if (err?.digest === 'NEXT_REDIRECT' || err?.message === 'NEXT_REDIRECT') {
        return
      }
      console.error('Admin logout failed:', err?.message || error)
    }
  }

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 h-full w-60 bg-bg-secondary border-r border-border-default flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border-default">
        <Link href="/admin" className="block">
          <span className="font-display font-bold text-accent-gold text-lg tracking-tight">
            VaultX Admin
          </span>
          <p className="text-text-muted text-xs font-body mt-0.5">Control Panel</p>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ name, href, tab, icon: Icon }) => {
          const active = isActive(href, tab)
          const linkHref = tab ? `${href}?tab=${tab}` : href
          return (
            <Link
              key={`${href}-${tab}`}
              href={linkHref}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors duration-150 ${
                active
                  ? 'bg-bg-elevated text-accent-gold border-l-2 border-accent-gold pl-[10px]'
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-border-default">
        <button
          onClick={handleAdminLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-text-secondary hover:bg-bg-elevated hover:text-red-400 transition-colors duration-150"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
