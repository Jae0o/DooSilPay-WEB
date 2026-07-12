import type { Payment } from '@entities/payment';

export interface UseMarkPaidParams {
  payment: Payment; // 대상 결제 — id + 기존 method 초기값
  onClose: () => void; // 처리 성공/취소 — 닫기
}
