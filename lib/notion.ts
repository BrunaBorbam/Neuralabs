/**
 * Notion como CMS leve — deixa um cliente (não-programador) editar os
 * projetos do portfólio da CERNE direto numa planilha/database do Notion,
 * sem tocar em código. Ver docs/cerne-cms-notion.md para o passo a passo
 * de configuração (criar a integração, montar a database, variáveis de
 * ambiente na Vercel).
 *
 * Se NOTION_API_KEY / NOTION_DATABASE_ID não estiverem configuradas (ou
 * qualquer chamada à API do Notion falhar), fetchCerneProjetos retorna
 * null — quem chama cai de volta pro array estático de PROJETOS_PADRAO em
 * app/demo/marcenaria/page.tsx. Isso é proposital: um site real nunca deve
 * quebrar porque o CMS está fora do ar ou ainda não foi configurado.
 *
 * API do Notion 2025-09-03+: databases e data sources são coisas
 * separadas agora (uma database pode ter múltiplas data sources) — por
 * isso o fluxo é sempre "pega a database, pega a data source dela, só
 * então consulta". Ver https://developers.notion.com/docs/upgrade-guide-2025-09-03.
 */

const NOTION_VERSION = '2025-09-03';

async function notionFetch(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    // Nunca cachear: os campos "Files & media" do Notion viram URLs
    // assinadas que expiram (~1h). Buscar sempre ao vivo garante que a URL
    // devolvida esteja válida no momento do uso — ver também o proxy de
    // foto em app/api/cerne-photo/[pageId]/route.ts, que resolve isso de
    // vez servindo a imagem pelo nosso próprio domínio.
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Notion API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

type NotionProperty = any;

const richText = (prop: NotionProperty): string =>
  (prop?.rich_text ?? []).map((t: any) => t.plain_text).join('');

const titleText = (prop: NotionProperty): string =>
  (prop?.title ?? []).map((t: any) => t.plain_text).join('');

export const fileUrl = (prop: NotionProperty): string => {
  const file = prop?.files?.[0];
  if (!file) return '';
  return file.type === 'external' ? file.external?.url ?? '' : file.file?.url ?? '';
};

export type CerneProjeto = {
  idx: string;
  nome: string;
  local: string;
  ano: string;
  materiais: string[];
  img: string;
  descricao?: string;
  featured?: boolean;
};

async function getDataSourceId(databaseId: string): Promise<string | null> {
  const db = await notionFetch(`databases/${databaseId}`);
  return db.data_sources?.[0]?.id ?? null;
}

/** Busca os projetos publicados na database do Notion, prontos pro grid do portfólio. */
export async function fetchCerneProjetos(): Promise<CerneProjeto[] | null> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return null;
  }

  try {
    const dataSourceId = await getDataSourceId(process.env.NOTION_DATABASE_ID);
    if (!dataSourceId) return null;

    const result = await notionFetch(`data_sources/${dataSourceId}/query`, {
      method: 'POST',
      body: JSON.stringify({
        sorts: [{ property: 'Ordem', direction: 'ascending' }],
      }),
    });

    const projetos: CerneProjeto[] = (result.results ?? [])
      .filter((page: any) => page.properties?.Publicar?.checkbox !== false)
      .map((page: any, i: number) => {
        const p = page.properties ?? {};
        return {
          idx: String(i + 1).padStart(2, '0'),
          nome: titleText(p.Nome),
          local: richText(p.Local),
          ano: richText(p.Ano),
          materiais: (p.Materiais?.multi_select ?? []).map((m: any) => m.name),
          // Aponta pro nosso proxy (mesma origem), não pra URL assinada do
          // Notion direto — ver app/api/cerne-photo/[pageId]/route.ts.
          img: fileUrl(p.Foto) ? `/api/cerne-photo/${page.id}` : '',
          descricao: richText(p.Descrição) || undefined,
          featured: p.Destaque?.checkbox ?? false,
        };
      })
      .filter((p: CerneProjeto) => p.nome && p.img);

    return projetos.length > 0 ? projetos : null;
  } catch (err) {
    console.error('[notion] Erro ao buscar projetos da CERNE:', err);
    return null;
  }
}

/** Busca a URL de foto (assinada, válida no momento) de uma página específica. */
export async function fetchNotionPagePhotoUrl(pageId: string): Promise<string | null> {
  if (!process.env.NOTION_API_KEY) return null;
  try {
    const page = await notionFetch(`pages/${pageId}`);
    const url = fileUrl(page.properties?.Foto);
    return url || null;
  } catch (err) {
    console.error('[notion] Erro ao buscar foto:', err);
    return null;
  }
}
