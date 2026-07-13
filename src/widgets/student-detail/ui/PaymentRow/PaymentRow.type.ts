import type { Payment } from '@entities/payment';

export interface PaymentRowProps {
  payment: Payment;
  onMarkPaid: () => void;
  onEdit: () => void;
  onDelete: () => void; // P7 — 디자인에 없던 삭제 진입점(행 액션)
  onIssue: () => void; // 교부영수증 발급/보기 — 판정은 payment.issuedReceiptId (RW-3)
}
