'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'When and where is Rhema Feast 2026?',
    a: 'Rhema Feast 2026 will take place from December 21–25, 2026 at the International Conference Center in Accra, Ghana.',
  },
  {
    q: 'How can I register?',
    a: 'Registration is available online through this website. Click the "Register Now" button and follow the prompts to secure your spot. Early-bird pricing is available until October 31st.',
  },
  {
    q: 'Is there a virtual attendance option?',
    a: 'Yes! Rhema Feast 2026 will be hybrid, with both in-person and virtual attendance options. Virtual attendees will have access to all main sessions via live stream.',
  },
  {
    q: 'What is the Business Forum?',
    a: 'The Business Forum is a specialized track within Rhema Feast focused on equipping entrepreneurs and professionals with kingdom principles for marketplace success.',
  },
  {
    q: 'Are there group discounts?',
    a: 'Yes, we offer discounted rates for groups of 10 or more. Contact our registration team at info@rhemafeast.org for more information.',
  },
  {
    q: 'What should I bring?',
    a: 'Bring your Bible, a notebook, and an open heart. If attending virtually, ensure you have a stable internet connection and a device capable of live streaming.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
            FAQ
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--brand-border)] bg-card transition-colors hover:border-[var(--brand-gold)]/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                    openIndex === i && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200',
                  openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-[var(--brand-border)] px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
