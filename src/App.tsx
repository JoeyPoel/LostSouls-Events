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
import { DEFAULT_EVENT, TEST_EVENT } from '@/constants/event';

/**
 * App Component
 * Orchestrates routing:
 * - Route "/": Full Lost Souls digital platform (Chapter 01 debut gathering).
 * - Route "/prod": Production platform alias.
 * - Route "/test": Mock testing platform with active checkout machinery & test artist roster.
 * - Route "/teaser": Standalone teaser void view.
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

  // Determine route mode
  const isTeaserRoute =
    pathname.startsWith('/teaser') ||
    pathname.includes('/teaser') ||
    (typeof window !== 'undefined' &&
      (window.location.search.includes('teaser') || window.location.hash.includes('teaser')));

  const isTestRoute =
    pathname.startsWith('/test') ||
    pathname.includes('/test') ||
    (typeof window !== 'undefined' &&
      (window.location.search.includes('test') || window.location.hash.includes('test')));

  if (isTeaserRoute) {
    return <TeaserView />;
  }

  const activeEvent = isTestRoute ? TEST_EVENT : DEFAULT_EVENT;

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
      <Navigation onTicketClick={handleTicketClick} isTest={isTestRoute} />

      <main className="relative z-10 flex flex-col">
        {/* Monolithic Teaser Hero Section for Chapter 01 */}
        <HeroSection
          onTicketClick={handleTicketClick}
          onLineupClick={handleLineupClick}
          isTest={isTestRoute}
        />

        {/* Industrial Telemetry Ribbon */}
        <TelemetryBar isTest={isTestRoute} />

        {/* Community Driven Raves & Emerging Artist Incubation Manifesto */}
        <AboutSection />

        {/* Event Dossier & Interactive Ticketing Matrix */}
        <EventsSection event={activeEvent} isTest={isTestRoute} />

        {/* Industrial Artist Roster Ledger */}
        <LineupLedger
          artists={activeEvent.artists}
          onTicketClick={handleTicketClick}
          isTest={isTestRoute}
        />

        {/* Limited Apparel & Merch Capsule */}
        <SmallRuns isTest={isTestRoute} />

        {/* Direct-Flash Warehouse Photography Gallery */}
        <GallerySection isTest={isTestRoute} />

        {/* Mandatory House Protocols & Etiquette */}
        <ProtocolsSection />
      </main>

      {/* Industrial Footer with Community Dispatch Channel */}
      <Footer />
    </div>
  );
};

export default App;

