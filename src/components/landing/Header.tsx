'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'Business Forum', href: '#business-forum' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--brand-border)] bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/rf-logo.png"
            alt="Rhema Feast"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Rhema <span className="text-[var(--brand-gold)]">Feast</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button render={<a href="#register" />} size="sm">
            Register Online
          </Button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-[var(--brand-border)] bg-background transition-all duration-300 md:hidden',
          open ? 'max-h-80' : 'max-h-0',
        )}
      >
        <nav className="flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button render={<a href="#register" onClick={() => setOpen(false)} />} size="sm" className="mt-2">
            Register Online
          </Button>
        </nav>
      </div>
    </header>
  )
}
