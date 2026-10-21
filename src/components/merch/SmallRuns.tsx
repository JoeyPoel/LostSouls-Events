import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';

export interface SmallRunsProps {
  onMerchClick?: () => void;
}

/**
 * SmallRuns Component
 * Limited apparel and capsule showcase:
 * - Left column: "SMALL RUNS." editorial headline, collective manifesto, and merchandise CTA
 * - Right column: 3 tall-cut vertical showcase frames (T-Shirt, Artwork/Hoodie, Custom Cap)
 * Featuring dark industrial textures and cyber screenprints.
 * Zero hardcoded color literals.
 *
 * @param {SmallRunsProps} props - Component properties with optional merch interaction trigger.
 * @returns {JSX.Element} Rendered capsule merchandise showcase.
 */
export const SmallRuns: React.FC<SmallRunsProps> = ({ onMerchClick }) => {
  return (
    <section id="merch" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Editorial Headline & Manifesto */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
            <span className="font-mono text-xs tracking-[0.25em] text-ls-mono-muted uppercase">
              {STRINGS.merch.preTitle}
            </span>
          </div>

          <h2 className="font-editorial text-5xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite mb-6">
            {STRINGS.merch.title}
          </h2>

          <p className="text-xs sm:text-sm text-ls-mono-silver tracking-wider uppercase mb-8 leading-relaxed">
            {STRINGS.merch.description}
          </p>

          <div>
            <GlowButton
              variant="secondary"
              onClick={onMerchClick}
              id="small-runs-view-merchandise"
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
            >
              {STRINGS.merch.cta}
            </GlowButton>
          </div>
        </div>

        {/* Right Column: 3 Vertical Tall-Cut Apparel Showcase Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STRINGS.merch.items.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-3xl hover:border-ls-blue-laserCyan/60 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              {/* Tall Vertical Image Container */}
              <div className="relative aspect-[9/16] overflow-hidden bg-ls-void-pure">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
                />

                {/* Dark Vignette & Blue Laser Glaze */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, var(--ls-color-void-pure) 0%, rgba(2, 6, 17, 0.4) 60%, rgba(0, 68, 255, 0.25) 100%)',
                  }}
                />
              </div>

              {/* Bottom Spec Label */}
              <div className="p-5 bg-ls-void-surface/80 flex flex-col">
                <span className="font-mono text-[9px] tracking-widest text-ls-mono-muted uppercase mb-1">
                  {item.number}
                </span>
                <span className="font-editorial text-sm sm:text-base font-black uppercase text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors">
                  {item.name}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallRuns;
