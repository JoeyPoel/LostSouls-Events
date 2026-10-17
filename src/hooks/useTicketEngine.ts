import { useState, useMemo } from 'react';
import type { TicketTier, CheckoutResult } from '@/types/ticket.types';

export type CheckoutStatus = 'IDLE' | 'PROCESSING' | 'CONFIRMED' | 'ERROR';

export interface UseTicketEngineReturn {
  selections: Record<string, number>;
  status: CheckoutStatus;
  confirmedOrderNumber: string | null;
  errorMessage: string | null;
  totalTickets: number;
  totalCents: number;
  incrementTier: (tierId: string, maxAvailable: number) => void;
  decrementTier: (tierId: string) => void;
  executeCheckout: (email: string, eventId: string) => Promise<boolean>;
  resetEngine: () => void;
}

const MAX_PER_TIER = 4;

/**
 * Custom state engine managing tier selections, volume constraints,
 * price calculations, and checkout transactions.
 *
 * @param tiers - Array of available ticket tiers for the selected edition.
 * @returns State and mutation methods for managing reservations.
 */
export const useTicketEngine = (tiers: TicketTier[]): UseTicketEngineReturn => {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<CheckoutStatus>('IDLE');
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Computes the aggregated ticket count across all tiers.
   */
  const totalTickets = useMemo(() => {
    return Object.values(selections).reduce((acc, count) => acc + count, 0);
  }, [selections]);

  /**
   * Computes the gross reservation sum in cents including tier service fees.
   */
  const totalCents = useMemo(() => {
    return Object.entries(selections).reduce((total, [tierId, qty]) => {
      const tier = tiers.find((t) => t.id === tierId);
      if (!tier || qty <= 0) return total;
      const unitCost = tier.priceCents + tier.serviceFee;
      return total + unitCost * qty;
    }, 0);
  }, [selections, tiers]);

  /**
   * Increases selected quantity for a tier, capped by individual tier capacity and maximum limits.
   */
  const incrementTier = (tierId: string, maxAvailable: number) => {
    if (status === 'PROCESSING') return;
    setSelections((prev) => {
      const current = prev[tierId] || 0;
      const ceiling = Math.min(MAX_PER_TIER, maxAvailable);
      if (current >= ceiling) return prev;
      return { ...prev, [tierId]: current + 1 };
    });
  };

  /**
   * Decrements selected quantity for a tier down to zero.
   */
  const decrementTier = (tierId: string) => {
    if (status === 'PROCESSING') return;
    setSelections((prev) => {
      const current = prev[tierId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[tierId];
        return next;
      }
      return { ...prev, [tierId]: current - 1 };
    });
  };

  /**
   * Dispatches the reservation payload to the serverless checkout endpoint.
   */
  const executeCheckout = async (email: string, eventId: string): Promise<boolean> => {
    if (totalTickets <= 0) {
      setErrorMessage('No tickets selected.');
      return false;
    }

    setStatus('PROCESSING');
    setErrorMessage(null);

    const payloadSelections = Object.entries(selections).map(([tierId, quantity]) => ({
      tierId,
      quantity,
    }));

    try {
      const response = await fetch('/api/tickets/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          email,
          selections: payloadSelections,
        }),
      });

      const data: CheckoutResult = await response.json();

      if (!response.ok || !data.success) {
        setStatus('ERROR');
        setErrorMessage(data.error || 'Checkout transmission failed.');
        return false;
      }

      setConfirmedOrderNumber(data.orderNumber || 'CONFIRMED');
      setStatus('CONFIRMED');
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network communication error';
      setStatus('ERROR');
      setErrorMessage(msg);
      return false;
    }
  };

  /**
   * Resets the reservation engine back to initial state.
   */
  const resetEngine = () => {
    setSelections({});
    setStatus('IDLE');
    setConfirmedOrderNumber(null);
    setErrorMessage(null);
  };

  return {
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
  };
};
