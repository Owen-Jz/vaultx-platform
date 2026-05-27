'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-bg-primary/80 backdrop-blur-md transition-all duration-200 ${
        scrolled ? 'border-b border-border-default' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="font-display font-bold text-accent-gold text-xl tracking-tight select-none"
        >
          VaultX
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-accent-gold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="font-body text-sm font-medium text-text-secondary border border-border-default rounded-lg px-4 py-2 hover:text-text-primary hover:border-text-secondary transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="font-body text-sm font-medium bg-accent-gold text-bg-primary rounded-lg px-4 py-2 hover:opacity-90 transition-opacity duration-150"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="md:hidden w-full bg-bg-primary/95 backdrop-blur-md border-b border-border-default px-6 pb-6 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-body text-sm font-medium py-3 border-b border-border-default last:border-b-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-accent-gold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm font-medium text-center text-text-secondary border border-border-default rounded-lg px-4 py-2.5 hover:text-text-primary hover:border-text-secondary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm font-medium text-center bg-accent-gold text-bg-primary rounded-lg px-4 py-2.5 hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
