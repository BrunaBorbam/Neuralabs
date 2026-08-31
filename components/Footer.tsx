const FOOTER_LINKS = [
  { label: 'Pilares', href: '#pilares' },
  { label: 'Nichos', href: '#nichos' },
  { label: 'Preços', href: '#precos' },
  { label: 'Contato', href: '#contato' },
];

export const Footer = () => {
  return (
    <footer className="bg-obsidian-900 border-t border-pearl-100/10 px-6 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <span className="text-lg font-serif font-bold tracking-[0.15em] text-pearl-100">
            NEURALABS
          </span>
          <p className="text-sm text-pearl-300/60 mt-3 leading-relaxed max-w-xs">
            Websites desenhados pela neurociência da decisão humana. SEO de intenção de
            compra e neuromarketing a serviço da conversão.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-pearl-300/50 mb-2">Navegação</span>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-pearl-300/70 hover:text-blush-300 transition-colors w-fit"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-pearl-300/50 mb-2">Legal</span>
          <a href="/privacy" className="text-sm text-pearl-300/70 hover:text-blush-300 transition-colors w-fit">
            Política de Privacidade (LGPD)
          </a>
          <p className="text-sm text-pearl-300/50 mt-2 leading-relaxed">
            Seus dados são tratados em conformidade com a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-pearl-100/10 mt-10 pt-6 text-center">
        <p className="text-xs text-pearl-300/40">
          © {new Date().getFullYear()} Neuralabs — Onde Neurociência Vira Conversão.
        </p>
      </div>
    </footer>
  );
};
