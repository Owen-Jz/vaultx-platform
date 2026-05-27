'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import CryptoMarquee from '@/components/features/CryptoMarquee'
import { Lock } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-bg-primary">
      {/* Radial gold background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,92,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Floating gold orbs */}
      <div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full opacity-[0.04] blur-3xl bg-accent-gold pointer-events-none"
        style={{ animation: 'float 8s ease-in-out infinite' }}
      />
      <div
        className="absolute top-[40%] right-[8%] w-56 h-56 rounded-full opacity-[0.06] blur-3xl bg-accent-gold pointer-events-none"
        style={{ animation: 'float 11s ease-in-out infinite reverse' }}
      />
      <div
        className="absolute bottom-[20%] left-[30%] w-44 h-44 rounded-full opacity-[0.04] blur-3xl bg-accent-gold pointer-events-none"
        style={{ animation: 'float 9s ease-in-out infinite 2s' }}
      />

      {/* Main hero content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold text-xs font-semibold tracking-widest uppercase mb-8"
          style={{ animation: 'fadeInUp 0.6s ease forwards' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold inline-block" />
          Institutional Crypto Investment
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight max-w-4xl mb-6"
          style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}
        >
          Grow Your Wealth with
          <br />
          <span className="text-accent-gold">Institutional</span> Precision
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg text-text-secondary max-w-xl mb-10 leading-relaxed"
          style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}
        >
          VaultX gives serious investors access to institutional-grade crypto strategies
          with full transparency and 24/7 portfolio management.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          style={{ animation: 'fadeInUp 0.6s ease 0.3s both' }}
        >
          <Link href="/auth/signup">
            <Button variant="primary" size="lg">
              Start Investing
            </Button>
          </Link>
          <Link href="/trading">
            <Button variant="secondary" size="lg">
              Explore Markets
            </Button>
          </Link>
        </div>

        {/* Trust row */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 text-text-muted text-xs sm:text-sm"
          style={{ animation: 'fadeInUp 0.6s ease 0.4s both' }}
        >
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-accent-gold" />
            Bank-grade security
          </span>
          <span className="text-border-default">•</span>
          <span>$0 signup fee</span>
          <span className="text-border-default">•</span>
          <span>24/7 support</span>
        </div>
      </div>

      {/* Marquee at bottom */}
      <div className="relative">
        <CryptoMarquee />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}
