import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demonstrações | Neuralabs',
  description: 'Portfólios interativos de projetos desenvolvidos pela Neuralabs com neuromarketing e design premium.',
  robots: 'index, follow',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
