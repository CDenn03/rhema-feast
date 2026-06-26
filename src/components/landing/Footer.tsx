import Image from 'next/image'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About Us', href: '#about' },
      { label: 'Pillars', href: '#pillars' },
      { label: 'Business Forum', href: '#business-forum' },
      { label: 'Speakers', href: '#speakers' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Register Online', href: '/events' },
      { label: 'Become a Partner', href: '/partner/register' },
      { label: 'Vendor Registration', href: '/vendor/register' },
      { label: 'Share Testimony', href: '/testify' },
      { label: 'Give', href: '/give' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Facebook', href: 'https://facebook.com/RuachAssemblies' },
      { label: 'Twitter', href: 'https://twitter.com/pcchurchnbi' },
      { label: 'Instagram', href: 'https://instagram.com/Ruachassemblies' },
      { label: 'Email Us', href: 'mailto:testimony@ruachassembly.org' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--brand-border)] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/rf-logo.png"
                alt="Rhema Feast"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="text-base font-bold text-foreground">
                Rhema <span className="text-[var(--brand-gold)]">Feast</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An Apostolic movement sharing the unadulterated and authentic word
              of God to the nations and to all generations.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Ruach Assemblies / Purpose Centre Church
            </p>
            <div className="mt-4 rounded-xl border border-[var(--brand-border)] bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-gold)]">
                Give via M-Pesa
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">Paybill: 4075905</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Account: Tithe, Offering, First Fruit, or Partnership
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Or text &ldquo;Partner&rdquo; to 22799
              </p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-[var(--brand-gold)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--brand-border)] pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Rhema Feast. All Rights Reserved.
          &middot; Ruach Assemblies / Purpose Centre Church
        </div>
      </div>
    </footer>
  )
}
