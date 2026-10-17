import React from 'react';
import { STRINGS } from '@/constants/strings';
import { Noise } from '@/components/common/Noise';
import { WaitlistForm } from '@/components/teaser/WaitlistForm';

/**
 * App Component
 * Renders the minimalist, atmospheric teaser void for Lost Souls.
 * Strips all external UI to establish total pitch-black underground mystery:
 * Centered monolithic brand title, cryptic announcement, and waitlist transmission gateway.
 *
 * @returns {JSX.Element} The mysterious void teaser interface.
 */
export const App: React.FC = () => {
  return (
    <main className="min-h-screen min-h-[100dvh] w-full bg-ls-void-pure text-ls-mono-pureWhite flex flex-col items-center justify-center relative overflow-hidden select-none px-6">
      {/* Heavy Warehouse Analog Noise Overlay */}
      <Noise />

      {/* Volumetric Subterranean Void Ambience */}
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

      {/* Mysterious Monolithic Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full">
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-ls-mono-pureWhite uppercase laser-glow-text whitespace-nowrap transition-all duration-700">
          {STRINGS.teaser.brandTitle}
        </h1>

        <p className="mt-6 sm:mt-8 font-mono text-xs sm:text-sm md:text-base tracking-[0.35em] sm:tracking-[0.55em] text-ls-mono-silver uppercase opacity-85 animate-pulse">
          {STRINGS.teaser.subtitle}
        </p>

        {/* Priority Waitlist Transmission Gateway */}
        <WaitlistForm />
      </div>
    </main>
  );
};

export default App;

