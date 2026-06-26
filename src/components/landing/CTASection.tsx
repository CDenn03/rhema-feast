import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Handshake, Truck, Star, Gift, Mail } from 'lucide-react'

const actions = [
  {
    title: 'Become a Partner',
    description: 'Join us as a sponsor or strategic partner.',
    href: '/partner/register',
    icon: Handshake,
  },
  {
    title: 'Register as Vendor',
    description: 'Reserve your booth or vendor slot.',
    href: '/vendor/register',
    icon: Truck,
  },
  {
    title: 'Share Testimony',
    description: 'Tell us how Rhema Feast impacted you.',
    href: '/testify',
    icon: Star,
  },
  {
    title: 'Give',
    description: 'Support the vision with your offering.',
    href: '/give',
    icon: Gift,
  },
]

export function CTASection() {
  return (
    <section id="register" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark)] via-[#1a1838] to-[var(--brand-dark)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,156,4,0.1)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Position Yourself for Real Alignment
          </h2>
          <p className="mt-4 text-base text-white/60">
            We are committed to giving you the absolute best experience. Join
            thousands of believers globally gathering in the heart of Nairobi.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-[var(--brand-gold)]/30 hover:bg-white/10"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] transition-colors group-hover:bg-[var(--brand-gold)]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  {action.description}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<Link href="/events" />}
              size="lg"
              className="bg-[var(--brand-gold)] text-[var(--brand-dark)] hover:bg-[var(--brand-gold)]/90"
            >
              Register Free Today
            </Button>
            <Button
              render={<Link href="#about" />}
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/40">
            <Mail className="h-4 w-4" />
            If you have any questions or concerns, please drop us an email at{' '}
            <a
              href="mailto:testimony@ruachassembly.org"
              className="text-[var(--brand-gold)] hover:underline"
            >
              testimony@ruachassembly.org
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
