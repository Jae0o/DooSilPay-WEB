export interface UseDeletePaymentParams {
  paymentId: string;
  onClose: () => void; // 삭제 성공/취소 — 닫기
}
