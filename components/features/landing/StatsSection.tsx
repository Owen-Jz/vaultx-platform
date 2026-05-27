'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  id: string
  label: string
  prefix?: string
  suffix: string
  decimals: number
  start: number
  end: number
  renderValue: (val: number) => string
}

const stats: Stat[] = [
  {
    id: 'aum',
    label: 'Assets Under Management',
    prefix: '$',
    suffix: 'B+',
    decimals: 1,
    start: 0,
    end: 2.4,
    renderValue: (val) => `$${val.toFixed(1)}B+`,
  },
  {
    id: 'investors',
    label: 'Active Investors',
    prefix: '',
    suffix: 'K+',
    decimals: 0,
    start: 0,
    end: 128,
    renderValue: (val) => `${Math.floor(val)}K+`,
  },
  {
    id: 'uptime',
    label: 'Platform Uptime',
    prefix: '',
    suffix: '%',
    decimals: 1,
    start: 95,
    end: 99.9,
    renderValue: (val) => `${val.toFixed(1)}%`,
  },
  {
    id: 'rating',
    label: 'Investor Rating',
    prefix: '',
    suffix: '★',
    decimals: 1,
    start: 0,
    end: 4.8,
    renderValue: (val) => `${val.toFixed(1)}★`,
  },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Entrance animation — items slide up and fade in
      gsap.from(itemRefs.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Counter animations — each stat counts up from its start value
      stats.forEach((stat, index) => {
        const el = counterRefs.current[index]
        if (!el) return

        const counter = { val: stat.start }

        gsap.to(counter, {
          val: stat.end,
          duration: 2,
          ease: 'power2.out',
          delay: index * 0.12 + 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate() {
            el.innerHTML = stat.renderValue(counter.val)
          },
          onComplete() {
            el.innerHTML = stat.renderValue(stat.end)
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-bg-secondary border-y border-border-default py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 relative">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => { itemRefs.current[index] = el }}
              className={[
                'flex flex-col items-center text-center px-6 py-8 sm:py-10 relative',
                // Vertical divider lines on desktop — pseudo-border via right border on all but last
                index < stats.length - 1
                  ? 'lg:border-r lg:border-border-default'
                  : '',
                // Mobile: right border on odd-index items (left column)
                index % 2 === 0
                  ? 'border-r border-border-default lg:border-r-0'
                  : '',
                // Mobile bottom borders on first row
                index < 2
                  ? 'border-b border-border-default lg:border-b-0'
                  : '',
                // Re-add desktop right border properly after overrides
                index < stats.length - 1
                  ? 'lg:border-r lg:border-border-default'
                  : '',
              ]
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim()}
            >
              {/* Large animated number */}
              <span
                ref={(el) => { counterRefs.current[index] = el }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-accent-gold tabular-nums leading-none"
              >
                {stat.renderValue(stat.start)}
              </span>

              {/* Thin gold rule */}
              <div className="w-12 h-px bg-accent-gold/50 mt-4 mb-4" />

              {/* Label */}
              <span className="text-text-muted text-xs sm:text-sm uppercase tracking-widest leading-snug max-w-[140px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
