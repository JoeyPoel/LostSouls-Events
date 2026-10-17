import React from 'react';

export interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
  id?: string;
}

/**
 * GlowButton Component
 * Cyber-blade action trigger with cobalt floodlight core, cyan laser hairlines,
 * and high-contrast strobe interaction.
 * Zero hardcoded color literals.
 */
export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
  id,
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-mono font-bold tracking-[0.22em] uppercase text-xs sm:text-sm px-8 py-3.5 transition-all duration-200 focus:outline-none select-none disabled:opacity-40 disabled:cursor-not-allowed cyber-cut-sm group overflow-hidden cursor-pointer';

  const widthClass = fullWidth ? 'w-full' : '';

  const variantStyles = {
    primary:
      'bg-ls-blue-cobalt text-ls-mono-pureWhite border border-ls-blue-laserCyan shadow-laser-subtle hover:bg-ls-blue-laserCyan hover:text-ls-void-pure hover:shadow-laser-intense active:scale-[0.98]',
    secondary:
      'bg-ls-void-abyss text-ls-mono-pureWhite border border-ls-mono-hairline hover:border-ls-blue-laserCyan hover:text-ls-blue-laserCyan hover:shadow-laser-subtle',
    outline:
      'bg-transparent text-ls-blue-laserCyan border border-ls-blue-laserCyan hover:bg-ls-blue-laserCyan hover:text-ls-void-pure hover:shadow-laser-intense',
    subtle:
      'bg-transparent text-ls-mono-silver hover:text-ls-blue-laserCyan hover:border-b hover:border-ls-blue-laserCyan px-3 py-2',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantStyles[variant]} ${widthClass} ${className}`}
    >
      {/* Corner Cyber Spikes */}
      <span className="absolute top-0 left-0 w-2.5 h-[1.5px] bg-ls-blue-laserCyan opacity-90" />
      <span className="absolute top-0 left-0 h-2.5 w-[1.5px] bg-ls-blue-laserCyan opacity-90" />
      <span className="absolute bottom-0 right-0 w-2.5 h-[1.5px] bg-ls-blue-laserCyan opacity-90" />
      <span className="absolute bottom-0 right-0 h-2.5 w-[1.5px] bg-ls-blue-laserCyan opacity-90" />

      {/* Cyber Shimmer Sweep */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default GlowButton;
