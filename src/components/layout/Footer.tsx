import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';

/**
 * Footer Component
 * Architectural industrial footer with newsletter dispatch channel, coordinates, and brand telemetry.
 * Styled in the seamless void teaser aesthetic without bulky containers.
 * Zero sigil stars, zero hardcoded color literals.
 *
 * @returns {JSX.Element} Rendered footer element.
 */
export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'website_footer' }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Failed to submit dispatch address');
      }
    } catch (err: unknown) {
      setErrorMessage('Communication error registering subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" className="w-full bg-ls-void-pure pt-14 pb-16 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/[0.04]">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.14em] text-ls-blue-iceStrobe laser-glow-text">
                  {STRINGS.teaser.brandTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm tracking-[0.2em] text-ls-mono-muted max-w-md uppercase leading-relaxed">
                {STRINGS.footer.tagline}
              </p>
            </div>

            <div className="mt-8 font-mono text-[11px] tracking-widest text-ls-mono-silver">
              <p>{STRINGS.footer.coordinates}</p>
            </div>
          </div>

          {/* Newsletter Dispatch Box */}
          <div className="lg:col-span-6 relative p-7 sm:p-9 bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-3xl shadow-laser-subtle backdrop-blur-sm">
            <h4 className="font-editorial text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-ls-mono-pureWhite mb-2">
              {STRINGS.footer.newsletterPrompt}
            </h4>
            <p className="font-mono text-[11px] tracking-wider text-ls-mono-muted uppercase mb-6">
              {STRINGS.meta.taglineTelemetry}
            </p>

            {isSubmitted ? (
              <div className="p-4 border border-ls-blue-laserCyan bg-ls-blue-cobalt/10 text-ls-blue-laserCyan font-mono text-xs tracking-wider uppercase rounded-2xl">
                {STRINGS.footer.subscribeSuccess}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={STRINGS.footer.newsletterPlaceholder}
                  required
                  id="newsletter-email-input"
                  className="flex-1 px-5 py-3.5 bg-ls-void-pure/80 border border-ls-mono-hairline/60 rounded-full text-ls-mono-pureWhite font-mono text-xs placeholder:text-ls-mono-muted/60 focus:border-ls-blue-laserCyan focus:outline-none transition-colors"
                />
                <GlowButton
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  id="newsletter-submit-button"
                  className="whitespace-nowrap px-6 py-3 text-xs"
                >
                  {STRINGS.footer.subscribeCta}
                </GlowButton>
              </form>
            )}

            {errorMessage && (
              <p className="mt-2 text-xs font-mono text-ls-state-warning">
                {errorMessage}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase">
          <p className="font-editorial text-sm tracking-[0.14em] text-ls-mono-silver font-bold">
            {STRINGS.footer.rightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <span>{STRINGS.meta.cityCoordinates}</span>
            <span>•</span>
            <span>{STRINGS.meta.editionTelemetry}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
