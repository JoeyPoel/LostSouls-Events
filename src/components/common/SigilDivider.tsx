import React from 'react';

export interface SigilDividerProps {
  label?: string;
  className?: string;
}

/**
 * SigilDivider Component
 * Razor-sharp biomechanical cyber-sigil separator with barbed thorn accents and laser focal points.
 * Strictly driven by theme variables (zero hardcoded colors).
 */
export const SigilDivider: React.FC<SigilDividerProps> = ({ label, className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex items-center justify-center gap-4 select-none ${className}`}
    >
      {/* Left Thorny Wire Beam */}
      <div className="flex-1 flex items-center">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-ls-mono-dark to-ls-blue-laserCyan/40" />
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="shrink-0">
          <path
            d="M0 6 L18 6 L22 1 L26 11 L30 6 L40 6"
            stroke="var(--ls-color-blue-laserCyan)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Center Ritual Glyph */}
      <div className="flex items-center gap-3 px-3 py-1 border border-ls-blue-laserCyan/30 bg-ls-void-abyss shadow-laser-subtle">
        <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan rotate-45 animate-ping" />
        {label && (
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-ls-mono-silver">
            {label}
          </span>
        )}
        <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan rotate-45" />
      </div>

      {/* Right Thorny Wire Beam */}
      <div className="flex-1 flex items-center">
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="shrink-0">
          <path
            d="M0 6 L10 6 L14 1 L18 11 L22 6 L40 6"
            stroke="var(--ls-color-blue-laserCyan)"
            strokeWidth="1.2"
          />
        </svg>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-ls-mono-dark to-ls-blue-laserCyan/40" />
      </div>
    </div>
  );
};

export default SigilDivider;
