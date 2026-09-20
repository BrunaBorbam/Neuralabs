import { NextResponse } from 'next/server';
import { fetchArdosiaPratos } from '@/lib/notion';

// Mesmo padrão de app/api/cerne-projects/route.ts, aplicado ao cardápio da
// demo Ardósia: endpoint público e read-only, `configured: false` quando o
// Notion não está ligado ainda (mantém o cardápio estático como conteúdo
// real em vez de quebrar a página).
export async function GET() {
  const pratos = await fetchArdosiaPratos();

  if (!pratos) {
    return NextResponse.json({ configured: false, pratos: [] });
  }

  return NextResponse.json({ configured: true, pratos });
}
