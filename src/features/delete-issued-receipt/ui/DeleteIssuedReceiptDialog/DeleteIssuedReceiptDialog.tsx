import { formatReceiptNo } from '@entities/issued-receipt';
import { Button, Modal, TrashIcon } from '@shared/ui';

import type { DeleteIssuedReceiptDialogProps } from './DeleteIssuedReceiptDialog.type';
import { useDeleteIssuedReceipt } from './hooks';

const DeleteIssuedReceiptDialog = ({ receipt, onClose }: DeleteIssuedReceiptDialogProps) => {
  const { onConfirm, isPending } = useDeleteIssuedReceipt({ receiptId: receipt.id, onClose });
  const receiptNo = formatReceiptNo(receipt.issueYearMonth, receipt.seq);

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="교부영수증 삭제"
      subtitle={`No.${receiptNo}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isPending}>
            삭제
          </Button>
        </>
      }
    >
      <div className="flex gap-[1.4rem]">
        <span className="grid size-[4.4rem] shrink-0 place-items-center rounded-pill bg-danger-weak text-danger">
          <TrashIcon size="2rem" />
        </span>
        <p className="text-[1.5rem] leading-[1.65] text-ink-2">
          <b className="text-ink">No.{receiptNo}</b> 영수증을 삭제할까요? 같은 달 일련번호가 재정렬됩니다.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteIssuedReceiptDialog;
