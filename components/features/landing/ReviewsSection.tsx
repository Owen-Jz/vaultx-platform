import { Card } from '@/components/ui'

const reviews = [
  {
    name: 'Sarah Thompson',
    location: 'New York, USA',
    initials: 'ST',
    text: 'VaultX transformed how I think about crypto investment. The portfolio analytics give me institutional-quality insights, and the dedicated manager has been invaluable in navigating market volatility.',
  },
  {
    name: 'Michael Chen',
    location: 'San Francisco, USA',
    initials: 'MC',
    text: "After two years on VaultX, my portfolio has consistently outperformed my expectations. The transparency and reporting tools are unlike anything I've seen on other platforms.",
  },
  {
    name: 'Emily Rodriguez',
    location: 'London, UK',
    initials: 'ER',
    text: "I was hesitant about crypto but VaultX's structured investment tiers made it approachable. The monthly payout model is exactly what I needed for steady, predictable returns.",
  },
  {
    name: 'Frederick Okafor',
    location: 'Lagos, Nigeria',
    initials: 'FO',
    text: "The fastest deposits I've ever experienced, and withdrawals are always processed on time. VaultX's infrastructure feels truly institutional — no delays, no excuses.",
  },
  {
    name: 'Isabelle Mercier',
    location: 'Paris, France',
    initials: 'IM',
    text: 'The tax reporting feature alone is worth the subscription. My accountant was impressed by the detailed transaction history and automated annual summaries VaultX provides.',
  },
  {
    name: 'James Whitfield',
    location: 'Sydney, Australia',
    initials: 'JW',
    text: "VaultX's Elite tier gave me access to custom strategies I simply couldn't replicate on my own. The VIP support team responds within minutes, any time of day.",
  },
]

export default function ReviewsSection() {
  return (
    <section className="bg-bg-secondary py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Client Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Trusted by Serious Investors Worldwide
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            Hear from the investors who have made VaultX the cornerstone of their crypto strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} variant="default" className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-gold font-semibold text-sm">
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm">{review.name}</p>
                  <p className="text-text-muted text-xs">{review.location}</p>
                </div>
              </div>

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-accent-gold text-sm">★</span>
                ))}
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
