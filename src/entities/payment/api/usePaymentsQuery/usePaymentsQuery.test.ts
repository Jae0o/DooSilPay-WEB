import { httpClient } from '@shared/api';

import type { ListPaymentsResult } from '../../model';

import { getPayments } from './usePaymentsQuery';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

const result: ListPaymentsResult = {
  items: [
    {
      id: 'payment-1',
      studentId: 'student-1',
      period: '2026-06',
      subjectName: '중등 수학',
      tuitionFee: 280000,
      otherFees: [],
      dueDate: '2026-06-05',
      paidDate: null,
      status: 'scheduled',
      method: null,
      issuedReceiptId: null,
      createdAt: '2026-06-01T00:00:00.000Z',
      updatedAt: '2026-06-01T00:00:00.000Z',
    },
  ],
  total: 1,
};

describe('getPayments', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 목록 결과를 반환한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: result } });

    await expect(getPayments({})).resolves.toEqual(result);
    expect(mockGet).toHaveBeenCalledWith('/payments', { params: {} });
  });

  it('params를 axios 쿼리 옵션으로 그대로 전달한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: result } });

    await getPayments({ studentId: 'student-1', period: '2026-06', status: 'paid' });

    expect(mockGet).toHaveBeenCalledWith('/payments', {
      params: { studentId: 'student-1', period: '2026-06', status: 'paid' },
    });
  });
});
