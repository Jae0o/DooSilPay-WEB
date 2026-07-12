import type { Payment } from '@entities/payment';

// 결제 모달 4종 — 동시에 1개만(discriminated union). 대상 payment를 상태에 함께 실어 소비처에서 좁힌다
export type PaymentModalState =
  | { type: 'create' }
  | { type: 'edit'; payment: Payment }
  | { type: 'delete'; payment: Payment } // 04-02에서 소비
  | { type: 'markPaid'; payment: Payment } // 04-03에서 소비
  | null;
