import { NextRequest } from 'next/server';
import { fetchNotionPagePhotoUrl } from '@/lib/notion';

// Proxy de imagem: o HTML nunca referencia a URL assinada do Notion
// diretamente (ela expira em ~1h e trocaria o CSP do site pra liberar o
// domínio da AWS/Notion à toa). Em vez disso, <Image src="/api/cerne-photo/<id>">
// aponta pra cá — mesma origem, satisfaz o CSP de img-src 'self' sem
// mudar nada nele — e a gente busca a foto atual no Notion e repassa os
// bytes, com um Cache-Control curto o bastante pra nunca servir uma URL
// já expirada.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;

  const photoUrl = await fetchNotionPagePhotoUrl(pageId);
  if (!photoUrl) {
    return new Response('Not found', { status: 404 });
  }

  const upstream = await fetch(photoUrl);
  if (!upstream.ok || !upstream.body) {
    return new Response('Upstream error', { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
      // 30min: seguro dentro da janela de validade da URL assinada do
      // Notion (~1h) e evita rebater na API do Notion a cada carregamento.
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
}
