import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Features } from '@/components/Features'
import { UseCases } from '@/components/UseCases'
import { Pricing } from '@/components/Pricing'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary relative">
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <HowItWorks />
        <UseCases />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </main>
  )
}
