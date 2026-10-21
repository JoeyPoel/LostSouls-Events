import React from 'react';
import { STRINGS } from '@/constants/strings';
import type { EventEdition } from '@/types/event.types';
import { useCountdown } from '@/hooks/useCountdown';
import { WireBadge } from '@/components/common/WireBadge';
import { TicketMatrix } from '@/components/tickets/TicketMatrix';

export interface EventsSectionProps {
  event: EventEdition;
}

/**
 * EventsSection Component
 * Reconstructs the signature "FINAL INFO" event flyer aesthetic for Chapter 01:
 * - Direct-flash dark rave backdrop
 * - Industrial house rules ledger
 * - Wireframe [ 92% SOLD OUT ] badge
 * - Multi-tier ticketing machinery
 * Zero sigil stars, zero pulsing dots, zero hardcoded color literals.
 *
 * @param {EventsSectionProps} props - Event edition metadata and ticketing configurations.
 * @returns {JSX.Element} Rendered split events and ticketing section.
 */
export const EventsSection: React.FC<EventsSectionProps> = ({ event }) => {
  const countdown = useCountdown(event.eventDate);

  const countdownUnits = [
    { label: STRINGS.eventSection.countdownLabels.days, value: countdown.days },
    { label: STRINGS.eventSection.countdownLabels.hours, value: countdown.hours },
    { label: STRINGS.eventSection.countdownLabels.minutes, value: countdown.minutes },
    { label: STRINGS.eventSection.countdownLabels.seconds, value: countdown.seconds },
  ];

  return (
    <section id="events" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
            <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
              {STRINGS.eventSection.sectionPreTitle}
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
            {event.title}
          </h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <WireBadge variant="cyan" className="whitespace-nowrap shrink-0">
            {STRINGS.eventSection.upcomingBadge}
          </WireBadge>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Authentic "FINAL INFO" Flyer Chassis */}
        <div className="lg:col-span-5 relative group">
          <div className="relative bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none p-2 shadow-laser-subtle group-hover:border-ls-blue-laserCyan/60 transition-all duration-500 overflow-hidden backdrop-blur-sm">
            {/* Poster Imagery with Dark Haze */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-ls-void-pure">
              <img
                src={event.heroImage}
                alt={event.title}
                className="w-full h-full object-cover grayscale contrast-125 brightness-60 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, var(--ls-color-void-pure) 0%, rgba(2, 6, 17, 0.6) 50%, var(--ls-color-void-pure) 100%)',
                }}
              />

              {/* "FINAL INFO" Overlay Flyer Content Directly Mirroring Reference Post */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 select-none">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-black uppercase text-ls-blue-iceStrobe laser-glow-text tracking-wide mb-4">
                    {STRINGS.eventSection.finalInfoTitle}
                  </h3>

                  {/* House Rules Bulleted Ledger */}
                  <ul className="space-y-2.5 font-mono text-[10px] sm:text-[11px] tracking-wider text-ls-mono-pureWhite uppercase">
                    {STRINGS.eventSection.flyerRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan shrink-0 mt-1.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 92% Sold Out Wireframe Tag */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ls-mono-hairline/40">
                  <span className="font-editorial text-xl sm:text-2xl font-black text-ls-mono-pureWhite tracking-wide whitespace-nowrap shrink-0">
                    {STRINGS.tickets.capacityAlertBadge}
                  </span>
                  <WireBadge variant="cyan" className="text-[9px] sm:text-[10px] tracking-[0.12em] whitespace-nowrap shrink-0">
                    {STRINGS.meta.timestampStamp}
                  </WireBadge>
                </div>
              </div>
            </div>

            {/* Event Metadata Ledger */}
            <div className="p-5 border-t border-ls-mono-hairline/40 bg-transparent">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-ls-mono-muted uppercase mb-2">
                <span>{STRINGS.eventSection.coordinatesLabel}</span>
                <span className="text-ls-mono-pureWhite">{event.city}</span>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-ls-mono-muted uppercase">
                <span>{STRINGS.eventSection.venueLabel}</span>
                <span className="text-ls-blue-laserCyan font-bold">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Doors Countdown & Ticket Reservation Engine */}
        <div className="lg:col-span-7 flex flex-col gap-8 relative">
          {/* Clean Countdown Card */}
          <div className="p-6 sm:p-8 bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none relative shadow-laser-subtle backdrop-blur-sm z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
                  {STRINGS.eventSection.doorsOpenNotice}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {countdownUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="p-4 sm:p-6 bg-ls-void-pure/40 border border-white/[0.05] rounded-none flex flex-col items-center justify-center text-center relative group hover:border-ls-blue-laserCyan/40 transition-all duration-300"
                >
                  <span className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-ls-blue-iceStrobe group-hover:text-ls-blue-laserCyan transition-colors">
                    {unit.value}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-ls-mono-silver uppercase mt-1">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Matrix */}
          <div className="relative z-10">
            <TicketMatrix eventId={event.id} tiers={event.ticketTiers} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
