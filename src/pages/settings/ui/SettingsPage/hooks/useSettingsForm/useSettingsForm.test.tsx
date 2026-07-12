import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// 폼 상호작용은 register가 실제 input에 바인딩돼야 하므로 최소 소비자(Harness)로 렌더해 검증한다.
const Harness = () => {
  const { register, errors, isDirty, save, revert } = useSettingsForm({ academy });

  return (
    <form onSubmit={save}>
      <input aria-label="학원명" {...register('name', { required: '학원명을 입력해 주세요.' })} />
      <output>{isDirty ? 'dirty' : 'clean'}</output>
      <button type="submit">저장</button>
      <button type="button" onClick={revert}>
        되돌리기
      </button>
      {errors.name?.message && <p role="alert">{errors.name.message}</p>}
    </form>
  );
};

describe('useSettingsForm 폼 상호작용', () => {
  beforeEach(() => {
    mockUseToast.mockReturnValue(vi.fn());
    mockUseUpsert.mockReturnValue({ mutate: vi.fn(), isPending: false });
  });

  it('값을 수정하면 isDirty가 true가 된다', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(screen.getByText('clean')).toBeInTheDocument();
    await user.type(screen.getByLabelText('학원명'), '수정');

    expect(screen.getByText('dirty')).toBeInTheDocument();
  });

  it('되돌리기를 누르면 원본 값으로 복원되고 isDirty가 false가 된다', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByLabelText<HTMLInputElement>('학원명');
    await user.type(input, '수정');
    await user.click(screen.getByRole('button', { name: '되돌리기' }));

    expect(input.value).toBe('두페이 학원');
    expect(screen.getByText('clean')).toBeInTheDocument();
  });

  it('필수 값이 비어 검증에 실패하면 저장 뮤테이션을 호출하지 않는다', async () => {
    const mutate = vi.fn();
    mockUseUpsert.mockReturnValue({ mutate, isPending: false });
    const user = userEvent.setup();
    render(<Harness />);

    await user.clear(screen.getByLabelText('학원명'));
    await user.click(screen.getByRole('button', { name: '저장' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('학원명을 입력해 주세요.');
    expect(mutate).not.toHaveBeenCalled();
  });
});
