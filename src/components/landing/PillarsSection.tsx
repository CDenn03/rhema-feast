import { Cross, Briefcase, Music, Heart } from 'lucide-react'

const pillars = [
  {
    icon: Cross,
    title: 'Faith & Spirituality',
    description:
      'Deepen your relationship with God through powerful worship, prayer, and the uncompromised teaching of the Word.',
  },
  {
    icon: Briefcase,
    title: 'Business & Entrepreneurship',
    description:
      'Learn kingdom principles for marketplace success and discover how to build ventures that honor God.',
  },
  {
    icon: Music,
    title: 'Worship & The Arts',
    description:
      'Experience the beauty of creative expression as a gateway to God\'s presence through music, dance, and drama.',
  },
  {
    icon: Heart,
    title: 'Community & Service',
    description:
      'Connect with a global family of believers and participate in outreach that transforms lives and communities.',
  },
]

export function PillarsSection() {
  return (
    <section
      id="pillars"
      className="relative py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[var(--brand-dark)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,156,4,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
            Our Pillars
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Four Core Foundations
          </p>
          <p className="mt-4 text-base text-white/60">
            Every aspect of Rhema Feast is built on these four pillars, creating
            a holistic experience for spirit, soul, and body.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-[var(--brand-gold)]/30 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] transition-colors group-hover:bg-[var(--brand-gold)]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
