import { Button, Modal, TrashIcon } from '@shared/ui';
import { zeroPad } from '@shared/utils';

import type { DeleteStudentDialogProps } from './DeleteStudentDialog.type';
import { useDeleteStudent } from './hooks';

const DeleteStudentDialog = ({ open, onClose, onDeleted, student }: DeleteStudentDialogProps) => {
  const { onConfirm, isPending } = useDeleteStudent({ studentId: student.id, onClose, onDeleted });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="수강생 삭제"
      subtitle={`${student.name} · 등록번호 ${zeroPad(student.registrationNo)}`}
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
          <b className="text-ink">{student.name}</b> 수강생을 삭제하면 되돌릴 수 없어요.
          {/* API는 수강생 soft delete만 수행(결제 이력 삭제 아님) — 이력 데이터 처리 방식·건수 표시는 Payment 단계에서 확정 (R4) */}
          삭제 후 목록·상세에서 조회되지 않아요.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteStudentDialog;
