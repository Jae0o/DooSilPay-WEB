import { useFieldArray, useForm } from 'react-hook-form';

import {
  type CreatePaymentInput,
  type UpdatePaymentInput,
  dueDateFor,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
} from '@entities/payment';
import { getApiErrorCode } from '@shared/api';
import { useToast } from '@shared/hooks';
import { zeroPad } from '@shared/utils';

import type { PaymentFormValues } from '../../PaymentFormModal.type';

import type { UsePaymentFormParams } from './usePaymentForm.type';

const toPeriod = (date: Date) => `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}`;

// 조건부 마운트(모달 오픈마다 재마운트) — defaultValues로 초기화, 별도 reset effect 불필요
const buildDefaults = ({
  mode,
  student,
  payment,
}: Pick<UsePaymentFormParams, 'mode' | 'student' | 'payment'>): PaymentFormValues => {
  if (mode === 'edit' && payment) {
    return {
      period: payment.period,
      dueDate: payment.dueDate ?? '',
      subjectName: payment.subjectName,
      tuitionFee: String(payment.tuitionFee),
      otherFees: payment.otherFees.map((fee) => ({ label: fee.label, amount: String(fee.amount) })),
      method: payment.method ?? '',
      status: payment.status,
    };
  }

  const period = toPeriod(new Date());

  return {
    period,
    dueDate: student.paymentDay ? dueDateFor(period, student.paymentDay) : '',
    subjectName: student.subjectName ?? '',
    tuitionFee: String(student.monthlyFee),
    otherFees: [],
    method: '',
    status: 'scheduled',
  };
};

const usePaymentForm = ({ mode, student, payment, onClose, onSuccess }: UsePaymentFormParams) => {
  const show = useToast();
  const create = useCreatePaymentMutation();
  const update = useUpdatePaymentMutation();
  const isPending = create.isPending || update.isPending;

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PaymentFormValues>({ mode: 'onTouched', defaultValues: buildDefaults({ mode, student, payment }) });

  const { fields, append, remove } = useFieldArray({ control, name: 'otherFees' });

  const onSubmit = (values: PaymentFormValues) => {
    // label·amount 둘 다 채워진 행만 전송
    const otherFees = values.otherFees
      .filter((fee) => fee.label.trim() && fee.amount !== '')
      .map((fee) => ({ label: fee.label.trim(), amount: Number(fee.amount) }));

    const base = {
      period: values.period,
      subjectName: values.subjectName.trim(),
      tuitionFee: Number(values.tuitionFee),
      otherFees,
      dueDate: values.dueDate || null,
      method: values.method || null,
      status: values.status,
    };

    const onError = (error: unknown) => {
      const code = getApiErrorCode(error);
      if (code === 'DUPLICATE_PAYMENT') {
        const message = '해당 수강생의 같은 연월 결제가 이미 있습니다.';
        setError('period', { message }); // P6 — 대상 연월 필드 에러
        show({ message, variant: 'error' });
        return;
      }
      if (code === 'STUDENT_INACTIVE') {
        show({ message: '비활성 수강생에게는 결제를 등록할 수 없습니다.', variant: 'error' });
        return;
      }
      show({ message: '저장에 실패했어요. 입력값을 확인해 주세요.', variant: 'error' });
    };

    const onSuccessHandler = () => {
      show({ message: mode === 'create' ? '결제가 등록되었어요.' : '결제가 수정되었어요.', variant: 'success' });
      onSuccess?.();
      onClose();
    };

    if (mode === 'create') {
      const input: CreatePaymentInput = { studentId: student.id, ...base };
      create.mutate(input, { onSuccess: onSuccessHandler, onError });
      return;
    }
    if (!payment) return;

    // 전체 교체 PUT — 폼 미노출 paidDate 유실 방지 (P15)
    const input: UpdatePaymentInput = { ...base, paidDate: payment.paidDate };
    update.mutate({ id: payment.id, input }, { onSuccess: onSuccessHandler, onError });
  };

  return { register, control, errors, fields, append, remove, isPending, submit: handleSubmit(onSubmit) };
};

export default usePaymentForm;
