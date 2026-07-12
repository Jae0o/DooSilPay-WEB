import { paymentTotal } from '@entities/payment';
import { Button, Modal, TrashIcon } from '@shared/ui';
import { formatCurrency, formatPeriod } from '@shared/utils';

import type { DeletePaymentDialogProps } from './DeletePaymentDialog.type';
import { useDeletePayment } from './hooks';

const DeletePaymentDialog = ({ payment, onClose }: DeletePaymentDialogProps) => {
  const { onConfirm, isPending } = useDeletePayment({ paymentId: payment.id, onClose });

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="결제 삭제"
      subtitle={`${formatPeriod(payment.period)} · ${formatCurrency(paymentTotal(payment))}`}
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
          <b className="text-ink">{formatPeriod(payment.period)}</b> 결제({formatCurrency(paymentTotal(payment))})를
          삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
      </div>
    </Modal>
  );
};

export default DeletePaymentDialog;
