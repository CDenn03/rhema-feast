import { Button } from '@/components/ui/button'

const forumHighlights = [
  'Kingdom Economics & Stewardship',
  'Building God-Centered Startups',
  'Marketplace Ministry & Influence',
  'Wealth Creation for Kingdom Impact',
  'Networking with Global Leaders',
]

export function BusinessForumSection() {
  return (
    <section className="bg-[#faf8f5] py-24 dark:bg-[var(--brand-dark)]/80 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
              Business Forum
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Marketplace With a Mission
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Rhema Feast Business Forum is a dedicated track for
              entrepreneurs, professionals, and aspiring business leaders.
              Discover how to build ventures rooted in biblical principles and
              positioned for supernatural success.
            </p>

            <ul className="mt-8 space-y-3">
              {forumHighlights.map((item) => (
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
