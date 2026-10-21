import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';

/**
 * WaitlistForm Component
 * Ultra-minimalist text waitlist module.
 * No boxy containers or static underlines. Seamless floating text in the void
 * that only reveals a subtle hairline underline and cool cyber targeting reticle icon
 * while actively typing an address.
 * Zero hardcoded color literals.
 *
 * @returns {JSX.Element} Subtle waitlist input interface.
 */
export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasContent = email.trim().length > 0;

  /**
   * Handles submission of the waiting list email to the serverless backend.
   *
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage(STRINGS.waitlist.errorInvalid);
      return;
    }

    const targetEmail = email.trim();
    setLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: targetEmail,
          source: 'teaser_waiting_list',
        }),
      });

      if (response.ok) {
        setSubmittedEmail(targetEmail);
        setIsSubmitted(true);
        setEmail('');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || STRINGS.waitlist.errorServer);
      }
    } catch (err: unknown) {
      console.error('[Waitlist] Form transmission failure:', err);
      setErrorMessage(STRINGS.waitlist.errorServer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto mt-12 sm:mt-14 select-none px-4">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center font-mono space-y-2 transition-all duration-700 animate-fade-in">
          {/* Status Badge without dot */}
          <div className="text-xs sm:text-sm tracking-[0.25em] text-ls-mono-pureWhite uppercase laser-glow-text">
            {STRINGS.waitlist.successTitle}
          </div>

          {/* Registered Email Confirmation in Pure White */}
          <p className="text-xs sm:text-sm tracking-[0.2em] text-ls-mono-pureWhite font-bold">
            {submittedEmail}
          </p>

          {/* Clean Instruction */}
          <p className="text-[11px] sm:text-xs tracking-[0.2em] text-ls-mono-silver lowercase">
            {STRINGS.waitlist.success}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div
            className="relative w-full flex items-center transition-all duration-500 pb-1 border-b border-ls-blue-laserCyan/30 hover:border-ls-blue-laserCyan/60 focus-within:border-ls-blue-laserCyan/90"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) {
                  setErrorMessage(null);
                }
              }}
              placeholder={STRINGS.waitlist.placeholder}
              disabled={loading}
              className="w-full bg-transparent text-center text-ls-mono-pureWhite placeholder:text-ls-mono-muted/70 hover:placeholder:text-ls-mono-silver/90 font-mono text-xs sm:text-sm tracking-[0.2em] lowercase focus:outline-none transition-all duration-300 disabled:opacity-40"
              aria-label="Join the waiting list"
              required
            />

            {/* Clean arrow submit trigger revealed only when typing */}
            <div
              className={`absolute right-0 transition-all duration-500 transform ${
                hasContent
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-2 scale-75 pointer-events-none'
              }`}
            >
              <button
                type="submit"
                disabled={loading || !hasContent}
                aria-label="Submit email"
                title="Submit"
                className="p-1 text-ls-mono-pureWhite hover:text-ls-blue-laserCyan transition-all duration-300 focus:outline-none group drop-shadow-[0_0_10px_var(--ls-color-blue-laserCyan)] cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-3 h-3 border border-ls-mono-pureWhite border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="mt-2 text-center font-mono text-[10px] tracking-widest text-red-400/80 uppercase">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default WaitlistForm;
