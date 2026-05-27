import Link from 'next/link'
import { Card, Badge, Button } from '@/components/ui'
import { Check } from 'lucide-react'

interface Plan {
  name: string
  minInvestment: string
  monthlyReturn: string
  featured?: boolean
  badge?: string
  cta: string
  ctaHref: string
  ctaVariant: 'primary' | 'secondary' | 'ghost'
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Starter',
    minInvestment: '$500',
    monthlyReturn: '5%',
    featured: false,
    cta: 'Get Started',
    ctaHref: '/auth/signup',
    ctaVariant: 'secondary',
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
    minInvestment: '$5,000',
    monthlyReturn: '8%',
    featured: true,
    badge: 'Most Popular',
    cta: 'Start Growing',
    ctaHref: '/auth/signup',
    ctaVariant: 'primary',
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
    minInvestment: '$25,000',
    monthlyReturn: '12%',
    featured: false,
    cta: 'Contact Us',
    ctaHref: '/contact',
    ctaVariant: 'secondary',
    features: [
      'Monthly profit payouts',
      'Institutional analytics suite',
      'Dedicated senior advisor',
      'Instant priority withdrawals',
      'Custom investment strategy',
      'Comprehensive tax reporting',
      'VIP support (white-glove)',
      '$25,000+ investment range',
    ],
  },
]

export default function PricingSection() {
  return (
    <section className="bg-bg-primary py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Investment Plans
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Choose Your Investment Tier
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            Whether you are beginning your journey or scaling an institutional portfolio, VaultX has a plan built for your ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={plan.featured ? 'md:-mt-4 md:mb-4' : ''}
            >
              <Card
                variant={plan.featured ? 'gold' : 'elevated'}
                className={`p-8 flex flex-col gap-6 ${plan.featured ? 'ring-1 ring-accent-gold/40' : ''}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary">
                      {plan.name}
                    </h3>
                    <p className="text-text-muted text-sm mt-1">
                      Min. {plan.minInvestment}
                    </p>
                  </div>
                  {plan.badge && (
                    <Badge variant="info" className="text-xs">
                      {plan.badge}
                    </Badge>
                  )}
                </div>

                {/* Monthly return */}
                <div>
                  <span className="font-display text-5xl font-bold text-accent-gold">
                    {plan.monthlyReturn}
                  </span>
                  <span className="text-text-muted text-sm ml-2">monthly returns</span>
                </div>

                {/* Divider */}
                <div className="border-t border-border-default" />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.ctaHref} className="block mt-auto">
                  <Button
                    variant={plan.ctaVariant}
                    size="md"
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
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
