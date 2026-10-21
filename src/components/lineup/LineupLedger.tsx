import React from 'react';
import { STRINGS } from '@/constants/strings';
import type { Artist } from '@/types/event.types';
import { GlowButton } from '@/components/common/GlowButton';

export interface LineupLedgerProps {
  artists: Artist[];
  onTicketClick?: () => void;
}

/**
 * LineupLedger Component
 * Implements the signature split stage layout matching reference image:
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: MAIN STAGE Headline and Numbered Ledger */}
        <div className="lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
                <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
                  {STRINGS.lineupLedger.preTitle}
                </span>
              </div>
              <h2 className="font-editorial text-5xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
                {STRINGS.lineupLedger.sectionTitle}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-ls-mono-silver uppercase max-w-xs leading-relaxed">
              {STRINGS.lineupLedger.description}
            </p>
          </div>

          {/* Clean Artist Roster Cards */}
          <div className="space-y-2.5">
            {stageArtists.map((artist, idx) => {
              const formattedIndex = (idx + 1).toString().padStart(2, '0');

              return (
                <div
                  key={artist.id}
                  className="p-4 sm:p-5 rounded-none bg-ls-void-abyss/40 border border-white/[0.04] hover:border-ls-blue-laserCyan/40 hover:bg-ls-void-abyss/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group transition-all duration-300"
                >
                  {/* Left: Index & Artist Name */}
                  <div className="flex items-baseline gap-5 sm:gap-7">
                    <span className="font-mono text-xs tracking-[0.2em] text-ls-blue-laserCyan/70 group-hover:text-ls-blue-laserCyan transition-colors">
                      {formattedIndex}
                    </span>
                    <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors">
                      {artist.name}
                    </span>
                  </div>

                  {/* Right: Format Specification */}
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-ls-mono-muted group-hover:text-ls-mono-silver uppercase transition-colors sm:text-right">
                    {artist.performance}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Ticket Telemetry Box */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none p-6 sm:p-8 flex flex-col justify-between shadow-laser-subtle backdrop-blur-sm relative overflow-hidden">
            {/* Top Border Cyan Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ls-blue-laserCyan to-transparent opacity-80" />

            <div>
              {/* Badge & Title */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
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
              <p className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase mb-6">
                {STRINGS.hero.serviceFeeNotice}
              </p>

              {/* Price Breakdown Ledger */}
              <div className="space-y-2.5 py-4 my-6 border-y border-white/[0.05]">
                {ticketBreakdown.map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-xs">
                    <span className="text-ls-mono-muted uppercase tracking-wider text-[11px]">{row.label}</span>
                    <span className="text-ls-mono-pureWhite font-mono font-medium tracking-wide">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Radiant Entry CTA */}
            <GlowButton
              variant="primary"
              onClick={onTicketClick}
              id="lineup-get-final-soul"
              className="w-full py-4 text-xs font-bold uppercase tracking-widest"
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
