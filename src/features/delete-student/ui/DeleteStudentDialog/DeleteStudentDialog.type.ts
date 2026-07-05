import type { Student } from '@entities/student';

export interface DeleteStudentDialogProps {
  open: boolean;
  onClose: () => void; // 취소/오버레이/ESC — 닫기만
  onDeleted?: () => void; // 삭제 성공 후 (예: 상세 → 목록 이동)
  student: Student;
}
