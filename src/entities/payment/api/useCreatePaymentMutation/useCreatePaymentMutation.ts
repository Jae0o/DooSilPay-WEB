import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STUDENT_KEY } from '@entities/student';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { CreatePaymentInput, Payment } from '../../model';
import { PAYMENT_KEY } from '../payment.keys';

export const createPayment = async (input: CreatePaymentInput): Promise<Payment> => {
  const res = await httpClient.post<APIResponse<Payment>>('/payments', input);

  return res.data.data;
};

const useCreatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.summaries() }); // 수납 현황 갱신 — P16
    },
  });
};

export default useCreatePaymentMutation;
