import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STUDENT_KEY } from '@entities/student';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { Payment, UpdatePaymentInput } from '../../model';
import { PAYMENT_KEY } from '../payment.keys';

export const updatePayment = async ({ id, input }: { id: string; input: UpdatePaymentInput }): Promise<Payment> => {
  const res = await httpClient.put<APIResponse<Payment>>(`/payments/${id}`, input);

  return res.data.data;
};

const useUpdatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.summaries() }); // 수납 현황 갱신 — P16
    },
  });
};

export default useUpdatePaymentMutation;
