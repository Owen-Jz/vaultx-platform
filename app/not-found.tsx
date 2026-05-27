import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center text-center px-4">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,92,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-5">
        <span className="font-display text-9xl font-bold text-accent-gold leading-none select-none">
          404
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
          Page Not Found
        </h1>
        <p className="text-text-secondary text-base max-w-sm">
          The page you are looking for does not exist or has been moved. Let us get you back on track.
        </p>
        <Link href="/">
          <Button variant="primary" size="md">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
