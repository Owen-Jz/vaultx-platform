'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Plan {
  name: string
  minInvestment: string
  monthlyReturn: string
  featured?: boolean
  cta: string
  ctaHref: string
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Starter',
    minInvestment: '$500 minimum',
    monthlyReturn: '5%',
    featured: false,
    cta: 'Get Started',
    ctaHref: '/auth/signup',
    features: [
      'Monthly profit payouts',
      'Portfolio analytics dashboard',
      'Email support',
      '$500 – $4,999 investment range',
      '24/7 platform access',
    ],
  },
  {
    name: 'Growth',
    minInvestment: '$5,000 minimum',
    monthlyReturn: '8%',
    featured: true,
    cta: 'Start Growing',
    ctaHref: '/auth/signup',
    features: [
      'Monthly profit payouts',
      'Advanced portfolio analytics',
      'Dedicated account manager',
      'Priority withdrawals',
      'Tax reporting tools',
      '$5,000 – $24,999 investment range',
      'Priority support (24/7)',
    ],
  },
  {
    name: 'Elite',
    minInvestment: '$25,000 minimum',
    monthlyReturn: '12%',
    featured: false,
    cta: 'Contact Us',
    ctaHref: '/contact',
    features: [
      'Monthly profit payouts',
      'Institutional analytics suite',
      'Dedicated senior advisor',
      'Instant priority withdrawals',
      'Custom investment strategy',
      'Comprehensive tax reporting',
      'VIP white-glove support',
      '$25,000+ investment range',
    ],
  },
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!cardsRef.current) return
      const cards = cardsRef.current.querySelectorAll('.pricing-card')
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-bg-primary py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent-gold text-xs font-semibold tracking-widest uppercase mb-3">
            INVESTMENT PLANS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Choose Your Path to Growth
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto text-base leading-relaxed">
            Whether you are beginning your journey or scaling an institutional portfolio, VaultX has a plan built for your ambitions.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card flex"
              style={
                plan.featured
                  ? {
                      filter: 'drop-shadow(0 0 40px rgba(201,168,92,0.15))',
                    }
                  : undefined
              }
            >
              <div
                className={`
                  relative flex flex-col gap-6 rounded-2xl p-8 w-full overflow-hidden
                  bg-bg-elevated border
                  ${
                    plan.featured
                      ? 'border-accent-gold/40'
                      : 'border-border-default'
                  }
                `}
              >
                {/* Featured background decoration */}
                {plan.featured && (
                  <div
                    className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at top right, rgba(201,168,92,0.06) 0%, transparent 70%)',
                    }}
                  />
                )}

                {/* MOST POPULAR badge */}
                {plan.featured && (
                  <span className="absolute top-4 right-4 bg-accent-gold text-bg-primary text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    Most Popular
                  </span>
                )}

                {/* Plan eyebrow name */}
                <p className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                  {plan.name}
                </p>

                {/* Huge return number */}
                <div className="flex items-end gap-2 leading-none">
                  <span className="font-display text-7xl font-bold text-accent-gold leading-none">
                    {plan.monthlyReturn}
                  </span>
                  <span className="text-text-muted text-lg mb-1.5">/mo</span>
                </div>

                {/* Separator */}
                <div className="border-t border-border-default" />

                {/* Minimum investment pill */}
                <div>
                  <span className="inline-block bg-bg-card text-text-secondary text-sm rounded px-3 py-1.5">
                    {plan.minInvestment}
                  </span>
                </div>

                {/* Feature list */}
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-accent-gold/10 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-accent-gold" strokeWidth={3} />
                      </span>
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={`
                    mt-auto block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200
                    ${
                      plan.featured
                        ? 'bg-accent-gold text-bg-primary hover:bg-accent-gold-light active:bg-accent-gold-dark'
                        : 'bg-bg-card text-text-primary border border-border-default hover:border-accent-gold/40 hover:text-accent-gold'
                    }
                  `}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-text-muted text-sm mt-10">
          All plans include bank-grade security and regulatory compliance. Returns are performance-based and may vary.
        </p>
      </div>
    </section>
  )
}
