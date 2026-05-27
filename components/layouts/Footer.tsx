import Link from 'next/link'

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'Trading', href: '/trading' },
  { name: 'Contact', href: '/contact' },
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-default">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Brand + tagline */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="font-display font-bold text-accent-gold text-xl tracking-tight">
            VaultX
          </span>
          <p className="font-body text-sm text-text-muted max-w-xs">
            Institutional crypto investment for serious investors.
          </p>
        </div>

        {/* Nav links */}
        <nav className="mb-8 flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-text-muted hover:text-text-secondary transition-colors duration-150"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="border-t border-border-default pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="font-body text-xs text-text-muted">
            &copy; 2025 VaultX. All rights reserved.
          </p>
          <p className="font-body text-xs text-text-muted">
            Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
