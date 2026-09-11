# Referência — 31 Efeitos de Animação (biblioteca viva)

> Salvo a pedido da Bruna. Artifact original:
> https://claude.ai/code/artifact/d85d82a3-5e51-410e-a40c-70837c507145
> Arquivo estático da mesma página: `docs/references/31-efeitos-animacao.html`
> (abre em qualquer navegador, sem precisar de internet além das fontes do
> Google Fonts). Baseado na lista de exemplos da SVGator, mas com cada
> efeito rodando de verdade em HTML/CSS/JS puro — serve como catálogo de
> técnicas pra puxar referência em qualquer projeto NEURALABS.

## Efeito #1 — "Renderização em tempo real"

É o que a Bruna apontou como o efeito que gosta ("eu gosto de um efeito
assim"). Importante notar **como ele é construído nessa referência**: não é
WebGL/3D real — é um cubo em CSS puro usando `perspective` +
`transform-style: preserve-3d` + `rotateX/rotateY` num loop infinito. A
própria legenda do card já é honesta sobre isso: "Ambientes 3D navegáveis,
normalmente em WebGL. Aqui, um volume em perspectiva pura de CSS sugere a
profundidade."

Isso muda a viabilidade pra Ardósia: dá pra fazer um objeto girando "ao
vivo" (ex.: um prato de cerâmica, uma taça de vinho, um cubo de giz)
inteiramente com CSS 3D transforms — sem precisar de WebGL/react-three-fiber
e **sem depender de nenhuma ferramenta de geração de IA** (que segue
bloqueada por plano/créditos, ver `docs/ardosia-prompts-gemini.md` e o
histórico de tentativas com Higgsfield/Adobe). É bem mais simples do que a
rota de 3D real que eu tinha proposto antes.

Efeitos próximos no mesmo catálogo, caso a direção mude: #14 "Falso 3D"
(cartão com profundidade via camadas + tilt) e #19 "Isométrico" (mesma
técnica de `preserve-3d`, mas em perspectiva isométrica).

## Próximo passo

Perguntar pra Bruna se ela quer que eu implemente esse efeito (#1) no Hero
da Ardósia usando a técnica CSS pura — e qual objeto faz mais sentido pra
identidade (taça de vinho, prato de giz, o próprio emblema `UtensilsCrossed`
já usado no `IngredientOrbit`) antes de começar.
