import React from 'react';

export interface ViewportBracketsProps {
  className?: string;
  glow?: boolean;
}

/**
 * ViewportBrackets Component
 * Renders technical warehouse HUD brackets framing containers.
 */
export const ViewportBrackets: React.FC<ViewportBracketsProps> = ({
  className = '',
  glow = false,
}) => {
  const cornerColor = glow ? 'text-ls-blue-laserCyan drop-shadow-[0_0_8px_var(--ls-color-blue-laserCyan)]' : 'text-ls-mono-muted';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none ${className}`}
    >
      {/* Top Left */}
      <span className={`absolute top-0 left-0 font-mono text-sm leading-none ${cornerColor}`}>
        ┌
      </span>
      {/* Top Right */}
      <span className={`absolute top-0 right-0 font-mono text-sm leading-none ${cornerColor}`}>
        ┐
      </span>
      {/* Bottom Left */}
      <span className={`absolute bottom-0 left-0 font-mono text-sm leading-none ${cornerColor}`}>
        └
      </span>
      {/* Bottom Right */}
      <span className={`absolute bottom-0 right-0 font-mono text-sm leading-none ${cornerColor}`}>
        ┘
      </span>
    </div>
  );
};

export default ViewportBrackets;
