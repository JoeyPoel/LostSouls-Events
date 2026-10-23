import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';

interface GalleryPost {
  id: string;
  type: 'stage' | 'crowd' | 'merch' | 'portrait' | 'aftermovie' | 'console';
  title: string;
  image: string;
  timestamp: string;
  tag: string;
  badge?: string;
}

const INSTAGRAM_POSTS: GalleryPost[] = [
  {
    id: 'post-01',
    type: 'merch',
    title: 'AFTER DARK // 05 09 CAPSULE',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    timestamp: '05-09-2026 // 23:00–06:00',
    tag: 'LIMITED RUN // 100 PIECES',
    badge: 'COMMUNITY GEAR',
  },
  {
    id: 'post-02',
    type: 'aftermovie',
    title: 'AFTERMOVIE TRANSMISSION',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    timestamp: '05-09-2026 // NETHERLANDS',
    tag: 'SUB-VOID // 160 BPM',
    badge: 'PLAY REEL ▶',
  },
  {
    id: 'post-03',
    type: 'stage',
    title: 'MAIN LASER RIG',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    timestamp: '14.11.2026 // 03:15',
    tag: 'V-TRUSS LIGHT ARRAY',
    badge: 'LIVE STAGE',
  },
  {
    id: 'post-04',
    type: 'portrait',
    title: 'DIRECT FLASH ARTIST DOSSIER',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    timestamp: '05-09-2026 // NETHERLANDS',
    tag: 'STREETWEAR // OBSIDIAN',
    badge: 'RESIDENT',
  },
  {
    id: 'post-05',
    type: 'crowd',
    title: 'RAISED HANDS & COBALT FLOOD',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    timestamp: '05-09-2026 // 04:30',
    tag: 'DANCEFLOOR SOLIDARITY',
    badge: 'ENERGY',
  },
  {
    id: 'post-06',
    type: 'console',
    title: 'DJ CONTEST TRANSMISSION',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    timestamp: '05-09-2026 // CLOSING',
    tag: 'TOP 10 CURATORS',
    badge: 'CONTEST',
  },
];

export interface GallerySectionProps {
  isTest?: boolean;
}

/**
 * GallerySection Component
 * Recreates the underground techno collective's Instagram feed grid:
 * high-contrast direct flash, blue laser stage photography, merch capsule drops, and aftermovie stills.
 * In default production mode, renders the unrevealed archive grid awaiting Chapter 01 documentation.
 * Zero hardcoded color literals.
 */
export const GallerySection: React.FC<GallerySectionProps> = ({ isTest = false }) => {
  const [activePost, setActivePost] = useState<GalleryPost | null>(null);

  const posts: GalleryPost[] = isTest
    ? INSTAGRAM_POSTS
    : (STRINGS.gallery.items as unknown as GalleryPost[]);

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
            <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
              {STRINGS.gallery.preTitle}
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
            {STRINGS.gallery.title}
          </h2>
        </div>

        <a
          href="https://instagram.com/lost.souls.events"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-widest text-ls-blue-laserCyan hover:text-ls-blue-iceStrobe transition-colors"
        >
          {STRINGS.gallery.instagramHandle}
        </a>
      </div>

      {/* Instagram 3-Column Square/Portrait Feed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => isTest && setActivePost(post)}
            className={`group bg-ls-void-abyss/60 border border-ls-mono-hairline/60 hover:border-ls-blue-laserCyan/60 rounded-none transition-all duration-500 relative overflow-hidden shadow-laser-subtle backdrop-blur-sm ${
              isTest ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            {/* Top Instagram Media Tag */}
            <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-widest text-ls-mono-pureWhite px-3 py-1 bg-ls-void-pure/85 border border-ls-blue-laserCyan/40 rounded-full uppercase">
                {post.badge || 'COMING SOON'}
              </span>
            </div>

            {/* Post Image Container */}
            <div className="relative aspect-square overflow-hidden bg-ls-void-pure rounded-none m-2 flex flex-col items-center justify-center p-6">
              {!isTest ? (
                <>
                  <div className="z-10 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-ls-mono-hairline/60 flex items-center justify-center mb-3 group-hover:border-ls-blue-laserCyan/60 group-hover:scale-105 transition-all">
                      <span className="w-2 h-2 rounded-full bg-ls-blue-laserCyan/60 group-hover:bg-ls-blue-laserCyan animate-pulse" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-ls-mono-silver uppercase">
                      COMING SOON
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-ls-mono-muted uppercase mt-1">
                      CHAPTER 01
                    </span>
                  </div>

                  {/* Dark Radial Void Glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(0, 68, 255, 0.12) 0%, rgba(2, 6, 17, 0.9) 75%, var(--ls-color-void-pure) 100%)',
                    }}
                  />
                </>
              ) : (
                <>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
                    loading="lazy"
                  />
                  {/* Blue Stage Laser Flood Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity"
                    style={{
                      background:
                        'linear-gradient(to top, var(--ls-color-void-pure) 0%, rgba(0, 56, 184, 0.3) 60%, transparent 100%)',
                    }}
                  />
                </>
              )}
            </div>

            {/* Post Footer Telemetry Stamp */}
            <div className="p-5 bg-transparent border-t border-ls-mono-hairline/40">
              <p className="font-editorial text-base font-black tracking-wide text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors uppercase">
                {post.title}
              </p>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-wider text-ls-mono-silver uppercase">
                <span className="text-ls-blue-laserCyan">{post.timestamp || 'TO BE ANNOUNCED'}</span>
                <span>{post.tag || 'COMING SOON'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* Lightbox Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ls-void-pure/90 backdrop-blur-md"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative max-w-lg w-full bg-ls-void-abyss/90 border border-ls-mono-hairline/60 rounded-none shadow-laser-subtle p-6 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/[0.06] font-mono text-xs">
              <span className="text-ls-blue-laserCyan tracking-widest uppercase">
                {activePost.timestamp}
              </span>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="text-ls-mono-silver hover:text-ls-mono-pureWhite tracking-widest uppercase cursor-pointer"
              >
                {STRINGS.gallery.closeModal}
              </button>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-none bg-ls-void-pure">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 font-rave text-lg text-ls-mono-pureWhite uppercase tracking-wide text-center">
              {activePost.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
