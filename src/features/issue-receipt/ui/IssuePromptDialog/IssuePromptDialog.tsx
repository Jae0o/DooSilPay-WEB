import { useNavigate } from 'react-router';

import { Button, Modal, ReceiptIcon } from '@shared/ui';

import type { IssuePromptDialogProps } from './IssuePromptDialog.type';

// R7 — 단일 결제 등록 성공 직후 발급 유도(디자인 원본에 없는 신규 UX, RW-4). 거절 시 부작용 없음.
const IssuePromptDialog = ({ paymentId, onClose }: IssuePromptDialogProps) => {
  const navigate = useNavigate();

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="교부영수증을 발급할까요?"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button icon={<ReceiptIcon size="1.8rem" />} onClick={() => navigate(`/payments/${paymentId}/issue`)}>
            발급하러 가기
          </Button>
        </>
      }
    >
      <p className="text-[1.5rem] leading-[1.65] text-ink-2">결제 등록을 완료했어요. 지금 교부영수증을 발급할까요?</p>
    </Modal>
  );
};

export default IssuePromptDialog;
