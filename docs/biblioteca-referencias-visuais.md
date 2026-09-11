# Biblioteca de Referências Visuais — NEURALABS

> **Migrado pro Notion (2026-09-11).** A imagem/vídeo de trabalho não podia
> ficar salva neste PC, então o inbox de referências (com os arquivos de
> verdade — screenshots, campo de imagem nativo) agora vive no banco de
> dados Notion **🖼️ Biblioteca de Referências Visuais**, dentro da página
> 🧠 NEURALABS: https://app.notion.com/p/9fed4a1a044347c5aed58b938327db33
>
> Esse arquivo fica só como **histórico** das entradas de antes da migração
> (abaixo) e como ponte pro resto da biblioteca versionada no repo — o
> catálogo curado (`docs/IDENTIDADES-E-EFEITOS.md`), a biblioteca técnica de
> efeitos de animação/imagem, e a skill que amarra tudo
> (`.claude/skills/efeitos-neuralabs/SKILL.md`). Novas referências (links,
> prints, vídeos) entram direto no Notion, não aqui.

---

## Entradas

### [2026-09-11] Vídeo Google Flow — mão escrevendo com giz (Hero Ardósia)
- **Fonte:** vídeo gerado pela Bruna no Google Flow, arquivo local
  (`Mão_escrevendo_com_giz_1080p_*.mp4`)
- **Tipo:** vídeo
- **Projeto de origem:** Ardósia
- **Técnica observada:** qualidade de luz/mão/caligrafia ficou boa (câmera
  lenta, luz quente lateral, grão sutil) — problema não foi a técnica, foi o
  **conteúdo**: o modelo escreveu "Boeuf Bourguignon" (estereótipo de bistrô
  francês) em vez de um prato real do cardápio em português.
- **Status:** descartado (idioma/prato errado) — prompt corrigido em
  `docs/ardosia-prompts-gemini.md` (trava idioma PT-BR + prato real
  "Risoto de Cogumelos"), aguardando nova geração.
- **Notas:** lição geral pra qualquer prompt de vídeo/imagem com texto
  visível: sempre travar idioma E usar um valor real do projeto (nunca
  deixar o modelo "escolher" o texto sozinho) — modelos de vídeo tendem a
  cair em clichês fortes do domínio (bistrô → francês).

### [2026-set] Qissa — A Tale of Food (pesquisa de sites de gastronomia premiados)
- **Fonte:** pesquisa feita a pedido da Bruna em Awwwards/DesignRush, ver
  `docs/ardosia-prompts-gemini.md` e `docs/ardosia-identidade-visual.md`
- **Tipo:** site
- **Projeto de origem:** Ardósia (mas a técnica vale pra qualquer demo de
  conteúdo autoral)
- **Técnica observada:** (1) vídeo real no Hero carregando o peso visual
  em vez de composição gráfica; (2) palavra cíclica no eyebrow ("Origin ✦
  Spice ✦ Aroma") trocando sozinha; (3) carrossel de pratos em fotografia
  editorial, não grid genérico.
- **Status:** aplicado em Ardósia — (2) virou "Hoje tem: Estação / Fogo /
  Feira / Giz" com vocabulário próprio; (1) em andamento (ver entrada do
  vídeo acima); (3) ainda não.
- **Notas:** regra que valeu aqui e vale sempre — pegar a *técnica*
  (palavra que troca, vídeo carregando peso visual), nunca a paleta
  (Qissa é azul-marinho/dourado, proibido pra Ardósia) nem o conteúdo.

### [2026-set] Partake Foods (pesquisa de referência, mesmo lote da Qissa)
- **Fonte:** mesma pesquisa acima
- **Tipo:** site
- **Projeto de origem:** geral (padrão do topo do setor de gastronomia/
  produto alimentício)
- **Técnica observada:** ainda não detalhada — registrar aqui na próxima
  vez que for revisitada com mais profundidade.
- **Status:** catalogado, não aplicado
- **Notas:** revisar junto com a Qissa quando for evoluir a seção de
  cardápio/portfólio de qualquer demo.

### [2026-set] Efeito #1 "Renderização em tempo real" (biblioteca de 31 efeitos)
- **Fonte:** `docs/referencia-31-efeitos-animacao.md` (efeito apontado pela
  Bruna como favorito: "eu gosto de um efeito assim")
- **Tipo:** site (artifact de referência com 31 efeitos rodando ao vivo)
- **Projeto de origem:** Ardósia
- **Técnica observada:** volume 3D em CSS puro (`perspective` +
  `transform-style: preserve-3d` + `rotateX/rotateY` em loop) — sem WebGL,
  sem geração por IA. Efeitos próximos no mesmo catálogo: #14 "Falso 3D"
  (camadas + tilt) e #19 "Isométrico".
- **Status:** aplicado em Ardósia — virou o `SlateCube` (cubo de ardósia)
  no Hero, commit `2d6b0d7`. Posicionamento ajustado depois (commit
  `9a65332`) por colidir com o cartão de escassez e o widget de chat.
- **Notas:** #14 e #19 seguem disponíveis pra um projeto futuro que queira
  o mesmo tipo de profundidade CSS com outra composição.
