export interface UseDeleteStudentParams {
  studentId: string;
  onClose: () => void; // 취소/오버레이/ESC — 닫기만
  onDeleted?: () => void; // 삭제 성공 후 (예: 상세 → 목록 이동)
}
