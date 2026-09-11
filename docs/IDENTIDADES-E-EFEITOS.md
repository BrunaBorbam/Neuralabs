# Biblioteca de Identidades & Efeitos — NEURALABS

> Consultar ANTES de começar qualquer site novo (demo de portfólio ou
> cliente real). Atualizar o Registro (seção 4) DEPOIS de publicar. Este
> documento só funciona se for mantido — sem atualização ele vira só mais
> um arquivo morto no repositório.

## Por que este documento existe

Diagnóstico honesto depois de 3 projetos (site NEURALABS, Villa Serena,
CERNE): a paleta e a tipografia mudam a cada projeto, mas a **estrutura**
se repete demais — mesmo esqueleto de seções, mesmo tipo de dispositivo
decorativo. Prova concreta:

| Projeto | Elemento 3D/motion de assinatura |
|---|---|
| Site NEURALABS | Esfera translúcida + anel toroidal orbitando no Hero (`HeroScene3D`) |
| Villa Serena | Anéis concêntricos em SVG fazendo "ripple" (ondulação d'água) |
| CERNE | 3 anéis toroidais concêntricos em 3D (anéis de crescimento) |

As três são, no fundo, a mesma ideia — **anel(éis) concêntrico(s) que
reage(m) ao mouse ou pulsa(m) sozinho(s)** — só a cor muda. O mesmo
acontece com o "cartão de vidro flutuante com borda iluminada no topo"
(aparece nos três projetos) e com o esqueleto de seções (Hero → faixa/
marquee → números → seção "sobre" → galeria/portfólio → processo em 4
etapas → depoimento → FAQ/CTA → rodapé com botão de voltar) — a ordem
quase não varia entre projetos.

Isso é o oposto do que a NEURALABS vende: identidade visual e experiência
**únicas** por projeto (ver `neuralabs-brand-studio`, item 3 do processo
obrigatório). Este documento existe pra isso parar de acontecer.

## Regra obrigatória

Antes de começar qualquer site novo:

1. Abra o **Registro de Identidades Usadas** (seção 4) abaixo.
2. Escolha um **Arquétipo** (seção 1) que ainda não foi usado.
3. Escolha um item do **Catálogo de Efeitos** (seção 2) que ainda não foi
   usado — nunca "anéis concêntricos" de novo, isso já está esgotado.
4. Escolha uma **fórmula tipográfica** (seção 3) que ainda não foi usada.
5. Depois de publicar o projeto, volte aqui e adicione uma linha no
   Registro.

## 1. Arquétipos de site

Cada arquétipo muda a **ordem e composição das seções**, não só a cor —
esse é o ponto que mais se repetiu até agora.

### A. Editorial Split — *usado: CERNE*
Hero dividido 50/50 texto/foto, muita respiração em branco/linho, citações
panorâmicas full-bleed entre seções, galeria com "case em destaque" + grid.
Ordem: Hero split → marquee → números → sobre (mosaico de fotos) → quebra
panorâmica com citação → portfólio (destaque + grid) → processo →
depoimento → FAQ → CTA.
Quando usar: marcas artesanais, ateliês, arquitetura, moda autoral.

### B. Cinematic Full-Bleed — *usado: Villa Serena*
Hero de tela cheia (vídeo/foto), sem divisão, texto sobreposto com
overlay de cor, card de vidro flutuante com dado numérico.
Ordem: Hero full-bleed → marquee → tour "scrollytelling" (imagens grandes
intercaladas com texto curto) → localização/mapa → comparativo/economia →
depoimento → CTA de reserva.
Quando usar: hospitalidade, experiências, turismo, imóveis de alto padrão.

### C. Grid Brutalista / Catálogo — *ainda não usado*
Sem hero cinematográfico — abre direto numa grade densa de produtos/
projetos, tipografia condensada e grande, cores em blocos sólidos (sem
gradiente), bordas retas (sem `rounded`).
Ordem: Header com contador (nº de peças) → grid denso sem "featured" maior
→ filtros/categorias → seção técnica (specs/materiais em tabela) → CTA
direto, sem storytelling longo.
Quando usar: e-commerce, moda de rua, produto técnico, arquitetura
brutalista.

### D. Assimétrico / Colagem Editorial — *usado: Ardósia (Gastronomia)*
Grid quebrado, elementos sobrepostos em ângulos, tipografia mista (display
gigante + legendas pequenas rotacionadas), scroll horizontal em pelo menos
uma seção.
Ordem: Hero tipográfico gigante (sem foto, ou foto pequena) → scroll
horizontal de trabalhos → processo em colagem (fotos em ângulos) →
depoimentos em carrossel → CTA assimétrico.
Quando usar: estúdio criativo, fotografia, branding, gastronomia autoral.

### E. Minimal Produto-Led — *ainda não usado*
Extremamente limpo, muito espaço negativo, foco em 1-2 produtos/serviços
por vez, sem marquee, sem anel 3D — motion só em microinterações (hover,
transição de página).
Ordem: Hero com 1 produto/imagem central → benefícios em lista curta (sem
ícones decorativos) → comparação simples (tabela ou toggle) → prova
social minimalista (logos, não depoimento longo) → CTA único, repetido.
Quando usar: SaaS, produto digital, consultoria técnica, clínica/serviço
de precisão.

### F. Dados & Dashboard — *ainda não usado*
Identidade "técnica": números e gráficos são o elemento visual principal
(não fotos), paleta com 1 cor de destaque sobre fundo neutro, tipografia
monoespaçada para os dados.
Ordem: Hero com métrica/gráfico ao vivo → como funciona em fluxograma
(não os "4 passos" genéricos) → cases com números antes/depois →
integrações/stack → CTA com prova de ROI.
Quando usar: negócio B2B, fintech, consultoria de performance/dados,
contabilidade.

## 2. Catálogo de efeitos & assinaturas de motion/3D

Cada projeto usa **no máximo um** item desta lista como assinatura, e o
item sai da lista depois de usado.

- [x] Anéis/esferas concêntricos reagindo ao mouse — **usado 3x** (site,
  Villa Serena, CERNE v1 — substituído em set/2026, ver registro).
  Esgotado — não usar de novo.
- [ ] Blob líquido morphing (SVG ou shader simples) reagindo a scroll
- [x] Wireframe 3D de um objeto real do negócio (cadeira, garrafa, prédio)
  girando devagar — usado 1x em CERNE v2, **removido em set/2026** (não
  convenceu depois de 2 rodadas de ajuste; gerar um modelo real via IA
  esbarrou em paywall). Hero da CERNE hoje é só vídeo + card. Livre pra
  reuso futuro se algum dia houver um modelo 3D real bom o bastante.
- [ ] Partículas seguindo o cursor (canvas 2D leve, sem WebGL)
- [ ] Reveal com máscara de grade (grid-wipe) — imagem "monta" quadrado a
  quadrado ao entrar na viewport
- [ ] Texto estilo split-flap/odômetro (letras giram como painel de
  aeroporto)
- [ ] Scroll horizontal com "trilho" de cards, em vez de scroll vertical
- [ ] Camadas de parallax tipo recorte de papel (paper-cut), sem 3D real
- [ ] Ruído/grain animado e sutil sobre uma cor sólida (textura, não
  brilho)
- [ ] Extrusão isométrica de um ícone/logo ao rolar a página
- [ ] Linha de scan/glitch discreta em hover (bom pra tech/dados)
- [x] Efeito de "revelar tinta"/brush stroke SVG animado no traço de um
  título — **usado 1x** (Ardósia: traço de giz/tinta sob títulos e ao
  redor do prato do chef, via framer-motion `pathLength`).

O "cartão de vidro flutuante com borda iluminada" (usado nos 3 projetos
até aqui) também deve ser tratado como recurso comum, não assinatura —
pode aparecer, mas nunca como O elemento diferenciador do projeto.

## 3. Fórmulas tipográficas — já usadas

| Projeto | Serifada/Display | Sans/UI |
|---|---|---|
| Site NEURALABS | Playfair Display | Inter |
| Villa Serena | Bodoni Moda | Plus Jakarta Sans |
| CERNE | Fraunces | Jost |

Sugestões pra próximos projetos (não é regra fechada, só ponto de
partida — não repetir as três linhas acima): Newsreader + Work Sans ·
Instrument Serif + Space Grotesk · Libre Caslon Text + Manrope · DM Serif
Display + IBM Plex Sans · Georama + Sora (sans-only, bom pros arquétipos
E/F que não pedem serifada de destaque).

## 4. Registro de identidades usadas

| # | Projeto | Arquétipo | Paleta | Tipografia | Assinatura motion/3D |
|---|---|---|---|---|---|
| 1 | Site NEURALABS | (pré-arquétipo — site institucional) | Obsidiana + Malva/Grafite | Playfair Display + Inter | Esfera + anel 3D orbitando |
| 2 | Villa Serena (Airbnb) | B — Cinematic Full-Bleed | Noturno + dourado pôr-do-sol | Bodoni Moda + Plus Jakarta Sans | Ondulação SVG (ripple) |
| 3 | CERNE (Marcenaria) | A — Editorial Split | Linho + Musgo | Fraunces + Jost | *(3D removido em set/2026 — ver item 2 acima; Hero hoje é só vídeo + card)* |
| 4 | Ardósia (Gastronomia) | D — Assimétrico/Colagem Editorial | Ardósia (carvão) + Giz + Terracota + Mostarda | Instrument Serif + Space Grotesk | Traço de tinta/giz revelando (SVG, framer-motion) |

**Próximo projeto:** usar Arquétipo C, E ou F (nunca A, B ou D de novo tão
cedo), fórmula tipográfica nova (seção 3), efeito de assinatura novo
(seção 2 — nunca anéis/esferas concêntricos, nunca wireframe, nunca
brush-stroke de novo tão cedo).
