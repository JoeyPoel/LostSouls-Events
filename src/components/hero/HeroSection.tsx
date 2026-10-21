import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';
import { useCountdown } from '@/hooks/useCountdown';
import { WaitlistForm } from '@/components/teaser/WaitlistForm';

export interface HeroSectionProps {
  onTicketClick: () => void;
  onLineupClick: () => void;
}

/**
 * HeroSection Component
 * Merges the iconic teaser void aesthetics into the full site's first-event hero:
 * - Total obsidian black canvas with warehouse analog noise
 * - Monolithic "LØST SØULS" editorial headline with cyan/cobalt laser text glow
 * - Cryptic subtitle: "SOMETHING BIG IS COMING..."
 * - Seamless floating waitlist transmission gateway
 * - Chapter 01 telemetry marks in the Netherlands, live countdown, and direct entry actions
 * - Zero pulsing dots and zero hardcoded color literals.
 *
 * @param {HeroSectionProps} props - Component properties for ticket and lineup triggers.
 * @returns {JSX.Element} Rendered atmospheric teaser hero section.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onTicketClick,
  onLineupClick,
}) => {
  const countdown = useCountdown('2026-11-14T23:00:00.000Z');

  const countdownUnits = [
    { label: STRINGS.eventSection.countdownLabels.days, value: countdown.days },
    { label: STRINGS.eventSection.countdownLabels.hours, value: countdown.hours },
    { label: STRINGS.eventSection.countdownLabels.minutes, value: countdown.minutes },
    { label: STRINGS.eventSection.countdownLabels.seconds, value: countdown.seconds },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden bg-ls-void-pure text-ls-mono-pureWhite select-none">
      {/* Top Telemetry Stamp - No pulsing dots */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2">
        <div className="flex items-center gap-2 px-3 py-1 border border-ls-mono-hairline bg-ls-void-abyss/60 backdrop-blur-sm">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-ls-mono-silver uppercase">
            {STRINGS.meta.editionTelemetry} // {STRINGS.meta.cityCoordinates}
          </span>
        </div>
      </div>

      {/* Centerpiece: Monolithic LØST SØULS + Subtitle + Waitlist */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full my-auto py-8">
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-[0.14em] sm:tracking-[0.2em] text-ls-mono-pureWhite uppercase laser-glow-text whitespace-nowrap transition-all duration-700">
          {STRINGS.teaser.brandTitle}
        </h1>

        <p className="mt-5 sm:mt-7 font-mono text-xs sm:text-sm md:text-base tracking-[0.35em] sm:tracking-[0.55em] text-ls-mono-silver uppercase opacity-85">
          {STRINGS.teaser.subtitle}
        </p>

        {/* Priority Waitlist Transmission Gateway */}
        <WaitlistForm />

        {/* First Event Sub-Header & Manifesto */}
        <div className="mt-12 pt-8 border-t border-ls-mono-hairline/60 w-full max-w-3xl flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.3em] text-ls-blue-laserCyan uppercase mb-3">
            <span>{STRINGS.hero.headlineMain} {STRINGS.hero.headlineAccent}</span>
            <span className="text-ls-mono-muted">•</span>
            <span>{STRINGS.meta.timestampStamp}</span>
            <span className="text-ls-mono-muted">•</span>
            <span>{STRINGS.meta.venueAddress}</span>
          </div>

          <p className="font-mono text-xs sm:text-sm tracking-wider text-ls-mono-silver uppercase max-w-xl text-center leading-relaxed mb-8">
            {STRINGS.hero.manifestoSnippet}
          </p>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <GlowButton
              variant="primary"
              onClick={onTicketClick}
              id="hero-buy-final-soul"
              className="px-8 py-4 text-xs font-bold uppercase tracking-widest bg-ls-blue-cobalt hover:bg-ls-blue-laserCyan text-ls-mono-pureWhite border border-ls-blue-laserCyan shadow-laser-sharp"
            >
              {STRINGS.hero.primaryCta}
            </GlowButton>

            <GlowButton
              variant="secondary"
              onClick={onLineupClick}
              id="hero-view-lineup"
              className="px-8 py-4 text-xs font-bold uppercase tracking-widest border border-ls-mono-hairline hover:border-ls-blue-laserCyan hover:text-ls-blue-laserCyan text-ls-mono-pureWhite bg-ls-void-abyss/80"
            >
              {STRINGS.hero.secondaryCta}
            </GlowButton>
          </div>
        </div>
      </div>

      {/* Bottom Countdown & Scroll Prompt */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-6 mt-4">
        {/* Compact Doors Countdown Bar */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-ls-mono-muted uppercase mb-2">
            {STRINGS.eventSection.doorsOpenNotice}
          </span>
          <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm">
            {countdownUnits.map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <div className="px-3 py-1.5 border border-ls-mono-hairline bg-ls-void-abyss/80 flex items-center gap-1.5">
                  <span className="font-editorial text-sm sm:text-base font-bold text-ls-blue-laserCyan">
                    {unit.value}
                  </span>
                  <span className="text-[9px] tracking-widest text-ls-mono-silver">
                    {unit.label.slice(0, 1)}
                  </span>
                </div>
                {idx < countdownUnits.length - 1 && (
                  <span className="text-ls-mono-dark">:</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Scroll Prompt */}
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
