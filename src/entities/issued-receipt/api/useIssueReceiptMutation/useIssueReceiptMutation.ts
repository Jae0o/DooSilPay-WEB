import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PAYMENT_KEY } from '@entities/payment';
import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { IssueReceiptInput, IssuedReceipt } from '../../model';
import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

// EP-2. otherFees 생략(undefined) 시 JSON 직렬화에서 키가 빠져 Payment 값을 상속한다(V1-1).
// 빈 배열([]) 명시 전송은 "기타경비 없음"으로 그대로 유지된다.
export const issueReceipt = async (input: IssueReceiptInput): Promise<IssuedReceipt> => {
  const res = await httpClient.post<APIResponse<IssuedReceipt>>('/issued-receipts', input);

  return res.data.data;
};

const useIssueReceiptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: issueReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ISSUED_RECEIPT_KEY.lists() });
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY.lists() }); // issuedReceiptId 연결 반영
    },
  });
};

export default useIssueReceiptMutation;
