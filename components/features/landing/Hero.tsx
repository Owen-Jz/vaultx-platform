'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import CryptoMarquee from '@/components/features/CryptoMarquee'

gsap.registerPlugin(ScrollTrigger)

// Static particle positions — computed once, never changes between renders
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 95}%`,
  top: `${(i * 23 + 5) % 85}%`,
  size: (i % 3) + 1.5,
}))

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SCRAMBLE_DURATION = 2000 // ms — total reveal time per line

// easeOutQuart: fast start, very smooth deceleration at the end
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

// Imperatively scrambles text inside a DOM element using rAF.
// Uses time-based easing so the reveal decelerates smoothly.
// Characters near the reveal front are brighter; farther ones fade to near-invisible.
function scrambleText(el: HTMLElement, finalText: string, delay = 0): () => void {
  let frame: ReturnType<typeof requestAnimationFrame>
  let timer: ReturnType<typeof setTimeout>
  let startTs = -1

  const run = () => {
    const update = (ts: number) => {
      if (startTs < 0) startTs = ts

      const progress = Math.min((ts - startTs) / SCRAMBLE_DURATION, 1)
      const easedPos = easeOutQuart(progress) * (finalText.length + 2)

      el.innerHTML = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < Math.floor(easedPos)) return char
          // Opacity gradient: bright at the reveal front, ghost further back
          const dist = i - easedPos
          const opacity = Math.max(0.07, 0.32 - dist * 0.045).toFixed(2)
          const rand = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          return `<span style="opacity:${opacity}">${rand}</span>`
        })
        .join('')

      if (progress < 1) {
        frame = requestAnimationFrame(update)
      } else {
        el.textContent = finalText
      }
    }
    frame = requestAnimationFrame(update)
  }

  if (delay > 0) {
    timer = setTimeout(run, delay)
  } else {
    run()
  }

  return () => {
    cancelAnimationFrame(frame)
    clearTimeout(timer)
    el.textContent = finalText
  }
}

export default function Hero() {
  // ── Existing refs ──────────────────────────────────────────────────────────
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

  // ── New refs ───────────────────────────────────────────────────────────────
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const cardAreaRef = useRef<HTMLDivElement>(null)
  const cardGlowRef = useRef<HTMLDivElement>(null)
  const portfolioValueRef = useRef<HTMLParagraphElement>(null)
  const chartPathRef = useRef<SVGPathElement>(null)
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null)
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null)
  const particleRefs = useRef<(HTMLDivElement | null)[]>([])
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const scrambleCancelRef = useRef<(() => void)[]>([])

  // ── Text-scramble trigger ────────────────────────────────────────────────────
  const triggerScramble = useCallback(() => {
    // Cancel any in-progress scramble before starting a new one
    scrambleCancelRef.current.forEach((fn) => fn())
    scrambleCancelRef.current = []

    const lines = [
      { ref: line1Ref, text: 'GROW YOUR',       delay: 0   },
      { ref: line2Ref, text: 'WEALTH',           delay: 90  },
      { ref: line3Ref, text: 'WITHOUT LIMITS.',  delay: 180 },
    ]

    lines.forEach(({ ref, text, delay }) => {
      const el = ref.current
      if (!el) return
      scrambleCancelRef.current.push(scrambleText(el, text, delay))
    })
  }, [])

  // Fire once after the GSAP entrance animation finishes
  useEffect(() => {
    const t = setTimeout(triggerScramble, 1900)
    return () => clearTimeout(t)
  }, [triggerScramble])

  // Repeat every 5 seconds
  useEffect(() => {
    const id = setInterval(triggerScramble, 10000)
    return () => clearInterval(id)
  }, [triggerScramble])

  // Trigger on headline hover (desktop)
  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    el.addEventListener('mouseenter', triggerScramble)
    return () => el.removeEventListener('mouseenter', triggerScramble)
  }, [triggerScramble])

  useGSAP(
    () => {
      // Read once at hook-run time — avoids state-driven re-runs that can
      // kill in-progress entrance animations on mobile.
      const isMobile = window.innerWidth < 768

      // ── ENTRANCE TIMELINE ─────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', immediateRender: false } })

      // Ambient glow pulses in
      tl.from(glowRef.current, { opacity: 0, scale: 0.8, duration: 2, ease: 'power2.out', immediateRender: false }, 0)

      // Badge slides up
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.7, immediateRender: false }, 0.2)

      // Headline lines wipe up from clip
      tl.from(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { y: '110%', stagger: 0.09, duration: 1.1, immediateRender: false },
        0.4,
      )

      // Subtext + CTAs + trust
      tl.from(subtextRef.current, { y: 28, opacity: 0, duration: 0.8, immediateRender: false }, 0.85)
      tl.from(ctaRef.current, { y: 28, opacity: 0, duration: 0.8, immediateRender: false }, 1.0)
      tl.from(trustRef.current, { y: 16, opacity: 0, duration: 0.7, immediateRender: false }, 1.15)

      // Portfolio card slides in from right
      tl.from(cardRef.current, { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out', immediateRender: false }, 0.5)

      // ── CHART LINE DRAW ───────────────────────────────────────────────────
      const path = chartPathRef.current
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        tl.to(path, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut' }, 1.0)
      }

      // ── PORTFOLIO VALUE COUNTER ───────────────────────────────────────────
      const counter = { val: 0 }
      tl.to(
        counter,
        {
          val: 2847392,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (portfolioValueRef.current) {
              portfolioValueRef.current.innerHTML = `$${Math.floor(counter.val).toLocaleString()}<span style="color:#A8A5A0;font-size:1.25rem">.14</span>`
            }
          },
        },
        1.0,
      )

      // ── SCROLL-SCRUBBED PARALLAX ON ORBS ─────────────────────────────────
      gsap.to(orb1Ref.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
      gsap.to(orb2Ref.current, {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })
      gsap.to(glowRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // ── PARTICLE ANIMATIONS ───────────────────────────────────────────────
      const visibleCount = isMobile ? 10 : 18
      particleRefs.current.slice(0, visibleCount).forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: `${((i % 5) - 2) * 22}`,
          x: `${((i % 4) - 1.5) * 14}`,
          duration: 3 + (i % 4) * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.18,
        })
      })

      // ── TRUST ITEM HOVER ──────────────────────────────────────────────────
      trustRef.current?.querySelectorAll('.trust-item').forEach((item) => {
        const el = item as HTMLElement
        el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.06, duration: 0.2 }))
        el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.25 }))
      })

      // ── DESKTOP-ONLY EFFECTS ──────────────────────────────────────────────
      if (!isMobile) {
        // Cursor spotlight
        const xToSpot = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.4, ease: 'power3' })
        const yToSpot = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.4, ease: 'power3' })

        // Mouse parallax on orbs
        const xToGlow = gsap.quickTo(glowRef.current, 'x', { duration: 0.8, ease: 'power3' })
        const yToGlow = gsap.quickTo(glowRef.current, 'y', { duration: 0.8, ease: 'power3' })
        const xToOrb1 = gsap.quickTo(orb1Ref.current, 'x', { duration: 1.2, ease: 'power3' })
        const yToOrb1 = gsap.quickTo(orb1Ref.current, 'y', { duration: 1.2, ease: 'power3' })
        const xToOrb2 = gsap.quickTo(orb2Ref.current, 'x', { duration: 1.5, ease: 'power3' })
        const yToOrb2 = gsap.quickTo(orb2Ref.current, 'y', { duration: 1.5, ease: 'power3' })

        const onMouseMove = (e: MouseEvent) => {
          const container = containerRef.current
          if (!container) return
          const rect = container.getBoundingClientRect()
          const cx = rect.width / 2
          const cy = rect.height / 2
          const dx = (e.clientX - rect.left - cx) / cx
          const dy = (e.clientY - rect.top - cy) / cy

          xToSpot(e.clientX - rect.left)
          yToSpot(e.clientY - rect.top)
          xToGlow(dx * 30)
          yToGlow(dy * 30)
          xToOrb1(dx * 20)
          yToOrb1(dy * 20)
          xToOrb2(-dx * 15)
          yToOrb2(-dy * 15)
        }

        const onMouseEnter = () =>
          gsap.to(spotlightRef.current, { opacity: 1, duration: 0.4 })
        const onMouseLeave = () =>
          gsap.to(spotlightRef.current, { opacity: 0, duration: 0.5 })

        const containerEl = containerRef.current
        containerEl?.addEventListener('mousemove', onMouseMove)
        containerEl?.addEventListener('mouseenter', onMouseEnter)
        containerEl?.addEventListener('mouseleave', onMouseLeave)

        // Magnetic CTA buttons
        const magnetCleanups: (() => void)[] = []
        const setupMagnet = (el: HTMLAnchorElement | null) => {
          if (!el) return
          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const dx = e.clientX - (rect.left + rect.width / 2)
            const dy = e.clientY - (rect.top + rect.height / 2)
            gsap.to(el, { x: dx * 0.35, y: dy * 0.35, duration: 0.3, ease: 'power3.out' })
          }
          const onLeave = () =>
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
          el.addEventListener('mousemove', onMove)
          el.addEventListener('mouseleave', onLeave)
          magnetCleanups.push(() => {
            el.removeEventListener('mousemove', onMove)
            el.removeEventListener('mouseleave', onLeave)
          })
        }
        setupMagnet(ctaPrimaryRef.current)
        setupMagnet(ctaSecondaryRef.current)

        // Cleanup desktop listeners
        return () => {
          containerEl?.removeEventListener('mousemove', onMouseMove)
          containerEl?.removeEventListener('mouseenter', onMouseEnter)
          containerEl?.removeEventListener('mouseleave', onMouseLeave)
          magnetCleanups.forEach((fn) => fn())
        }
      }
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg-primary"
    >
      {/* Cursor spotlight — desktop only, starts invisible */}
      <div
        ref={spotlightRef}
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 1,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(201,168,92,0.12) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Gold particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => {
            particleRefs.current[i] = el
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(201,168,92,0.35)',
            pointerEvents: 'none',
            willChange: 'transform',
            zIndex: 0,
          }}
        />
      ))}

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, #2A2D35 1px, transparent 1px)',
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

      {/* Floating orb 1 — top right */}
      <div
        ref={orb1Ref}
        className="absolute top-[20%] right-[5%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,92,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />

      {/* Floating orb 2 — bottom left */}
      <div
        ref={orb2Ref}
        className="absolute bottom-[25%] left-[5%] w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,92,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 13s ease-in-out infinite reverse 2s',
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex items-center" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-28 pb-16">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-center">

            {/* ── LEFT: Text ── */}
            <div className="flex flex-col">

              {/* Eyebrow badge */}
              <div ref={badgeRef} className="inline-flex items-center gap-2.5 mb-8 w-fit">
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold" />
                  </span>
                  Institutional Crypto Investment
                </span>
              </div>

              {/* Headline — each line clipped so the wipe-up entrance works */}
              <h1
                ref={headlineRef}
                className="font-display font-bold leading-[0.95] tracking-tight text-text-primary mb-8 cursor-crosshair select-none"
              >
                <div className="overflow-hidden">
                  <div ref={line1Ref} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px]">
                    GROW YOUR
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    ref={line2Ref}
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] text-accent-gold"
                  >
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

              {/* CTAs — plain <a> tags so refs work directly */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <a
                  ref={ctaPrimaryRef}
                  href="/auth/signup"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-gold text-bg-primary font-semibold text-base hover:bg-accent-gold-light transition-colors shadow-glow"
                  style={{ display: 'inline-flex' }}
                >
                  Start Investing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  ref={ctaSecondaryRef}
                  href="/trading"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-gold/40 transition-colors text-base font-medium"
                  style={{ display: 'inline-flex' }}
                >
                  Explore Markets
                </a>
              </div>

              {/* Trust row */}
              <div
                ref={trustRef}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted"
              >
                <span className="trust-item flex items-center gap-2 cursor-default">
                  <ShieldCheck className="w-4 h-4 text-accent-gold" />
                  Bank-grade security
                </span>
                <span className="w-px h-4 bg-border-default" />
                <span className="trust-item flex items-center gap-2 cursor-default">
                  <Users className="w-4 h-4 text-accent-gold" />
                  128,000+ investors
                </span>
                <span className="w-px h-4 bg-border-default" />
                <span className="trust-item flex items-center gap-2 cursor-default">
                  <TrendingUp className="w-4 h-4 text-accent-gold" />
                  Avg. 8% monthly returns
                </span>
              </div>
            </div>

            {/* ── RIGHT: Portfolio Card ── */}
            <div
              ref={cardAreaRef}
              className="hidden lg:block relative"
            >
              {/* Card ambient glow — moves with mouse via cardGlowRef */}
              <div
                ref={cardGlowRef}
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(201,168,92,0.12) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Glass portfolio card */}
              <div
                ref={cardRef}
                className="relative rounded-2xl overflow-hidden border border-border-default"
                style={{
                  background: 'rgba(24, 27, 34, 0.85)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Card header */}
                <div className="px-4 pt-4 pb-3 border-b border-border-default">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-text-muted text-[10px] uppercase tracking-widest font-semibold">
                      Portfolio Overview
                    </p>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-success/10 border border-status-success/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-status-success" />
                      </span>
                      <span className="text-status-success text-[10px] font-semibold tracking-wide">LIVE</span>
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        ref={portfolioValueRef}
                        className="text-text-primary font-display font-bold text-2xl"
                      >
                        $0<span style={{ color: '#A8A5A0', fontSize: '1rem' }}>.14</span>
                      </p>
                      <p className="text-text-muted text-[10px] mt-0.5">Total Portfolio Value</p>
                    </div>
                    <div className="text-right">
                      <span className="text-status-success font-semibold text-base">+18.4%</span>
                      <p className="text-text-muted text-[10px]">This month</p>
                    </div>
                  </div>
                </div>

                {/* Performance metrics row */}
                <div className="grid grid-cols-3 divide-x divide-border-default border-b border-border-default">
                  {[
                    { label: 'Total P&L',  value: '+$312K', color: 'text-status-success' },
                    { label: 'Win Rate',   value: '94.2%',  color: 'text-accent-gold'   },
                    { label: 'Active Days', value: '847',   color: 'text-text-primary'  },
                  ].map((m) => (
                    <div key={m.label} className="px-3 py-2 text-center">
                      <p className={`text-xs font-bold ${m.color}`}>{m.value}</p>
                      <p className="text-text-muted text-[10px] mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini chart area */}
                <div className="px-4 pt-3 pb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-text-muted text-[10px]">7D Performance</span>
                    <span className="text-status-success text-[10px] font-semibold">↑ +2.4% today</span>
                  </div>
                  <div className="relative h-14 overflow-hidden">
                    <svg
                      viewBox="0 0 400 80"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C9A85C" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#C9A85C" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        ref={chartPathRef}
                        d="M0,65 L40,52 L80,57 L120,38 L160,43 L200,26 L240,31 L280,14 L320,18 L360,7 L400,10"
                        fill="none"
                        stroke="#C9A85C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0,65 L40,52 L80,57 L120,38 L160,43 L200,26 L240,31 L280,14 L320,18 L360,7 L400,10 L400,80 L0,80 Z"
                        fill="url(#chartGrad)"
                      />
                      {/* Current-value marker */}
                      <circle cx="400" cy="10" r="3.5" fill="#C9A85C" />
                      <circle cx="400" cy="10" r="6" fill="#C9A85C" fillOpacity="0.2" />
                    </svg>
                  </div>
                </div>

                {/* Asset allocation with animated fill bars */}
                <div className="px-4 pb-3">
                  <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold mb-2">
                    Allocation
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Bitcoin',  ticker: 'BTC', pct: 58, val: '+24.1%', color: '#F59E0B', delay: '0.9s'  },
                      { label: 'Ethereum', ticker: 'ETH', pct: 28, val: '+11.8%', color: '#60A5FA', delay: '1.05s' },
                      { label: 'Other',    ticker: 'ALT', pct: 14, val: '+6.3%',  color: '#C9A85C', delay: '1.15s' },
                    ].map((asset) => (
                      <div key={asset.ticker}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: asset.color }}
                            />
                            <span className="text-text-secondary text-xs">{asset.label}</span>
                            <span className="text-text-muted text-[10px] font-mono">{asset.pct}%</span>
                          </div>
                          <span className="text-status-success text-xs font-semibold">{asset.val}</span>
                        </div>
                        <div className="h-1 bg-border-default rounded-full overflow-hidden">
                          <div
                            style={{
                              height: '100%',
                              width: `${asset.pct}%`,
                              backgroundColor: asset.color,
                              borderRadius: '9999px',
                              transformOrigin: 'left',
                              animation: 'barReveal 1.4s cubic-bezier(0.16,1,0.3,1) both',
                              animationDelay: asset.delay,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent activity — completed items active, queued item paused */}
                <div className="px-4 pb-3 border-t border-border-default pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold">
                      Recent Activity
                    </p>
                    <span className="flex items-center gap-1 text-text-muted text-[10px] font-medium">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
                        <rect x="1" y="1" width="3" height="8" rx="1" />
                        <rect x="6" y="1" width="3" height="8" rx="1" />
                      </svg>
                      Paused
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { type: 'BUY', amount: '+0.0142 BTC', value: '$924.00',   time: '2m ago', paused: false },
                      { type: 'YLD', amount: '+$148.20',    value: 'Yield',     time: '1h ago', paused: false },
                      { type: 'RBL', amount: 'Rebalancing', value: '14%→12%',  time: 'Queued', paused: true  },
                    ].map((tx, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                          tx.paused ? 'opacity-45' : 'bg-bg-elevated/40'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${
                            tx.type === 'BUY'
                              ? 'bg-status-success/15 text-status-success'
                              : tx.type === 'YLD'
                              ? 'bg-accent-gold/15 text-accent-gold'
                              : 'bg-border-default text-text-muted'
                          }`}
                        >
                          {tx.type}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary text-xs font-medium leading-tight">{tx.amount}</p>
                          <p className="text-text-muted text-[10px]">{tx.value} · {tx.time}</p>
                        </div>
                        {tx.paused && (
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="#6B6860" className="flex-shrink-0">
                            <rect x="1" y="1" width="3" height="8" rx="1" />
                            <rect x="6" y="1" width="3" height="8" rx="1" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next payout strip */}
                <div className="mx-4 mb-4 px-3 py-2.5 rounded-xl bg-accent-gold/5 border border-accent-gold/20 flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-[10px]">Next payout</p>
                    <p className="text-text-muted text-[10px]">In 3 days</p>
                  </div>
                  <span className="text-accent-gold text-sm font-semibold font-mono">+$31,240.00</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative border-t border-border-default" style={{ zIndex: 2 }}>
        <CryptoMarquee />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes barReveal {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
