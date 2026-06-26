import { Button } from '@/components/ui/button'
import { Clock, MapPin } from 'lucide-react'

const focusAreas = [
  'Kingdom Finance & Wealth Deployment',
  'Socio-Economic Systems Penetration',
  'Organizational Leadership & Marketplace Succession Planning',
]

export function BusinessForumSection() {
  return (
    <section id="business-forum" className="bg-[#faf8f5] py-24 dark:bg-[var(--brand-dark)]/80 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
              Business Forum
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Business Forum 2026
            </p>
            <p className="mt-2 text-base font-medium text-[var(--brand-gold)]">
              Marketplace Alignment &amp; Economic Strategy
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Get the best marketplace value at the Business Forum. It is the
              tactical gathering of elite, Kingdom-based individuals, business
              owners, investors, and future financial pillars.
            </p>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--brand-gold)]" />
                August 31, 2026 &middot; 8:00 AM &ndash; 7:00 PM
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--brand-gold)]" />
                Business Forum Tents, Uhuru Park Gardens
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {focusAreas.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-gold)]/10 text-xs text-[var(--brand-gold)]">
                    ✓
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              render={<a href="#register" />}
              className="mt-8 bg-[var(--brand-gold)] text-[var(--brand-dark)] hover:bg-[var(--brand-gold)]/90"
            >
              Join the Forum
            </Button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-dark)] to-[var(--brand-purple)]/40">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-white/50">
                Business Forum Image Placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
