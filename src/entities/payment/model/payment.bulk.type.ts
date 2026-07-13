import type { IssuedReceipt } from '@entities/issued-receipt';

import type { CreatePaymentInput, Payment } from './payment.type';

// 행 = create에서 period·status·paidDate 제외 — 전 행 scheduled 생성(PM-4)
export type BulkPaymentRow = Omit<CreatePaymentInput, 'period' | 'status' | 'paidDate'>;

export interface BulkCreatePaymentsInput {
  period: string;
  rows: BulkPaymentRow[]; // 1~50행
  alsoIssue?: boolean; // IR-8 — true면 생성 행 전체 일괄 발급 (RW-9)
}

export interface BulkSkippedRow {
  index: number; // 요청 rows 기준 인덱스
  studentId?: string;
  reason: 'STUDENT_NOT_FOUND' | 'STUDENT_INACTIVE' | 'DUPLICATE_PAYMENT';
}

// alsoIssue true에서 생년월일 누락으로 발급 건너뛴 결제 (IR-8)
export interface BulkIssueSkippedRow {
  paymentId: string;
  studentId: string;
  reason: 'STUDENT_BIRTHDATE_REQUIRED';
}

export interface BulkCreatePaymentsResult {
  created: Payment[];
  skipped: BulkSkippedRow[]; // 전 행 skipped여도 HTTP 201 (§8)
  issued?: IssuedReceipt[]; // alsoIssue true일 때만
  issueSkipped?: BulkIssueSkippedRow[]; // alsoIssue true일 때만
}
