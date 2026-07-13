import type { Payment, PaymentMethod, PaymentStatus } from '@entities/payment';
import type { Student } from '@entities/student';

export interface PaymentFormModalProps {
  mode: 'create' | 'edit';
  student: Student; // prefill·subtitle·studentId 공급 (위젯이 양쪽 엔티티 소비 — 수평 참조 아님)
  payment?: Payment; // edit일 때 초기값
  onClose: () => void;
  onSuccess?: (payment: Payment) => void; // 저장 완료 후 추가 동작 (모달 닫기 외) — 등록/수정된 Payment 전달 (R7)
}

export interface PaymentFormValues {
  period: string;
  dueDate: string; // '' 허용 → 제출 시 null 변환 (P5)
  subjectName: string;
  tuitionFee: string; // 입력은 문자열, 제출 시 Number
  otherFees: { label: string; amount: string }[];
  method: '' | PaymentMethod; // '' = 선택 안 함 → null
  status: PaymentStatus;
}
