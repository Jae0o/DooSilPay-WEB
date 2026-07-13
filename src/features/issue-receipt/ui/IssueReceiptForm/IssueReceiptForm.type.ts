import type { AcademyProfile } from '@entities/academy';
import type { IssuedReceipt } from '@entities/issued-receipt';
import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';

export interface IssueReceiptFormProps {
  payment: Payment;
  student: Student;
  academy?: AcademyProfile; // 로딩 중 짧게 undefined 가능 (AppTopBar·AppSidebar 선례 — 옵셔널 체이닝으로 방어)
  existingReceipt?: IssuedReceipt;
  editing: boolean; // 보기/수정 토글 — 페이지가 소유(PageHead 부제와 값을 공유해야 해서 상위 lifting)
  onStartEdit: () => void;
  onCancelEdit: () => void; // 수정 취소 + 저장 성공 후 보기 모드 복귀
  onIssued: () => void; // 신규 발급 성공 — 목록 이동은 페이지(useNavigate) 담당
}

export interface IssueReceiptFormValues {
  subjectName: string;
  issuedDate: string;
  tuitionFee: string;
  otherFees: { label: string; amount: string }[];
}
