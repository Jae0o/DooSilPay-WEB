import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import {
  METHOD_LABEL,
  type PaymentMethod,
  type PaymentStatus,
  STATUS_LABEL,
  buildPeriodOptions,
} from '@entities/payment';
import { SubjectSelectField } from '@entities/subject';
import { Button, FormField, IconButton, Modal, PlusIcon, Select, TextField, TextInput, TrashIcon } from '@shared/ui';
import { formatCurrency } from '@shared/utils';

import type { PaymentFormModalProps } from './PaymentFormModal.type';
import { usePaymentForm } from './hooks';

const METHOD_OPTIONS = (Object.keys(METHOD_LABEL) as PaymentMethod[]).map((value) => ({
  value,
  label: METHOD_LABEL[value],
}));
const STATUS_OPTIONS = (Object.keys(STATUS_LABEL) as PaymentStatus[]).map((value) => ({
  value,
  label: STATUS_LABEL[value],
}));

const PaymentFormModal = ({ mode, student, payment, onClose, onSuccess }: PaymentFormModalProps) => {
  const { register, control, errors, fields, append, remove, isPending, submit } = usePaymentForm({
    mode,
    student,
    payment,
    onClose,
    onSuccess,
  });

  const periodOptions = useMemo(() => buildPeriodOptions(), []);

  const tuitionFee = useWatch({ control, name: 'tuitionFee' });
  const otherFees = useWatch({ control, name: 'otherFees' });
  const total = (Number(tuitionFee) || 0) + otherFees.reduce((sum, fee) => sum + (Number(fee.amount) || 0), 0);

  return (
    <Modal
      open
      onClose={onClose}
      size="md"
      title={mode === 'create' ? '결제 추가' : '결제 수정'}
      subtitle={student.name}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" form="payment-form" isLoading={isPending}>
            저장
          </Button>
        </>
      }
    >
      <form id="payment-form" onSubmit={submit} className="flex flex-col gap-[1.6rem]">
        <div className="grid grid-cols-1 gap-[1.4rem] lg:grid-cols-2">
          <FormField label="대상 연월" required error={errors.period?.message}>
            <Select
              options={periodOptions}
              invalid={!!errors.period}
              {...register('period', { required: '대상 연월을 선택해 주세요.' })}
            />
          </FormField>

          <TextField
            label="결제 예정일"
            type="date"
            hint="비워두면 예정일 없이 등록돼요."
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />
        </div>

        <SubjectSelectField
          label="교습과목"
          required
          placeholder="과목을 선택하세요"
          emptyHint="등록된 과목이 없어요. 설정 > 교습과목에서 먼저 등록해 주세요."
          current={payment?.subjectName || student.subjectName || undefined}
          error={errors.subjectName?.message}
          registration={register('subjectName', { required: '교습과목을 선택해 주세요.' })}
        />

        <TextField
          label="교습비"
          required
          type="number"
          suffix="원"
          error={errors.tuitionFee?.message}
          {...register('tuitionFee', {
            required: '교습비를 입력해 주세요.',
            validate: (value) => {
              const amount = Number(value);

              return (Number.isInteger(amount) && amount >= 0) || '0 이상 정수로 입력해 주세요.';
            },
          })}
        />

        <div className="flex flex-col gap-[0.8rem]">
          <div className="flex items-center justify-between">
            <span className="flex gap-[0.4rem] text-[1.4rem] font-semibold text-ink-2">
              기타경비 <span className="font-normal text-ink-3">(최대 3개)</span>
            </span>
            {fields.length < 3 && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                icon={<PlusIcon size="1.6rem" />}
                onClick={() => append({ label: '', amount: '' })}
              >
                항목 추가
              </Button>
            )}
          </div>

          {fields.length === 0 ? (
            <p className="text-[1.3rem] text-ink-3">교재비, 모의고사비 등 추가 항목이 있으면 등록하세요.</p>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-[0.4rem]">
                <div className="flex items-center gap-[0.8rem]">
                  <TextInput
                    className="flex-1"
                    placeholder="항목명 (예: 교재비)"
                    invalid={!!errors.otherFees?.[index]?.label}
                    {...register(`otherFees.${index}.label`, {
                      validate: (value, values) => {
                        const amount = values.otherFees[index].amount;

                        if (!value.trim() && !amount) return true;
                        if (!value.trim()) return '항목명을 입력해 주세요.';

                        return value.trim().length <= 20 || '20자 이내로 입력해 주세요.';
                      },
                    })}
                  />

                  <TextInput
                    className="w-[15rem]"
                    type="number"
                    suffix="원"
                    placeholder="금액"
                    invalid={!!errors.otherFees?.[index]?.amount}
                    {...register(`otherFees.${index}.amount`, {
                      validate: (value, values) => {
                        const label = values.otherFees[index].label;

                        if (!value && !label.trim()) return true;
                        if (!value) return '금액을 입력해 주세요.';

                        const amount = Number(value);

                        return (Number.isInteger(amount) && amount >= 0) || '0 이상 정수로 입력해 주세요.';
                      },
                    })}
                  />

                  <IconButton label="기타경비 삭제" icon={<TrashIcon size="1.8rem" />} onClick={() => remove(index)} />
                </div>

                {(errors.otherFees?.[index]?.label || errors.otherFees?.[index]?.amount) && (
                  <span className="text-[1.3rem] text-danger">
                    {errors.otherFees?.[index]?.label?.message ?? errors.otherFees?.[index]?.amount?.message}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 gap-[1.4rem] lg:grid-cols-2">
          <FormField label="결제수단">
            <Select options={METHOD_OPTIONS} placeholder="선택 안 함" {...register('method')} />
          </FormField>

          <FormField
            label="상태"
            hint={mode === 'create' ? '‘납부완료’로 등록하면 납부일이 오늘로 기록돼요.' : undefined}
          >
            <Select options={STATUS_OPTIONS} {...register('status')} />
          </FormField>
        </div>

        <div className="flex items-center justify-between rounded-md bg-point-weak px-[1.8rem] py-[1.6rem]">
          <span className="font-semibold text-point-strong">합계</span>
          <span className="tnum text-[1.9rem] font-extrabold text-point-strong">{formatCurrency(total)}</span>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentFormModal;
