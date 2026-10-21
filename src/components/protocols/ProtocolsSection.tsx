import React from 'react';
import { STRINGS } from '@/constants/strings';
import { useAccordion } from '@/hooks/useAccordion';

/**
 * ProtocolsSection Component
 * Cyber ritual tablets detailing entry doctrines, dress ethics,
 * and zero-tolerance warehouse safety codes.
 * Styled in the deep obsidian teaser void aesthetic with cyan accents.
 * Zero sigil stars, zero hardcoded color literals.
 *
 * @returns {JSX.Element} Rendered house rules and protocols accordion section.
 */
export const ProtocolsSection: React.FC = () => {
  const { isOpen, toggle } = useAccordion({
    allowMultiple: true,
    defaultOpenId: 'age',
  });

  return (
    <section id="protocols" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
          <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
            {STRINGS.protocols.preTitle}
          </span>
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
          {STRINGS.protocols.title}
        </h2>
        <p className="mt-3 text-xs sm:text-sm tracking-[0.2em] text-ls-mono-silver uppercase">
          {STRINGS.protocols.subtitle}
        </p>
      </div>

      {/* Accordion Drawers - Fixed Full Width & Smoothly Animated */}
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {STRINGS.protocols.rules.map((rule, idx) => {
          const active = isOpen(rule.id);
          const indexPrefix = (idx + 1).toString().padStart(2, '0');

          return (
            <div
              key={rule.id}
              className={`w-full border rounded-2xl transition-all duration-300 bg-ls-void-abyss/60 backdrop-blur-sm relative overflow-hidden ${
                active
                  ? 'border-ls-blue-laserCyan/80 shadow-laser-subtle'
                  : 'border-ls-mono-hairline/60 hover:border-ls-blue-laserCyan/50'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(rule.id)}
                className="w-full p-5 sm:p-7 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                aria-expanded={active}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span
                    className={`font-mono text-xs tracking-[0.25em] transition-colors duration-300 ${
                      active ? 'text-ls-blue-laserCyan' : 'text-ls-mono-muted'
                    }`}
                  >
                    {indexPrefix}
                  </span>
                  <span className="font-editorial text-base sm:text-lg font-bold uppercase tracking-wider text-ls-mono-pureWhite">
                    {rule.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-lg transition-transform duration-300 transform ${
                      active ? 'rotate-45 text-ls-blue-laserCyan' : 'text-ls-mono-silver'
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Smooth Grid-Height Expansion Animation */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-white/[0.04] bg-transparent">
                    <p className="text-xs sm:text-sm tracking-wider text-ls-mono-silver uppercase leading-relaxed max-w-3xl">
                      {rule.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProtocolsSection;
