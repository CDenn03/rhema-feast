import { Button } from '@/components/ui/button'

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-gold)]/20 to-[var(--brand-purple)]/20">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
                About Image Placeholder
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
              About
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A Divine Encounter Awaits
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Rhema Feast is an annual gathering that brings together believers,
              entrepreneurs, creatives, and leaders from around the world for
              five days of transformative worship, the Word, and practical
              wisdom. Our mission is to equip and empower God&apos;s people to
              walk in their full destiny.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              This year&apos;s theme, &ldquo;Unveiling His Glory,&rdquo; invites
              you into a deeper revelation of who God is and who He has called
              you to be. Through dynamic worship, prophetic teaching, business
              forums, and community outreach, Rhema Feast 2026 promises to be a
              landmark event.
            </p>
            <Button
              render={<a href="#register" />}
              className="mt-8 bg-[var(--brand-gold)] text-[var(--brand-dark)] hover:bg-[var(--brand-gold)]/90"
            >
              Get Your Tickets
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
