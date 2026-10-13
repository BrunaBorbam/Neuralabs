# Neuralabs — Padrão de excelência visual para sites de clientes
**Status:** diretriz de direção criativa aprovada pela responsável do projeto em 13/10/2026.  
**Aplicação:** websites, landing pages e apresentações interativas da Neuralabs para clientes, inclusive demonstrações conceituais.  
**Referência original:** vídeo `Gravando 2026-10-09 113022.mp4` enviado à conversa do ChatGPT em 09/10/2026. O arquivo de vídeo não foi incorporado ao repositório; solicitar acesso à gravação ou seus quadros antes de avaliar semelhança visual.

## Intenção inegociável
A Neuralabs deve desenvolver experiências com o nível de direção de arte, impacto, acabamento e personalidade visual demonstrado nas referências de websites e motion do vídeo — não apenas templates com pequenas animações. A marca institucional Neuralabs mantém linguagem editorial discreta; a estética de cada cliente varia conforme seu público, produto e posicionamento.

## O que a referência demonstra (observação do vídeo, não auditoria técnica dos sites)
A gravação navega por várias referências de design apresentadas em posts de redes sociais, incluindo:
- hero de produto com composições de alimentos/café, objetos e embalagem de forte presença visual;
- experiências de hambúrguer/produto com fotografia em destaque, camadas, movimento e contraste forte;
- referências de websites 3D/imersivos e apresentações em mockups de notebooks;
- direção de arte editorial, tipografia expressiva, composição cinematográfica e variedade de linguagens de marca.
Não é um único site, nem prova de que todos os exemplos tenham boa acessibilidade, bom desempenho ou animações operacionais no código.

## Padrão de execução para cada projeto
1. **Conceito antes de template:** briefing, segmento, intenção de compra e emoção dominante; direção visual individual. Nunca aplicar a estética escura/malva da Neuralabs indistintamente a clientes.
2. **Hero memorável:** proposta de valor clara em segundos, identidade tipográfica própria e um elemento principal de altíssima qualidade (fotografia, composição, ilustração, objeto 3D ou motion) que comunica a oferta; CTA visível.
3. **Arte premium com função:** fotografia/visual de produto relevante, composição coerente, edição profissional, contraste, profundidade, materiais e textura quando fizerem sentido. Não usar 3D genérico como decoração obrigatória.
4. **Movimento deliberado:** entradas, transições, camadas e resposta ao scroll devem apoiar narrativa e hierarquia — animações fluidas, não chamativas por si. Preservar opção `prefers-reduced-motion`.
5. **Experiência responsiva REAL:** conceber versões desktop e mobile desde o início; no celular simplificar cenografia, evitar cortes de headline, sobreposição de CTAs e scrolls excessivos. Verificar tablet e diferentes larguras.
6. **Engenharia como parte do acabamento:** navegação/CTAs funcionais, sem erros visuais, assets otimizados, lazy loading fora da primeira dobra, metadados/SEO técnico, segurança e acessibilidade. WebGL/3D só quando entrega valor visual suficiente para compensar o custo, sempre com fallback leve.
7. **Conversão sem truques:** navegação clara, benefícios concretos, fricção mínima, confiança com provas verdadeiras. Nunca inventar clientes, números, depoimentos, escassez ou resultados; casos conceituais são explicitamente identificados.
8. **Produção e licenças:** usar conteúdos originais, fornecidos ou licenciados. Referências inspiram qualidade e linguagem, não autorizam copiar design, marcas, cenas ou recursos de terceiros.
9. **Qualidade antes da entrega:** revisar tipografia, grid, espaçamentos, legibilidade, estados interativos, storytelling, dispositivos e carregamento real. Capturas estáticas não substituem teste em navegador.

## Critérios técnicos de referência (metas, não resultados medidos)
- Core Web Vitals p75 em uso real como objetivo: LCP <= 2,5s; INP <= 200ms; CLS <= 0,1, quando mensuráveis.
- Animações leves buscando fluidez ~60fps em dispositivos compatíveis, degradando graciosamente em máquinas lentas.
- Garantir navegação por teclado, foco visível, semântica correta, alternativas textuais, contraste suficiente e respeito a movimento reduzido.
- Medir e testar; nunca declarar pontuações ou velocidade sem testes.

## Diferença entre portfólio institucional e entrega comercial
- **Neuralabs institucional:** quiet luxury, editorial, tecnologia refinada, assinatura própria de linhas/pontos/fluxos, quase monocromática, motion moderado, mobile leve.
- **Site de cliente:** personalidade visual adequada ao negócio, potencialmente mais colorida, sensorial, 3D ou cinematográfica; o nível de impacto e acabamento do vídeo é a referência, não uma única paleta.
- **Portfólio:** mostrar experiências navegáveis e boas decisões criativas, com documentação do processo; projetos conceito claramente rotulados.

## Critério de aprovação
Não declarar um projeto "premium" apenas por ser escuro, por usar serifas ou por incluir efeito parallax. Só considerar pronto após revisão visual desktop/mobile, teste das interações, acessibilidade, performance, conteúdo comercial e validação explícita da cliente responsável.

## Segurança de desenvolvimento
No projeto Neuralabs 2.0, trabalhar apenas na branch `feat/neuralabs-2-prototipo-20261013` até aprovação expressa. Não alterar `main`, `master`, domínio de produção `neuralabs.online`, Supabase, credenciais ou deploy de produção sem autorização explícita. A Preview deve permanecer protegida.
