import { Brain } from 'lucide-react';

export const Logo = ({
  className = '',
  tagline,
}: {
  className?: string;
  /** Plain-language category label shown under the wordmark — the badge
   * elsewhere ("Neurociência aplicada à conversão") sells the value prop,
   * but doesn't say "we build websites" in so many words, so a first-time
   * visitor can miss what kind of business this is. */
  tagline?: string;
}) => (
  <a href="#top" className={`inline-flex items-center gap-2 group flex-shrink-0 ${className}`}>
    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8C2B8] transition-transform duration-300 group-hover:scale-110" />
    <span className="flex flex-col leading-none">
      <span className="font-sans font-bold tracking-widest text-[#FAF7F2] text-base sm:text-lg uppercase whitespace-nowrap">
        NEURALABS
      </span>
      {tagline && (
        <span className="hidden sm:block font-sans text-[10px] tracking-wide text-blush-300/80 whitespace-nowrap mt-0.5">
          {tagline}
        </span>
      )}
    </span>
  </a>
);
