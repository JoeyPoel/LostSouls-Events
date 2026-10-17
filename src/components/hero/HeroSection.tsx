import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';
import { useCountdown } from '@/hooks/useCountdown';
import { CyberSigil } from '@/components/common/CyberSigil';
import { LaserGrid } from '@/components/common/LaserGrid';

export interface HeroSectionProps {
  onTicketClick: () => void;
  onLineupClick: () => void;
}

/**
 * HeroSection Component
 * Reconstructs the monumental editorial dark ritual hero from the reference imagery:
 * - Stacked "INTO THE" (white) / "ABYSS" (blue laser glow) serif headline
 * - Left column: Live ticket phase (€34.00), direct entry trigger, and doors countdown
 * - Right column: Vertical event poster with blue liquid-chrome tribal artwork
 * Zero hardcoded color literals.
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
    <section className="relative min-h-[95vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden bg-ls-void-pure border-b border-ls-mono-hairline">
      {/* Volumetric Stage Lasers in Deep Background */}
      <LaserGrid intensity="subtle" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Metadata Marker */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-ls-mono-silver uppercase">
            {STRINGS.hero.metaHeader}
          </span>
        </div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Monolithic Editorial Headline, Phase Pricing & Countdown */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-ls-mono-muted uppercase mb-3 block">
              {STRINGS.hero.presents}
            </span>

            {/* Stacked Editorial Dual-Chroma Headline */}
            <h1 className="font-editorial text-6xl sm:text-8xl lg:text-9xl uppercase leading-[0.88] select-none mb-6">
              <span className="block text-ls-mono-pureWhite drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {STRINGS.hero.headlineMain}
              </span>
              <span className="block text-ls-blue-laserCyan laser-glow-text">
                {STRINGS.hero.headlineAccent}
              </span>
            </h1>

            <p className="font-mono text-xs sm:text-sm tracking-wider text-ls-mono-silver uppercase max-w-xl mb-10 leading-relaxed">
              {STRINGS.hero.manifestoSnippet}
            </p>

            {/* Ticket Phase & Pricing Banner */}
            <div className="pt-6 border-t border-ls-mono-hairline mb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-2">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase block">
                    {STRINGS.hero.activePhaseLabel}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-ls-mono-pureWhite font-bold mt-1">
                    {STRINGS.hero.activeTierName}
                  </h3>
                </div>

                <div className="sm:text-right">
                  <span className="font-editorial text-4xl sm:text-5xl font-black text-ls-blue-laserCyan tracking-tight">
                    {STRINGS.hero.priceDisplay}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase block mt-1">
                    {STRINGS.hero.serviceFeeNotice}
                  </span>
                </div>
              </div>

              <p className="font-mono text-[11px] tracking-wider text-ls-mono-muted uppercase mb-6">
                {STRINGS.hero.soldOutNotice}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <GlowButton
                  variant="primary"
                  onClick={onTicketClick}
                  id="hero-buy-final-soul"
                  className="px-8 py-4 text-xs font-bold bg-ls-blue-cobalt hover:bg-ls-blue-laserCyan text-ls-mono-pureWhite border border-ls-blue-laserCyan shadow-laser-subtle"
                >
                  {STRINGS.hero.primaryCta}
                </GlowButton>

                <GlowButton
                  variant="secondary"
                  onClick={onLineupClick}
                  id="hero-view-lineup"
                  className="px-8 py-4 text-xs font-bold"
                >
                  {STRINGS.hero.secondaryCta}
                </GlowButton>
              </div>
            </div>

            {/* Doors Opening Countdown Grid */}
            <div className="pt-6 border-t border-ls-mono-hairline">
              <span className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase block mb-3">
                {STRINGS.eventSection.doorsOpenNotice}
              </span>

              <div className="grid grid-cols-4 gap-3 max-w-md">
                {countdownUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="p-3 bg-ls-void-surface border border-ls-mono-hairline flex flex-col items-center justify-center text-center"
                  >
                    <span className="font-editorial text-2xl sm:text-3xl font-bold text-ls-mono-pureWhite">
                      {unit.value}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-ls-mono-silver uppercase mt-1">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tall Event Poster with Blue Cyber-Tribal Crest */}
          <div className="lg:col-span-5 relative group">
            <div className="relative border border-ls-blue-laserCyan/40 bg-ls-void-surface p-2 shadow-laser-subtle group-hover:border-ls-blue-laserCyan transition-all duration-500 overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden bg-ls-void-pure">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop"
                  alt="Into The Abyss Event Poster"
                  className="w-full h-full object-cover grayscale contrast-150 brightness-50 group-hover:scale-105 group-hover:brightness-65 transition-all duration-700"
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, var(--ls-color-void-pure) 0%, rgba(0, 56, 184, 0.4) 60%, transparent 100%)',
                  }}
                />

                {/* Cyber-Tribal Crest Centered on Poster */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-8 z-10 text-center select-none">
                  <div className="flex flex-col items-center">
                    <CyberSigil variant="thorny-crest" size={200} glow />
                    <h2 className="font-editorial text-3xl font-black uppercase text-ls-blue-laserCyan laser-glow-text mt-3">
                      {STRINGS.hero.headlineAccent}
                    </h2>
                  </div>

                  {/* Lineup Highlight Preview */}
                  <div className="space-y-1.5 font-editorial text-sm sm:text-base font-bold text-ls-mono-pureWhite tracking-wide">
                    <p>KOBOSIL (CLOSING)</p>
                    <p>DAX J (HYBRID LIVE)</p>
                    <p>SOMEMI B2B VORTEK</p>
                    <p>ANETHA // SARA LANDRY</p>
                  </div>

                  {/* Poster Bottom Badge */}
                  <div className="pt-4 border-t border-ls-blue-laserCyan/30 w-full flex items-center justify-between font-mono text-[9px] tracking-widest text-ls-blue-laserCyan uppercase">
                    <span>{STRINGS.meta.venueAddress}</span>
                    <span>18+ ONLY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
