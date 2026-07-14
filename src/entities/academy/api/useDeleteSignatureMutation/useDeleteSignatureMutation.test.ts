import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode, createElement } from 'react';

import { httpClient } from '@shared/api';

import type { AcademyProfile } from '../../model';
import { ACADEMY_KEY } from '../academy.keys';

import useDeleteSignatureMutation, { deleteSignature } from './useDeleteSignatureMutation';

vi.mock('@shared/api', () => ({ httpClient: { delete: vi.fn() } }));

const mockDelete = httpClient.delete as unknown as ReturnType<typeof vi.fn>;

const academy: AcademyProfile = {
  ownerId: 'owner-1',
  name: '두페이 학원',
  ownerName: '김원장',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  return Wrapper;
};

describe('deleteSignature', () => {
  beforeEach(() => {
    mockDelete.mockReset();
    mockDelete.mockResolvedValue({ data: { ok: true, data: academy } });
  });

  it('/academy/signature로 삭제 요청하고 갱신된 학원 프로필을 언랩한다', async () => {
    await expect(deleteSignature()).resolves.toEqual(academy);
    expect(mockDelete).toHaveBeenCalledWith('/academy/signature');
  });
});

describe('useDeleteSignatureMutation', () => {
  beforeEach(() => {
    mockDelete.mockReset();
    mockDelete.mockResolvedValue({ data: { ok: true, data: academy } });
  });

  it('성공 시 응답으로 ACADEMY_KEY.me() 캐시를 직갱신한다', async () => {
    const queryClient = new QueryClient();
    const { result } = renderHook(() => useDeleteSignatureMutation(), { wrapper: createWrapper(queryClient) });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(queryClient.getQueryData(ACADEMY_KEY.me())).toEqual(academy);
  });
});
