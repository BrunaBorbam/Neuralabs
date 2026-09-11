import { NextResponse } from 'next/server';
import { fetchCerneProjetos } from '@/lib/notion';

// Endpoint público e read-only: devolve os projetos do portfólio vindos do
// Notion (quando configurado) pro grid da demo CERNE. `configured: false`
// sinaliza pro cliente (ver useEffect em app/demo/marcenaria/page.tsx) que
// não há CMS ligado ainda, mantendo o array estático como conteúdo real.
export async function GET() {
  const projetos = await fetchCerneProjetos();

  if (!projetos) {
    return NextResponse.json({ configured: false, projetos: [] });
  }

  return NextResponse.json({ configured: true, projetos });
}
