import Link from 'next/link'
import { Button } from '@/components/ui'
import CryptoMarquee from '@/components/features/CryptoMarquee'
import TradingChart from '@/components/features/TradingChart'

export const metadata = {
  title: 'Live Markets — VaultX',
  description: 'View real-time crypto prices and charts powered by TradingView and Binance.',
}

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
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
            Track live prices and chart patterns across major crypto pairs. Institutional-grade data, updated every 10 seconds.
          </p>
        </div>

        {/* Chart */}
        <TradingChart />

        {/* CTA section */}
        <div className="mt-14 text-center bg-bg-secondary border border-border-default rounded-2xl px-6 py-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Ready to Invest?
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Create your free VaultX account and start accessing institutional-grade investment strategies today.
          </p>
          <Link href="/auth/signup">
            <Button variant="primary" size="lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
