import React from 'react';

export interface CyberSigilProps {
  variant?: 'central-mandala' | 'thorny-crest' | 'barbed-cluster' | 'corner-thorn' | 'blade-cross';
  className?: string;
  size?: number | string;
  glow?: boolean;
}

/**
 * CyberSigil Component
 * Authentic neo-tribal cyber sigilism vector linework: razor-sharp biomechanical thorns,
 * barbed wire tendrils, liquid mercury curves, and occult crosshairs.
 * Zero hardcoded color literals.
 */
export const CyberSigil: React.FC<CyberSigilProps> = ({
  variant = 'central-mandala',
  className = '',
  size = 120,
  glow = false,
}) => {
  const glowStyle = glow
    ? { filter: 'drop-shadow(0 0 6px var(--ls-color-mono-pureWhite)) drop-shadow(0 0 14px var(--ls-color-blue-electric))' }
    : undefined;

  if (variant === 'central-mandala') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        style={glowStyle}
      >
        {/* Core Sacred Cyber Rings */}
        <circle cx="300" cy="300" r="110" stroke="var(--ls-color-blue-laserCyan)" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.8" />
        <circle cx="300" cy="300" r="160" stroke="var(--ls-color-blue-electric)" strokeWidth="0.8" opacity="0.6" />
        <circle cx="300" cy="300" r="55" stroke="var(--ls-color-mono-pureWhite)" strokeWidth="1.5" opacity="0.9" />

        {/* Cardinal Razor Spikes */}
        <path d="M300 20 L307 180 Q300 220 300 300 Q300 220 293 180 Z" fill="var(--ls-color-mono-pureWhite)" opacity="0.85" />
        <path d="M300 580 L307 420 Q300 380 300 300 Q300 380 293 420 Z" fill="var(--ls-color-mono-pureWhite)" opacity="0.85" />
        <path d="M20 300 L180 307 Q220 300 300 300 Q220 300 180 293 Z" fill="var(--ls-color-mono-pureWhite)" opacity="0.85" />
        <path d="M580 300 L420 307 Q380 300 300 300 Q380 300 420 293 Z" fill="var(--ls-color-mono-pureWhite)" opacity="0.85" />

        {/* Tangled Barbed Cyber Sigil Tendrils */}
        <path
          d="M300 300 Q380 190 490 120 Q410 210 390 260 Q480 240 570 210 Q470 280 400 310 Q500 380 560 470 Q460 410 380 360 Q410 480 410 570 Q340 460 310 380 Q270 510 220 580 Q270 450 290 380 Q190 440 110 510 Q190 390 240 340 Q130 380 30 390 Q170 320 250 300 Q110 270 30 200 Q160 250 230 280 Q180 170 120 70 Q240 200 280 260 Q270 140 250 30 Z"
          stroke="var(--ls-color-mono-pureWhite)"
          strokeWidth="1.6"
          fill="none"
          opacity="0.75"
        />

        {/* Inner Razor Thorn Barbs */}
        <path
          d="M300 230 Q350 270 370 300 Q340 340 300 370 Q260 340 230 300 Q250 270 300 230 Z"
          stroke="var(--ls-color-blue-laserCyan)"
          strokeWidth="1.4"
          fill="none"
          opacity="0.9"
        />

        {/* Barbed Wire Rings & Needle Points */}
        <path
          d="M200 200 L210 220 L190 230 L205 210 Z M400 200 L390 220 L410 230 L395 210 Z M200 400 L210 380 L190 370 L205 390 Z M400 400 L390 380 L410 370 L395 390 Z"
          fill="var(--ls-color-mono-pureWhite)"
        />

        <line x1="240" y1="300" x2="360" y2="300" stroke="var(--ls-color-mono-pureWhite)" strokeWidth="1.2" />
        <line x1="300" y1="240" x2="300" y2="360" stroke="var(--ls-color-mono-pureWhite)" strokeWidth="1.2" />
      </svg>
    );
  }

  if (variant === 'thorny-crest') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        style={glowStyle}
      >
        <path
          d="M200 10 L205 55 Q230 30 270 15 Q250 50 260 70 Q310 45 380 25 Q320 75 270 90 Q350 100 395 130 Q310 115 240 100 Q230 125 200 135 Q170 125 160 100 Q90 115 5 130 Q50 100 130 90 Q80 75 20 25 Q90 45 140 70 Q150 50 130 15 Q170 30 195 55 Z"
          stroke="var(--ls-color-mono-pureWhite)"
          strokeWidth="1.6"
          fill="none"
          opacity="0.85"
        />
        <circle cx="200" cy="70" r="6" fill="var(--ls-color-mono-pureWhite)" />
        <line x1="120" y1="70" x2="280" y2="70" stroke="var(--ls-color-blue-laserCyan)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    );
  }

  if (variant === 'barbed-cluster') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        style={glowStyle}
      >
        <path
          d="M100 10 Q130 65 175 85 Q125 95 100 100 Q145 120 185 175 Q125 145 100 195 Q75 145 15 175 Q55 120 100 100 Q75 95 25 85 Q70 65 100 10 Z"
          stroke="var(--ls-color-mono-pureWhite)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M100 40 Q118 75 150 90 Q120 98 100 100 Q130 115 155 150 Q120 135 100 165 Q80 135 45 150 Q70 115 100 100 Q80 98 50 90 Q82 75 100 40 Z"
          stroke="var(--ls-color-blue-electric)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
      </svg>
    );
  }

  if (variant === 'corner-thorn') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        style={glowStyle}
      >
        <path
          d="M5 5 L85 5 Q50 30 38 52 Q28 52 5 85 Q18 45 5 5 Z"
          stroke="var(--ls-color-mono-pureWhite)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M15 15 L60 15 Q40 32 28 50 L15 15 Z"
          fill="var(--ls-color-blue-cobalt)"
          opacity="0.6"
        />
        <line x1="5" y1="5" x2="35" y2="35" stroke="var(--ls-color-blue-laserCyan)" strokeWidth="1" />
      </svg>
    );
  }

  // Blade Cross
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={glowStyle}
    >
      <path
        d="M50 5 L54 38 Q68 25 85 12 Q74 35 62 46 L95 50 L62 54 Q74 65 85 88 Q68 75 54 62 L50 95 L46 62 Q32 75 15 88 Q26 65 38 54 L5 50 L38 46 Q26 35 15 12 Q32 25 46 38 Z"
        stroke="var(--ls-color-mono-pureWhite)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );
};

export default CyberSigil;
