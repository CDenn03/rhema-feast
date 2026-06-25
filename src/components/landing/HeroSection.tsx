import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)] via-[#1a1838] to-[var(--brand-dark)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(223,156,4,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,111,212,0.08)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-block rounded-full border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
          Aug 31 &ndash; Sep 4, 2026
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Rhema{' '}
          <span className="bg-gradient-to-r from-[var(--brand-gold)] to-[#f5b82e] bg-clip-text text-transparent">
            Feast
          </span>{' '}
          2026
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
          A gathering of faith, business, worship, and community — where heaven
          and purpose collide. Experience the transformative power of God&apos;s
          Word in a five-day encounter.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={<a href="#register" />}
            size="lg"
            className="bg-[var(--brand-gold)] text-[var(--brand-dark)] hover:bg-[var(--brand-gold)]/90"
          >
            Register Now
          </Button>
          <Button render={<a href="#about" />} size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 text-center">
          {[
            { label: 'Days', value: '5' },
            { label: 'Speakers', value: '20+' },
            { label: 'Nations', value: '10+' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[var(--brand-gold)] sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
