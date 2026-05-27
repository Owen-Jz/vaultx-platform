'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StartNowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const glowLayerRef = useRef<HTMLDivElement>(null)
  const headlineLine1Ref = useRef<HTMLDivElement>(null)
  const headlineLine2Ref = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Parallax on background image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Secondary parallax layer (gold glow)
    if (glowLayerRef.current) {
      gsap.to(glowLayerRef.current, {
        y: '-15%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }

    // Headline lines clip-mask reveal (enhanced with stagger)
    gsap.from([headlineLine1Ref.current, headlineLine2Ref.current], {
      y: '110%',
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    // Subtext + CTA fade up
    const fadeEls = [subtextRef.current, ctaRef.current].filter(Boolean)
    if (fadeEls.length > 0) {
      gsap.from(fadeEls, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }

    // CTA button hover glow
    const ctaBtn = sectionRef.current?.querySelector('.cta-btn') as HTMLElement | null
    if (ctaBtn) {
      const onEnter = () => gsap.to(ctaBtn, { scale: 1.05, boxShadow: '0 0 40px rgba(201,168,92,0.5)', duration: 0.3 })
      const onLeave = () => gsap.to(ctaBtn, { scale: 1, boxShadow: '0 0 24px rgba(201,168,92,0.2)', duration: 0.4 })
      ctaBtn.addEventListener('mouseenter', onEnter)
      ctaBtn.addEventListener('mouseleave', onLeave)
      return () => {
        ctaBtn.removeEventListener('mouseenter', onEnter)
        ctaBtn.removeEventListener('mouseleave', onLeave)
      }
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[70vh] flex items-center justify-center"
    >
      {/* Background image with parallax wrapper */}
      <div ref={imageRef} className="absolute inset-0 scale-110 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="City skyline financial district"
          fill
          className="object-cover"
          priority={false}
          sizes="100vw"
        />
      </div>

      {/* Secondary parallax layer — gold glow */}
      <div
        ref={glowLayerRef}
        className="absolute inset-0 scale-110 will-change-transform pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,92,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-primary/75" />

      {/* Secondary gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,92,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <p className="text-accent-gold text-xs font-semibold tracking-widest uppercase mb-6">
          Start Today
        </p>

        {/* Headline with clip-mask reveal */}
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6">
          <div className="overflow-hidden">
            <div ref={headlineLine1Ref}>Ready to Grow</div>
          </div>
          <div className="overflow-hidden">
            <div ref={headlineLine2Ref}>Your Wealth?</div>
          </div>
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-text-secondary text-lg max-w-md mx-auto mb-10"
        >
          Join 128,000+ investors who trust VaultX. No hidden fees. Withdraw anytime.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col items-center gap-4">
          <Link
            href="/auth/signup"
            className="cta-btn inline-flex items-center gap-2 bg-accent-gold text-bg-primary font-semibold px-10 py-4 rounded-full text-lg hover:bg-accent-gold-light transition-colors duration-200"
          >
            Create Free Account →
          </Link>
          <p className="text-text-muted text-sm">No minimum commitment. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}
