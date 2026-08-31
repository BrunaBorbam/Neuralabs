import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Pillars } from '@/components/Pillars';
import { Verticals } from '@/components/Verticals';
import { InteractiveComparison } from '@/components/InteractiveComparison';
import { Calculator } from '@/components/Calculator';
import { Pricing } from '@/components/Pricing';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Verticals />
        <InteractiveComparison />
        <Calculator />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
