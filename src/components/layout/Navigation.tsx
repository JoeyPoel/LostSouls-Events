import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';

export interface NavigationProps {
  onTicketClick: () => void;
}

/**
 * Navigation Component
 * Header navigation bar in the clean teaser aesthetic:
 * - Brand logo: "LØST SØULS" in editorial serif with laser glow
 * - Location telemetry: NETHERLANDS
 * - Navigation links: Home, Events, Lineup, Merch, Info, Community
 * - Radiant Ticket CTA
 * Zero hardcoded color literals.
 *
 * @param {NavigationProps} props - Component properties for ticket navigation.
 * @returns {JSX.Element} Rendered header navigation bar.
 */
export const Navigation: React.FC<NavigationProps> = ({ onTicketClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-ls-void-pure/80 backdrop-blur-md transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col group cursor-pointer focus:outline-none text-left"
            id="nav-brand"
          >
            <span className="font-editorial font-bold tracking-[0.14em] text-xl sm:text-2xl text-ls-blue-iceStrobe group-hover:text-ls-blue-laserCyan group-hover:laser-glow-text transition-all duration-300">
              {STRINGS.teaser.brandTitle}
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-ls-mono-muted">
              {STRINGS.meta.cityCoordinates}
            </span>
          </button>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-8 font-editorial text-xs sm:text-sm uppercase tracking-widest text-ls-mono-silver">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-home"
          >
            {STRINGS.navigation.home}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-manifesto"
          >
            {STRINGS.navigation.about}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-events"
          >
            {STRINGS.navigation.events}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-lineup"
          >
            {STRINGS.navigation.lineup}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('merch')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-merch"
          >
            {STRINGS.navigation.merch}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('protocols')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-info"
          >
            {STRINGS.navigation.info}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-community"
          >
            {STRINGS.navigation.community}
          </button>
        </nav>

        {/* Primary Ticket Trigger */}
        <div className="flex items-center gap-3">
          <GlowButton
            variant="primary"
            onClick={onTicketClick}
            id="nav-ticket-cta"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
          >
            {STRINGS.navigation.ticketCta}
          </GlowButton>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
