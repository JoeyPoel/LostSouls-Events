import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';

export interface MonolithicBannerProps {
  onTicketClick: () => void;
}

/**
 * MonolithicBanner Component
 * Renders the high-contrast transitional power statement matching reference image 2:
 * - Top metadata stamp: ■ 14 NOVEMBER 2026 • NOW&WOW
 * - Monolithic dual-chroma editorial headline: "INTO THE" (Pure White) / "ABYSS" (Cobalt / Cyan glow)
 * - Industrial telemetry ledger: 23:00–07:00 • ROTTERDAM • 18+ • FINAL SOUL
 * - Direct radiant entry CTA
 * Zero hardcoded color literals.
 *
 * @param {MonolithicBannerProps} props - Component properties with ticket checkout trigger.
 * @returns {JSX.Element} Rendered monolithic banner section.
 */
export const MonolithicBanner: React.FC<MonolithicBannerProps> = ({ onTicketClick }) => {
  return (
    <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-ls-void-pure border-y border-ls-mono-hairline relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Top Wireframe Metadata Stamp */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-ls-mono-silver uppercase">
            {STRINGS.monolithicBanner.badge}
          </span>
        </div>

        {/* Monumental Editorial Dual-Chroma Headline */}
        <h2 className="font-editorial text-6xl sm:text-8xl md:text-9xl uppercase font-black leading-[0.88] tracking-tight mb-8">
          <span className="block text-ls-mono-pureWhite drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
            {STRINGS.monolithicBanner.headlineMain}
          </span>
          <span className="block text-ls-blue-laserCyan laser-glow-text mt-1">
            {STRINGS.monolithicBanner.headlineAccent}
          </span>
        </h2>

        {/* Industrial Telemetry Spec Line */}
        <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-ls-mono-muted uppercase mb-10">
          {STRINGS.monolithicBanner.telemetryLine}
        </p>

        {/* Radiant Ticket Action */}
        <GlowButton
          variant="primary"
          onClick={onTicketClick}
          id="monolithic-get-final-soul"
          className="px-10 py-4 text-xs font-bold uppercase tracking-widest"
        >
          {STRINGS.monolithicBanner.cta}
        </GlowButton>
      </div>
    </section>
  );
};

export default MonolithicBanner;
