export interface IssuePromptDialogProps {
  paymentId: string; // 방금 등록된 결제 id — 수락 시 발급 폼으로 이동
  onClose: () => void; // 거절/오버레이/ESC — 부작용 없이 닫기 (R7)
}
