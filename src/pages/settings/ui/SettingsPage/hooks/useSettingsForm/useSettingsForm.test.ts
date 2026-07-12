import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AcademyProfile } from '@entities/academy';
import { useUpsertAcademyMutation } from '@entities/academy';
import { useToast } from '@shared/hooks';

import useSettingsForm, { toFormValues } from './useSettingsForm';

vi.mock('@entities/academy', () => ({ useUpsertAcademyMutation: vi.fn() }));
vi.mock('@shared/hooks', () => ({ useToast: vi.fn() }));

const academy: AcademyProfile = {
  ownerId: 'owner-1',
  name: '두페이 학원',
  ownerName: '김원장',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const mockUseUpsert = useUpsertAcademyMutation as unknown as ReturnType<typeof vi.fn>;
const mockUseToast = useToast as unknown as ReturnType<typeof vi.fn>;

describe('toFormValues', () => {
  it('선택 필드가 없으면 빈 문자열로 정규화한다', () => {
    expect(toFormValues(academy)).toEqual({
      name: '두페이 학원',
      ownerName: '김원장',
      bizNo: '',
      tel: '',
      address: '',
    });
  });

  it('선택 필드가 있으면 그대로 매핑한다', () => {
    expect(toFormValues({ ...academy, bizNo: '000-00-00000', tel: '02-000-0000', address: '서울' })).toEqual({
      name: '두페이 학원',
      ownerName: '김원장',
      bizNo: '000-00-00000',
      tel: '02-000-0000',
      address: '서울',
    });
  });
});

describe('useSettingsForm', () => {
  const showToast = vi.fn();

  beforeEach(() => {
    showToast.mockReset();
    mockUseToast.mockReturnValue(showToast);
  });

  it('저장 성공 시 정규화 값으로 PUT하고 성공 토스트를 노출한다', async () => {
    const mutate = vi.fn((_values, { onSuccess }) => onSuccess(academy));
    mockUseUpsert.mockReturnValue({ mutate, isPending: false });

    const { result } = renderHook(() => useSettingsForm({ academy }));
    await act(async () => {
      await result.current.save();
    });

    expect(mutate).toHaveBeenCalledWith(
      { name: '두페이 학원', ownerName: '김원장', bizNo: '', tel: '', address: '' },
      expect.any(Object),
    );
    expect(showToast).toHaveBeenCalledWith({ message: '학원 정보를 저장했어요', variant: 'success' });
  });

  it('저장 실패 시 에러 토스트를 노출한다', async () => {
    const mutate = vi.fn((_values, { onError }) => onError());
    mockUseUpsert.mockReturnValue({ mutate, isPending: false });

    const { result } = renderHook(() => useSettingsForm({ academy }));
    await act(async () => {
      await result.current.save();
    });

    expect(showToast).toHaveBeenCalledWith({
      message: '저장에 실패했어요. 잠시 후 다시 시도해 주세요.',
      variant: 'error',
    });
  });
});
