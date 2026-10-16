import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import './studio.css';

// Newsreader (SIL OFL, ver fonts/OFL.txt) servida localmente: os mesmos arquivos latin v26
// que next/font/google baixava. Evita que o build dependa da URL devolvida pelo Google Fonts,
// que derrubou o Turbopack em um build sem cache ("queries have exactly one entry").
const editorial = localFont({
  src: [
    { path: './fonts/newsreader-latin.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/newsreader-latin-italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-n2-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Neuralabs 2.0 — Private Prototype',
  description: 'Experimental preview of Neuralabs studio, its services, conceptual work and Orlando pilot.',
  robots: { index: false, follow: false },
};

export default function PrototypeLayout({ children }: { children: ReactNode }) {
  return <div className={editorial.variable}>{children}</div>;
}
