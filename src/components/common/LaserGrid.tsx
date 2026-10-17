import React from 'react';

interface LaserGridProps {
  intensity?: 'subtle' | 'intense';
}

/**
 * LaserGrid Component
 * V-shaped ceiling truss rig arrays and linear volumetric blue laser beams
 * cutting through dark warehouse haze, directly reflecting the reference event production.
 * Zero hardcoded color literals.
 */
export const LaserGrid: React.FC<LaserGridProps> = ({ intensity = 'subtle' }) => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Overhead Stage Flood Aura */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] opacity-25 blur-[100px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, var(--ls-color-blue-cobalt) 0%, var(--ls-color-blue-electric) 40%, transparent 75%)',
        }}
      />

      {/* Primary Piercing Cobalt & Cyan Laser A */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[900px] origin-top animate-laser-sweep"
        style={{
          background: `linear-gradient(to bottom, var(--ls-color-blue-laserCyan), var(--ls-color-blue-cobalt) 50%, transparent 95%)`,
          boxShadow: `0 0 12px var(--ls-color-blue-laserCyan), 0 0 25px var(--ls-color-blue-electric)`,
          opacity: intensity === 'intense' ? 0.85 : 0.45,
        }}
      />

      {/* Primary Piercing Cobalt & Cyan Laser B */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[900px] origin-top animate-laser-sweep-reverse"
        style={{
          background: `linear-gradient(to bottom, var(--ls-color-blue-laserCyan), var(--ls-color-blue-cobalt) 60%, transparent 95%)`,
          boxShadow: `0 0 12px var(--ls-color-blue-laserCyan), 0 0 25px var(--ls-color-blue-electric)`,
          opacity: intensity === 'intense' ? 0.75 : 0.4,
        }}
      />

      {/* Overhead V-Truss Light Rig Array (Mirroring Toffler/After Dark Stage Rig) */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-35"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Overhead V-Shape Truss Geometry */}
        <path
          d="M600 20 L200 480 M600 20 L1000 480"
          stroke="var(--ls-color-blue-laserCyan)"
          strokeWidth="1.8"
        />
        <path
          d="M600 20 L350 480 M600 20 L850 480"
          stroke="var(--ls-color-blue-electric)"
          strokeWidth="1.4"
        />
        <path
          d="M600 20 L500 480 M600 20 L700 480"
          stroke="var(--ls-color-blue-cobalt)"
          strokeWidth="1"
        />

        {/* Horizontal Laser Line Arrays */}
        <line x1="150" y1="480" x2="1050" y2="480" stroke="var(--ls-color-blue-laserCyan)" strokeWidth="1" strokeDasharray="6 4" />
        <line x1="250" y1="360" x2="950" y2="360" stroke="var(--ls-color-blue-electric)" strokeWidth="0.8" opacity="0.6" />
      </svg>
    </div>
  );
};

export default LaserGrid;
