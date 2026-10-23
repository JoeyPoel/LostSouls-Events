import React from 'react';
import { STRINGS } from '@/constants/strings';

/**
 * TelemetryBar Component
 * High-contrast event metadata ledger displaying date, time, venue, and age restriction.
 * Modeled directly after the reference's technical status ribbon.
 * Zero hardcoded color literals.
 */
export interface TelemetryBarProps {
  isTest?: boolean;
}

/**
 * TelemetryBar Component
 * High-contrast event metadata ledger displaying date, time, venue, and age restriction.
 * Modeled directly after the reference's technical status ribbon.
 * Zero hardcoded color literals.
 */
export const TelemetryBar: React.FC<TelemetryBarProps> = ({ isTest = false }) => {
  const ribbon = isTest ? STRINGS.test.telemetryRibbon : STRINGS.telemetryRibbon;

  return (
    <aside
      aria-label="Event telemetry"
      className="w-full py-8 px-4 sm:px-6 select-none"
    >
      <div className="max-w-5xl mx-auto bg-ls-void-abyss/40 border border-ls-mono-hairline/40 rounded-none py-5 px-6 sm:px-10 backdrop-blur-sm grid grid-cols-2 md:grid-cols-4 gap-6 uppercase text-center sm:text-left shadow-laser-subtle">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.dateLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-mono-pureWhite tracking-widest">
            {ribbon.dateValue}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.timeLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-mono-pureWhite tracking-widest">
            {ribbon.timeValue}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.venueLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-blue-laserCyan tracking-widest">
            {ribbon.venueValue}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] text-ls-mono-muted mb-1">
            {STRINGS.telemetryRibbon.accessLabel}
          </span>
          <span className="font-bold text-sm sm:text-base text-ls-mono-pureWhite tracking-widest">
            {ribbon.accessValue}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default TelemetryBar;

