import type { IssuedReceipt } from '@entities/issued-receipt';

export interface ReceiptPreviewModalProps {
  receipt: IssuedReceipt;
  onClose: () => void;
  onExport: () => void; // PDF 변환 → export 화면
  onEdit: () => void; // 수정 → 발급 폼
}
