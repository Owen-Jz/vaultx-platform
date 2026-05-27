export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-bg-secondary relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-radial-gold" />
        {/* Decorative glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl font-bold text-accent-gold mb-4">VaultX</h1>
          <p className="text-text-secondary text-lg">Institutional Crypto Investment</p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-left">
            {['$2.4B+ Managed', '128K+ Investors', '99.9% Uptime', '4.8★ Rating'].map((s) => (
              <div
                key={s}
                className="bg-bg-elevated/50 rounded-lg p-3 border border-border-default"
              >
                <p className="text-accent-gold font-semibold text-sm">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-bg-primary">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
