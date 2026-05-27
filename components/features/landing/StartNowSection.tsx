import Link from 'next/link'
import { Button } from '@/components/ui'

export default function StartNowSection() {
  return (
    <section className="relative bg-bg-secondary overflow-hidden py-24 sm:py-32">
      {/* Top gold gradient edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(201,168,92,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-4">
          Get Started Today
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
          Ready to Start Your<br className="hidden sm:block" /> Investment Journey?
        </h2>
        <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
          Join 128,000+ investors who trust VaultX with their crypto portfolio. No hidden fees. No surprises.
        </p>
        <Link href="/auth/signup">
          <Button variant="primary" size="lg">
            Create Free Account
          </Button>
        </Link>
        <p className="text-text-muted text-sm mt-6">
          No minimum commitment. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
