import React from 'react';
import { STRINGS } from '@/constants/strings';
import { WireBadge } from '@/components/common/WireBadge';

/**
 * AboutSection Component
 * Dedicated community manifesto detailing the core Lost Souls philosophy:
 * - Counter-movement against commercial raves and celebrity headliner inflation
 * - Sacred dancefloor sanctuary: no filming for socials, dancing to detach from life
 * - Rising talent platform: real debut proving grounds for emerging, fearless artists
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} Rendered About / Community Manifesto section.
 */
export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Lost Souls community manifesto"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none"
    >
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
          <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
            {STRINGS.about.badge}
          </span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite leading-[1.05]">
          {STRINGS.about.headlineMain}{' '}
          <span className="text-ls-blue-iceStrobe laser-glow-text">
            {STRINGS.about.headlineAccent}
          </span>
        </h2>
      </div>

      {/* Manifesto Core Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12 sm:mb-16">
        {/* Left: The Raw Problem Statement (Counter-Commercial) */}
        <div className="lg:col-span-6 p-7 sm:p-10 bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none shadow-laser-subtle backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.05]">
              <span className="font-mono text-xs tracking-[0.25em] text-ls-mono-muted uppercase">
                THE REBELLION
              </span>
              <WireBadge variant="cyan">RAW UNDERGROUND</WireBadge>
            </div>
            
            <p className="font-editorial text-2xl sm:text-3xl font-black uppercase text-ls-mono-pureWhite leading-snug mb-6">
              {STRINGS.about.lead}
            </p>
            
            <p className="text-sm sm:text-base text-ls-mono-silver leading-relaxed font-sans opacity-90">
              {STRINGS.about.mission}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center gap-2.5 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-ls-blue-laserCyan animate-pulse shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest sm:tracking-[0.2em] text-ls-blue-laserCyan uppercase whitespace-nowrap">
              COMMUNITY DRIVEN • BE IN THE MOMENT
            </span>
          </div>
        </div>

        {/* Right: Rising Talent & Next Generation Platform */}
        <div className="lg:col-span-6 p-7 sm:p-10 bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none shadow-laser-subtle backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.05]">
              <span className="font-mono text-xs tracking-[0.25em] text-ls-mono-muted uppercase">
                ARTIST PLATFORM
              </span>
              <WireBadge variant="cyan">EMERGING DEBUTS</WireBadge>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-ls-blue-iceStrobe laser-glow-text mb-6">
              {STRINGS.about.launchpadTitle}
            </h3>

            <p className="text-sm sm:text-base text-ls-mono-silver leading-relaxed font-sans opacity-90">
              {STRINGS.about.launchpadText}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase">
              RISING TALENT • 2026 DEBUT ROSTER
            </span>
            <span className="font-mono text-xs text-ls-blue-laserCyan font-bold tracking-widest">
              140–165 BPM
            </span>
          </div>
        </div>
      </div>

      {/* 3 Raw Architectural Manifesto Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STRINGS.about.pillars.map((pillar) => (
          <div
            key={pillar.number}
            className="p-6 sm:p-8 bg-ls-void-abyss/40 border border-ls-mono-hairline/60 rounded-none shadow-laser-subtle backdrop-blur-sm group hover:border-ls-blue-laserCyan/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan/80 group-hover:text-ls-blue-laserCyan transition-colors">
                  {pillar.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan/50 group-hover:bg-ls-blue-laserCyan transition-colors" />
              </div>

              <h4 className="font-editorial text-lg sm:text-xl font-black uppercase text-ls-mono-pureWhite tracking-wide mb-3 group-hover:text-ls-blue-iceStrobe transition-colors">
                {pillar.title}
              </h4>

              <p className="text-xs sm:text-sm text-ls-mono-silver/90 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.04]">
              <span className="font-mono text-[9px] tracking-widest text-ls-mono-muted uppercase group-hover:text-ls-mono-silver transition-colors">
                LOST SOULS DOCTRINE
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
