import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";

const testimonies = [
  {
    quote:
      "It is an opportune window where those with eyes to see and the discernment to perceive can apprehend the intangible: graces, mantles, and above all, God Himself.",
    author: "Apostle Jonathan Male",
    role: "Kampala, Uganda",
  },
  {
    quote:
      "So impactful. Different graces yet so in sync. Jesus was revealed. Looking forward to the continuous execution of this move.",
    author: "Timam",
    role: "Hip-Hop Minister, Nairobi, Kenya",
  },
  {
    quote:
      "The Rhema Feast Business Forum gave me practical kingdom principles that completely transformed how I run my business. The networking was invaluable.",
    author: "Sarah W.",
    role: "Entrepreneur, Nairobi, Kenya",
  },
  {
    quote:
      "I came seeking a fresh encounter with God and left forever changed. The worship, the word, the atmosphere — heaven touched earth.",
    author: "Pastor David O.",
    role: "Nakuru, Kenya",
  },
  {
    quote:
      "Bringing our youth group to Rhema Feast was the best decision. The young people were deeply impacted by the teaching and worship.",
    author: "Minister Grace A.",
    role: "Youth Leader, Mombasa, Kenya",
  },
];

export const metadata: Metadata = {
  title: "Testimonies | Rhema Feast 2026",
  description: "Hear what people are saying about Rhema Feast — transformative testimonies from past gatherings.",
};

export default function TestimoniesPage() {
  return (
    <div className="space-y-24 py-24">
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
              Testimonies
            </h1>
            <p className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Transformative Experiences
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear what people are saying about Rhema Feast. Lives changed,
                destinies transformed, and encounters with the living God.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonies.map((t) => (
              <div
                key={t.author}
                className="group relative rounded-2xl border border-[var(--brand-border)] bg-card p-8 transition-all duration-300 hover:border-[var(--brand-gold)]/30 hover:shadow-lg"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                    />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 border-t border-[var(--brand-border)] pt-4">
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark)] via-[#1a1838] to-[var(--brand-dark)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,156,4,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Share Your Testimony
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Has Rhema Feast impacted your life? We&apos;d love to hear your
            story.
          </p>
          <Link
            href="/testify"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-dark)] transition-colors hover:bg-[var(--brand-gold)]/90"
          >
            Share Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
