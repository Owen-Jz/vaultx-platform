import { Card } from '@/components/ui'
import { Eye, ShieldCheck, Lightbulb, Users } from 'lucide-react'

export const metadata = {
  title: 'About VaultX — Our Mission & Team',
  description:
    'Learn about VaultX — founded by ex-Goldman Sachs and crypto veterans with a mission to democratize institutional investment strategies.',
}

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'Every fee, every return, every transaction — fully visible. We believe investors deserve complete clarity over their money.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description:
      '256-bit encryption, multi-sig cold storage, and SOC 2 compliance. Your assets are protected by the same standards as top-tier financial institutions.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We continuously evolve our strategies, powered by quantitative research and real-time market data, to stay ahead of the curve.',
  },
  {
    icon: Users,
    title: 'Client-First',
    description:
      'Your success is our success. Every product decision starts with one question: how does this serve our investors better?',
  },
]

const team = [
  {
    name: 'Jonathan Mercer',
    role: 'Chief Executive Officer',
    initials: 'JM',
    bio: 'Former Managing Director at Goldman Sachs Asset Management. 18 years in institutional finance before co-founding VaultX in 2020.',
  },
  {
    name: 'Priya Anand',
    role: 'Chief Technology Officer',
    initials: 'PA',
    bio: 'Ex-senior engineer at Coinbase and AWS. Leads VaultX\'s infrastructure and security architecture, serving 128,000+ investors globally.',
  },
  {
    name: 'David Laurent',
    role: 'Head of Investments',
    initials: 'DL',
    bio: 'Quantitative analyst with a decade at Bridgewater Associates. Oversees all investment strategy, portfolio construction, and risk management.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Create an Account',
    description: 'Sign up in minutes. Provide your basic information and choose your investment tier.',
  },
  {
    step: '02',
    title: 'Fund Your Portfolio',
    description: 'Deposit via bank transfer or cryptocurrency. Funds are secured immediately.',
  },
  {
    step: '03',
    title: 'Earn Monthly Returns',
    description: 'Our team executes institutional strategies on your behalf. Returns are credited monthly.',
  },
  {
    step: '04',
    title: 'Withdraw Anytime',
    description: 'Request withdrawals at any time through your dashboard. Processed within 24 hours.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-primary pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(201,168,92,0.10) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            About VaultX
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            VaultX was founded in 2020 by a team of ex-Goldman Sachs bankers and crypto veterans who saw a fundamental gap in the market: retail investors had no access to the same sophisticated strategies that institutional managers used to compound wealth.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-bg-secondary border-y border-border-default py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-4">
                Founded 2020
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                Where Tradition Meets Innovation
              </h2>
              <div className="space-y-5 text-text-secondary leading-relaxed">
                <p>
                  Our founders spent decades managing billions in traditional finance before crypto emerged as a legitimate asset class. In 2020, they took the leap — leaving established institutions to build something the market had never seen: a platform where any serious investor could access portfolio strategies previously reserved for hedge funds and family offices.
                </p>
                <p>
                  VaultX combines the discipline and risk management of traditional asset management with the speed and transparency that only blockchain-native infrastructure can provide. Every strategy is research-backed, every fee is disclosed, and every return is independently verifiable.
                </p>
                <p>
                  Today, we manage over $2.4 billion in assets for 128,000+ investors across 60+ countries. Our track record speaks for itself.
                </p>
              </div>
            </div>

            {/* Stats column */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '$2.4B+', label: 'Assets Under Management' },
                { value: '128,000+', label: 'Active Investors' },
                { value: '60+', label: 'Countries Served' },
                { value: '5 Years', label: 'of Proven Returns' },
              ].map((stat, i) => (
                <Card key={i} variant="elevated" className="p-6 text-center">
                  <p className="font-display text-3xl font-bold text-accent-gold mb-1">
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-sm">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Our Principles
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              Values That Drive Every Decision
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <Card key={i} variant="elevated" className="p-7 group">
                  <div className="flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent-gold/10 flex items-center justify-center transition-colors group-hover:bg-accent-gold/20">
                      <Icon className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold text-lg mb-2">
                        {value.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg-secondary border-y border-border-default py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Getting Started
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              How VaultX Works
            </h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">
              From registration to your first monthly payout — here is what you can expect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <Card key={i} variant="elevated" className="p-7">
                <div className="flex gap-5">
                  <span className="font-display text-3xl font-bold text-accent-gold/30 flex-shrink-0 leading-none">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-text-primary font-semibold text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Leadership
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              The Team Behind VaultX
            </h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">
              Former institutional finance professionals and crypto pioneers, united by a shared mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Card key={i} variant="elevated" className="p-7 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent-gold/15 flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-accent-gold">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold text-lg">
                    {member.name}
                  </h3>
                  <p className="text-accent-gold text-xs font-semibold tracking-wide uppercase mt-1">
                    {member.role}
                  </p>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
