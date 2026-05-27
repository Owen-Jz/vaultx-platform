import { ShieldCheck, Zap, Headphones, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui'

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'Bank-Grade Security',
    description:
      '256-bit AES encryption, cold storage for 95% of assets, and multi-signature wallets ensure your holdings are protected at every layer.',
  },
  {
    icon: Zap,
    title: 'Instant Transactions',
    description:
      'Deposits are processed within minutes. Our high-performance infrastructure handles thousands of transactions per second without delay.',
  },
  {
    icon: Headphones,
    title: '24/7 Expert Support',
    description:
      'Dedicated account managers and a round-the-clock support team are always on hand to assist you with any questions or concerns.',
  },
  {
    icon: CheckCircle,
    title: 'Fully Regulated',
    description:
      'VaultX operates in full compliance with international financial standards, providing institutional-grade oversight for every account.',
  },
]

export default function TrustSection() {
  return (
    <section className="bg-bg-primary py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Why Investors Trust Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Built for Security. Designed for Performance.
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            Every feature of VaultX was engineered with institutional standards in mind, so you can focus on growth while we handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} variant="elevated" className="p-8 group">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center transition-colors group-hover:bg-accent-gold/20">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
