# CMS do portfólio via Notion — CERNE (e modelo pra clientes reais)

> Isso é opcional: sem configurar nada, a demo CERNE continua funcionando
> normalmente com as fotos e textos fixos no código. Configure só quando
> quiser que alguém (você ou um cliente) edite os projetos do portfólio
> sem mexer em código.

## O que isso faz

A seção "Projetos recentes" do portfólio passa a ler os cards (nome,
local, ano, materiais, descrição, foto, se é o "projeto em destaque", se
está publicado) de uma database do Notion, em vez do array fixo no
`page.tsx`. Quem tiver acesso à database edita lá — adiciona linha, troca
foto, marca/desmarca "Publicar" — e o site atualiza sozinho, sem precisar
de novo deploy.

Se as variáveis de ambiente não estiverem configuradas (ou o Notion
estiver fora do ar num momento específico), o site cai de volta pro
conteúdo fixo automaticamente — nunca quebra por causa disso.

## Passo 1 — Criar a integração no Notion

1. Acesse [notion.so/my-integrations](https://www.notion.so/my-integrations)
   (logada na conta/workspace onde vai ficar a database).
2. **New integration** → dê um nome (ex.: "CERNE — Site").
3. Em **Capabilities**, deixe marcado só **Read content** (não precisa de
   escrita — o site só lê).
4. Salve e copie o **Internal Integration Secret** (começa com `ntn_...`
   ou `secret_...`). Isso vai virar `NOTION_API_KEY`.

## Passo 2 — Criar a database

Crie uma página no Notion do tipo **database** (tabela) com exatamente
estas colunas (nome e tipo importam — o site procura por esses nomes):

| Coluna | Tipo | Uso |
|---|---|---|
| `Nome` | Título (padrão) | Nome do projeto |
| `Local` | Texto | Ex.: "Residência Privada · Porto Alegre" |
| `Ano` | Texto | Ex.: "2025" |
| `Materiais` | Seleção múltipla | Ex.: Nogueira maciça, Latão escovado |
| `Descrição` | Texto | Só é usada no card "em destaque" |
| `Foto` | Arquivo e mídia | Arraste a foto direto pra célula |
| `Destaque` | Caixa de seleção | Marque em só um projeto — vira o card grande |
| `Publicar` | Caixa de seleção | Desmarcada = some do site (rascunho) |
| `Ordem` | Número | Define a ordem dos cards (1, 2, 3...) |

Dica: cria a primeira linha já preenchida com um projeto de teste antes
de seguir pro próximo passo, pra validar mais rápido.

## Passo 3 — Compartilhar a database com a integração

Na própria database, clique em **⋯** (canto superior direito) →
**Connections** (ou "Conexões") → adicione a integração que você criou no
Passo 1. Sem isso, a API não enxerga a database mesmo com a chave certa.

## Passo 4 — Pegar o ID da database

Abra a database em tela cheia no navegador. A URL fica assim:

```
https://www.notion.so/<workspace>/<NOME-DA-DATABASE>-1a2b3c4d5e6f7g8h9i0j...
```

O `NOTION_DATABASE_ID` é o trecho de 32 caracteres (letras e números) no
final da URL, antes de qualquer `?v=...`.

## Passo 5 — Configurar na Vercel

No projeto da CERNE (ou do cliente) na Vercel: **Settings → Environment
Variables** → adicione:

- `NOTION_API_KEY` = o segredo do Passo 1
- `NOTION_DATABASE_ID` = o ID do Passo 4

Marque pra pelo menos **Production**. Depois, force um novo deploy (ou
espere o próximo push) pra elas entrarem em efeito.

## Usando no dia a dia

Quem tiver acesso à database no Notion edita normalmente: nova linha =
novo projeto no site, desmarcar "Publicar" = esconder sem apagar, marcar
"Destaque" = vira o card grande do portfólio. Não precisa mexer em código
nem pedir novo deploy pra mim — a próxima vez que alguém abrir o site, já
aparece atualizado.

## Reaproveitando pra clientes reais

Esse é o padrão de referência: pra cada cliente novo, a ideia é duplicar
essa mesma estrutura de database (Nome, Local, Ano, Materiais, Descrição,
Foto, Destaque, Publicar, Ordem) dentro do Notion dele (ou numa página
compartilhada com ele dentro do seu workspace), repetir os passos 1–5
apontando pro `NOTION_DATABASE_ID` daquele cliente, e pronto — ele edita
o próprio conteúdo sem depender de você pra cada alteração pequena.
Mudanças de layout, motion ou 3D continuam exigindo código — isso aqui
resolve só o conteúdo (fotos e texto dos projetos).
