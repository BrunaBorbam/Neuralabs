import { Brain } from 'lucide-react';

export const Logo = ({ className = '' }: { className?: string }) => (
  <a href="#top" className={`inline-flex items-center gap-2 group ${className}`}>
    <Brain className="w-6 h-6 text-[#D8C2B8] transition-transform duration-300 group-hover:scale-110" />
    <span className="font-sans font-bold tracking-widest text-[#FAF7F2] text-lg uppercase">
      NEURALABS
    </span>
  </a>
);
