import type { CreatePaymentInput, Payment } from './payment.type';

// 행 = create에서 period·status·paidDate 제외 — 전 행 scheduled 생성(PM-4)
export type BulkPaymentRow = Omit<CreatePaymentInput, 'period' | 'status' | 'paidDate'>;

export interface BulkCreatePaymentsInput {
  period: string;
  rows: BulkPaymentRow[]; // 1~50행
}

export interface BulkSkippedRow {
  index: number; // 요청 rows 기준 인덱스
  studentId?: string;
  reason: 'STUDENT_NOT_FOUND' | 'STUDENT_INACTIVE' | 'DUPLICATE_PAYMENT';
}

export interface BulkCreatePaymentsResult {
  created: Payment[];
  skipped: BulkSkippedRow[]; // 전 행 skipped여도 HTTP 201 (§8)
}
