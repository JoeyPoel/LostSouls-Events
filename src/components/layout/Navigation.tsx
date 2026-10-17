import React from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';
import { CyberSigil } from '@/components/common/CyberSigil';

export interface NavigationProps {
  onTicketClick: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

/**
 * Navigation Component
 * Header navigation bar modeled after the dark underground reference:
 * - Brand logo with cyber-tribal emblem
 * - Centered navigation links (Home, Tickets, Lineup, Chapters, Merch, Info)
 * - 154 BPM Audio Ambience toggle & Radiant Ticket CTA
 * Zero hardcoded color literals.
 *
 * @param {NavigationProps} props - Component properties for ticket navigation and audio control.
 * @returns {JSX.Element} Rendered header navigation bar.
 */
export const Navigation: React.FC<NavigationProps> = ({
  onTicketClick,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ls-mono-hairline bg-ls-void-pure/90 backdrop-blur-md transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none text-left"
            id="nav-brand"
          >
            <CyberSigil variant="blade-cross" size={24} glow />
            <div className="flex flex-col">
              <span className="font-editorial font-black tracking-wider text-xl sm:text-2xl text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors">
                {STRINGS.meta.brandName}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-ls-mono-muted">
                {STRINGS.meta.cityCoordinates}
              </span>
            </div>
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
            onClick={() => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-lineup"
          >
            {STRINGS.navigation.lineup}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-ls-blue-laserCyan transition-colors cursor-pointer py-1 border-b border-transparent hover:border-ls-blue-laserCyan"
            id="nav-link-chapters"
          >
            {STRINGS.navigation.chapters}
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

        {/* Audio Ambience & Primary Ticket Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleAudio}
            id="audio-ambience-toggle"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-ls-mono-hairline hover:border-ls-blue-laserCyan hover:text-ls-blue-laserCyan text-ls-mono-silver transition-all"
            title={isAudioPlaying ? STRINGS.meta.pauseAmbience : STRINGS.meta.playAmbience}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAudioPlaying
                  ? 'bg-ls-blue-laserCyan animate-ping'
                  : 'bg-ls-mono-muted'
              }`}
            />
            <span>{isAudioPlaying ? STRINGS.meta.audioActive : STRINGS.meta.audioMuted}</span>
          </button>

          <GlowButton
            variant="primary"
            onClick={onTicketClick}
            id="nav-ticket-cta"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-ls-blue-cobalt hover:bg-ls-blue-laserCyan text-ls-mono-pureWhite border border-ls-blue-laserCyan shadow-laser-subtle"
          >
            {STRINGS.navigation.ticketCta}
          </GlowButton>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
