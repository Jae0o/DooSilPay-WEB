import type { ListIssuedReceiptsParams } from '../model';

export const ISSUED_RECEIPT_KEY = {
  all: ['issued-receipt'] as const,

  lists: () => [...ISSUED_RECEIPT_KEY.all, 'list'] as const,
  list: (params: ListIssuedReceiptsParams) => [...ISSUED_RECEIPT_KEY.lists(), params] as const,
};
