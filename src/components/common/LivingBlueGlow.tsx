import React, { useState, useEffect } from 'react';

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
 * Renders a single living subterranean blue ambient shadow that:
 * - Sits in the middle bottom on the front page of the test site.
 * - Glides diagonally from spot to spot across the screen with each section scroll.
 * - Features decoupled GPU-accelerated translation and gentle organic breathing.
 * - Matches the signature radial gradient: Cobalt to Deep Navy to Transparent.
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The dynamic diagonal living blue ambient glow.
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
      {/* Outer Translating Anchor: Moves diagonally from spot to spot on section scroll */}
      <div
        className="absolute top-0 left-0 pointer-events-none transform-gpu"
        style={{
          transform: `translate3d(calc(${spot.x}vw - 50%), calc(${spot.y}vh - 50%), 0)`,
          transition: 'transform 1.35s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {/* Inner Organic Breathing Glow: Pulses gently on GPU with zero blur recalculation */}
        <div
          className="w-[520px] h-[520px] sm:w-[750px] sm:h-[750px] lg:w-[900px] lg:h-[900px] rounded-full blur-[100px] sm:blur-[130px] opacity-25 sm:opacity-30 pointer-events-none transform-gpu animate-glow-breathe"
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
