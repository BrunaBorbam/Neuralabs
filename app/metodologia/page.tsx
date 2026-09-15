import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';

export const metadata = {
  title: 'Metodologia | Neuralabs',
  description: 'A ciência por trás do nosso web design de alta conversão.',
};

export default function MetodologiaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 text-pearl-200 pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <Badge variant="primary" className="mb-6 mx-auto">
            Nossa Metodologia
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight text-pearl-100">
            A Ciência por Trás da <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-400 via-blush-500 to-blush-600">
              Conversão Humana
            </span>
          </h1>
          
          <p className="text-lg text-pearl-300/70 mb-16 max-w-2xl mx-auto">
            Por que um botão na cor errada destrói o seu lucro? Entenda o framework de neurociência e psicologia de decisão que aplicamos na criação de interfaces digitais.
          </p>

          <div className="p-12 border border-pearl-100/10 rounded-2xl bg-obsidian-800/50 backdrop-blur-sm max-w-3xl mx-auto">
            <span className="text-5xl mb-6 block">🧠</span>
            <h3 className="text-2xl font-bold text-pearl-100 mb-4">Esta página está sendo escrita</h3>
            <p className="text-pearl-300/60 mb-8">
              Estamos preparando um documento completo para você entender o uso estratégico do Sistema 1 (emoção) e Sistema 2 (razão) aplicados à web.
            </p>
            <a 
              href={getWhatsAppLink('Olá, fiquei interessado na metodologia da Neuralabs e quero saber como ela se aplica ao meu negócio.')} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-pearl-100 text-obsidian-900 font-bold hover:scale-105 transition-transform"
            >
              Discutir estratégia no WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
