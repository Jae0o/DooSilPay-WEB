import type { Payment, PaymentStatus } from './payment.type';

export interface ListPaymentsParams {
  period?: string; // YYYY-MM
  studentId?: string;
  status?: PaymentStatus;
}

// ⚠️ bare 배열 아님 (V2-1)
export interface ListPaymentsResult {
  items: Payment[]; // 서버 정렬: period desc, createdAt desc (PM-6)
  total: number;
}
