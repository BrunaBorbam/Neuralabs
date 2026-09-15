import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';

export const metadata = {
  title: 'Portfólio | Neuralabs',
  description: 'Nossos casos de sucesso em web design e neuromarketing.',
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 text-pearl-200 pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <Badge variant="primary" className="mb-6 mx-auto">
            Nosso Portfólio
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight text-pearl-100">
            Experiências que <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
              ditam o mercado
            </span>
          </h1>
          
          <p className="text-lg text-pearl-300/70 mb-16 max-w-2xl mx-auto">
            Em breve, você poderá navegar pelos nossos estudos de caso profundos, entendendo as decisões exatas de arquitetura de conversão que geraram picos de receita para nossos clientes de alto padrão.
          </p>

          <div className="p-12 border border-pearl-100/10 rounded-2xl bg-obsidian-800/50 backdrop-blur-sm max-w-3xl mx-auto">
            <span className="text-5xl mb-6 block">🚧</span>
            <h3 className="text-2xl font-bold text-pearl-100 mb-4">Esta página está em construção</h3>
            <p className="text-pearl-300/60 mb-8">
              Estamos curando nossos melhores projetos para publicar aqui com toda a riqueza de detalhes técnicos que você merece ler.
            </p>
            <a 
              href={getWhatsAppLink('Olá, vim pela página de Portfólio e gostaria de ver alguns trabalhos recentes de vocês.')} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-pearl-100 text-obsidian-900 font-bold hover:scale-105 transition-transform"
            >
              Pedir para ver o portfólio no WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
