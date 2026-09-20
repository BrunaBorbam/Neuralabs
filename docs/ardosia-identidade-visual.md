# Identidade Visual — Ardósia (Gastronomia)

> Ficha de identidade consolidada. Não é um documento novo de decisões — é a
> reunião, num lugar só, do que já está decidido e espalhado entre
> `docs/IDENTIDADES-E-EFEITOS.md` (registro/regras entre projetos),
> `app/demo/gastronomia/page.tsx` (JSDoc do topo do arquivo) e
> `docs/ardosia-prompts-gemini.md` (direção de fotografia), **mais** a
> camada nova: a síntese da pesquisa nas referências internacionais que a
> Bruna trouxe (Qissa — A Tale of Food, Partake Foods, e o padrão geral dos
> sites de gastronomia mais premiados). Serve como a peça única de
> referência pra qualquer decisão visual futura na Ardósia — inclusive pra
> mim, quando as fotos/vídeos reais chegarem.

---

## 1. Conceito

**Ardósia** = o quadro-negro de giz onde bistrôs de bairro escrevem o
cardápio do dia à mão. O nome carrega o próprio mecanismo de negócio
(cardápio muda conforme a feira) e vira, ao mesmo tempo, o material
(pedra escura, textura fosca) e o gesto (escrever, apagar, reescrever) que
organizam toda a identidade.

Frase-âncora, já no Hero: **"O cardápio muda. O capricho, não."**

Arquétipo (`IDENTIDADES-E-EFEITOS.md`): **D — Assimétrico/Colagem
Editorial**. Bistrô de bairro casual-chic, não fine dining formal — a
identidade precisa ler como "cozinha de verdade, feita por gente boa",
nunca como restaurante de hotel 5 estrelas.

## 2. Paleta

| Papel | Cor | Hex | Uso |
|---|---|---|---|
| Base (fundo) | Ardósia (carvão quente) | `#26241F` | Fundo principal — nunca preto puro, sempre esse carvão com leve calor |
| Fundo secundário | Ardósia escura | `#201E19` | Faixas, header, seções alternadas |
| Texto/contraste claro | Giz | `#F3EDE1` | Texto principal, wordmark |
| Acento primário | Terracota | `#C1552C` | CTAs, ícones de destaque, traço de tinta principal |
| Acento secundário | Mostarda | `#D9A441` | Detalhes, preços, hover, eyebrow labels |
| Superfície | Carvão-carta | `#2A2722` / `#2E2B25` | Cards, superfícies elevadas |
| Texto secundário | Giz apagado | `#B6AF9E` | Corpo de texto, descrições |
| Texto terciário | `#8A8478` | Labels discretas, metadados |

Regra explícita (vale pra qualquer asset gerado, foto, vídeo ou UI nova):
**nunca azul-marinho/dourado de estúdio** (paleta do Qissa) nem qualquer
paleta de referência pesquisada — essas são pontos de partida técnicos,
não visuais. A Ardósia é quente, terrosa, noturna — nunca fria ou
metálica.

## 3. Tipografia

- **Display/serifada:** Instrument Serif (peso 400, itálico usado pra
  ênfase e para preços) — caligráfica, com personalidade, não uma
  serifada de luxo clássica.
- **Sans/UI:** Space Grotesk (300–700) — geométrica, contemporânea,
  contraste deliberado com a serifada mais "manuscrita".
- Nenhuma das duas repetida nos outros 3 projetos NEURALABS (ver tabela
  em `IDENTIDADES-E-EFEITOS.md`, seção 3).

## 4. Motion — assinatura

**Traço de tinta/giz revelando** (`components/ArdosiaInkStroke.tsx`, SVG +
`framer-motion pathLength`) — usado sob o título de destaque do Hero e ao
redor do nome do prato em destaque no cardápio. Primeiro uso desse efeito
em qualquer projeto NEURALABS — fica "reservado" pra Ardósia por um bom
tempo (regra do catálogo de efeitos).

**Palavra cíclica no Hero** ("Hoje tem: Estação / Fogo / Feira / Giz") —
adicionado agora, inspirado tecnicamente no device do Qissa ("Origin ✦
Spice ✦ Aroma"), mas com vocabulário 100% próprio da Ardósia. É a
aplicação prática da pesquisa: pegamos a *técnica* (palavra que troca
sozinha, reforça "o cardápio muda"), não a paleta nem o conteúdo deles.

Ambos os efeitos são cortados em `prefers-reduced-motion` e o `ink stroke`
já respeita mobile/desktop como os demais projetos.

## 5. Direção de fotografia e vídeo

Esse é o ponto que a pesquisa nas referências (Qissa, Partake Foods, e o
padrão geral do topo do setor) deixou mais claro: **o diferencial desses
sites não é layout, é fotografia/vídeo de altíssima qualidade carregando
o peso visual**. A Ardósia hoje não tem isso (bloqueio de crédito nas
ferramentas de geração desta sessão) — por isso a saída foi o documento
`docs/ardosia-prompts-gemini.md`, com prompts prontos pra Bruna gerar via
Gemini/Google Flow.

Diretrizes (já no topo daquele documento, repetidas aqui como parte da
identidade formal, não só como prompt):

- Fotografia editorial de comida, nunca still de catálogo/delivery.
- Luz quente e baixa (fim de tarde/noite) — nunca luz de estúdio fria ou
  fundo branco.
- Grão de filme sutil, profundidade de campo rasa (fundo desfocado).
- Ambiente sempre de bistrô de bairro pequeno — madeira escura, mesas
  próximas, nunca salão grande/corporativo.
- Sem pessoas em primeiro plano (exceção: mão escrevendo no quadro, no
  prompt do Hero — conecta direto com a assinatura de motion).
- Sem texto/logo dentro da imagem.

## 6. Voz e tom

Bairro, não fine dining. Depoimentos e microcopy usam primeiro nome e tom
casual ("Ardósia é meu lugar de quinta-feira"), ao contrário do tom mais
formal/autoral da CERNE (depoimento de arquiteto). CTA principal:
"Reservar Mesa" / "Bora marcar mesa?" — linguagem falada, não corporativa.

## 7. Gatilhos de neuromarketing já aplicados

(detalhe completo no JSDoc de `app/demo/gastronomia/page.tsx`)
Escassez diária real ("6 mesas hoje à noite"), transparência de cardápio
pré-decisão, prova social casual, redução de fricção pré-reserva (FAQ
curto), e a narrativa "cardápio muda toda semana" como gatilho de frescor
+ argumento de venda do CMS via Notion.

## 8. O que evitar

- Copiar paleta, layout ou conteúdo de qualquer referência pesquisada —
  usar só a técnica/estrutura, nunca a aparência.
- Anéis/esferas 3D concêntricos, wireframe 3D — já esgotados em outros
  projetos.
- Fotografia de banco genérica (Unsplash) sem tratamento de cor —
  quebraria a paleta quente estabelecida aqui.
- Tom formal/institucional — a Ardósia é bairro, não fine dining.

---

### Próximo passo natural

Quando a Bruna mandar as primeiras fotos/vídeo gerados a partir de
`docs/ardosia-prompts-gemini.md`, este documento (seção 5) é a régua pra
eu avaliar se o resultado bateu com a direção antes de integrar no
código — não precisa regenerar identidade nenhuma, só conferir contra o
que já está decidido aqui.
