import type { ListPaymentsParams } from '../model';

export const PAYMENT_KEY = {
  all: ['payment'] as const,

  lists: () => [...PAYMENT_KEY.all, 'list'] as const,
  list: (params: ListPaymentsParams) => [...PAYMENT_KEY.lists(), params] as const,
};
