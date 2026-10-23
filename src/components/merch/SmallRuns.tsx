import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';

export interface SmallRunsProps {
  onMerchClick?: () => void;
  isTest?: boolean;
}

/**
 * SmallRuns Component
 * Limited apparel and capsule showcase:
 * - Left column: "SMALL RUNS." editorial headline, collective manifesto, and merchandise CTA
 * - Right column: 3 tall-cut vertical showcase frames
 * In default production mode, renders mysterious monolithic apparel chassis with in-development telemetry.
 * Zero hardcoded color literals.
 *
 * @param {SmallRunsProps} props - Component properties with optional merch interaction trigger.
 * @returns {JSX.Element} Rendered capsule merchandise showcase.
 */
export const SmallRuns: React.FC<SmallRunsProps> = ({ onMerchClick, isTest = false }) => {
  const items = isTest ? STRINGS.test.merch.items : STRINGS.merch.items;

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
              {isTest ? STRINGS.test.merch.cta : STRINGS.merch.cta}
            </GlowButton>
          </div>
        </div>

        {/* Right Column: 3 Vertical Tall-Cut Apparel Showcase Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none hover:border-ls-blue-laserCyan/60 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              {/* Tall Vertical Image / Chassis Container */}
              <div className="relative aspect-[9/16] overflow-hidden bg-ls-void-pure flex flex-col justify-between p-6">
                {!isTest ? (
                  <>
                    <div className="flex justify-between items-center z-10">
                      <span className="font-mono text-[9px] tracking-widest text-ls-blue-laserCyan px-2.5 py-1 bg-ls-void-pure/80 border border-ls-blue-laserCyan/30 rounded-full uppercase">
                        {'badge' in item ? (item as { badge: string }).badge : 'COMING SOON'}
                      </span>
                    </div>

                    <div className="my-auto text-center z-10 flex flex-col items-center">
                      <div className="w-12 h-16 border border-dashed border-ls-mono-hairline/60 rounded-none mb-4 flex items-center justify-center group-hover:border-ls-blue-laserCyan/60 transition-colors">
                        <span className="font-mono text-[9px] text-ls-mono-muted tracking-widest">
                          {item.number}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-ls-mono-silver uppercase">
                        COMING SOON
                      </span>
                    </div>

                    <div className="z-10 flex items-center justify-between font-mono text-[9px] text-ls-mono-muted tracking-widest uppercase">
                      <span>CHAPTER 01</span>
                      <span className="text-ls-blue-laserCyan">TO BE ANNOUNCED</span>
                    </div>

                    {/* Volumetric Dark Void Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at 50% 40%, rgba(0, 68, 255, 0.15) 0%, rgba(2, 6, 17, 0.8) 70%, var(--ls-color-void-pure) 100%)',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={'image' in item ? (item as { image: string }).image : ''}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
                    />

                    {/* Dark Vignette & Blue Laser Glaze */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, var(--ls-color-void-pure) 0%, rgba(2, 6, 17, 0.4) 60%, rgba(0, 68, 255, 0.25) 100%)',
                      }}
                    />
                  </>
                )}
              </div>

              {/* Bottom Spec Label */}
              <div className="p-5 bg-ls-void-surface/80 flex flex-col border-t border-ls-mono-hairline/40">
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

