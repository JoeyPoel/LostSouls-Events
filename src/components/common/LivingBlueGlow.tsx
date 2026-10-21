import React, { useState, useEffect } from 'react';
import HalftoneBloom from '@/components/originkit/ui/halftone-bloom';
import { THEME } from '@/config/theme';

export interface GlowSpot {
  x: number; // percentage of viewport width (0-100)
  y: number; // percentage of viewport height (0-100)
}

/**
 * Coordinate anchor points for each page section:
 * - hero (Front page): Middle bottom (x: 50%, y: 84%)
 * - events (Dossier & Tickets): Diagonal up-right (x: 78%, y: 32%)
 * - lineup (Artist Roster): Diagonal down-left (x: 22%, y: 68%)
 * - merch (Limited Capsule): Diagonal up-right (x: 78%, y: 35%)
 * - gallery (Warehouse Photos): Diagonal down-left (x: 22%, y: 65%)
 * - protocols (House Rules): Diagonal up-right (x: 75%, y: 38%)
 * - footer (Bottom dispatch): Diagonal down to Middle Bottom (x: 50%, y: 82%)
 */
const SECTION_SPOTS: Record<string, GlowSpot> = {
  hero: { x: 50, y: 84 },
  events: { x: 78, y: 32 },
  lineup: { x: 22, y: 68 },
  merch: { x: 78, y: 35 },
  gallery: { x: 22, y: 65 },
  protocols: { x: 75, y: 38 },
  footer: { x: 50, y: 82 },
};

const SECTION_IDS = ['hero', 'events', 'lineup', 'merch', 'gallery', 'protocols', 'footer'];

/**
 * LivingBlueGlow Component
 * Renders the living subterranean visual background for Lost Souls:
 * - Originkit "Halftone Bloom" 86-layer WebGL2 folded ribbon field with rotated halftone grid
 * - Interactive pointer tracking: halftone dots swell and bloom toward the cursor
 * - Single subterranean living blue shadow gliding diagonally with section scroll
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The living blue ambient glow and halftone bloom field.
 */
export const LivingBlueGlow: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = (): void => {
      // If near the top, always anchor to the front page middle bottom
      if (window.scrollY < 80) {
        setActiveSection('hero');
        ticking = false;
        return;
      }

      const viewportCenter = window.innerHeight * 0.45;
      let matchedSection = 'hero';
      let closestDistance = Infinity;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // Exact match when section encompasses the focal threshold
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          matchedSection = id;
          break;
        }

        // Closest match fallback
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          matchedSection = id;
        }
      }

      setActiveSection(matchedSection);
      ticking = false;
    };

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Initial positioning
    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const spot = SECTION_SPOTS[activeSection] || SECTION_SPOTS.hero;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Originkit Halftone Bloom Component: WebGL2 86-layer folded ribbon field */}
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

      {/* 2. Outer Spatial Anchor: Moves diagonally from spot to spot on section scroll */}
      <div
        className="absolute top-0 left-0 pointer-events-none transform-gpu"
        style={{
          transform: `translate3d(calc(${spot.x}vw - 50%), calc(${spot.y}vh - 50%), 0)`,
          transition: 'transform 1.35s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {/* Inner Organic Breathing Glow */}
        <div
          className="w-[520px] h-[520px] sm:w-[750px] sm:h-[750px] lg:w-[900px] lg:h-[900px] rounded-full blur-[100px] sm:blur-[130px] opacity-20 sm:opacity-25 pointer-events-none transform-gpu animate-glow-breathe"
          style={{
            background:
              'radial-gradient(circle, var(--ls-color-blue-cobalt) 0%, var(--ls-color-blue-deepNavy) 50%, transparent 75%)',
          }}
        />
      </div>
    </div>
  );
};

export default LivingBlueGlow;
