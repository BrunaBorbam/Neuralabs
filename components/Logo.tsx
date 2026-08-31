import { Brain } from 'lucide-react';

export const Logo = ({ className = '' }: { className?: string }) => (
  <a href="#top" className={`inline-flex items-center gap-2 group flex-shrink-0 ${className}`}>
    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8C2B8] transition-transform duration-300 group-hover:scale-110" />
    <span className="font-sans font-bold tracking-widest text-[#FAF7F2] text-base sm:text-lg uppercase whitespace-nowrap">
      NEURALABS
    </span>
  </a>
);
