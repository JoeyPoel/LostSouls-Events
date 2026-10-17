import React from 'react';
import { STRINGS } from '@/constants/strings';

/**
 * TelemetryBar Component
 * High-contrast event metadata ledger displaying date, time, venue, and age restriction.
 * Modeled directly after the reference's technical status ribbon.
 * Zero hardcoded color literals.
 */
export const TelemetryBar: React.FC = () => {
  return (
    <aside
      aria-label="Event telemetry"
      className="w-full border-y border-ls-mono-hairline bg-ls-void-abyss py-5 px-4 sm:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 font-mono uppercase">
        <div className="flex flex-col border-l border-ls-blue-laserCyan/50 pl-3">
          <span className="text-[10px] tracking-[0.25em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.dateLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-mono-pureWhite tracking-widest">
            {STRINGS.telemetryRibbon.dateValue}
          </span>
        </div>

        <div className="flex flex-col border-l border-ls-blue-laserCyan/50 pl-3">
          <span className="text-[10px] tracking-[0.25em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.timeLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-mono-pureWhite tracking-widest">
            {STRINGS.telemetryRibbon.timeValue}
          </span>
        </div>

        <div className="flex flex-col border-l border-ls-blue-laserCyan/50 pl-3">
          <span className="text-[10px] tracking-[0.25em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.venueLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-blue-laserCyan tracking-widest">
            {STRINGS.telemetryRibbon.venueValue}
          </span>
        </div>

        <div className="flex flex-col border-l border-ls-blue-laserCyan/50 pl-3">
          <span className="text-[10px] tracking-[0.25em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.accessLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-mono-pureWhite tracking-widest">
            {STRINGS.telemetryRibbon.accessValue}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default TelemetryBar;
