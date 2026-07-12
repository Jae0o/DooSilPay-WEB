export type PaymentStatus = 'scheduled' | 'paid' | 'overdue'; // 수동 지정 — D9/PM-7 ('partial' 없음 — P4)
export type PaymentMethod = 'card' | 'transfer' | 'cash';

export interface OtherFee {
  label: string; // 1~20자
  amount: number; // 정수 ≥ 0
}

export interface Payment {
  id: string;
  studentId: string;
  period: string; // YYYY-MM. (studentId, period) 유일 — PM-2
  subjectName: string; // PM-1 (subject 아님)
  tuitionFee: number; // 정수 ≥ 0 (0 허용)
  otherFees: OtherFee[]; // 최대 3개
  dueDate: string | null; // YYYY-MM-DD, 선택 — PM-3
  paidDate: string | null;
  status: PaymentStatus;
  method: PaymentMethod | null;
  memo?: string;
  issuedReceiptId: string | null; // 이번 단계는 항상 null (07 연동)
  createdAt: string;
  updatedAt: string;
}

// POST /payments — 서버 zod가 default 채움(otherFees []·status scheduled·dueDate/paidDate/method null)
export interface CreatePaymentInput {
  studentId: string;
  period: string;
  subjectName: string; // trim 1~30
  tuitionFee: number; // 정수 ≥ 0
  otherFees?: OtherFee[]; // ≤ 3
  dueDate?: string | null;
  paidDate?: string | null;
  status?: PaymentStatus;
  method?: PaymentMethod | null;
  memo?: string; // trim ≤ 500
}

// PUT /payments/:id — create에서 studentId 제외(전 필드 교체, period 변경 시 서버가 중복 재검증)
export type UpdatePaymentInput = Omit<CreatePaymentInput, 'studentId'>;

// PATCH /payments/:id/pay
export interface MarkPaidInput {
  paidDate: string; // YYYY-MM-DD 필수
  method?: PaymentMethod | null;
}
