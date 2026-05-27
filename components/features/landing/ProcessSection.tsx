'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  number: string
  title: string
  description: string
  image: string
  imageAlt: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Create Your Account',
    description:
      'Sign up in minutes with bank-grade security. Verify your identity once and access our full suite of investment tools instantly.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Account creation dashboard',
  },
  {
    number: '02',
    title: 'Choose Your Investment Plan',
    description:
      'Select from Starter, Growth, or Elite tiers. Each plan offers transparent monthly returns, no hidden fees, and dedicated portfolio management.',
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Investment plan selection',
  },
  {
    number: '03',
    title: 'Watch Your Portfolio Grow',
    description:
      'Receive monthly profit credits directly to your account. Track performance in real-time with our institutional-grade analytics dashboard.',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Portfolio analytics dashboard',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressLineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      steps.forEach((step, index) => {
        const isEven = index % 2 === 1
        const contentEl = contentRefs.current[index]
        const imageEl = imageRefs.current[index]
        const numberEl = numberRefs.current[index]

        // Enhanced background number animation
        if (numberEl) {
          gsap.from(numberEl, {
            opacity: 0,
            scale: 0.6,
            y: 30,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: stepRefs.current[index],
              start: 'top 75%',
              once: true,
            },
          })
        }

        // Content slides in from left (or right if even on desktop)
        if (contentEl) {
          gsap.from(contentEl, {
            x: isEven ? 40 : -40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepRefs.current[index],
              start: 'top 75%',
              once: true,
            },
          })
        }

        // Image slides in from the opposite side
        if (imageEl) {
          gsap.from(imageEl, {
            x: isEven ? -40 : 40,
            opacity: 0,
            duration: 0.9,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepRefs.current[index],
              start: 'top 75%',
              once: true,
            },
          })
        }

        // Connector divider line draws across
        const dividerEl = dividerRefs.current[index]
        if (dividerEl) {
          gsap.from(dividerEl, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: dividerEl,
              start: 'top 85%',
              scrub: 1,
            },
          })
        }
      })

      // Scroll-scrubbed vertical progress bar
      if (progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-bg-primary py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 sm:mb-24">
          <p className="text-accent-gold text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] tracking-tight">
            Three Steps to
            <br />
            <span className="text-accent-gold">Institutional Returns</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col">
          {/* Vertical progress line (desktop only) */}
          <div className="hidden lg:block absolute left-0 top-0 w-px h-full bg-border-default">
            <div
              ref={progressLineRef}
              className="w-full bg-accent-gold origin-top"
              style={{ height: '0%' }}
            />
          </div>
          {steps.map((step, index) => {
            const isEven = index % 2 === 1

            return (
              <div key={step.number}>
                {/* Step row */}
                <div
                  ref={(el) => { stepRefs.current[index] = el }}
                  className={[
                    'flex flex-col gap-10 lg:gap-0 lg:grid lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16 py-16 sm:py-20',
                    isEven ? 'lg:[direction:rtl]' : '',
                  ].join(' ')}
                >
                  {/* Content side */}
                  <div
                    ref={(el) => { contentRefs.current[index] = el }}
                    className={[
                      'relative',
                      isEven ? 'lg:[direction:ltr]' : '',
                    ].join(' ')}
                  >
                    {/* Giant background number — purely decorative */}
                    <span
                      ref={(el) => { numberRefs.current[index] = el }}
                      aria-hidden="true"
                      className="absolute -top-8 -left-4 sm:-left-6 font-display text-8xl sm:text-9xl font-bold text-border-default select-none pointer-events-none leading-none"
                      style={{ opacity: 0.6 }}
                    >
                      {step.number}
                    </span>

                    {/* Content — sits on top of the number */}
                    <div className="relative z-10 pt-10 sm:pt-14">
                      {/* Step label */}
                      <p className="text-accent-gold text-xs font-semibold tracking-widest uppercase mb-3">
                        Step {step.number}
                      </p>

                      {/* Step title */}
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-4 leading-tight">
                        {step.title}
                      </h3>

                      {/* Step description */}
                      <p className="text-text-secondary text-base leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Image side */}
                  <div
                    ref={(el) => { imageRefs.current[index] = el }}
                    className={[
                      'relative rounded-2xl overflow-hidden aspect-video',
                      isEven ? 'lg:[direction:ltr]' : '',
                    ].join(' ')}
                  >
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                    {/* Dark overlay gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(10,12,16,0.3) 0%, rgba(10,12,16,0.1) 60%, transparent 100%)',
                      }}
                    />
                    {/* Subtle gold corner accent */}
                    <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-accent-gold/60 to-transparent" />
                    <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-accent-gold/60 to-transparent" />
                  </div>
                </div>

                {/* Connector divider — shown between steps, not after the last */}
                {index < steps.length - 1 && (
                  <div
                    ref={(el) => { dividerRefs.current[index] = el }}
                    className="border-t border-border-default w-full origin-left"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
