import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';
import { GlowButton } from '@/components/common/GlowButton';
import { CyberSigil } from '@/components/common/CyberSigil';
import { SigilDivider } from '@/components/common/SigilDivider';

/**
 * Footer Component
 * Architectural industrial footer with newsletter dispatch channel, coordinates, and brand telemetry.
 * Zero hardcoded color literals.
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
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to submit dispatch address');
      }
    } catch (err: unknown) {
      setErrorMessage('Communication error registering subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" className="w-full border-t border-ls-mono-hairline bg-ls-void-abyss pt-12 pb-14 relative overflow-hidden">
      <SigilDivider label={STRINGS.footer.title} className="mb-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-ls-mono-hairline">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <CyberSigil variant="blade-cross" size={24} glow />
                <h3 className="font-mono text-2xl font-black tracking-[0.25em] text-ls-mono-pureWhite">
                  {STRINGS.footer.title}
                </h3>
              </div>
              <p className="font-mono text-xs tracking-[0.2em] text-ls-mono-muted max-w-md uppercase leading-relaxed">
                {STRINGS.footer.tagline}
              </p>
            </div>

            <div className="mt-8 font-mono text-[11px] tracking-widest text-ls-mono-silver">
              <p>{STRINGS.footer.coordinates}</p>
            </div>
          </div>

          {/* Newsletter Dispatch Box */}
          <div className="lg:col-span-6 relative p-7 sm:p-9 bg-ls-void-surface border border-ls-blue-laserCyan/40 cyber-cut shadow-laser-subtle">
            <div className="absolute top-2 right-2 pointer-events-none">
              <CyberSigil variant="corner-thorn" size={32} glow />
            </div>

            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ls-mono-pureWhite mb-2">
              {STRINGS.footer.newsletterPrompt}
            </h4>
            <p className="font-mono text-[11px] tracking-wider text-ls-mono-muted uppercase mb-6">
              {STRINGS.meta.taglineTelemetry}
            </p>

            {isSubmitted ? (
              <div className="p-4 border border-ls-blue-laserCyan bg-ls-blue-cobalt/10 text-ls-blue-laserCyan font-mono text-xs tracking-wider uppercase cyber-cut-sm">
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
                  className="flex-1 px-4 py-3 bg-ls-void-pure border border-ls-mono-hairline cyber-cut-sm text-ls-mono-pureWhite font-mono text-xs placeholder:text-ls-mono-dark focus:border-ls-blue-laserCyan focus:outline-none transition-colors"
                />
                <GlowButton
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  id="newsletter-submit-button"
                  className="whitespace-nowrap px-6"
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
          <p>{STRINGS.footer.rightsReserved}</p>
          <div className="flex items-center gap-6">
            <span>{STRINGS.meta.cityCoordinates}</span>
            <span>//</span>
            <span>{STRINGS.meta.editionTelemetry}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
