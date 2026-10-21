import React, { useState, useEffect } from 'react';
import { Noise } from '@/components/common/Noise';
import { LivingBlueGlow } from '@/components/common/LivingBlueGlow';
import { Navigation } from '@/components/layout/Navigation';
import { HeroSection } from '@/components/hero/HeroSection';
import { TelemetryBar } from '@/components/layout/TelemetryBar';
import { AboutSection } from '@/components/about/AboutSection';
import { EventsSection } from '@/components/events/EventsSection';
import { LineupLedger } from '@/components/lineup/LineupLedger';
import { SmallRuns } from '@/components/merch/SmallRuns';
import { GallerySection } from '@/components/gallery/GallerySection';
import { ProtocolsSection } from '@/components/protocols/ProtocolsSection';
import { Footer } from '@/components/layout/Footer';
import { TeaserView } from '@/components/teaser/TeaserView';
import { DEFAULT_EVENT } from '@/constants/event';

/**
 * App Component
 * Orchestrates routing between the public teaser (/) and the full first-event platform (/test):
 * - Route "/": Public teaser interface with monolithic LØST SØULS, announcement, and waitlist.
 * - Route "/test": Full digital platform tailored exclusively for Chapter 01 (First Event in the Netherlands):
 *   - Only 1 single living blue shadow at middle bottom (organic morphing/shapeshifting).
 *   - Clean visual aesthetics without star sigils, pulsing dots, or horizontal laser scan beams.
 *   - No 3-chapters section and no audio ambience toggle.
 *   - Direct ticketing matrix, artist roster, merch capsules, gallery, and protocols.
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} The rendered view based on location path.
 */
export const App: React.FC = () => {
  const [pathname, setPathname] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = (): void => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Public teaser at root (/); full first-event site at /test
  const isTestRoute =
    pathname.startsWith('/test') ||
    pathname.includes('/test') ||
    (typeof window !== 'undefined' &&
      (window.location.search.includes('test') || window.location.hash.includes('test')));

  if (!isTestRoute) {
    return <TeaserView />;
  }

  /**
   * Smoothly navigates the viewport down to the ticketing and event matrix section.
   */
  const handleTicketClick = (): void => {
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      eventsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Smoothly navigates the viewport down to the artist lineup ledger.
   */
  const handleLineupClick = (): void => {
    const lineupElement = document.getElementById('lineup');
    if (lineupElement) {
      lineupElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-ls-void-pure text-ls-mono-pureWhite relative overflow-x-hidden">
      {/* Heavy Warehouse Analog Noise Overlay */}
      <Noise />

      {/* Single Living Subterranean Blue Shadow at Middle Bottom */}
      <LivingBlueGlow />

      {/* Header Navigation */}
      <Navigation onTicketClick={handleTicketClick} />

      <main className="relative z-10 flex flex-col">
        {/* Monolithic Teaser Hero Section for Chapter 01 */}
        <HeroSection
          onTicketClick={handleTicketClick}
          onLineupClick={handleLineupClick}
        />

        {/* Industrial Telemetry Ribbon */}
        <TelemetryBar />

        {/* Community Driven Raves & Emerging Artist Incubation Manifesto */}
        <AboutSection />

        {/* Event Dossier & Interactive Ticketing Matrix */}
        <EventsSection event={DEFAULT_EVENT} />

        {/* Industrial Artist Roster Ledger */}
        <LineupLedger
          artists={DEFAULT_EVENT.artists}
          onTicketClick={handleTicketClick}
        />

        {/* Limited Apparel & Merch Capsule */}
        <SmallRuns />

        {/* Direct-Flash Warehouse Photography Gallery */}
        <GallerySection />

        {/* Mandatory House Protocols & Etiquette */}
        <ProtocolsSection />
      </main>

      {/* Industrial Footer with Community Dispatch Channel */}
      <Footer />
    </div>
  );
};

export default App;
