'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Settings,
  MessageCircle,
  LogOut,
} from 'lucide-react'
import { logout } from '@/lib/actions/auth'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Deposits', href: '/dashboard/deposit', icon: ArrowDownCircle },
  { name: 'Withdraw', href: '/dashboard/withdraw', icon: ArrowUpCircle },
  { name: 'Chart', href: '/dashboard/chart', icon: TrendingUp },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Support', href: '/dashboard/support', icon: MessageCircle },
]

// Bottom tab bar items (max 5 for mobile)
const mobileTabItems = navItems.slice(0, 5)

export default function DashboardSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error: unknown) {
      const err = error as { digest?: string; message?: string }
      if (err?.digest === 'NEXT_REDIRECT' || err?.message === 'NEXT_REDIRECT') {
        return
      }
      console.error('Logout failed:', err?.message || error)
    }
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-60 bg-bg-secondary border-r border-border-default flex-col z-30">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-border-default">
          <Link href="/dashboard" className="block">
            <span className="font-display font-bold text-accent-gold text-lg tracking-tight">
              VaultX
            </span>
            <p className="text-text-muted text-xs font-body mt-0.5">Portfolio</p>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors duration-150 ${
                  isActive
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
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-text-secondary hover:bg-bg-elevated hover:text-red-400 transition-colors duration-150"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-secondary border-t border-border-default flex items-center justify-around px-2 py-2">
        {mobileTabItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                isActive ? 'text-accent-gold' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="text-[10px] font-body font-medium">{name}</span>
            </Link>
          )
        })}
        {/* Logout tab */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors duration-150"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="text-[10px] font-body font-medium">Logout</span>
        </button>
      </nav>
    </>
  )
}
