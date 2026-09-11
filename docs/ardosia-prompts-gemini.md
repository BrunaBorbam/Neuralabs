# Prompts Gemini/Flow — Fotos e Vídeo da Ardósia (Gastronomia)

> Mesmo fluxo que já usamos na CERNE: cole cada prompt no Gemini (imagem)
> ou no Google Flow (vídeo), gere, baixe o arquivo e me manda aqui no chat
> dizendo qual número/seção é. Eu troco o card só-com-ícone pela foto real
> no código e ajusto a nota de produção no topo do `page.tsx`.
>
> Motivo deste documento: pesquisei os sites de gastronomia mais premiados
> do mundo (Awwwards, DesignRush) a pedido da Bruna — o padrão do topo do
> setor é fotografia/vídeo de altíssima qualidade carregando o peso visual
> (Qissa — A Tale of Food é o melhor exemplo: vídeo no Hero, carrossel de
> pratos em fotografia editorial, frase cíclica "Origin ✦ Spice ✦ Aroma").
> A Ardósia hoje está sem foto por causa do bloqueio de crédito nas
> ferramentas de imagem desta sessão — este documento resolve isso do
> mesmo jeito que resolvemos na CERNE: você gera, eu integro.
>
> Direção geral pra todas (**não copiar a paleta de nenhum site de
> referência** — a Ardósia já tem identidade própria e distinta das
> outras três demos, ver `docs/IDENTIDADES-E-EFEITOS.md`): fotografia
> editorial de comida em ambiente de bistrô de bairro, luz quente e baixa
> (fim de tarde/noite, não luz de estúdio dura), paleta de carvão/madeira
> escura com acentos terracota e âmbar — nunca luz fria/azulada, nunca
> fundo branco de catálogo. Grão de filme sutil, profundidade de campo
> rasa (fundo desfocado). Sem pessoas no quadro, a não ser onde indicado.
> Sem texto/logo na imagem.

---

## 1. Hero (retrato, ~4:5 no mobile, mais larga no desktop) — vídeo OU foto
Peça: o quadro de ardósia sendo escrito à mão com giz — a cena que dá
nome e conceito ao restaurante, e conecta direto com o traço de tinta
que já é a assinatura de motion do site (`ArdosiaInkStroke`).

```
Vídeo em câmera lenta de uma mão escrevendo com giz branco num quadro-
negro de ardósia, listando o nome de um prato do dia — traço fluido,
poeira de giz voando sutilmente no ar, iluminada por uma luz quente
lateral (tipo lâmpada pendente de bistrô). Fundo desfocado sugerindo um
salão de restaurante pequeno e aconchegante, tons de madeira escura e
luzes baixas. Sem rosto visível, só a mão e o antebraço. Composição
vertical, atmosfera de bistrô de bairro à noite, nunca clínica ou de
estúdio.
```

Se preferir foto estática em vez de vídeo (mais simples de gerar), use o
mesmo prompt trocando "Vídeo em câmera lenta" por "Fotografia editorial",
removendo a menção a movimento.

## 2. Prato do chef — Peixe do Dia na Brasa (quadrada, ~1:1)
Uso: card em destaque do cardápio (`#cardapio`), o que já ganha o círculo
de tinta ao redor do nome.

```
Fotografia editorial de comida (food photography) vista de cima, um
filé de peixe grelhado na brasa com legumes coloridos da estação ao
lado, molho beurre blanc levemente salpicado no prato. Prato de cerâmica
rústica escura sobre uma mesa de madeira envelhecida, um guardanapo de
linho e um talher ao lado fora de foco. Luz quente lateral baixa, sombras
suaves, grão de filme sutil. Composição quadrada, estilo editorial de
revista gastronômica contemporânea — nunca still de catálogo de delivery.
```

## 3. Risoto de Cogumelos da Serra (quadrada, ~1:1)
Uso: card do cardápio.

```
Fotografia editorial de comida, ângulo de 45 graus, um risoto cremoso de
cogumelos numa tigela de cerâmica fosca escura, lascas de parmesão por
cima, um raminho de tomilho fresco de guarnição. Fundo de madeira escura
desfocado, luz quente lateral, vapor sutil subindo do prato. Composição
quadrada, atmosfera de bistrô noturno, grão de filme sutil.
```

## 4. Burrata com Tomate da Estação (quadrada, ~1:1)
Uso: card do cardápio.

```
Fotografia editorial de comida, burrata cremosa ao centro de um prato
raso escuro, tomates coloridos da estação cortados ao redor, folhas de
manjericão fresco, fio de azeite visível brilhando. Luz quente lateral,
fundo de madeira escura desfocado, grão de filme sutil. Composição
quadrada, cores vivas dos tomates contrastando com o prato escuro.
```

## 5. Taça de Vinho Natural (quadrada, ~1:1)
Uso: card do cardápio (bebida).

```
Fotografia editorial de uma taça de vinho tinto natural sobre uma mesa
de madeira escura, luz quente lateral criando reflexo dourado no vinho,
uma garrafa desfocada ao fundo com rótulo minimalista ilegível.
Atmosfera noturna de bistrô, grão de filme sutil, composição quadrada.
```

## 6. Da Feira à Mesa — "A Feira" (paisagem, ~4:3)
Uso: se decidirmos evoluir os cartões de processo (`#processo`) de
tipográficos pra foto+texto no futuro.

```
Fotografia editorial de uma banca de feira livre ao amanhecer, caixas de
madeira com legumes e verduras coloridas da estação, luz dourada rasante
do início da manhã. Sem rostos em close, pode ter uma silhueta desfocada
ao fundo. Composição horizontal, atmosfera fresca e viva, cores naturais
saturadas (não editadas pra frio).
```

## 7. Da Feira à Mesa — "A Mesa" (paisagem, ~4:3)
Uso: mesmo uso do item 6.

```
Fotografia editorial do salão de um bistrô pequeno à noite, mesas de
madeira com luz baixa e quente de lâmpadas pendentes, um quadro-negro de
ardósia desfocado ao fundo. Sem rostos em primeiro plano — pode ter
clientes desfocados ao fundo, fora de foco. Composição horizontal,
atmosfera aconchegante de bairro, tons de madeira escura e âmbar.
```

---

### Depois de gerar

Me manda os arquivos aqui no chat, um a um ou todos juntos, dizendo qual
número/seção é cada um. Eu troco os cards do cardápio (hoje só com ícone)
pelas fotos reais, e — se você gerar o vídeo do item 1 — troco o Hero
tipográfico atual por um Hero com vídeo de fundo, no mesmo padrão que já
funciona na CERNE (`isDesktop && !reducedMotion`, Ken Burns como fallback
mobile).
