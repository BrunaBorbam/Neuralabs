import { Hero } from '@/components/Hero';
import { Pillars } from '@/components/Pillars';

export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif' }}>
      <Hero />
      <Pillars />

      <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', background: '#0A0E27' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#fff' }}>Especialista: Bruna Borba</h2>
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Design Expert em Neuromarketing</h3>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            Especialista em psicologia do consumidor, design premium e websites que vendem.
            Trabalha com estratégia de conversão, urgência visual e social proof.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Fale com ela: WhatsApp | Email
          </p>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 40px', textAlign: 'center', color: '#94A3B8', background: '#0A0E27' }}>
        <p>© 2026 Neuralabs - Onde Neurociência Vira Conversão</p>
      </footer>
    </main>
  );
}
