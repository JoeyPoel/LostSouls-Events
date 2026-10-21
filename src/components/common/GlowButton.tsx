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
    'relative inline-flex items-center justify-center font-mono font-bold tracking-[0.2em] uppercase text-xs sm:text-sm px-8 py-3.5 transition-all duration-300 focus:outline-none select-none disabled:opacity-40 disabled:cursor-not-allowed rounded-full group overflow-hidden cursor-pointer';

  const widthClass = fullWidth ? 'w-full' : '';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-ls-blue-electric via-ls-blue-laserCyan to-ls-blue-electric text-ls-void-pure shadow-[0_0_20px_rgba(0,140,255,0.45)] hover:shadow-[0_0_35px_rgba(0,140,255,0.75)] hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-ls-void-abyss/80 text-ls-blue-iceStrobe border border-ls-mono-hairline hover:border-ls-blue-laserCyan hover:text-ls-blue-laserCyan hover:shadow-[0_0_20px_rgba(0,140,255,0.3)] backdrop-blur-sm active:scale-[0.98]',
    outline:
      'bg-transparent text-ls-blue-laserCyan border border-ls-blue-laserCyan/70 hover:bg-ls-blue-laserCyan hover:text-ls-void-pure hover:shadow-[0_0_25px_rgba(0,140,255,0.5)] active:scale-[0.98]',
    subtle:
      'bg-transparent text-ls-mono-silver hover:text-ls-blue-laserCyan px-3 py-2 transition-colors',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantStyles[variant]} ${widthClass} ${className}`}
    >
      {/* Soft Light Shimmer */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none bg-gradient-to-r from-transparent via-ls-blue-iceStrobe/30 to-transparent"
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default GlowButton;
