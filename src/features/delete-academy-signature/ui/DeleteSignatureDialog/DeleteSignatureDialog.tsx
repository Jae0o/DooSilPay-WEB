import { Button, Modal, TrashIcon } from '@shared/ui';

import type { DeleteSignatureDialogProps } from './DeleteSignatureDialog.type';
import { useDeleteSignature } from './hooks';

const DeleteSignatureDialog = ({ open, onClose }: DeleteSignatureDialogProps) => {
  const { onConfirm, isPending } = useDeleteSignature({ onClose });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="서명 삭제"
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
          <b className="text-ink">서명 이미지를 삭제할까요?</b> 이미 발급된 영수증의 내용은 변하지 않아요. 새로 발급하는
          영수증부터 서명란이 비워져요.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteSignatureDialog;
