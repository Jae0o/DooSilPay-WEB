import { useSuspenseQuery } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { ListPaymentsParams, ListPaymentsResult } from '../../model';
import { PAYMENT_KEY } from '../payment.keys';

export const getPayments = async (params: ListPaymentsParams): Promise<ListPaymentsResult> => {
  const res = await httpClient.get<APIResponse<ListPaymentsResult>>('/payments', { params });

  return res.data.data;
};

const usePaymentsQuery = (params: ListPaymentsParams = {}) =>
  useSuspenseQuery({
    queryKey: PAYMENT_KEY.list(params),
    queryFn: () => getPayments(params),
  });

export default usePaymentsQuery;
