import React from 'react';

export interface LaserTunnelProps {
  mode?: 'horizontal-scan' | 'fan-burst' | 'pillars';
  className?: string;
}

/**
 * LaserTunnel Component
 * Authentic warehouse techno stage lasers replicating underground European club productions:
 * - horizontal-scan: Razor-thin horizontal beam cutting across the crowd and DJ deck
 * - fan-burst: Splayed diagonal laser fan slicing across the warehouse void
 * - pillars: High-powered vertical laser columns rising through the dark
 * Strictly driven by theme variables (zero hardcoded colors).
 */
export const LaserTunnel: React.FC<LaserTunnelProps> = ({
  mode = 'horizontal-scan',
  className = '',
}) => {
  if (mode === 'horizontal-scan') {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full h-12 overflow-hidden pointer-events-none select-none my-6 ${className}`}
      >
        {/* Horizontal Laser Guide Tube */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, var(--ls-color-blue-cobalt) 20%, var(--ls-color-blue-laserCyan) 50%, var(--ls-color-blue-cobalt) 80%, transparent 100%)',
            boxShadow:
              '0 0 10px var(--ls-color-blue-laserCyan), 0 0 25px var(--ls-color-blue-electric)',
          }}
        />

        {/* Scanning Intense Laser Pulse Core */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-48 h-[3px] rounded-full blur-[1px] animate-laser-sweep"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--ls-color-mono-pureWhite), var(--ls-color-blue-laserCyan), transparent)',
            boxShadow:
              '0 0 14px var(--ls-color-blue-laserCyan), 0 0 30px var(--ls-color-blue-cobalt)',
          }}
        />
      </div>
    );
  }

  if (mode === 'fan-burst') {
    return (
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40 ${className}`}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fan Lasers Spreading Outward from Stage Focal Point */}
          <line x1="500" y1="400" x2="50" y2="20" stroke="var(--ls-color-blue-laserCyan)" strokeWidth="1.2" />
          <line x1="500" y1="400" x2="200" y2="0" stroke="var(--ls-color-blue-electric)" strokeWidth="1" />
          <line x1="500" y1="400" x2="380" y2="0" stroke="var(--ls-color-blue-cobalt)" strokeWidth="0.8" />
          <line x1="500" y1="400" x2="620" y2="0" stroke="var(--ls-color-blue-cobalt)" strokeWidth="0.8" />
          <line x1="500" y1="400" x2="800" y2="0" stroke="var(--ls-color-blue-electric)" strokeWidth="1" />
          <line x1="500" y1="400" x2="950" y2="20" stroke="var(--ls-color-blue-laserCyan)" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  // mode === 'pillars'
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none opacity-30 ${className}`}
    >
      <div className="w-full h-full flex justify-around items-end">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-[1.5px] h-[90%] origin-bottom animate-laser-pulse"
            style={{
              animationDelay: `${i * 0.4}s`,
              background:
                'linear-gradient(to top, var(--ls-color-blue-laserCyan), var(--ls-color-blue-cobalt) 60%, transparent 100%)',
              boxShadow:
                '0 0 10px var(--ls-color-blue-laserCyan), 0 0 20px var(--ls-color-blue-electric)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LaserTunnel;
