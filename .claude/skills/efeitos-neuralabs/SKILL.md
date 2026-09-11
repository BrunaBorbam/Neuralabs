---
name: efeitos-neuralabs
description: Biblioteca central de efeitos visuais, motion, 3D e referências de design da NEURALABS (arquétipos de site, catálogo de efeitos já usados/disponíveis, fórmulas tipográficas, e o log de referências — sites, vídeos, prints — que a Bruna manda ao longo do tempo). Use esta skill SEMPRE que: for planejar, sugerir ou implementar qualquer efeito visual, motion, 3D, transição, parallax ou tratamento de imagem em qualquer demo da NEURALABS (Villa Serena, CERNE, Ardósia, ou uma nova); a Bruna mandar um link, print, vídeo ou GIF de um site/efeito de referência, mesmo sem pedir explicitamente pra guardar; for decidir arquétipo, paleta, tipografia ou assinatura de motion pra um projeto novo ou demo futura; ou quiser conferir o que já foi usado em outros projetos antes de propor algo (pra não repetir anéis concêntricos pela quarta vez). Não é exclusiva da Ardósia — cobre todas as demos de portfólio da NEURALABS.
---

# Biblioteca de Efeitos — NEURALABS

## Por que essa skill existe

A NEURALABS vende identidade visual **única** por projeto (portfólio de demos
por nicho). O risco constante é repetir a mesma solução visual (mesmo anel
3D, mesmo cartão de vidro, mesma ordem de seções) só trocando a cor — já
aconteceu 3x antes de virar regra formal. Essa skill existe pra isso não
acontecer de novo: é o lugar que eu consulto **antes** de propor ou
implementar qualquer efeito, e o lugar onde as referências que a Bruna manda
ficam guardadas de um jeito que eu realmente vou usar depois, em vez de se
perderem no histórico do chat.

## Mapa dos arquivos (onde está cada coisa)

| Arquivo | O que tem | Quando ler |
|---|---|---|
| [`docs/IDENTIDADES-E-EFEITOS.md`](../../../docs/IDENTIDADES-E-EFEITOS.md) | Regra obrigatória, 6 arquétipos de site, catálogo de efeitos motion/3D (usados e disponíveis), fórmulas tipográficas, registro de identidades usadas por projeto | **Sempre**, antes de começar site novo ou propor efeito — é o documento raiz, os outros complementam ele |
| [`docs/referencia-31-efeitos-animacao.md`](../../../docs/referencia-31-efeitos-animacao.md) + `docs/references/31-efeitos-animacao.html` | Biblioteca técnica de 31 efeitos de animação/motion (como implementar, não específico de projeto) | Ao escolher a *técnica* de um efeito de motion (ex: qual abordagem CSS/JS usa) |
| [`docs/references/50-efeitos-imagem-css.md`](../../../docs/references/50-efeitos-imagem-css.md) | Lista curada de 50 efeitos de imagem CSS (hover, scroll, SVG, máscara) | Ao trabalhar tratamento/interação de imagem especificamente |
| [`docs/biblioteca-referencias-visuais.md`](../../../docs/biblioteca-referencias-visuais.md) | **Log cronológico** de referências brutas que a Bruna manda (sites, vídeos, prints) — o que é, que técnica mostra, se já foi aplicado | Sempre que a Bruna mandar uma referência nova (pra registrar) E ao buscar inspiração pra um efeito novo (pra ver o que já foi guardado) |
| `docs/<projeto>-identidade-visual.md` (ex: `docs/ardosia-identidade-visual.md`) | Ficha de identidade consolidada de um projeto específico — paleta, tipografia, motion, direção de foto/vídeo | Ao trabalhar num projeto que já tem ficha própria; é o modelo a replicar quando um projeto novo amadurecer o suficiente pra merecer a sua |

## Fluxo — a Bruna mandou uma referência nova (link, print, vídeo)

1. Olhar a referência (usar Browser/Read conforme o formato — ver
   `docs/biblioteca-referencias-visuais.md` pra exemplos de como já foi
   feito).
2. Registrar uma entrada nova em `docs/biblioteca-referencias-visuais.md`
   seguindo o template no topo do arquivo — mesmo que ainda não vá ser usada
   agora. O valor está em não perder a referência.
3. Extrair só a **técnica/estrutura**, nunca a aparência — regra que já
   vale pro resto do projeto (`docs/IDENTIDADES-E-EFEITOS.md`, seção
   "O que evitar" nas fichas de identidade): nunca copiar paleta, layout
   exato ou conteúdo de um site pesquisado.
4. Se for pra aplicar num projeto específico agora, seguir o fluxo abaixo.

## Fluxo — vou propor ou implementar um efeito novo

1. Checar o **Registro de Identidades Usadas** (seção 4 de
   `IDENTIDADES-E-EFEITOS.md`) — qual assinatura de motion/3D cada projeto já
   usa, pra não repetir.
2. Checar o **Catálogo de Efeitos** (seção 2 do mesmo arquivo) — priorizar
   item ainda não marcado como usado (`[ ]`, não `[x]`).
3. Dar uma olhada em `docs/biblioteca-referencias-visuais.md` — talvez a
   Bruna já tenha mandado uma referência que serve exatamente pra esse caso.
4. Implementar a **técnica**, com conteúdo e paleta 100% do projeto atual.
5. Depois de implementado e aprovado, atualizar o registro (seção 4 do
   `IDENTIDADES-E-EFEITOS.md`) e marcar o item do catálogo como usado.

## O que NUNCA fazer (vale pra qualquer projeto)

- Copiar paleta, layout ou conteúdo de uma referência pesquisada/enviada —
  só a técnica.
- Repetir uma assinatura de motion/3D já marcada como usada (`[x]`) no
  catálogo, ou o mesmo arquétipo de site (seção 1) de um projeto recente.
- Escolher um efeito sem checar o registro primeiro — é rápido (uma
  tabela) e evita retrabalho.
