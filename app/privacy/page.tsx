import { motion } from 'framer-motion';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | Neuralabs',
  description: 'Política de privacidade e proteção de dados da Neuralabs conforme LGPD',
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-obsidian-900 text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-blush-300 hover:text-blush-200 mb-8 inline-block">
          ← Voltar
        </Link>

        <h1 className="text-5xl font-black font-serif mb-12">Política de Privacidade</h1>

        <div className="space-y-12 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">1. Sobre a Neuralabs</h2>
            <p>
              A Neuralabs ("empresa", "nós" ou "nosso") é comprometida em proteger sua privacidade. Esta Política de Privacidade
              explica como coletamos, usamos, divulgamos e protegemos suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">2. Informações que Coletamos</h2>
            <p className="mb-4">Coletamos informações que você nos fornece voluntariamente:</p>
            <ul className="space-y-2 ml-6">
              <li>• <strong>Formulário de Lead:</strong> Nome, email, empresa, telefone</li>
              <li>• <strong>Analytics:</strong> Páginas visitadas, tempo no site, origem do tráfego</li>
              <li>• <strong>Cookies:</strong> Preferências de consentimento e sessão</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">3. Como Usamos Suas Informações</h2>
            <ul className="space-y-2 ml-6">
              <li>• Para responder suas consultas e enviar diagnóstico</li>
              <li>• Para melhorar o site através de análise de comportamento</li>
              <li>• Para fins de marketing (apenas se você consentir)</li>
              <li>• Para cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">4. Compartilhamento de Dados</h2>
            <p className="mb-4">Seus dados são compartilhados apenas com:</p>
            <ul className="space-y-2 ml-6">
              <li>• <strong>Google Analytics:</strong> Para análise anônima de tráfego</li>
              <li>• <strong>Discord:</strong> Para notificação de novos leads (apenas nome e email)</li>
              <li>• Não vendemos seus dados a terceiros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">5. Consentimento e Cookies</h2>
            <p className="mb-4">
              O cookie banner exibe na primeira visita. Ao aceitar, você permite:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• Google Analytics para medir performance</li>
              <li>• Cookies de preferência para melhorar experiência</li>
            </ul>
            <p className="mt-4">
              Você pode revogar consentimento a qualquer momento limpando os cookies do navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">6. Segurança de Dados</h2>
            <ul className="space-y-2 ml-6">
              <li>• Usamos HTTPS para encriptar dados em trânsito</li>
              <li>• Dados armazenados com proteção apropriada</li>
              <li>• Acesso restrito a equipe autorizada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">7. Seus Direitos (LGPD)</h2>
            <p>Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>
            <ul className="space-y-2 ml-6 mt-4">
              <li>• <strong>Acesso:</strong> Ver que dados temos sobre você</li>
              <li>• <strong>Correção:</strong> Corrigir dados imprecisos</li>
              <li>• <strong>Exclusão:</strong> Deletar seus dados (direito ao esquecimento)</li>
              <li>• <strong>Portabilidade:</strong> Receber dados em formato portável</li>
              <li>• <strong>Revogação:</strong> Retirar consentimento</li>
            </ul>
            <p className="mt-4">
              Para exercer esses direitos, entre em contato conosco em: <a href="mailto:ola@neuralabs.online" className="text-blush-300 hover:text-blush-200 underline">ola@neuralabs.online</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">8. Retenção de Dados</h2>
            <ul className="space-y-2 ml-6">
              <li>• <strong>Leads:</strong> Mantidos por 2 anos ou até revogar consentimento</li>
              <li>• <strong>Analytics:</strong> Agregados e mantidos por 26 meses</li>
              <li>• <strong>Cookies:</strong> Variam de 30 dias a 2 anos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">9. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política. A data de última atualização está no final. Recomendamos revisar periodicamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">10. Contato</h2>
            <p>Dúvidas? Entre em contato:</p>
            <ul className="space-y-2 ml-6 mt-4">
              <li>• Email: <a href="mailto:ola@neuralabs.online" className="text-blush-300 hover:text-blush-200 underline">ola@neuralabs.online</a></li>
              <li>• WhatsApp: Disponível no site</li>
              <li>• Enreço: Estamos no Brasil (São Paulo, SP)</li>
            </ul>
          </section>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mt-12">
            <p className="text-sm text-slate-400">
              <strong>Última atualização:</strong> 29 de agosto de 2026
              <br />
              Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
