'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  q: string
  a: string
}

interface FAQCategory {
  name: string
  questions: FAQItem[]
}

const categories: FAQCategory[] = [
  {
    name: 'Business Forum',
    questions: [
      {
        q: 'Can I get a refund for my business forum ticket?',
        a: 'With prior notice, this can be organized and processed through our admin desk.',
      },
      {
        q: 'When is the business forum taking place?',
        a: 'It is happening on the opening day of the gathering, August 31st, 2026, running from 8:00 AM to 7:00 PM.',
      },
      {
        q: 'Will the business forum ticket earn me good seating?',
        a: 'Yes, Business Forum ticketing includes allocated premium access seating structures within designated zones.',
      },
      {
        q: 'What topics will be covered at the conference?',
        a: 'The sessions specifically tackle strategic deployment of Kingdom wealth, economic structural design, and maintaining deep spiritual competency while leading global institutions.',
      },
    ],
  },
  {
    name: 'General Assembly',
    questions: [
      {
        q: 'What documentation is required for registration clearance?',
        a: 'For the security and integrity of our meetings, we require proper government-issued identification documents during badge clearance.',
      },
    ],
  },
]

export function FAQSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))
  }

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

        <div className="mt-14 space-y-10">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.questions.map((faq, i) => {
                  const key = `${category.name}-${i}`
                  const isOpen = openMap[key]
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-[var(--brand-border)] bg-card transition-colors hover:border-[var(--brand-gold)]/20"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          'grid transition-all duration-200',
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="border-t border-[var(--brand-border)] px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
