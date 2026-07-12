import type { Payment } from '@entities/payment';

export interface DeletePaymentDialogProps {
  payment: Payment;
  onClose: () => void; // 취소/오버레이/ESC/삭제 성공 — 상위에서 언마운트
}
