import React from 'react';
import { STRINGS } from '@/constants/strings';
import type { Artist } from '@/types/event.types';
import { GlowButton } from '@/components/common/GlowButton';
import { LaserTunnel } from '@/components/common/LaserTunnel';

export interface LineupLedgerProps {
  artists: Artist[];
  onTicketClick?: () => void;
}

/**
 * LineupLedger Component
 * Implements the signature split stage layout matching reference image 4:
 * - Left column: "MAIN STAGE" headline with precision numbered roster ledger (01..06)
 * - Right column: Sticky ticket reservation summary box with pricing breakdown & radiant CTA
 * Zero hardcoded color literals.
 *
 * @param {LineupLedgerProps} props - Component properties with artists roster and ticket callback.
 * @returns {JSX.Element} Rendered split lineup and ticket summary section.
 */
export const LineupLedger: React.FC<LineupLedgerProps> = ({ artists, onTicketClick }) => {
  // Curated artist roster mapping to the industrial sound in the reference
  const stageArtists = artists.length > 0 ? artists : [
    { id: 'art-01', name: 'INDUSTRIX', performance: 'INDUSTRIAL / BOCHKA', orderIndex: 1, stage: 'MAIN STAGE', eventId: 'evt-01' },
    { id: 'art-02', name: 'REDBATUN', performance: '2-HOUR HYBRID LIVE', orderIndex: 2, stage: 'MAIN STAGE', eventId: 'evt-01' },
    { id: 'art-03', name: 'JAPAU', performance: 'HYBRID', orderIndex: 3, stage: 'MAIN STAGE', eventId: 'evt-01' },
    { id: 'art-04', name: 'VENATOR', performance: 'INDUSTRIAL', orderIndex: 4, stage: 'MAIN STAGE', eventId: 'evt-01' },
    { id: 'art-05', name: 'ØRBENYX B2B N|E|O', performance: 'B2B', orderIndex: 5, stage: 'MAIN STAGE', eventId: 'evt-01' },
    { id: 'art-06', name: 'MORTIS B2B OUTRAGE', performance: 'DARK CLOSING', orderIndex: 6, stage: 'MAIN STAGE', eventId: 'evt-01' },
  ];

  const ticketBreakdown = [
    { label: STRINGS.tickets.breakdownPhase, value: STRINGS.hero.activeTierName },
    { label: STRINGS.tickets.breakdownTicket, value: '€31.15' },
    { label: STRINGS.tickets.breakdownFee, value: '€2.85' },
    { label: STRINGS.tickets.breakdownPrice, value: STRINGS.hero.priceDisplay },
    { label: STRINGS.tickets.breakdownAge, value: STRINGS.telemetryRibbon.accessValue },
  ];

  return (
    <section id="lineup" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Horizontal laser scan beam cutting through haze */}
      <LaserTunnel mode="horizontal-scan" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: MAIN STAGE Headline and Numbered Ledger */}
        <div className="lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-ls-mono-hairline">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan" />
                <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
                  {STRINGS.lineupLedger.preTitle}
                </span>
              </div>
              <h2 className="font-editorial text-5xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
                {STRINGS.lineupLedger.sectionTitle}
              </h2>
            </div>

            <p className="font-mono text-xs text-ls-mono-silver uppercase max-w-xs leading-relaxed">
              {STRINGS.lineupLedger.description}
            </p>
          </div>

          {/* Numbered Ledger Rows */}
          <div className="divide-y divide-ls-mono-hairline border-y border-ls-mono-hairline">
            {stageArtists.map((artist, idx) => {
              const formattedIndex = (idx + 1).toString().padStart(2, '0');

              return (
                <div
                  key={artist.id}
                  className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group hover:bg-ls-void-abyss px-2 transition-all duration-300"
                >
                  {/* Left: Index & Artist Name */}
                  <div className="flex items-baseline gap-6 sm:gap-8">
                    <span className="font-mono text-xs tracking-[0.2em] text-ls-blue-laserCyan/70 group-hover:text-ls-blue-laserCyan transition-colors">
                      {formattedIndex}
                    </span>
                    <span className="font-editorial text-2xl sm:text-4xl font-black uppercase tracking-tight text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors">
                      {artist.name}
                    </span>
                  </div>

                  {/* Right: Format Specification */}
                  <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-ls-mono-muted group-hover:text-ls-mono-silver uppercase transition-colors sm:text-right">
                    {artist.performance}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Ticket Telemetry Box */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-ls-void-abyss border border-ls-mono-hairline p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Border Cyan Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ls-blue-laserCyan to-transparent opacity-80" />

            <div>
              {/* Badge & Title */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-ls-blue-laserCyan uppercase">
                  {STRINGS.tickets.headerTitle}
                </span>
              </div>

              {/* Price Big Display */}
              <div className="mb-2">
                <span className="font-editorial text-4xl sm:text-5xl font-black text-ls-mono-pureWhite tracking-tight">
                  {STRINGS.hero.priceDisplay}
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase mb-8">
                {STRINGS.hero.serviceFeeNotice}
              </p>

              {/* Price Breakdown Ledger */}
              <div className="border-t border-ls-mono-hairline divide-y divide-ls-mono-hairline mb-8">
                {ticketBreakdown.map((row) => (
                  <div key={row.label} className="py-2.5 flex items-center justify-between font-mono text-xs">
                    <span className="text-ls-mono-muted uppercase tracking-wider">{row.label}</span>
                    <span className="text-ls-mono-pureWhite font-medium tracking-wide">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Radiant Entry CTA */}
            <GlowButton
              variant="primary"
              onClick={onTicketClick}
              id="lineup-get-final-soul"
              className="w-full py-4 text-xs font-bold uppercase tracking-widest bg-ls-blue-cobalt hover:bg-ls-blue-laserCyan text-ls-mono-pureWhite border border-ls-blue-laserCyan shadow-laser-subtle"
            >
              {STRINGS.hero.primaryCta}
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LineupLedger;
