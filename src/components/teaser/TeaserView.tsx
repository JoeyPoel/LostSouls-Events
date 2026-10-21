import React from 'react';
import { STRINGS } from '@/constants/strings';
import { Noise } from '@/components/common/Noise';
import { WaitlistForm } from '@/components/teaser/WaitlistForm';
import { LivingBlueGlow } from '@/components/common/LivingBlueGlow';

/**
 * TeaserView Component
 * Renders the minimalist public teaser void for Lost Souls displayed at root (/):
 * - Monolithic "LØST SØULS" title in editorial serif with laser text glow
 * - Cryptic announcement: "SOMETHING BIG IS COMING..."
 * - Seamless floating waitlist transmission gateway
 * - Single living blue ambient shadow at middle bottom
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The public teaser interface.
 */
export const TeaserView: React.FC = () => {
  return (
    <main className="min-h-screen h-screen w-full bg-ls-void-pure text-ls-mono-pureWhite flex flex-col items-center justify-center relative overflow-hidden select-none px-6">
      {/* Heavy Warehouse Analog Noise Overlay */}
      <Noise />

      {/* Single Living Subterranean Blue Shadow at Middle Bottom */}
      <LivingBlueGlow />

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
