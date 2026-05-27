import type { Metadata } from 'next'
import { Sora, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/lib/smooth-scroll'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VaultX — Crypto Investment Platform',
  description: 'Institutional crypto investment strategies for serious investors.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${dmSans.variable} ${jetbrains.variable} bg-bg-primary text-text-primary font-body antialiased min-h-screen`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
