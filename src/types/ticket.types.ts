export type TicketStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD_OUT';
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export interface TicketTier {
  id: string;
  name: string;
  priceCents: number;
  serviceFee: number;
  capacity: number;
  soldCount: number;
  status: TicketStatus;
  orderIndex: number;
  eventId: string;
}

export interface TicketSelection {
  tierId: string;
  quantity: number;
}

export interface CheckoutPayload {
  eventId: string;
  email: string;
  selections: TicketSelection[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceCents: number;
  orderId: string;
  tierId: string;
  tier?: TicketTier;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  totalCents: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutResult {
  success: boolean;
  orderNumber?: string;
  totalCents?: number;
  message?: string;
  error?: string;
}
