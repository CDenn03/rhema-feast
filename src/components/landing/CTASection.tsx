import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section id="register" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark)] via-[#1a1838] to-[var(--brand-dark)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,156,4,0.1)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Don&apos;t Miss This Divine Appointment
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
          Secure your place at Rhema Feast 2026. Early-bird pricing ends October
          31st — register today and step into your destiny.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={<a href="#" />}
            size="lg"
            className="bg-[var(--brand-gold)] text-[var(--brand-dark)] hover:bg-[var(--brand-gold)]/90"
          >
            Register Now
          </Button>
          <Button
            render={<a href="#" />}
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  )
}
