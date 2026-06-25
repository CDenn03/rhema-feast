'use client'

import { useState, useEffect } from 'react'

function calcTimeLeft() {
  const target = new Date('2026-08-31T00:00:00')
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownSection() {
  const [time, setTime] = useState(calcTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const blocks = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark)] via-[#1a1838] to-[var(--brand-dark)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,156,4,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
          Countdown
        </h2>
        <p className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          The Feast Is Drawing Near
        </p>

        <div className="mt-12 grid grid-cols-4 gap-3 sm:gap-6">
          {blocks.map((block) => (
            <div
              key={block.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-2 py-6 backdrop-blur-sm sm:py-8"
            >
              <div className="text-3xl font-bold text-[var(--brand-gold)] sm:text-5xl">
                {String(block.value).padStart(2, '0')}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-white/40 sm:text-sm">
                {block.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
