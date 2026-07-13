import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PAYMENT_KEY } from '@entities/payment';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

// EP-4 — 서버가 동월 재정렬 + Payment.issuedReceiptId=null 처리.
export const deleteIssuedReceipt = async (receiptId: string): Promise<{ id: string }> => {
  const res = await httpClient.delete<APIResponse<{ id: string }>>(`/issued-receipts/${receiptId}`);

  return res.data.data;
};

const useDeleteIssuedReceiptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIssuedReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ISSUED_RECEIPT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
    },
  });
};

export default useDeleteIssuedReceiptMutation;
