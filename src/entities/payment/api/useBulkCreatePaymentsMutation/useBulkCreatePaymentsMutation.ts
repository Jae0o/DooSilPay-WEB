import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STUDENT_KEY } from '@entities/student';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { BulkCreatePaymentsInput, BulkCreatePaymentsResult } from '../../model';
import { PAYMENT_KEY } from '../payment.keys';

export const bulkCreatePayments = async (input: BulkCreatePaymentsInput): Promise<BulkCreatePaymentsResult> => {
  const res = await httpClient.post<APIResponse<BulkCreatePaymentsResult>>('/payments/bulk', input);

  return res.data.data;
};

const useBulkCreatePaymentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkCreatePayments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.summaries() }); // 수납 현황 갱신 — P16
    },
  });
};

export default useBulkCreatePaymentsMutation;
