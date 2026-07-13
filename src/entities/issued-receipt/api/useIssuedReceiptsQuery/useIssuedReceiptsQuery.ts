import { useSuspenseQuery } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { ListIssuedReceiptsParams, ListIssuedReceiptsResult } from '../../model';
import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

export const getIssuedReceipts = async (params: ListIssuedReceiptsParams): Promise<ListIssuedReceiptsResult> => {
  const res = await httpClient.get<APIResponse<ListIssuedReceiptsResult>>('/issued-receipts', { params });

  return res.data.data;
};

const useIssuedReceiptsQuery = (params: ListIssuedReceiptsParams = {}) =>
  useSuspenseQuery({
    queryKey: ISSUED_RECEIPT_KEY.list(params),
    queryFn: () => getIssuedReceipts(params),
  });

export default useIssuedReceiptsQuery;
