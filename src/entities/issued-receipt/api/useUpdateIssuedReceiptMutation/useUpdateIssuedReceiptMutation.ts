import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PAYMENT_KEY } from '@entities/payment';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { IssuedReceipt, UpdateIssuedReceiptInput } from '../../model';
import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

// EP-3 — 4필드 전부 필수(E6). FE가 프리필 후 전체 전송.
export const updateIssuedReceipt = async ({
  receiptId,
  input,
}: {
  receiptId: string;
  input: UpdateIssuedReceiptInput;
}): Promise<IssuedReceipt> => {
  const res = await httpClient.put<APIResponse<IssuedReceipt>>(`/issued-receipts/${receiptId}`, input);

  return res.data.data;
};

const useUpdateIssuedReceiptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssuedReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ISSUED_RECEIPT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() });
    },
  });
};

export default useUpdateIssuedReceiptMutation;
