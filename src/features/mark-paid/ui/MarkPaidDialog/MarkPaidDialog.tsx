import { METHOD_LABEL, type PaymentMethod, paymentTotal } from '@entities/payment';
import { Button, CheckIcon, FormField, Modal, Segmented, TextField } from '@shared/ui';
import { formatCurrency, formatPeriod } from '@shared/utils';

import type { MarkPaidDialogProps } from './MarkPaidDialog.type';
import { useMarkPaid } from './hooks';

const METHOD_OPTIONS = (Object.keys(METHOD_LABEL) as PaymentMethod[]).map((value) => ({
  value,
  label: METHOD_LABEL[value],
}));

const MarkPaidDialog = ({ payment, onClose }: MarkPaidDialogProps) => {
  const { register, errors, method, setMethod, isPending, submit } = useMarkPaid({ payment, onClose });

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="납부 처리"
      subtitle={`${formatPeriod(payment.period)} · ${formatCurrency(paymentTotal(payment))}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" form="mark-paid-form" icon={<CheckIcon size="1.8rem" />} isLoading={isPending}>
            납부 완료 처리
          </Button>
        </>
      }
    >
      <form id="mark-paid-form" onSubmit={submit} className="flex flex-col gap-[1.6rem]">
        <TextField
          label="납부일"
          required
          type="date"
          error={errors.paidDate?.message}
          {...register('paidDate', { required: '납부일을 선택해 주세요.' })}
        />

        <FormField label="결제수단">
          <Segmented full value={method} options={METHOD_OPTIONS} onChange={setMethod} />
        </FormField>
      </form>
    </Modal>
  );
};

export default MarkPaidDialog;
