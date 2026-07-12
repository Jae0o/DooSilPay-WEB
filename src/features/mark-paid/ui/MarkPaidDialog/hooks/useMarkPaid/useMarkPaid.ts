import { useForm, useWatch } from 'react-hook-form';

import { type PaymentMethod, useMarkPaidMutation } from '@entities/payment';
import { useToast } from '@shared/hooks';
import { zeroPad } from '@shared/utils';

import type { UseMarkPaidParams } from './useMarkPaid.type';

interface MarkPaidFormValues {
  paidDate: string;
  method: PaymentMethod;
}

// 오늘(로컬 기준) YYYY-MM-DD — P14 기본 납부일
const todayLocal = () => {
  const now = new Date();

  return `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}-${zeroPad(now.getDate())}`;
};

const useMarkPaid = ({ payment, onClose }: UseMarkPaidParams) => {
  const show = useToast();
  const pay = useMarkPaidMutation();

  // 필드 2개지만 폼=RHF 규약 — Segmented는 Controller 대신 useWatch/setValue로 제어(watch() 컴파일러 경고 회피 — PaymentFormModal 선례)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MarkPaidFormValues>({
    mode: 'onTouched',
    defaultValues: { paidDate: todayLocal(), method: payment.method ?? 'transfer' }, // P14: 기본 계좌이체, 기존 method 있으면 그 값
  });

  const method = useWatch({ control, name: 'method' });

  const onSubmit = (values: MarkPaidFormValues) =>
    pay.mutate(
      { id: payment.id, input: { paidDate: values.paidDate, method: values.method } },
      {
        onSuccess: () => {
          show({ message: '납부 완료로 처리했어요.', variant: 'success' });
          onClose();
        },
        onError: () => show({ message: '납부 처리에 실패했어요.', variant: 'error' }),
      },
    );

  return {
    register,
    errors,
    method,
    setMethod: (value: PaymentMethod) => setValue('method', value),
    isPending: pay.isPending,
    submit: handleSubmit(onSubmit),
  };
};

export default useMarkPaid;
