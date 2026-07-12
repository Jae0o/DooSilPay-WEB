import type { BulkSkippedRow, PaymentMethod } from '@entities/payment';

// 벌크 폼 값 — 입력 문자열 유지(저장 시 05-03에서 숫자 변환). status·paidDate 없음 = 서버가 paid+오늘로 생성
export interface BulkPaymentRowValues {
  studentId: string;
  subjectName: string;
  dueDate: string; // '' 허용 (P5 — 선택)
  tuitionFee: string;
  otherFees: { label: string; amount: string }[]; // ≤3 (05-02 모달에서 편집)
  method: '' | PaymentMethod;
  skippedReason?: BulkSkippedRow['reason']; // 05-03 부분 실패 표시용(입력 아님)
}

export interface BulkPaymentFormValues {
  period: string; // 상단 공통
  rows: BulkPaymentRowValues[];
}
