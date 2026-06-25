import { AxiosError } from 'axios';

import { httpClient } from '@shared/api';

import type { AcademyProfile } from '../../model';

import { getAcademy } from './useGetAcademyQuery';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

const academy: AcademyProfile = {
  ownerId: 'owner-1',
  name: '두페이 학원',
  ownerName: '김원장',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('getAcademy', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 학원 프로필을 반환한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: academy } });

    await expect(getAcademy()).resolves.toEqual(academy);
    expect(mockGet).toHaveBeenCalledWith('/academy');
  });

  it('404면 null을 반환한다(온보딩 신호)', async () => {
    const error = new AxiosError('Not Found');
    error.response = { status: 404 } as never;
    mockGet.mockRejectedValue(error);

    await expect(getAcademy()).resolves.toBeNull();
  });

  it('404 외 에러는 다시 던진다', async () => {
    const error = new AxiosError('Server Error');
    error.response = { status: 500 } as never;
    mockGet.mockRejectedValue(error);

    await expect(getAcademy()).rejects.toBe(error);
  });
});
