const testimonials = [
  {
    quote:
      'Rhema Feast completely transformed my walk with God. The worship was heaven-sent, and the teachings gave me practical tools for my business and family.',
    author: 'Michael T.',
    role: 'Entrepreneur, Ghana',
  },
  {
    quote:
      'I came broken and left restored. The atmosphere of God\'s presence at Rhema Feast is like nothing I\'ve ever experienced. I will never be the same.',
    author: 'Grace A.',
    role: 'Worship Leader, Nigeria',
  },
  {
    quote:
      'The Business Forum alone was worth the trip. I learned kingdom principles that completely shifted how I approach my work. See you in 2026!',
    author: 'David K.',
    role: 'Tech Founder, Kenya',
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[var(--brand-dark)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,111,212,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
            Testimonials
          </h2>
          <p className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            What People Are Saying
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
