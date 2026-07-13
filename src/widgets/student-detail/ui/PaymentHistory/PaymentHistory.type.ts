import type { Payment } from '@entities/payment';

export interface PaymentHistoryProps {
  studentId: string;
  onMarkPaid: (payment: Payment) => void;
  onEdit: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
  onIssue: (payment: Payment) => void;
}
