import { httpClient } from '@shared/api';

import type { ListStudentsResult } from '../../model';

import { getStudents } from './useStudentsQuery';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

const result: ListStudentsResult = {
  items: [
    {
      id: 'student-1',
      registrationNo: 1,
      name: '김수강',
      monthlyFee: 280000,
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  total: 1,
  page: 1,
  limit: 20,
  hasNext: false,
};

describe('getStudents', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 목록 결과를 반환한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: result } });

    await expect(getStudents({})).resolves.toEqual(result);
    expect(mockGet).toHaveBeenCalledWith('/students', { params: {} });
  });

  it('params를 axios 쿼리 옵션으로 그대로 전달한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: result } });

    await getStudents({ q: '김', status: 'all', page: 2 });

    expect(mockGet).toHaveBeenCalledWith('/students', { params: { q: '김', status: 'all', page: 2 } });
  });
});
