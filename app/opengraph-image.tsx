import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Neuralabs — Onde Neurociência Vira Conversão';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(circle at 78% 18%, rgba(216,194,184,0.22), transparent 55%), radial-gradient(circle at 8% 92%, rgba(216,194,184,0.12), transparent 45%), #0B0A0E',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: '2px solid #D8C2B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              color: '#D8C2B8',
            }}
          >
            N
          </div>
          <div style={{ fontSize: 26, letterSpacing: 4, color: '#FAF7F2', fontWeight: 700 }}>
            NEURALABS
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 980 }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid rgba(216,194,184,0.4)',
              color: '#D8C2B8',
              fontSize: 20,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Neurociência aplicada à conversão
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 60,
              lineHeight: 1.15,
              fontWeight: 600,
              color: '#FAF7F2',
            }}
          >
            Websites desenhados pela{' '}
            <span style={{ color: '#D8C2B8', marginLeft: 16 }}>neurociência da decisão humana.</span>
          </div>
        </div>

        {/* Footer stat strip */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[
            ['SEO', 'de Intenção de Compra'],
            ['Neuromarketing', 'sem fricção até o WhatsApp'],
            ['0.7s', 'Core Web Vitals 99'],
          ].map(([big, small]) => (
            <div key={big} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: '#FAF7F2' }}>{big}</div>
              <div style={{ fontSize: 18, color: '#9CA3AF' }}>{small}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
