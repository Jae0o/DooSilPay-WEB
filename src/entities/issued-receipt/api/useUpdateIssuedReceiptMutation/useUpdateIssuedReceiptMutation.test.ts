import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode, createElement } from 'react';

import { PAYMENT_KEY } from '@entities/payment';
import { httpClient } from '@shared/api';

import type { UpdateIssuedReceiptInput } from '../../model';
import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

import useUpdateIssuedReceiptMutation, { updateIssuedReceipt } from './useUpdateIssuedReceiptMutation';

vi.mock('@shared/api', () => ({ httpClient: { put: vi.fn() } }));

const mockPut = httpClient.put as unknown as ReturnType<typeof vi.fn>;

const input: UpdateIssuedReceiptInput = {
  subjectName: '중등 수학',
  tuitionFee: 300000,
  otherFees: [{ label: '교재비', amount: 20000 }],
  issuedDate: '2026-06-10',
};

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  return Wrapper;
};

describe('updateIssuedReceipt', () => {
  beforeEach(() => {
    mockPut.mockReset();
    mockPut.mockResolvedValue({ data: { ok: true, data: {} } });
  });

  it('receiptId 경로로 4필드 body를 전송한다', async () => {
    await updateIssuedReceipt({ receiptId: 'receipt-1', input });

    expect(mockPut).toHaveBeenCalledWith('/issued-receipts/receipt-1', input);
  });
});

describe('useUpdateIssuedReceiptMutation', () => {
  beforeEach(() => {
    mockPut.mockReset();
    mockPut.mockResolvedValue({ data: { ok: true, data: {} } });
  });

  it('성공 시 영수증·결제 lists를 invalidate 한다', async () => {
    const queryClient = new QueryClient();
    const spy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useUpdateIssuedReceiptMutation(), {
      wrapper: createWrapper(queryClient),
    });
    result.current.mutate({ receiptId: 'receipt-1', input });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ISSUED_RECEIPT_KEY.lists() });
    expect(spy).toHaveBeenCalledWith({ queryKey: PAYMENT_KEY.lists() });
  });
});
