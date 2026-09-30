'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const EMAIL = 'ola@neuralabs.online';

const copy = {
  pt: {
    back: '← Voltar',
    title: 'Política de Privacidade',
    s1h: '1. Sobre a Neuralabs',
    s1p: 'A Neuralabs ("empresa", "nós" ou "nosso") é comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações.',
    s2h: '2. Informações que Coletamos',
    s2p: 'Coletamos informações que você nos fornece voluntariamente:',
    s2list: [
      ['Formulário de Lead:', ' Nome, email, empresa, telefone'],
      ['Analytics:', ' Páginas visitadas, tempo no site, origem do tráfego'],
      ['Cookies:', ' Preferências de consentimento e sessão'],
    ],
    s3h: '3. Como Usamos Suas Informações',
    s3list: [
      'Para responder suas consultas e enviar diagnóstico',
      'Para melhorar o site através de análise de comportamento',
      'Para fins de marketing (apenas se você consentir)',
      'Para cumprir obrigações legais',
    ],
    s4h: '4. Compartilhamento de Dados',
    s4p: 'Seus dados são compartilhados apenas com:',
    s4list: [
      ['Google Analytics:', ' Para análise anônima de tráfego'],
      ['Discord:', ' Para notificação de novos leads (apenas nome e email)'],
      ['', 'Não vendemos seus dados a terceiros'],
    ],
    s5h: '5. Consentimento e Cookies',
    s5p1: 'O cookie banner exibe na primeira visita. Ao aceitar, você permite:',
    s5list: [
      'Google Analytics para medir performance',
      'Cookies de preferência para melhorar experiência',
    ],
    s5p2: 'Você pode revogar consentimento a qualquer momento limpando os cookies do navegador.',
    s6h: '6. Segurança de Dados',
    s6list: [
      'Usamos HTTPS para encriptar dados em trânsito',
      'Dados armazenados com proteção apropriada',
      'Acesso restrito a equipe autorizada',
    ],
    s7h: '7. Seus Direitos (LGPD)',
    s7p: 'Conforme a Lei Geral de Proteção de Dados, você tem direito a:',
    s7list: [
      ['Acesso:', ' Ver que dados temos sobre você'],
      ['Correção:', ' Corrigir dados imprecisos'],
      ['Exclusão:', ' Deletar seus dados (direito ao esquecimento)'],
      ['Portabilidade:', ' Receber dados em formato portável'],
      ['Revogação:', ' Retirar consentimento'],
    ],
    s7contact: 'Para exercer esses direitos, entre em contato conosco em: ',
    s8h: '8. Retenção de Dados',
    s8list: [
      ['Leads:', ' Mantidos por 2 anos ou até revogar consentimento'],
      ['Analytics:', ' Agregados e mantidos por 26 meses'],
      ['Cookies:', ' Variam de 30 dias a 2 anos'],
    ],
    s9h: '9. Alterações nesta Política',
    s9p: 'Podemos atualizar esta política. A data de última atualização está no final. Recomendamos revisar periodicamente.',
    s10h: '10. Contato',
    s10p: 'Dúvidas? Entre em contato:',
    s10email: 'Email: ',
    s10wa: 'WhatsApp: Disponível no site',
    s10addr: 'Endereço: Estamos no Brasil (São Paulo, SP)',
    updatedLabel: 'Última atualização:',
    updatedDate: '29 de agosto de 2026',
    compliance:
      'Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).',
  },
  en: {
    back: '← Back',
    title: 'Privacy Policy',
    s1h: '1. About Neuralabs',
    s1p: 'Neuralabs ("the company", "we", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information.',
    s2h: '2. Information We Collect',
    s2p: 'We collect information you voluntarily provide to us:',
    s2list: [
      ['Lead form:', ' Name, email, company, phone'],
      ['Analytics:', ' Pages visited, time on site, traffic source'],
      ['Cookies:', ' Consent and session preferences'],
    ],
    s3h: '3. How We Use Your Information',
    s3list: [
      'To respond to your inquiries and send your diagnosis',
      'To improve the site through behavior analysis',
      'For marketing purposes (only if you consent)',
      'To comply with legal obligations',
    ],
    s4h: '4. Data Sharing',
    s4p: 'Your data is shared only with:',
    s4list: [
      ['Google Analytics:', ' For anonymous traffic analysis'],
      ['Discord:', ' For new-lead notifications (name and email only)'],
      ['', 'We do not sell your data to third parties'],
    ],
    s5h: '5. Consent and Cookies',
    s5p1: 'The cookie banner appears on your first visit. By accepting, you allow:',
    s5list: [
      'Google Analytics to measure performance',
      'Preference cookies to improve your experience',
    ],
    s5p2: 'You can revoke consent at any time by clearing your browser cookies.',
    s6h: '6. Data Security',
    s6list: [
      'We use HTTPS to encrypt data in transit',
      'Data stored with appropriate protection',
      'Access restricted to authorized staff',
    ],
    s7h: '7. Your Rights (LGPD)',
    s7p: 'Under the Brazilian General Data Protection Law, you have the right to:',
    s7list: [
      ['Access:', ' See what data we hold about you'],
      ['Correction:', ' Correct inaccurate data'],
      ['Deletion:', ' Delete your data (right to be forgotten)'],
      ['Portability:', ' Receive your data in a portable format'],
      ['Withdrawal:', ' Withdraw consent'],
    ],
    s7contact: 'To exercise these rights, contact us at: ',
    s8h: '8. Data Retention',
    s8list: [
      ['Leads:', ' Kept for 2 years or until consent is revoked'],
      ['Analytics:', ' Aggregated and kept for 26 months'],
      ['Cookies:', ' Range from 30 days to 2 years'],
    ],
    s9h: '9. Changes to This Policy',
    s9p: 'We may update this policy. The last-updated date is shown at the end. We recommend reviewing it periodically.',
    s10h: '10. Contact',
    s10p: 'Questions? Get in touch:',
    s10email: 'Email: ',
    s10wa: 'WhatsApp: Available on the site',
    s10addr: 'Address: We are in Brazil (São Paulo, SP)',
    updatedLabel: 'Last updated:',
    updatedDate: 'August 29, 2026',
    compliance:
      'This policy complies with the Brazilian General Data Protection Law (LGPD - Law No. 13.709/2018).',
  },
} as const;

export function PrivacyContent() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <div className="min-h-screen bg-obsidian-900 text-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-blush-300 hover:text-blush-200 mb-8 inline-block">
          {c.back}
        </Link>

        <h1 className="text-5xl font-black font-serif mb-12">{c.title}</h1>

        <div className="space-y-12 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s1h}</h2>
            <p>{c.s1p}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s2h}</h2>
            <p className="mb-4">{c.s2p}</p>
            <ul className="space-y-2 ml-6">
              {c.s2list.map(([b, rest], i) => (
                <li key={i}>• <strong>{b}</strong>{rest}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s3h}</h2>
            <ul className="space-y-2 ml-6">
              {c.s3list.map((item, i) => (<li key={i}>• {item}</li>))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s4h}</h2>
            <p className="mb-4">{c.s4p}</p>
            <ul className="space-y-2 ml-6">
              {c.s4list.map(([b, rest], i) => (
                <li key={i}>• {b ? <strong>{b}</strong> : null}{rest}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s5h}</h2>
            <p className="mb-4">{c.s5p1}</p>
            <ul className="space-y-2 ml-6">
              {c.s5list.map((item, i) => (<li key={i}>• {item}</li>))}
            </ul>
            <p className="mt-4">{c.s5p2}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s6h}</h2>
            <ul className="space-y-2 ml-6">
              {c.s6list.map((item, i) => (<li key={i}>• {item}</li>))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s7h}</h2>
            <p>{c.s7p}</p>
            <ul className="space-y-2 ml-6 mt-4">
              {c.s7list.map(([b, rest], i) => (
                <li key={i}>• <strong>{b}</strong>{rest}</li>
              ))}
            </ul>
            <p className="mt-4">
              {c.s7contact}<a href={`mailto:${EMAIL}`} className="text-blush-300 hover:text-blush-200 underline">{EMAIL}</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s8h}</h2>
            <ul className="space-y-2 ml-6">
              {c.s8list.map(([b, rest], i) => (
                <li key={i}>• <strong>{b}</strong>{rest}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s9h}</h2>
            <p>{c.s9p}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif text-blush-300 mb-4">{c.s10h}</h2>
            <p>{c.s10p}</p>
            <ul className="space-y-2 ml-6 mt-4">
              <li>• {c.s10email}<a href={`mailto:${EMAIL}`} className="text-blush-300 hover:text-blush-200 underline">{EMAIL}</a></li>
              <li>• {c.s10wa}</li>
              <li>• {c.s10addr}</li>
            </ul>
          </section>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mt-12">
            <p className="text-sm text-slate-400">
              <strong>{c.updatedLabel}</strong> {c.updatedDate}
              <br />
              {c.compliance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
