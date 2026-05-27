const stats = [
  {
    value: '$2.4B+',
    label: 'Assets Under Management',
  },
  {
    value: '128,000+',
    label: 'Active Investors',
  },
  {
    value: '99.9%',
    label: 'Platform Uptime',
  },
  {
    value: '4.8/5',
    label: 'User Rating',
  },
]

export default function StatsSection() {
  return (
    <section className="bg-bg-secondary border-y border-border-default py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2">
              <span className="font-display text-4xl lg:text-5xl font-bold text-accent-gold">
                {stat.value}
              </span>
              <span className="text-text-muted text-sm font-medium leading-tight max-w-[120px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
