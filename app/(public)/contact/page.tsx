'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import { Button, Card } from '@/components/ui'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI-only: show success state
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border-default text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/30 transition-colors text-sm'

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(201,168,92,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-5">
            Contact VaultX
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Have questions about our investment plans, your account, or anything else? Our team is available 24/7.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card variant="elevated" className="p-7">
              <h2 className="font-display text-lg font-bold text-text-primary mb-6">
                Contact Information
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-wide font-semibold mb-1">Email</p>
                    <a
                      href="mailto:support@vaultx.io"
                      className="text-text-secondary text-sm hover:text-accent-gold transition-colors"
                    >
                      support@vaultx.io
                    </a>
                    <br />
                    <a
                      href="mailto:invest@vaultx.io"
                      className="text-text-secondary text-sm hover:text-accent-gold transition-colors"
                    >
                      invest@vaultx.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-wide font-semibold mb-1">Phone</p>
                    <a
                      href="tel:+18005551234"
                      className="text-text-secondary text-sm hover:text-accent-gold transition-colors block"
                    >
                      +1 (800) 555-1234
                    </a>
                    <a
                      href="tel:+18005555678"
                      className="text-text-secondary text-sm hover:text-accent-gold transition-colors block"
                    >
                      +1 (800) 555-5678
                    </a>
                    <p className="text-text-muted text-xs mt-1">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-wide font-semibold mb-1">Address</p>
                    <p className="text-text-secondary text-sm">
                      VaultX Financial Ltd.<br />
                      1 Canada Square, Floor 42<br />
                      London E14 5AB, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="elevated" className="p-7">
              <h3 className="font-semibold text-text-primary mb-3">Office Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Monday – Friday</span>
                  <span className="text-text-secondary">8am – 8pm GMT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Saturday</span>
                  <span className="text-text-secondary">10am – 4pm GMT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Sunday</span>
                  <span className="text-text-secondary">Emergency only</span>
                </div>
                <p className="text-text-muted text-xs pt-2 border-t border-border-default">
                  Digital support is available 24/7 through your dashboard.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <Card variant="elevated" className="p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <div className="w-16 h-16 rounded-full bg-status-success/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-status-success" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                      Message Sent
                    </h3>
                    <p className="text-text-secondary text-sm max-w-sm">
                      Thank you for reaching out. Our team will respond within 24 hours, usually sooner.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-lg font-bold text-text-primary mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-text-muted text-xs font-semibold uppercase tracking-wide">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jonathan Mercer"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-text-muted text-xs font-semibold uppercase tracking-wide">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-text-muted text-xs font-semibold uppercase tracking-wide">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="investment">Investment Plans</option>
                        <option value="account">Account Support</option>
                        <option value="withdrawal">Withdrawal Help</option>
                        <option value="security">Security Concern</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-text-muted text-xs font-semibold uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                        className={inputClass + ' resize-none'}
                      />
                    </div>

                    <Button type="submit" variant="primary" size="md" className="self-start">
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
