export function AboutSection() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-gold)]/20 to-[var(--brand-purple)]/20">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
                About Image Placeholder
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-gold)]">
              About
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What is Rhema Feast?
            </p>
            <p className="mt-2 text-base font-medium text-[var(--brand-gold)]">
              A Move of God, Not Just a Gathering
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Rhema Feast (RF) is an Apostolic movement whose mission is to
              share the unadulterated and authentic word of God to the nations
              and to all generations by releasing consistent value through
              in-person meetings, social media, and broadcasting media, for the
              Glory of Yahweh, and the advancement of His Kingdom.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Host church: Ruach Assembly (formerly The Purpose Centre Church)
              led by Reverend Julian Kyula.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
