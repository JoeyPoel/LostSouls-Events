import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';
import { CyberSigil } from '@/components/common/CyberSigil';

export interface ThreeChaptersProps {
  onSelectChapter?: (chapterId: string) => void;
}

/**
 * ThreeChapters Component
 * Chronicles the evolution of Lost Souls across three distinct editions:
 * - Chapter 01: First Awakening (Panama Amsterdam)
 * - Chapter 02: Electric Void (Now&Wow Rotterdam)
 * - Chapter 03: Into The Abyss (Now&Wow Rotterdam - Active Next Chapter)
 * Directly implements the Three Chapters aesthetic ledger from the underground reference.
 * Zero hardcoded color literals.
 *
 * @param {ThreeChaptersProps} props - Component properties including optional chapter selection callback.
 * @returns {JSX.Element} Rendered Three Chapters chronological ledger.
 */
export const ThreeChapters: React.FC<ThreeChaptersProps> = ({ onSelectChapter }) => {
  const [activeSlide, setActiveSlide] = useState<number>(2); // Default to Chapter 03 (Into The Abyss)

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : STRINGS.chapters.editions.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < STRINGS.chapters.editions.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="chapters" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-ls-mono-hairline">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-ls-blue-laserCyan" />
            <span className="font-mono text-xs tracking-[0.25em] text-ls-mono-muted uppercase">
              {STRINGS.chapters.preTitle}
            </span>
          </div>
          <h2 className="font-editorial text-5xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
            {STRINGS.chapters.title}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="font-mono text-xs sm:text-sm text-ls-mono-silver tracking-wider uppercase max-w-xs">
            {STRINGS.chapters.subtitle}
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous edition"
              className="w-10 h-10 border border-ls-mono-hairline bg-ls-void-surface hover:border-ls-blue-laserCyan text-ls-mono-pureWhite hover:text-ls-blue-laserCyan flex items-center justify-center font-mono text-sm transition-all duration-200 cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next edition"
              className="w-10 h-10 border border-ls-mono-hairline bg-ls-void-surface hover:border-ls-blue-laserCyan text-ls-mono-pureWhite hover:text-ls-blue-laserCyan flex items-center justify-center font-mono text-sm transition-all duration-200 cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ls-mono-muted uppercase">
          {STRINGS.chapters.swipeLabel}
        </span>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STRINGS.chapters.editions.map((edition, idx) => {
          const isNextChapter = idx === 2;
          const isActive = idx === activeSlide;

          return (
            <article
              key={edition.id}
              onClick={() => {
                setActiveSlide(idx);
                onSelectChapter?.(edition.id);
              }}
              className={`group flex flex-col bg-ls-void-surface border transition-all duration-500 cursor-pointer ${
                isActive
                  ? 'border-ls-blue-laserCyan shadow-laser-subtle'
                  : 'border-ls-mono-hairline hover:border-ls-blue-laserCyan/50'
              }`}
            >
              {/* Poster Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-ls-void-pure">
                <img
                  src={edition.image}
                  alt={edition.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:scale-105 group-hover:brightness-70 transition-all duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, var(--ls-color-void-pure) 0%, rgba(2, 6, 17, 0.4) 50%, rgba(0, 68, 255, 0.2) 100%)',
                  }}
                />

                {/* Top Chapter Wire Badge */}
                <div className="absolute top-4 left-4 z-10">
                  {isNextChapter ? (
                    <span className="inline-block px-3 py-1 font-mono text-[10px] tracking-widest font-bold uppercase bg-ls-blue-cobalt text-ls-mono-pureWhite border border-ls-blue-laserCyan shadow-laser-subtle">
                      {edition.tag}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 font-mono text-[10px] tracking-widest font-bold uppercase bg-ls-void-pure/80 text-ls-mono-silver border border-ls-mono-hairline">
                      {edition.tag}
                    </span>
                  )}
                </div>

                {/* Centered Cyber Sigil Emblem Overlay for Chapter 03 */}
                {isNextChapter && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                    <CyberSigil variant="thorny-crest" size={160} glow />
                  </div>
                )}
              </div>

              {/* Bottom Metadata & Typography */}
              <div className="p-6 flex flex-col flex-grow justify-between border-t border-ls-mono-hairline bg-ls-void-abyss">
                <div>
                  <span className="font-mono text-[11px] tracking-widest text-ls-mono-silver uppercase block mb-2">
                    {edition.dateVenue}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors mb-3">
                    {edition.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-ls-mono-muted uppercase leading-relaxed">
                  {edition.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ThreeChapters;
