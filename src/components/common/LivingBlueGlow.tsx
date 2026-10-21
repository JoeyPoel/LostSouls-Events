import React from 'react';
import HalftoneBloom from '@/components/originkit/ui/halftone-bloom';
import { THEME } from '@/config/theme';

/**
 * LivingBlueGlow Component
 * Renders the living visual background for Lost Souls:
 * - Originkit "Halftone Bloom" 86-layer WebGL2 folded ribbon field with rotated halftone grid
 * - Interactive pointer tracking: halftone dots swell and bloom toward the cursor
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The living ambient halftone bloom field.
 */
export const LivingBlueGlow: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Originkit Halftone Bloom Component: WebGL2 86-layer folded ribbon field */}
      <HalftoneBloom
        background={THEME.colors.void.pure}
        color1={THEME.colors.blue.laserCyan}
        color2={THEME.colors.blue.cobalt}
        speed={35}
        size={140}
        angle={180}
        dotSize={6}
        hover={180}
        reach={380}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          opacity: 0.65,
        }}
      />
    </div>
  );
};

export default LivingBlueGlow;

