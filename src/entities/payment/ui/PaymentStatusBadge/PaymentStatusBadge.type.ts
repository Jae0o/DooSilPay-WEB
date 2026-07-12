import type { PaymentStatus } from '../../model';

export interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  size?: 'sm' | 'md';
}
