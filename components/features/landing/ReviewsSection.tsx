'use client'

import Image from 'next/image'

interface Review {
  name: string
  location: string
  avatar: string
  quote: string
}

const row1Reviews: Review[] = [
  {
    name: 'Sarah Thompson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80',
    quote:
      'VaultX transformed how I think about crypto investment. The portfolio analytics give me institutional-quality insights I couldn\'t get elsewhere.',
  },
  {
    name: 'Michael Chen',
    location: 'San Francisco, USA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&q=80',
    quote:
      'After two years on VaultX, my portfolio has consistently outperformed expectations. The transparency tools are unlike anything on other platforms.',
  },
  {
    name: 'Emily Rodriguez',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=80',
    quote:
      "VaultX's structured tiers made crypto approachable. The monthly payout model gives me exactly the predictable returns I needed.",
  },
]

const row2Reviews: Review[] = [
  {
    name: 'Frederick Okafor',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=96&q=80',
    quote:
      "The fastest deposits I've ever experienced. VaultX's infrastructure feels truly institutional — no delays, no excuses, every time.",
  },
  {
    name: 'Isabelle Mercier',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80',
    quote:
      'The tax reporting alone is worth it. My accountant was impressed by the detail in the transaction history and automated annual summaries.',
  },
  {
    name: 'James Whitfield',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=96&q=80',
    quote:
      "The Elite tier's custom strategies are something I simply couldn't replicate solo. VIP support responds within minutes, any hour.",
  },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[360px] flex-shrink-0 rounded-2xl bg-bg-card border border-border-default p-6 flex flex-col gap-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.avatar}
            alt={review.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-text-primary font-semibold text-sm leading-tight">{review.name}</p>
          <p className="text-text-muted text-xs mt-0.5">{review.location}</p>
        </div>
      </div>

      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-accent-gold text-base leading-none">
            ★
          </span>
        ))}
      </div>

      <p className="text-text-secondary text-sm leading-relaxed italic">
        &ldquo;{review.quote}&rdquo;
      </p>
    </div>
  )
}

export default function ReviewsSection() {
  const duplicatedRow1 = [...row1Reviews, ...row1Reviews]
  const duplicatedRow2 = [...row2Reviews, ...row2Reviews]

  return (
    <section className="bg-bg-secondary py-24 sm:py-32 overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 35s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <p className="text-accent-gold text-xs font-semibold tracking-widest uppercase mb-3">
          Client Testimonials
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
          Trusted by Investors Worldwide
        </h2>
        <p className="mt-3 text-text-secondary text-base">
          128,000+ investors. 4.8 stars. Zero regrets.
        </p>
      </div>

      {/* Marquee rows container with fade edges */}
      <div className="relative flex flex-col gap-4">
        {/* Fade left edge */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-[120px]"
          style={{
            background: 'linear-gradient(to right, #111318, transparent)',
          }}
        />
        {/* Fade right edge */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-[120px]"
          style={{
            background: 'linear-gradient(to left, #111318, transparent)',
          }}
        />

        {/* Row 1 — moves left */}
        <div className="flex gap-5 overflow-hidden">
          <div className="marquee-left flex gap-5 will-change-transform">
            {duplicatedRow1.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 — moves right */}
        <div className="flex gap-5 overflow-hidden">
          <div className="marquee-right flex gap-5 will-change-transform">
            {duplicatedRow2.map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
