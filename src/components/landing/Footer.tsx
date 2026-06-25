import Image from 'next/image'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Pillars', href: '#pillars' },
      { label: 'Speakers', href: '#speakers' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Email Us', href: 'mailto:info@rhemafeast.org' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Partner With Us', href: '#' },
      { label: 'Volunteer', href: '#' },
      { label: 'Prayer Requests', href: '#' },
      { label: 'Contact', href: '#' },
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
              An annual gathering of faith, business, worship, and community —
              equipping God&apos;s people for their divine purpose.
            </p>
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
          &copy; {new Date().getFullYear()} Rhema Feast. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
