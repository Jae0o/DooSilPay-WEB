import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode, createElement } from 'react';

import { PAYMENT_KEY } from '@entities/payment';
import { httpClient } from '@shared/api';

import { ISSUED_RECEIPT_KEY } from '../issuedReceipt.keys';

import useIssueReceiptMutation, { issueReceipt } from './useIssueReceiptMutation';

vi.mock('@shared/api', () => ({ httpClient: { post: vi.fn() } }));

const mockPost = httpClient.post as unknown as ReturnType<typeof vi.fn>;

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  return Wrapper;
};

describe('issueReceipt', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockPost.mockResolvedValue({ data: { ok: true, data: {} } });
  });

  it('otherFees를 생략하면 요청 body에 키가 없다 (V1-1)', async () => {
    await issueReceipt({ paymentId: 'payment-1', tuitionFee: 280000 });

    const [url, body] = mockPost.mock.calls[0];
    expect(url).toBe('/issued-receipts');
    expect(JSON.stringify(body)).not.toContain('otherFees');
  });

  it('otherFees 빈 배열은 그대로 전송한다 (빈 배열 ≠ 생략)', async () => {
    await issueReceipt({ paymentId: 'payment-1', otherFees: [] });

    const [, body] = mockPost.mock.calls[0];
    expect(body).toHaveProperty('otherFees', []);
  });
});

describe('useIssueReceiptMutation', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockPost.mockResolvedValue({ data: { ok: true, data: {} } });
  });

  it('성공 시 영수증·결제 lists를 invalidate 한다', async () => {
    const queryClient = new QueryClient();
    const spy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useIssueReceiptMutation(), {
      wrapper: createWrapper(queryClient),
    });
    result.current.mutate({ paymentId: 'payment-1' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ISSUED_RECEIPT_KEY.lists() });
    expect(spy).toHaveBeenCalledWith({ queryKey: PAYMENT_KEY.lists() });
  });
});
