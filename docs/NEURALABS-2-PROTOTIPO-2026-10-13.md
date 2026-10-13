# Neuralabs 2.0 — Protótipo isolado (13/10/2026)

## Escopo aprovado

Estúdio premium internacional, com página comercial segmentada para empresários brasileiros em Orlando (primeiro nicho de prospecção: cleaning services). Sem exposição pessoal da fundadora, sem tabela de preços no site institucional. Oferta de Orlando ainda em validação: não anunciar valor ou prazo como definitivos.

## Rotas do protótipo

- /neuralabs-2 — homepage editorial e visualização conceitual de volume/movimento;
- /neuralabs-2/servicos — serviços, processo e compromissos;
- /neuralabs-2/portfolio — estudos de caso CERNE e Villa Serena, com demos navegáveis existentes;
- /neuralabs-2/contato — qualificação simulada, sem capturar nem transmitir dados pessoais;
- /neuralabs-2/orlando — página piloto do primeiro segmento comercial.

Todos os conteúdos das cinco páginas têm variantes PT/EN via controle de idioma e links com query ?lang=en. Os estudos de caso são **conceituais** e não sugerem clientes reais ou ganhos medidos.

## Restrições e não-objetivos

- **Não editar nem mesclar em main** sem aprovação explícita da proprietária.
- Não publicar em produção nem modificar Vercel ou Supabase.
- O protótipo utiliza CSS escopado em .n2-root e um segmento Next.js isolado.
- Não associar leads a serviços existentes, não criar tabela Supabase e não tocar na antiga infraestrutura de forms nesta fase.
- A jornada em /contato só percorre três perguntas sem persistência; **não é um formulário comercial funcional**.
- As demos CERNE e Villa Serena ainda contêm dados ilustrativos (depoimentos, números e disponibilidade) que requerem revisão antes de divulgação comercial; seu rodapé já identifica conteúdo fictício.
- O efeito da homepage é um conceito SVG/CSS leve; uma implementação 3D real depende de homologação visual e de desempenho, não foi prometida como entregue.
- Página privada por arquitetura e metadados noindex, mas **não autenticada**: um eventual Preview URL pode ser acessado por quem o possuir, conforme as configurações da hospedagem.
- Seguir a correção de segurança na branch separada fix/formulario-supabase-seguro-20261009, somente após revisão da configuração do Redis e do Supabase.

## Validações pendentes

1. Build Next.js/TypeScript e checagens automatizadas.
2. Teste visual mobile 320/390/768/1440 px, Safari e Chrome.
3. Acessibilidade com teclado e leitores de tela.
4. Web Vitals e orçamento de animações.
5. Revisão de conteúdos PT/EN e SEO localizado (rotas canônicas e hreflang futuros).
6. Aprovação visual e comercial da proprietária antes de qualquer deploy/merge.

## Direção visual

Obsidiana #0B0A0E, malva #B98CA8, pérola #FAF7F2 e prata #B7BFC6. Newsreader editorial para headlines, Inter para UI; símbolo autoral provisório como gesto geométrico, sem cérebro genérico. Layout editorial fluido, alto contraste de hierarquia e movimentos que respeitam prefers-reduced-motion. CTA de contato dirige ao simulador, não promete envio.

## Configuração de Preview (13/10/2026)

- Credenciais HTTP Basic Auth cadastradas na Vercel exclusivamente com target Preview e gitBranch `feat/neuralabs-2-prototipo-20261013`.
- **Não registrar credenciais neste documento nem no repositório.**
- Esta atualização provoca nova compilação da branch para incorporar as variáveis de ambiente; nenhuma implantação em Production é solicitada.
- Proteção da plataforma Vercel também permanece habilitada. Mesmo com Basic Auth, a primeira camada pode exigir login Vercel autorizado.
- Próxima etapa: testar resposta da Preview e revisar logs de build, sem alterar configurações globais de autenticação.
