'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import CryptoMarquee from '@/components/features/CryptoMarquee'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Ambient glow pulses in
    tl.from(glowRef.current, { opacity: 0, scale: 0.8, duration: 2, ease: 'power2.out' }, 0)

    // Badge slides up
    tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.2)

    // Headline lines wipe up from clip
    tl.from(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { y: '110%', stagger: 0.09, duration: 1.1 },
      0.4,
    )

    // Subtext + CTAs + trust
    tl.from(subtextRef.current, { y: 28, opacity: 0, duration: 0.8 }, 0.85)
    tl.from(ctaRef.current, { y: 28, opacity: 0, duration: 0.8 }, 1.0)
    tl.from(trustRef.current, { y: 16, opacity: 0, duration: 0.7 }, 1.15)

    // Portfolio card slides in from right
    tl.from(cardRef.current, { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0.5)
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg-primary"
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #2A2D35 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient gold glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '30%',
          width: '900px',
          height: '600px',
          background:
            'radial-gradient(ellipse at center, rgba(201,168,92,0.10) 0%, rgba(201,168,92,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-[20%] right-[5%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,92,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[25%] left-[5%] w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,92,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 13s ease-in-out infinite reverse 2s',
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-28 pb-16">
          <div className="grid lg:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

            {/* ── LEFT: Text ── */}
            <div className="flex flex-col">
              {/* Eyebrow */}
              <div ref={badgeRef} className="inline-flex items-center gap-2.5 mb-8 w-fit">
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold" />
                  </span>
                  Institutional Crypto Investment
                </span>
              </div>

              {/* Headline — each line in an overflow-hidden clip */}
              <h1 className="font-display font-bold leading-[0.95] tracking-tight text-text-primary mb-8">
                <div className="overflow-hidden">
                  <div ref={line1Ref} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px]">
                    GROW YOUR
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div ref={line2Ref} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] text-accent-gold">
                    WEALTH
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div ref={line3Ref} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px]">
                    WITHOUT LIMITS.
                  </div>
                </div>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-text-secondary text-lg leading-relaxed max-w-lg mb-10"
              >
                VaultX gives serious investors access to institutional-grade crypto strategies
                with full transparency, 24/7 management, and consistent monthly returns.
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <Link
                  href="/auth/signup"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-gold text-bg-primary font-semibold text-base hover:bg-accent-gold-light transition-colors shadow-glow"
                >
                  Start Investing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/trading"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-gold/40 transition-colors text-base font-medium"
                >
                  Explore Markets
                </Link>
              </div>

              {/* Trust row */}
              <div
                ref={trustRef}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent-gold" />
                  Bank-grade security
                </span>
                <span className="w-px h-4 bg-border-default" />
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-gold" />
                  128,000+ investors
                </span>
                <span className="w-px h-4 bg-border-default" />
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-gold" />
                  Avg. 8% monthly returns
                </span>
              </div>
            </div>

            {/* ── RIGHT: Portfolio Card ── */}
            <div ref={cardRef} className="hidden lg:block relative">
              {/* Card glow */}
              <div
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(201,168,92,0.12) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Glass portfolio card */}
              <div
                className="relative rounded-2xl overflow-hidden border border-border-default"
                style={{
                  background: 'rgba(24, 27, 34, 0.85)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-4 border-b border-border-default">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-widest font-semibold mb-1">
                        Portfolio Overview
                      </p>
                      <p className="text-text-primary font-display font-bold text-3xl">
                        $2,847,392<span className="text-text-muted text-xl">.14</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-text-muted">This month</span>
                      <span className="text-status-success font-semibold text-lg">+18.4%</span>
                    </div>
                  </div>
                </div>

                {/* Mini chart area */}
                <div className="px-6 py-4">
                  <div className="relative h-28 overflow-hidden">
                    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C9A85C" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#C9A85C" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,80 L40,65 L80,70 L120,50 L160,55 L200,35 L240,40 L280,20 L320,25 L360,10 L400,15"
                        fill="none"
                        stroke="#C9A85C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0,80 L40,65 L80,70 L120,50 L160,55 L200,35 L240,40 L280,20 L320,25 L360,10 L400,15 L400,100 L0,100 Z"
                        fill="url(#chartGrad)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Asset breakdown */}
                <div className="px-6 pb-6 flex flex-col gap-3">
                  {[
                    { label: 'Bitcoin', ticker: 'BTC', pct: '58%', val: '+24.1%', color: '#F59E0B' },
                    { label: 'Ethereum', ticker: 'ETH', pct: '28%', val: '+11.8%', color: '#60A5FA' },
                    { label: 'Other Assets', ticker: 'ALT', pct: '14%', val: '+6.3%', color: '#C9A85C' },
                  ].map((asset) => (
                    <div key={asset.ticker} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: asset.color }}
                      />
                      <span className="text-text-secondary text-sm flex-1">{asset.label}</span>
                      <span className="text-text-muted text-xs font-mono">{asset.pct}</span>
                      <span className="text-status-success text-xs font-semibold">{asset.val}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom action */}
                <div className="mx-6 mb-6 px-4 py-3 rounded-xl bg-accent-gold/5 border border-accent-gold/20 flex items-center justify-between">
                  <span className="text-text-muted text-xs">Next payout</span>
                  <span className="text-accent-gold text-sm font-semibold font-mono">
                    +$31,240.00
                  </span>
                </div>

                {/* Dashboard preview image strip */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=640&q=70"
                    alt="Trading dashboard"
                    fill
                    className="object-cover object-top opacity-50"
                    sizes="460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/80 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative border-t border-border-default">
        <CryptoMarquee />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
      `}</style>
    </section>
  )
}
