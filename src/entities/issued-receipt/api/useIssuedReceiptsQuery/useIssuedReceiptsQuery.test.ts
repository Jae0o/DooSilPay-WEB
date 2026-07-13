import { httpClient } from '@shared/api';

import type { ListIssuedReceiptsResult } from '../../model';

import { getIssuedReceipts } from './useIssuedReceiptsQuery';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

const result: ListIssuedReceiptsResult = {
  items: [
    {
      id: 'receipt-1',
      issueYearMonth: '2026-06',
      seq: 1,
      paymentId: 'payment-1',
      studentSnapshot: {
        registrationNo: 1,
        name: '홍길동',
        birthDate: '2010-03-02',
        subjectName: '중등 수학',
      },
      period: '2026-06',
      tuitionFee: 280000,
      otherFees: [],
      issuedDate: '2026-06-05',
      academy: { name: '두페이학원', ownerName: '김원장' },
      createdAt: '2026-06-05T00:00:00.000Z',
      updatedAt: '2026-06-05T00:00:00.000Z',
    },
  ],
  total: 1,
};

describe('getIssuedReceipts', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 목록 결과를 반환한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: result } });

    await expect(getIssuedReceipts({})).resolves.toEqual(result);
    expect(mockGet).toHaveBeenCalledWith('/issued-receipts', { params: {} });
  });

  it('period를 axios 쿼리 옵션으로 그대로 전달한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: result } });

    await getIssuedReceipts({ period: '2026-06' });

    expect(mockGet).toHaveBeenCalledWith('/issued-receipts', { params: { period: '2026-06' } });
  });
});
