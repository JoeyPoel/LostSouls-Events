import React from 'react';

export interface WireBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'warning' | 'muted' | 'white';
  pulse?: boolean;
  className?: string;
}

/**
 * WireBadge Component
 * Industrial telemetry tag and wireframe indicator badge.
 * Zero hardcoded colors.
 */
export const WireBadge: React.FC<WireBadgeProps> = ({
  children,
  variant = 'cyan',
  pulse = false,
  className = '',
}) => {
  const variantStyles = {
    cyan: 'border-ls-blue-laserCyan text-ls-blue-laserCyan shadow-laser-subtle bg-ls-void-surface/50',
    warning: 'border-ls-state-warning text-ls-state-warning bg-ls-void-surface/50',
    muted: 'border-ls-mono-dark text-ls-mono-muted bg-ls-void-abyss/80',
    white: 'border-ls-mono-pureWhite text-ls-mono-pureWhite shadow-white-strobe bg-ls-void-surface/50',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[11px] tracking-widest uppercase border ${
        variantStyles[variant]
      } ${pulse ? 'animate-pulse' : ''} ${className}`}
    >
      <span className="opacity-60">[</span>
      <span>{children}</span>
      <span className="opacity-60">]</span>
    </span>
  );
};

export default WireBadge;
