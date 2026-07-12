import type { Payment } from '@entities/payment';

export interface PaymentRowProps {
  payment: Payment;
  onMarkPaid: () => void;
  onEdit: () => void;
  onDelete: () => void; // P7 — 디자인에 없던 삭제 진입점(행 액션)
}
