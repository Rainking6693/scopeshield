import { Navigation } from '@/components/landing/navigation';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { CTA } from '@/components/landing/cta';
import { Pricing } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <CTA />
      <Pricing />
      <Footer />
    </main>
  );
}