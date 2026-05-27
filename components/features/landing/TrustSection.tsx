'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Zap, Lock, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: '256-bit AES Encryption',
    description:
      'Bank-grade encryption protects every transaction. Cold storage holds 95% of assets offline, beyond reach of any online threat.',
  },
  {
    icon: Zap,
    title: 'Sub-Second Transaction Processing',
    description:
      'Our infrastructure processes thousands of transactions per second. Deposits reflect in minutes, withdrawals on demand.',
  },
  {
    icon: Lock,
    title: 'Multi-Signature Wallets',
    description:
      'Every asset is protected by multi-sig protocols requiring multiple authorization layers before any movement.',
  },
  {
    icon: Award,
    title: 'Regulatory Compliance',
    description:
      'Operating under international financial frameworks with full KYC/AML compliance and institutional-grade auditing.',
  },
]

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageColRef = useRef<HTMLDivElement>(null)
  const statCardRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Left image column slides in from left
      gsap.from(imageColRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Stat card fades up with a slight delay
      gsap.from(statCardRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Feature items stagger up from right
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll('.feature-item')
        gsap.from(items, {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        })
      }

      // Section header scroll-triggered reveal
      gsap.from(headerRef.current?.querySelectorAll('p, h2, p:last-child') ?? [], {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Magnetic icon hover on feature items
      const cleanups: Array<() => void> = []

      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll('.feature-item')
        items.forEach((item) => {
          const iconEl = item.querySelector('div') as HTMLElement | null
          if (!iconEl) return

          const onEnter = () => {
            gsap.to(iconEl, {
              scale: 1.2,
              rotation: 10,
              backgroundColor: 'rgba(201,168,92,0.25)',
              duration: 0.25,
              ease: 'power2.out',
            })
            gsap.to(item, { x: 4, duration: 0.25 })
          }
          const onLeave = () => {
            gsap.to(iconEl, {
              scale: 1,
              rotation: 0,
              backgroundColor: 'rgba(201,168,92,0.1)',
              duration: 0.35,
              ease: 'elastic.out(1, 0.5)',
            })
            gsap.to(item, { x: 0, duration: 0.35 })
          }

          item.addEventListener('mouseenter', onEnter)
          item.addEventListener('mouseleave', onLeave)
          cleanups.push(() => {
            item.removeEventListener('mouseenter', onEnter)
            item.removeEventListener('mouseleave', onLeave)
          })
        })
      }

      return () => {
        cleanups.forEach((fn) => fn())
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-bg-secondary py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-accent-gold text-xs font-semibold tracking-widest uppercase mb-3">
            BUILT FOR TRUST
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Security Without Compromise
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto text-base leading-relaxed">
            Every layer of VaultX is engineered to institutional standards — so your capital is protected while your wealth compounds.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Image */}
          <div ref={imageColRef} className="relative rounded-2xl overflow-hidden h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
              alt="Secure financial infrastructure"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10]/60 to-transparent" />

            {/* Glass morphism stat card */}
            <div
              ref={statCardRef}
              className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: 'rgba(24, 27, 34, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 168, 92, 0.18)',
              }}
            >
              {/* Green pulse dot */}
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <p className="text-text-muted text-xs leading-none mb-0.5">Assets Secured</p>
                <p className="text-text-primary font-semibold text-sm font-mono">$2.4B+</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Feature list */}
          <div ref={featuresRef} className="flex flex-col">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon
              const isLast = index === trustFeatures.length - 1
              return (
                <div
                  key={index}
                  className={`feature-item flex items-start gap-5 py-6 ${
                    !isLast ? 'border-b border-border-subtle' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-gold" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-text-primary font-semibold text-base leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
