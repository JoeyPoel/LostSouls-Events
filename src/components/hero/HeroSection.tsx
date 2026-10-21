import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';
import { WaitlistForm } from '@/components/teaser/WaitlistForm';

export interface HeroSectionProps {
  onTicketClick: () => void;
  onLineupClick: () => void;
}

/**
 * HeroSection Component
 * Renders an ultra-minimalistic, atmospheric front page for the test site (/test):
 * - Monolithic "LØST SØULS" editorial headline with laser text glow
 * - Cryptic subtitle: "SOMETHING BIG IS COMING..."
 * - Seamless waitlist transmission gateway
 * - Minimalist Chapter 01 telemetry indicator and direct entry action triggers
 * - Uncluttered, expansive void aesthetic with the living blue shadow at the middle bottom
 * - Zero hardcoded color literals.
 *
 * @param {HeroSectionProps} props - Component properties for ticket and lineup triggers.
 * @returns {JSX.Element} Rendered minimalist hero section.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onTicketClick,
  onLineupClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden bg-transparent text-ls-mono-pureWhite select-none"
    >
      {/* Centerpiece: Monolithic Brand Title + Subtitle + Waitlist Gateway */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full my-auto py-6">
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-[0.14em] sm:tracking-[0.2em] text-ls-blue-iceStrobe uppercase laser-glow-text whitespace-nowrap transition-all duration-700">
          {STRINGS.teaser.brandTitle}
        </h1>

        <p className="mt-5 sm:mt-7 font-mono text-xs sm:text-sm md:text-base tracking-[0.35em] sm:tracking-[0.55em] text-ls-mono-silver uppercase opacity-85">
          {STRINGS.teaser.subtitle}
        </p>

        {/* Priority Waitlist Transmission Gateway */}
        <WaitlistForm />

        {/* Minimalist First Event Entry Action Triggers */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <GlowButton
            variant="primary"
            onClick={onTicketClick}
            id="hero-buy-final-soul"
            className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
          >
            {STRINGS.hero.primaryCta}
          </GlowButton>

          <GlowButton
            variant="secondary"
            onClick={onLineupClick}
            id="hero-view-lineup"
            className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest border border-ls-mono-hairline hover:border-ls-blue-laserCyan hover:text-ls-blue-laserCyan text-ls-mono-pureWhite bg-ls-void-abyss/80"
          >
            {STRINGS.hero.secondaryCta}
          </GlowButton>
        </div>
      </div>

      {/* Bottom Minimalist Scroll Prompt */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <button
          type="button"
          onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-mono text-[10px] tracking-[0.35em] text-ls-mono-muted hover:text-ls-blue-laserCyan transition-colors uppercase cursor-pointer"
        >
          {STRINGS.meta.scrollPrompt}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
