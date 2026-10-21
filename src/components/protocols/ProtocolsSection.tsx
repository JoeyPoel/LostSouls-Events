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
      <div className="mb-14 pb-6 border-b border-ls-mono-hairline">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
            {STRINGS.protocols.preTitle}
          </span>
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
          {STRINGS.protocols.title}
        </h2>
        <p className="mt-3 font-mono text-xs tracking-[0.25em] text-ls-mono-silver uppercase">
          {STRINGS.protocols.subtitle}
        </p>
      </div>

      {/* Accordion Drawers */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {STRINGS.protocols.rules.map((rule, idx) => {
          const active = isOpen(rule.id);
          const indexPrefix = (idx + 1).toString().padStart(2, '0');

          return (
            <div
              key={rule.id}
              className={`border cyber-cut-sm transition-all duration-300 bg-ls-void-abyss/80 relative ${
                active
                  ? 'border-ls-blue-laserCyan shadow-laser-subtle'
                  : 'border-ls-mono-hairline hover:border-ls-blue-laserCyan/40'
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
                    className={`font-mono text-xs tracking-[0.25em] ${
                      active ? 'text-ls-blue-laserCyan' : 'text-ls-mono-muted'
                    }`}
                  >
                    ■ {indexPrefix}
                  </span>
                  <span className="font-editorial text-base sm:text-lg font-bold uppercase tracking-wider text-ls-mono-pureWhite">
                    {rule.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-lg transition-transform duration-300 ${
                      active ? 'rotate-45 text-ls-blue-laserCyan' : 'text-ls-mono-silver'
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {active && (
                <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-ls-mono-hairline bg-ls-void-pure/80">
                  <p className="font-mono text-xs sm:text-sm tracking-wider text-ls-mono-silver uppercase leading-relaxed max-w-3xl">
                    {rule.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProtocolsSection;
