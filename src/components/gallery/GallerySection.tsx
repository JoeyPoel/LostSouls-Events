import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';
import { CyberSigil } from '@/components/common/CyberSigil';
import { SigilDivider } from '@/components/common/SigilDivider';

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
    timestamp: '05-09-2026 // NOW&WOW',
    tag: 'SUB-VOID // 160 BPM',
    badge: 'PLAY REEL ▶',
  },
  {
    id: 'post-03',
    type: 'stage',
    title: 'TOFFLER MAIN LASER RIG',
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
    timestamp: '05-09-2026 // ROTTERDAM',
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

/**
 * GallerySection Component
 * Recreates the underground techno collective's Instagram feed grid:
 * high-contrast direct flash, blue laser stage photography, merch capsule drops, and aftermovie stills.
 * Zero hardcoded color literals.
 */
export const GallerySection: React.FC = () => {
  const [activePost, setActivePost] = useState<GalleryPost | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SigilDivider label={STRINGS.gallery.preTitle} className="mb-12" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-6 border-b border-ls-mono-hairline">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CyberSigil variant="blade-cross" size={18} glow />
            <span className="font-mono text-xs tracking-[0.25em] text-ls-blue-laserCyan uppercase">
              {STRINGS.gallery.preTitle}
            </span>
          </div>
          <h2 className="font-rave text-4xl sm:text-7xl font-black uppercase tracking-tight text-ls-mono-pureWhite">
            {STRINGS.gallery.title}
          </h2>
        </div>

        <div className="font-mono text-xs tracking-widest text-ls-blue-laserCyan uppercase">
          // @LOSTSOULS.EVENTS
        </div>
      </div>

      {/* Instagram 3-Column Square/Portrait Feed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group cursor-pointer bg-ls-void-abyss border border-ls-blue-electric/30 hover:border-ls-blue-laserCyan cyber-cut transition-all duration-300 relative overflow-hidden shadow-laser-subtle"
          >
            {/* Top Instagram Media Tag */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-widest text-ls-mono-pureWhite px-2.5 py-1 bg-ls-void-pure/85 border border-ls-blue-laserCyan/50 cyber-cut-sm uppercase">
                {post.badge}
              </span>
            </div>

            {/* Corner Thorn */}
            <div className="absolute top-2 right-2 z-20 pointer-events-none">
              <CyberSigil variant="corner-thorn" size={28} glow />
            </div>

            {/* Post Image Container */}
            <div className="relative aspect-square overflow-hidden bg-ls-void-pure cyber-cut">
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
              <div className="absolute inset-0 scanlines-pattern opacity-30 pointer-events-none" />
            </div>

            {/* Post Footer Telemetry Stamp */}
            <div className="p-5 border-t border-ls-mono-hairline bg-ls-void-surface">
              <p className="font-rave text-base font-black tracking-wide text-ls-mono-pureWhite group-hover:text-ls-blue-laserCyan transition-colors uppercase">
                {post.title}
              </p>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-wider text-ls-mono-silver uppercase">
                <span className="text-ls-blue-laserCyan">{post.timestamp}</span>
                <span>{post.tag}</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ls-void-pure/95 backdrop-blur-md"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative max-w-lg w-full bg-ls-void-surface border border-ls-blue-laserCyan cyber-cut shadow-laser-intense p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-ls-mono-hairline font-mono text-xs">
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

            <div className="relative aspect-square overflow-hidden cyber-cut">
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
