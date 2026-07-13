import { httpClient } from '@shared/api';

import { getSubjects } from './useSubjectsQuery';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

describe('getSubjects', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 과목 목록을 반환한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: ['피아노', '바이올린'] } });

    await expect(getSubjects()).resolves.toEqual(['피아노', '바이올린']);
    expect(mockGet).toHaveBeenCalledWith('/subjects');
  });

  it('빈 목록도 그대로 반환한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: [] } });

    await expect(getSubjects()).resolves.toEqual([]);
  });
});
