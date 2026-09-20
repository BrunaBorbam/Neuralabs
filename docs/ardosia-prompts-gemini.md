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
negro de ardósia, em PORTUGUÊS (Brasil) — nunca francês, nunca inglês —
escrevendo exatamente as palavras "Risoto de Cogumelos", traço fluido,
poeira de giz voando sutilmente no ar, iluminada por uma luz quente
lateral (tipo lâmpada pendente de bistrô). Fundo desfocado sugerindo um
salão de restaurante pequeno e aconchegante, tons de madeira escura e
luzes baixas. Sem rosto visível, só a mão e o antebraço. Composição
vertical, atmosfera de bistrô de bairro brasileiro à noite — nunca
bistrô parisiense/francês, nunca "Boeuf Bourguignon" ou qualquer prato
em francês —, nunca clínica ou de estúdio.
```

> Nota (set/2026): a primeira geração desse prompt saiu com o quadro
> escrito em francês ("Boeuf Bourguignon", clichê de bistrô parisiense
> de banco de imagem) — o prompt não travava idioma nem prato
> específico, e o modelo assumiu o estereótipo errado. Se mesmo com o
> prato e o idioma travados no prompt o texto sair ilegível/errado de
> novo (limitação comum de modelos de vídeo pra soletrar texto
> arbitrário), troque a instrução de "escrevendo as palavras X" por
> "um traço gestual e fluido, sem se preocupar em formar letras
> legíveis" — mantém a cena e a emoção sem depender do modelo acertar
> ortografia.

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

## 8. Pão de Fermentação Natural (quadrada, ~1:1)
Uso: card do cardápio (entrada).

```
Fotografia editorial de comida, um pão de fermentação natural rústico
cortado ao meio sobre uma tábua de madeira escura, casca crocante e miolo
alveolado à mostra, um potinho de manteiga de ervas ao lado com flor de
sal por cima. Luz quente lateral, grão de filme sutil, fundo desfocado
de mesa de bistrô. Composição quadrada.
```

## 9. Tagliatelle ao Ragù de 6 Horas (quadrada, ~1:1)
Uso: card do cardápio (principal).

```
Fotografia editorial de comida, um prato fundo escuro com tagliatelle
fresco ao ragù de carne cozido por horas, lascas de pecorino por cima,
uma folha de manjericão ou salsa fresca de guarnição. Vapor sutil
subindo do prato, luz quente lateral, fundo de madeira escura desfocado.
Composição quadrada, atmosfera de bistrô noturno.
```

## 10. Pavê de Doce de Leite da Vó (quadrada, ~1:1)
Uso: card do cardápio (sobremesa).

```
Fotografia editorial de sobremesa, uma fatia de pavê de doce de leite
num prato de cerâmica escura simples, camadas visíveis de biscoito e
creme, uma pitada de canela ou raspas de chocolate por cima. Luz quente
lateral suave, fundo desfocado de mesa de madeira. Composição quadrada,
sem exagero de styling — sobremesa caseira, não de vitrine de
confeitaria.
```

## 11. Sorbet da Fruta da Estação (quadrada, ~1:1)
Uso: card do cardápio (sobremesa).

```
Fotografia editorial de sobremesa, duas bolas de sorbet de fruta da
estação (tom vibrante natural, ex: framboesa ou manga) numa taça de
vidro simples, uma folha de hortelã de guarnição, gotas de condensação
na taça. Luz quente lateral, fundo desfocado escuro. Composição
quadrada, cores vivas da fruta contrastando com o fundo escuro.
```

## 12. Da Feira à Mesa — "O Quadro" (quadrada, ~1:1)
Uso: selo de canto (56px) do card de processo — precisa ler bem em
miniatura, evitar detalhe fino demais.

```
Fotografia editorial de um quadro-negro de ardósia na entrada de um
bistrô, cardápio do dia escrito à mão a giz branco, uma lâmpada
pendente iluminando de lado. Sem pessoas (ou só uma mão seg­u­rando o
giz, fora de foco). Luz quente e baixa, grão de filme sutil.
Composição quadrada.
```

## 13. Da Feira à Mesa — "A Mise en Place" (quadrada, ~1:1)
Uso: selo de canto (56px) do card de processo — mesma observação do
item 12.

```
Fotografia editorial de uma bancada de cozinha profissional durante a
mise en place, potes pequenos com ingredientes organizados (ervas
picadas, especiarias, molhos), uma faca de chef desfocada ao fundo.
Sem rostos. Luz quente lateral, grão de filme sutil. Composição
quadrada.
```

---

### Depois de gerar

Me manda os arquivos aqui no chat, um a um ou todos juntos, dizendo qual
número/seção é cada um. Eu troco os cards do cardápio (hoje só com ícone)
pelas fotos reais, e — se você gerar o vídeo do item 1 — troco o Hero
tipográfico atual por um Hero com vídeo de fundo, no mesmo padrão que já
funciona na CERNE (`isDesktop && !reducedMotion`, Ken Burns como fallback
mobile).
