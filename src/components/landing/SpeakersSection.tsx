const speakers = [
  {
    name: 'Pastor John Smith',
    role: 'Senior Pastor, Grace Cathedral',
    topic: 'Unveiling His Glory',
  },
  {
    name: 'Dr. Sarah Johnson',
    role: 'CEO, Kingdom Ventures',
    topic: 'Kingdom Business Principles',
  },
  {
    name: 'Minister David Mensah',
    role: 'Worship Leader & Psalmist',
    topic: 'The Sound of Heaven',
  },
  {
    name: 'Prophetess Mary Osei',
    role: 'Founder, Prayer City',
    topic: 'Secrets of the Secret Place',
  },
  {
    name: 'Apostle Peter Adebayo',
    role: 'President, Africa Harvest Mission',
    topic: 'The Great Commission Now',
  },
  {
    name: 'Dr. Esther Kim',
    role: 'Director, Global Leadership Institute',
    topic: 'Raising Kingdom Leaders',
  },
]

export function SpeakersSection() {
  return (
    <section id="speakers" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
            Speakers
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Anointed Voices
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            Hear from a diverse lineup of prophetic voices, marketplace leaders,
            and worship ministers from across the globe.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="group rounded-2xl border border-[var(--brand-border)] bg-card p-6 transition-all duration-300 hover:border-[var(--brand-gold)]/30 hover:shadow-lg"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[var(--brand-gold)]/20 to-[var(--brand-purple)]/20">
                <div className="flex h-full items-center justify-center">
                  <span className="text-xs text-muted-foreground">Photo</span>
                </div>
              </div>
              <h3 className="mt-5 text-center text-lg font-semibold text-foreground">
                {speaker.name}
              </h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {speaker.role}
              </p>
              <div className="mt-4 rounded-lg bg-[var(--brand-gold)]/5 px-3 py-2 text-center text-xs font-medium text-[var(--brand-gold)]">
                {speaker.topic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
