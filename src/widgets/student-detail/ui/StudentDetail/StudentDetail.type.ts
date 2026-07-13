import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';

export interface StudentDetailProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddPayment: () => void;
  // 결제 행 액션 — 상위 pages로 전파, 실제 모달 배선은 04
  onMarkPaid: (payment: Payment) => void;
  onEditPayment: (payment: Payment) => void;
  onDeletePayment: (payment: Payment) => void;
  onIssuePayment: (payment: Payment) => void; // 교부영수증 발급/보기 — 상위(pages)가 라우트 이동 담당 (05-03)
}
