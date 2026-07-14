export interface DeleteSignatureDialogProps {
  open: boolean;
  onClose: () => void; // 취소/오버레이/ESC — 닫기만 (삭제 성공 시 훅이 onClose 호출)
}
