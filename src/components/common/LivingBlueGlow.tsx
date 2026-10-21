import React from 'react';

/**
 * LivingBlueGlow Component
 * Renders a single living subterranean blue ambient shadow,
 * matching the signature radial gradient from the original teaser:
 * - Single centered shadow at middle bottom
 * - Exact original teaser color gradient: Cobalt to Deep Navy to Transparent
 * - 100% GPU-accelerated 3D transform animations without CPU blur re-rasterization
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} Single living ambient blue shadow.
 */
export const LivingBlueGlow: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 pointer-events-none z-0 overflow-hidden select-none h-screen flex items-end justify-center transform-gpu"
    >
      <div
        className="w-[550px] h-[550px] sm:w-[800px] sm:h-[800px] lg:w-[950px] lg:h-[950px] rounded-full blur-[100px] sm:blur-[120px] opacity-25 pointer-events-none animate-shapeshift-glow transform-gpu"
        style={{
          background:
            'radial-gradient(circle, var(--ls-color-blue-cobalt) 0%, var(--ls-color-blue-deepNavy) 50%, transparent 75%)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

export default LivingBlueGlow;
