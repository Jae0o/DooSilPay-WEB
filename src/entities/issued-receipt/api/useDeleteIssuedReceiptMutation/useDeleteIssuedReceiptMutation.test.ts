import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode, createElement } from 'react';

import { PAYMENT_KEY } from '@entities/payment';
import { httpClient } from '@shared/api';

import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

import useDeleteIssuedReceiptMutation, { deleteIssuedReceipt } from './useDeleteIssuedReceiptMutation';

vi.mock('@shared/api', () => ({ httpClient: { delete: vi.fn() } }));

const mockDelete = httpClient.delete as unknown as ReturnType<typeof vi.fn>;

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  return Wrapper;
};

describe('deleteIssuedReceipt', () => {
  beforeEach(() => {
    mockDelete.mockReset();
    mockDelete.mockResolvedValue({ data: { ok: true, data: { id: 'receipt-1' } } });
  });

  it('receiptId 경로로 삭제 요청하고 id를 언랩한다', async () => {
    await expect(deleteIssuedReceipt('receipt-1')).resolves.toEqual({ id: 'receipt-1' });
    expect(mockDelete).toHaveBeenCalledWith('/issued-receipts/receipt-1');
  });
});

describe('useDeleteIssuedReceiptMutation', () => {
  beforeEach(() => {
    mockDelete.mockReset();
    mockDelete.mockResolvedValue({ data: { ok: true, data: { id: 'receipt-1' } } });
  });

  it('성공 시 영수증·결제 lists를 invalidate 한다', async () => {
    const queryClient = new QueryClient();
    const spy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useDeleteIssuedReceiptMutation(), {
      wrapper: createWrapper(queryClient),
    });
    result.current.mutate('receipt-1');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ISSUED_RECEIPT_KEY.lists() });
    expect(spy).toHaveBeenCalledWith({ queryKey: PAYMENT_KEY.lists() });
  });
});
