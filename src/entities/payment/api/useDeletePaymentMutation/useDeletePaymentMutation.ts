import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ISSUED_RECEIPT_KEY } from '@entities/issued-receipt';
import { STUDENT_KEY } from '@entities/student';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import { PAYMENT_KEY } from '../payment.keys';

export const deletePayment = async (id: string): Promise<{ id: string }> => {
  const res = await httpClient.delete<APIResponse<{ id: string }>>(`/payments/${id}`);

  return res.data.data;
};

const useDeletePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.summaries() }); // 수납 현황 갱신 — P16
      queryClient.invalidateQueries({ queryKey: ISSUED_RECEIPT_KEY.lists() }); // 발급분 cascade 삭제 반영 — RW-5
    },
  });
};

export default useDeletePaymentMutation;
