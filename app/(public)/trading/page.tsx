import Link from 'next/link'
import { Button } from '@/components/ui'
import CryptoMarquee from '@/components/features/CryptoMarquee'
import TradingChart from '@/components/features/TradingChart'
import {
  TrendingUp,
  Shield,
  Zap,
  Star,
  Users,
  DollarSign,
  Award,
  CheckCircle,
} from 'lucide-react'

export const metadata = {
  title: 'Live Markets & Investment Plans — VaultX',
  description:
    'View real-time crypto prices and start investing with VaultX. Plans from $500 with up to 22% monthly returns.',
}

const plans = [
  {
    name: 'Starter',
    tag: null,
    minDeposit: '$500',
    monthlyReturn: '8%',
    color: 'border-border-default',
    headerBg: 'bg-bg-elevated',
    features: [
      'Weekly payouts',
      'Basic portfolio dashboard',
      '24/7 live chat support',
      'Up to 3 active positions',
      'Manual withdrawal anytime',
    ],
  },
  {
    name: 'Growth',
    tag: 'Most Popular',
    minDeposit: '$2,500',
    monthlyReturn: '14%',
    color: 'border-accent-gold',
    headerBg: 'bg-accent-gold/10',
    features: [
      'Weekly payouts',
      'Advanced analytics dashboard',
      'Priority 24/7 support',
      'Up to 10 active positions',
      'Instant withdrawals',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Elite',
    tag: null,
    minDeposit: '$10,000',
    monthlyReturn: '22%',
    color: 'border-border-default',
    headerBg: 'bg-bg-elevated',
    features: [
      'Daily payouts',
      'Institutional analytics suite',
      'White-glove 24/7 support',
      'Unlimited active positions',
      'Instant withdrawals',
      'Dedicated senior advisor',
      'Custom investment strategy',
    ],
  },
]

const stats = [
  { icon: Users, label: 'Active Investors', value: '128K+' },
  { icon: DollarSign, label: 'Assets Managed', value: '$2.4B+' },
  { icon: Star, label: 'User Rating', value: '4.8★' },
  { icon: Zap, label: 'Platform Uptime', value: '99.9%' },
]

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-20">
      <CryptoMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-2">
            Real-Time Data
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Live Markets
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl">
            Track live prices and chart patterns across major crypto pairs.
            Institutional-grade data, updated every 10 seconds.
          </p>
        </div>

        {/* Chart */}
        <TradingChart />

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-bg-secondary border border-border-subtle rounded-xl px-5 py-5 flex flex-col items-center text-center gap-2"
            >
              <Icon className="w-6 h-6 text-accent-gold" strokeWidth={1.5} />
              <span className="text-2xl font-bold text-text-primary leading-none">
                {value}
              </span>
              <span className="text-xs text-text-muted uppercase tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Investment Plans section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-2">
              Grow Your Wealth
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              Investment Plans
            </h2>
            <p className="mt-3 text-text-secondary max-w-lg mx-auto">
              Choose a plan that fits your goals. Every plan includes verified
              returns, transparent fees, and round-the-clock support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border-2 ${plan.color} bg-bg-card overflow-hidden`}
              >
                {/* Recommended badge */}
                {plan.tag && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-accent-gold text-bg-primary px-2.5 py-1 rounded-full">
                      <Award className="w-3 h-3" />
                      {plan.tag}
                    </span>
                  </div>
                )}

                {/* Card header */}
                <div className={`${plan.headerBg} px-6 pt-7 pb-6`}>
                  <p className="text-text-muted text-xs font-semibold tracking-widest uppercase mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-bold text-text-primary leading-none">
                      {plan.monthlyReturn}
                    </span>
                    <span className="text-text-secondary text-sm mb-1">
                      / month
                    </span>
                  </div>
                  <p className="mt-2 text-text-muted text-sm">
                    Minimum deposit:{' '}
                    <span className="text-text-secondary font-semibold">
                      {plan.minDeposit}
                    </span>
                  </p>
                </div>

                {/* Divider */}
                <div className={`h-px ${plan.color === 'border-accent-gold' ? 'bg-accent-gold/30' : 'bg-border-subtle'}`} />

                {/* Features */}
                <div className="flex flex-col flex-1 px-6 py-6 gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <CheckCircle
                        className="w-4 h-4 text-accent-gold flex-shrink-0"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-6 pb-7">
                  <Link href="/auth/signup" className="block">
                    <Button
                      variant={plan.tag ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA section */}
        <div className="mt-20 relative overflow-hidden rounded-3xl">
          {/* Gold gradient background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-accent-gold/5 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-bg-secondary"
            style={{ zIndex: -1 }}
            aria-hidden="true"
          />

          <div className="relative border border-accent-gold/30 rounded-3xl px-6 py-16 sm:py-20 text-center bg-bg-secondary">
            {/* Decorative top accent */}
            <div className="mx-auto mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-gold/10 border border-accent-gold/30">
              <TrendingUp className="w-7 h-7 text-accent-gold" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 max-w-2xl mx-auto leading-tight">
              Start Your{' '}
              <span className="text-accent-gold">Investment Journey</span>{' '}
              Today
            </h2>

            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
              Join 128,000+ investors already growing their wealth on VaultX.
              Open your free account in under 2 minutes — no credit card
              required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/auth/signup">
                <Button variant="primary" size="lg">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/plans">
                <Button variant="outline" size="lg">
                  Compare All Plans
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-accent-gold" />
                Bank-level encryption
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent-gold" />
                Regulated & licensed
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-accent-gold" />
                Instant account activation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
