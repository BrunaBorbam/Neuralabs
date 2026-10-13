import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Newsreader } from 'next/font/google';
import './studio.css';

const editorial = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
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
