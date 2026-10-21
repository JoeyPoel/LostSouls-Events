import React from 'react';
import { STRINGS } from '@/constants/strings';
import { Noise } from '@/components/common/Noise';
import { WaitlistForm } from '@/components/teaser/WaitlistForm';

/**
 * TeaserView Component
 * Renders the minimalist public teaser void displayed at the normal root domain (/):
 * - Monolithic "LØST SØULS" title in editorial serif with laser text glow
 * - Volumetric subterranean blue shadow centered directly behind the centerpiece
 * - Cryptic announcement: "SOMETHING BIG IS COMING..."
 * - Seamless floating waitlist transmission gateway
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The public teaser interface.
 */
export const TeaserView: React.FC = () => {
  return (
    <main className="min-h-screen h-screen w-full bg-ls-void-pure text-ls-mono-pureWhite flex flex-col items-center justify-center relative overflow-hidden select-none px-6">
      {/* Heavy Warehouse Analog Noise Overlay */}
      <Noise />

      {/* Volumetric Subterranean Void Ambience - Centered directly behind LØST SØULS */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[120px] opacity-25 animate-fog-drift"
          style={{
            background:
              'radial-gradient(circle, var(--ls-color-blue-cobalt) 0%, var(--ls-color-blue-deepNavy) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* Monolithic Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full">
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-ls-mono-pureWhite uppercase laser-glow-text whitespace-nowrap transition-all duration-700">
          {STRINGS.teaser.brandTitle}
        </h1>

        <p className="mt-6 sm:mt-8 font-mono text-xs sm:text-sm md:text-base tracking-[0.35em] sm:tracking-[0.55em] text-ls-mono-silver uppercase opacity-85">
          {STRINGS.teaser.subtitle}
        </p>

        {/* Priority Waitlist Transmission Gateway */}
        <WaitlistForm />
      </div>
    </main>
  );
};

export default TeaserView;
