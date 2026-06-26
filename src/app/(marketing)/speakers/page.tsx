import type { Metadata } from "next";

const speakers = [
  {
    name: "Reverend Julian Kyula",
    role: "Visionary Host & Founder, Ruach Assembly",
    origin: "Nairobi, Kenya",
    bio: "Visionary leader and founder of Ruach Assembly (formerly The Purpose Centre Church). Reverend Julian Kyula is the host of Rhema Feast, committed to sharing the unadulterated word of God to the nations.",
  },
  {
    name: "Apostle Joshua Selman",
    role: "Guest Apostolic Minister",
    origin: "Nigeria",
    bio: "Founder of Koinonia Global, a ministry dedicated to raising believers with apostolic consciousness and spiritual understanding. His teachings have impacted millions across Africa and beyond.",
  },
  {
    name: "Pastor Nathaniel Bassey",
    role: "Worship Leader & Music Minister",
    origin: "Nigeria",
    bio: "A globally renowned worship leader, gospel musician, and author. Known for his prophetic worship style and the annual #HallelujahChallenge, he leads multitudes into deep encounters with God through worship.",
  },
  {
    name: "Bishop J.B. Masinde",
    role: "Fathers of the Faith Speaker Panel",
    origin: "Kenya",
    bio: "A seasoned bishop and father in the faith with decades of ministry experience. He brings deep spiritual wisdom and apostolic insight to the Body of Christ.",
  },
  {
    name: "Apostle William Kimani",
    role: "Fathers of the Faith Speaker Panel",
    origin: "Kenya",
    bio: "An esteemed apostle and spiritual father known for his commitment to sound doctrine, church planting, and raising leaders for Kingdom advancement across East Africa.",
  },
];

export const metadata: Metadata = {
  title: "Speakers | Rhema Feast 2026",
  description: "Meet the ministers and key speakers ministering at Rhema Feast 2026 in Nairobi, Kenya.",
};

export default function SpeakersPage() {
  return (
    <div className="space-y-24 py-24">
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
              Speakers
            </h1>
            <p className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Ministers &amp; Key Speakers
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Anointed men and women of God ministering at Rhema Feast 2026 in
              Uhuru Park, Nairobi. A diverse lineup of apostolic ministers,
              worship leaders, and fathers of the faith.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {speakers.map((speaker, i) => (
              <div
                key={speaker.name}
                className="grid items-center gap-8 rounded-2xl border border-[var(--brand-border)] bg-card p-8 lg:grid-cols-[200px_1fr] lg:gap-12"
              >
                <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-[var(--brand-gold)]/20 to-[var(--brand-purple)]/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--brand-gold)]">
                    {speaker.name.split(" ").pop()?.[0]}
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-2xl font-bold text-foreground">
                      {speaker.name}
                    </h2>
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--brand-gold)]">
                      {speaker.origin}
                    </span>
                  </div>
                  <p className="mt-1 text-base font-medium text-muted-foreground">
                    {speaker.role}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {speaker.bio}
                  </p>
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
            Don&apos;t Miss This Apostolic Gathering
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Join thousands of believers at Uhuru Park, Nairobi from August 31
            to September 4, 2026.
          </p>
          <a
            href="/#register"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-dark)] transition-colors hover:bg-[var(--brand-gold)]/90"
          >
            Register Free Today
          </a>
        </div>
      </section>
    </div>
  );
}
