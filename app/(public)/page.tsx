import Hero from '@/components/features/landing/Hero'
import StatsSection from '@/components/features/landing/StatsSection'
import ProcessSection from '@/components/features/landing/ProcessSection'
import TrustSection from '@/components/features/landing/TrustSection'
import PricingSection from '@/components/features/landing/PricingSection'
import ReviewsSection from '@/components/features/landing/ReviewsSection'
import StartNowSection from '@/components/features/landing/StartNowSection'

export const metadata = {
  title: 'VaultX — Institutional Crypto Investment',
  description:
    'VaultX gives serious investors access to institutional-grade crypto strategies with full transparency and 24/7 portfolio management.',
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <ProcessSection />
      <TrustSection />
      <PricingSection />
      <ReviewsSection />
      <StartNowSection />
    </div>
  )
}
