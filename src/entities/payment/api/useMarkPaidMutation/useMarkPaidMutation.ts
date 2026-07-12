import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STUDENT_KEY } from '@entities/student';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { MarkPaidInput, Payment } from '../../model';
import { PAYMENT_KEY } from '../payment.keys';

export const markPaid = async ({ id, input }: { id: string; input: MarkPaidInput }): Promise<Payment> => {
  const res = await httpClient.patch<APIResponse<Payment>>(`/payments/${id}/pay`, input);

  return res.data.data;
};

const useMarkPaidMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markPaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.summaries() }); // 수납 현황 갱신 — P16
    },
  });
};

export default useMarkPaidMutation;
