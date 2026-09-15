import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';

export const metadata = {
  title: 'O Laboratório | Neuralabs',
  description: 'Dissecando a arquitetura de conversão dos maiores players do mercado.',
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 text-pearl-200 pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <Badge variant="primary" className="mb-6 mx-auto">
            O Laboratório
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight text-pearl-100">
            A anatomia da <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
              conversão perfeita
            </span>
          </h1>
          
          <p className="text-lg text-pearl-300/70 mb-16 max-w-2xl mx-auto">
            Em breve, publicaremos nossas análises profundas dissecando como os gigantes do mercado (como Apple, Airbnb e Rolex) aplicam neurociência e arquitetura de decisão em seus sites.
          </p>

          <div className="p-12 border border-pearl-100/10 rounded-2xl bg-obsidian-800/50 backdrop-blur-sm max-w-3xl mx-auto">
            <span className="text-5xl mb-6 block">🔬</span>
            <h3 className="text-2xl font-bold text-pearl-100 mb-4">Os estudos estão no forno</h3>
            <p className="text-pearl-300/60 mb-8">
              Nossa equipe de pesquisadores está compilando os melhores exemplos de design focado em comportamento humano.
            </p>
            <a 
              href={getWhatsAppLink('Olá, vim pela página do Laboratório e gostaria de entender como aplicar a arquitetura de conversão no meu negócio.')} 
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
