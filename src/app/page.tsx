import { Header } from '@/components/landing/Header'
import { HeroSection } from '@/components/landing/HeroSection'
import { AboutSection } from '@/components/landing/AboutSection'
import { PillarsSection } from '@/components/landing/PillarsSection'
import { BusinessForumSection } from '@/components/landing/BusinessForumSection'
import { CountdownSection } from '@/components/landing/CountdownSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PillarsSection />
        <BusinessForumSection />
        <CountdownSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
