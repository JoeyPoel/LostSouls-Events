import React, { useState } from 'react';
import { STRINGS } from '@/constants/strings';
import type { TicketTier } from '@/types/ticket.types';
import { useTicketEngine } from '@/hooks/useTicketEngine';
import { GlowButton } from '@/components/common/GlowButton';
import { WireBadge } from '@/components/common/WireBadge';

export interface TicketMatrixProps {
  eventId: string;
  tiers: TicketTier[];
  isTest?: boolean;
}

/**
 * TicketMatrix Component
 * Cybernetic ticket allocation engine with razor-cut tier ribbons,
 * industrial counter controls, real-time totals, and serverless checkout trigger.
 * In default production mode, gracefully renders locked allocation preview with priority waitlist prompts.
 * In test mode, renders interactive ticket counter controls and checkout form.
 * Zero hardcoded color literals.
 */
export const TicketMatrix: React.FC<TicketMatrixProps> = ({ eventId, tiers, isTest = false }) => {

  const [email, setEmail] = useState('');
  const {
    selections,
    status,
    confirmedOrderNumber,
    errorMessage,
    totalTickets,
    totalCents,
    incrementTier,
    decrementTier,
    executeCheckout,
    resetEngine,
  } = useTicketEngine(tiers);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    await executeCheckout(email, eventId);
  };

  /**
   * Formats cents into formatted currency (e.g., €34.00)
   */
  const formatCurrency = (cents: number): string => {
    const euros = (cents / 100).toFixed(2);
    return `${STRINGS.tickets.currencySymbol}${euros}`;
  };

  // State view: Order Confirmed
  if (status === 'CONFIRMED' && confirmedOrderNumber) {
    return (
      <div className="p-7 sm:p-9 bg-ls-void-abyss/80 border border-ls-mono-hairline/60 rounded-none shadow-laser-subtle backdrop-blur-sm relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-ls-blue-laserCyan" />
          <h4 className="font-mono text-base font-bold tracking-[0.25em] text-ls-mono-pureWhite uppercase">
            {STRINGS.tickets.orderSuccess}
          </h4>
        </div>

        <div className="my-6 p-5 bg-ls-void-pure/60 border border-ls-blue-laserCyan/30 rounded-none">
          <p className="font-mono text-[11px] tracking-widest text-ls-mono-muted uppercase mb-1">
            {STRINGS.tickets.orderNumberLabel}
          </p>
          <p className="font-mono text-xl font-bold tracking-widest text-ls-blue-laserCyan select-all laser-glow-text">
            {confirmedOrderNumber}
          </p>
        </div>

        <p className="text-xs tracking-wider text-ls-mono-silver mb-7 leading-relaxed">
          {STRINGS.footer.subscribeSuccess}
        </p>

        <GlowButton variant="secondary" onClick={resetEngine} fullWidth id="order-reset-button">
          {STRINGS.navigation.ticketCta}
        </GlowButton>
      </div>
    );
  }

  // Default production view: Locked allocation preview with waitlist prompt
  if (!isTest) {
    return (
      <div className="p-6 sm:p-8 bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none relative shadow-laser-subtle backdrop-blur-sm">
        {/* Matrix Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-ls-mono-hairline/40">
          <div className="flex items-center gap-3 pl-2">
            <h3 className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-ls-mono-pureWhite">
              {STRINGS.tickets.headerTitle}
            </h3>
          </div>
          <WireBadge variant="cyan">
            {STRINGS.tickets.badge}
          </WireBadge>
        </div>

        {/* Tier Matrix Rows in Locked Coming Soon State */}
        <div className="space-y-3.5">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="p-4 sm:p-5 border border-ls-mono-hairline/60 bg-ls-void-abyss/40 rounded-none transition-all duration-300 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ls-mono-pureWhite">
                      {tier.name}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-1.5 pl-3.5">
                    <span className="font-mono text-xs font-bold text-ls-mono-silver tracking-widest uppercase">
                      {STRINGS.tickets.priceTba}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase">
                      • {STRINGS.tickets.serviceFeeTba}
                    </span>
                  </div>
                </div>

                <div className="flex items-center self-end sm:self-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ls-blue-laserCyan px-3 py-1 bg-ls-void-pure/80 border border-ls-blue-laserCyan/40 rounded-full">
                    {STRINGS.tickets.tierStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist Gateway Trigger */}
        <div className="mt-8 pt-6 border-t border-ls-mono-hairline/40 flex flex-col space-y-4">
          <p className="text-xs font-mono text-ls-mono-silver tracking-wider uppercase leading-relaxed text-center sm:text-left">
            {STRINGS.tickets.emptyNotice}
          </p>

          <GlowButton
            variant="primary"
            fullWidth
            onClick={() => {
              const heroElement = document.getElementById('hero');
              if (heroElement) {
                heroElement.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            id="ticket-waitlist-btn"
            className="py-4 text-xs font-bold uppercase tracking-widest"
          >
            {STRINGS.tickets.waitlistCta}
          </GlowButton>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-ls-void-abyss/60 border border-ls-mono-hairline/60 rounded-none relative shadow-laser-subtle backdrop-blur-sm">
      {/* Matrix Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-ls-mono-hairline/40">
        <div className="flex items-center gap-3 pl-2">
          <h3 className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-ls-mono-pureWhite">
            {STRINGS.tickets.headerTitle}
          </h3>
        </div>
        <WireBadge variant="cyan">
          {STRINGS.tickets.capacityAlertBadge}
        </WireBadge>
      </div>

      {/* Tier Matrix Rows */}
      <div className="space-y-3.5">
        {tiers.map((tier) => {
          const isSoldOut = tier.status === 'SOLD_OUT' || tier.soldCount >= tier.capacity;
          const selectedQty = selections[tier.id] || 0;
          const availableUnits = tier.capacity - tier.soldCount;

          return (
            <div
              key={tier.id}
              className={`p-4 sm:p-5 border rounded-none transition-all duration-300 relative ${
                isSoldOut
                  ? 'border-ls-mono-dark/50 bg-ls-void-abyss/30 opacity-40'
                  : selectedQty > 0
                  ? 'border-ls-blue-laserCyan/80 bg-ls-blue-cobalt/15 shadow-laser-subtle'
                  : 'border-ls-mono-hairline/60 bg-ls-void-abyss/70 hover:border-ls-blue-laserCyan/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tier Info */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ls-blue-laserCyan" />
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ls-mono-pureWhite">
                      {tier.name}
                    </span>
                    {isSoldOut ? (
                      <span className="font-mono text-[10px] tracking-widest uppercase text-ls-state-soldOut">
                        {STRINGS.tickets.tierSoldOutLabel}
                      </span>
                    ) : availableUnits < 50 ? (
                      <span className="font-mono text-[10px] tracking-widest uppercase text-ls-state-warning">
                        {STRINGS.tickets.tierLowStockLabel}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-baseline gap-2 mt-1.5 pl-3.5">
                    <span className="font-mono text-sm font-bold text-ls-mono-pureWhite">
                      {formatCurrency(tier.priceCents)}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-ls-mono-muted uppercase">
                      {STRINGS.tickets.serviceFeeNotice}
                    </span>
                  </div>
                </div>

                {/* Counter or Exhausted Badge */}
                <div className="flex items-center self-end sm:self-center">
                  {isSoldOut ? (
                    <span className="font-mono text-xs uppercase tracking-widest text-ls-mono-muted px-4 py-1.5 border border-ls-mono-dark rounded-full">
                      {STRINGS.tickets.phaseSoldOut}
                    </span>
                  ) : (
                    <div className="flex items-center border border-ls-mono-hairline/60 bg-ls-void-pure/80 rounded-none overflow-hidden">
                      <button
                        type="button"
                        onClick={() => decrementTier(tier.id)}
                        disabled={selectedQty === 0 || status === 'PROCESSING'}
                        className="w-9 h-9 flex items-center justify-center font-mono text-xs text-ls-mono-silver hover:text-ls-blue-laserCyan hover:bg-ls-void-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        id={`btn-decrement-${tier.id}`}
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono text-xs font-bold text-ls-mono-pureWhite">
                        {selectedQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementTier(tier.id, availableUnits)}
                        disabled={selectedQty >= 4 || selectedQty >= availableUnits || status === 'PROCESSING'}
                        className="w-9 h-9 flex items-center justify-center font-mono text-xs text-ls-mono-silver hover:text-ls-blue-laserCyan hover:bg-ls-void-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        id={`btn-increment-${tier.id}`}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary & Checkout Form */}
      <form onSubmit={handleCheckoutSubmit} className="mt-8 pt-6 border-t border-ls-mono-hairline/40">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-ls-mono-silver">
            {STRINGS.tickets.orderTotalLabel}
          </span>
          <span className="font-mono text-lg sm:text-xl font-black tracking-widest text-ls-blue-laserCyan laser-glow-text">
            {formatCurrency(totalCents)}
          </span>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={STRINGS.tickets.emailPlaceholder}
            required
            disabled={status === 'PROCESSING' || totalTickets === 0}
            id="ticket-checkout-email-input"
            className="w-full px-5 py-3.5 bg-ls-void-pure border border-ls-mono-hairline/60 rounded-none text-ls-mono-pureWhite font-mono text-xs placeholder:text-ls-mono-silver/60 focus:border-ls-blue-laserCyan focus:bg-ls-void-pure focus:text-ls-mono-pureWhite focus:outline-none disabled:opacity-40 transition-colors"
          />

          <GlowButton
            type="submit"
            variant="primary"
            disabled={totalTickets === 0 || status === 'PROCESSING'}
            fullWidth
            id="ticket-submit-button"
            className="py-4 text-xs font-bold"
          >
            {status === 'PROCESSING'
              ? STRINGS.tickets.processingOrder
              : STRINGS.tickets.checkoutButton}
          </GlowButton>
        </div>

        {errorMessage && (
          <p className="mt-3 text-xs font-mono text-ls-state-warning text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default TicketMatrix;

