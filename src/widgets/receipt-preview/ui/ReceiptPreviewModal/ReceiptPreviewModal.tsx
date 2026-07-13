import { Button, EditIcon, Modal, PrinterIcon } from '@shared/ui';
import { ReceiptTemplate } from '@widgets/receipt-template';

import type { ReceiptPreviewModalProps } from './ReceiptPreviewModal.type';

// 미리보기 모달 — 템플릿을 bg 배경 위에 중앙 배치 + 닫기/PDF 변환/수정 푸터 (§3.2)
const ReceiptPreviewModal = ({ receipt, onClose, onExport, onEdit }: ReceiptPreviewModalProps) => (
  <Modal
    open
    onClose={onClose}
    title="교부영수증 미리보기"
    size="md"
    padded={false}
    footer={
      <>
        <Button variant="ghost" onClick={onClose}>
          닫기
        </Button>
        <Button variant="neutral" icon={<PrinterIcon size="1.8rem" />} onClick={onExport}>
          PDF 변환
        </Button>
        <Button icon={<EditIcon size="1.8rem" />} onClick={onEdit}>
          수정
        </Button>
      </>
    }
  >
    <div className="grid place-items-center bg-bg p-[2.8rem]">
      <ReceiptTemplate data={receipt} />
    </div>
  </Modal>
);

export default ReceiptPreviewModal;
