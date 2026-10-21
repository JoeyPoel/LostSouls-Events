import React from 'react';
import { STRINGS } from '@/constants/strings';
import { Noise } from '@/components/common/Noise';
import { WaitlistForm } from '@/components/teaser/WaitlistForm';
import HalftoneBloom from '@/components/originkit/ui/halftone-bloom';
import { THEME } from '@/config/theme';

/**
 * TeaserView Component
 * Renders the minimalist public teaser void displayed at the normal root domain (/):
 * - Monolithic "LØST SØULS" title in editorial serif with laser text glow
 * - Originkit "Halftone Bloom" WebGL2 86-layer folded ribbon field with rotated halftone grid
 * - Volumetric subterranean blue shadow centered directly behind the centerpiece
 * - Cryptic announcement: "SOMETHING BIG IS COMING..."
 * - Seamless floating waitlist transmission gateway with persistent underline
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The public teaser interface.
 */
export const TeaserView: React.FC = () => {
  return (
    <main className="min-h-screen h-screen w-full bg-ls-void-pure text-ls-mono-pureWhite flex flex-col items-center justify-center relative overflow-hidden select-none px-6">
      {/* Heavy Warehouse Analog Noise Overlay */}
      <Noise />

      {/* Originkit Halftone Bloom Component */}
      <HalftoneBloom
        background={THEME.colors.void.pure}
        color1={THEME.colors.blue.laserCyan}
        color2={THEME.colors.blue.cobalt}
        speed={35}
        size={140}
        angle={180}
        dotSize={6}
        hover={180}
        reach={380}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          opacity: 0.65,
        }}
      />



      {/* Monolithic Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full">
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-ls-blue-iceStrobe uppercase laser-glow-text whitespace-nowrap transition-all duration-700">
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
