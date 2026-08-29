export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '60px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Neuralabs</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>Websites que aumentam conversão usando Neuromarketing & IA</p>
      </header>

      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>O que fazemos</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
          Criamos websites premium que vendem. Combinamos design 3D, neuromarketing e psicologia do consumidor
          para criar experiências que convertem visitantes em clientes.
        </p>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Especialista: Bruna Borba</h2>
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

      <footer style={{ borderTop: '1px solid #ddd', paddingTop: '20px', textAlign: 'center', color: '#666' }}>
        <p>© 2026 Neuralabs - Onde Neurociência Vira Conversão</p>
      </footer>
    </main>
  );
}
