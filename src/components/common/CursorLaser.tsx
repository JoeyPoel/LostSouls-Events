import React, { useState, useEffect } from 'react';

/**
 * CursorLaser Component
 * Razor-sharp needle laser crosshair following cursor coordinates across the pitch-black void.
 * Zero ambient background washing - maintains absolute obsidian darkness.
 */
export const CursorLaser: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* Precision Horizontal Needle Laser Line */}
      <div
        className="absolute h-[1px] w-16 -translate-x-1/2 opacity-60"
        style={{
          left: coords.x,
          top: coords.y,
          background: 'linear-gradient(90deg, transparent, var(--ls-color-blue-laserCyan), transparent)',
        }}
      />

      {/* Precision Vertical Needle Laser Line */}
      <div
        className="absolute w-[1px] h-16 -translate-y-1/2 opacity-60"
        style={{
          left: coords.x,
          top: coords.y,
          background: 'linear-gradient(180deg, transparent, var(--ls-color-blue-laserCyan), transparent)',
        }}
      />

      {/* Tiny Needle Laser Core Pinpoint */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-ls-mono-pureWhite shadow-[0_0_8px_var(--ls-color-blue-laserCyan)]"
        style={{
          left: coords.x,
          top: coords.y,
        }}
      />
    </div>
  );
};

export default CursorLaser;
