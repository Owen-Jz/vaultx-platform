'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Trading', href: '/trading' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pillRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Slide-in entrance — initial state set via CSS so there's no flash before GSAP initialises
  useGSAP(() => {
    gsap.to(pillRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.15,
    })
  })

  // Animate mobile menu open
  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power2.out' },
      )
    }
  }, [menuOpen])

  return (
    /* Fixed wrapper — pointer-events-none so the transparent gap/sides don't block page content */
    <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">

        {/* ── Floating pill ── */}
        <nav
          ref={pillRef}
          className={`
            flex items-center justify-between px-4 sm:px-5 py-3 rounded-2xl
            border transition-all duration-300 ease-out
            ${scrolled
              ? 'bg-bg-elevated/88 border-accent-gold/20 shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,168,92,0.08)]'
              : 'bg-bg-elevated/55 border-border-default/25 shadow-[0_4px_24px_rgba(0,0,0,0.28)]'
            }
          `}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            opacity: 0,
            transform: 'translateY(-72px)',
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            className="font-display font-bold text-accent-gold text-xl tracking-tight select-none shrink-0"
          >
            VaultX
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      font-body text-sm font-medium px-3.5 py-2 rounded-xl transition-all duration-150
                      ${active
                        ? 'text-accent-gold bg-accent-gold/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-border-default/30'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-text-muted hover:text-accent-gold hover:bg-accent-gold/10 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Thin divider */}
            <div className="w-px h-4 bg-border-default/60 mx-0.5" />

            <Link
              href="/auth/login"
              className="font-body text-sm font-medium text-text-secondary px-3.5 py-2 rounded-xl hover:text-text-primary hover:bg-border-default/30 transition-all duration-150"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="font-body text-sm font-medium bg-accent-gold text-bg-primary px-4 py-2 rounded-xl hover:bg-accent-gold-light active:bg-accent-gold-dark transition-colors duration-150"
              style={{ boxShadow: '0 0 18px rgba(201,168,92,0.28)' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-border-default/30 transition-all"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* ── Mobile dropdown pill ── */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-2 rounded-2xl border border-border-default/25 overflow-hidden"
            style={{
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              background: 'rgb(var(--color-bg-elevated) / 0.95)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div className="p-2 flex flex-col gap-0.5">
              {/* Nav links */}
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-body text-sm font-medium px-4 py-3 rounded-xl transition-all duration-150 ${
                      active
                        ? 'text-accent-gold bg-accent-gold/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-border-default/30'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}

              {/* Divider */}
              <div className="h-px bg-border-default/40 mx-4 my-1" />

              {/* Theme row */}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-text-muted text-xs font-medium tracking-wide uppercase">
                  Appearance
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-accent-gold transition-colors"
                >
                  {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
                  <span className="text-xs font-medium">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </div>

              {/* Auth buttons */}
              <div className="flex gap-2 p-2 pt-1">
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center font-body text-sm font-medium text-text-secondary border border-border-default rounded-xl px-4 py-2.5 hover:text-text-primary hover:border-accent-gold/40 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center font-body text-sm font-medium bg-accent-gold text-bg-primary rounded-xl px-4 py-2.5 hover:bg-accent-gold-light transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}
