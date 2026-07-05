import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useDebouncedKeyword from './useDebouncedKeyword';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useDebouncedKeyword', () => {
  it('초기 keyword는 q를 반영한다', () => {
    const { result } = renderHook(() => useDebouncedKeyword({ q: '피아노', onChange: vi.fn() }));

    expect(result.current[0]).toBe('피아노');
  });

  it('입력 300ms 후 onChange({ q, page: 1 })를 1회 발화한다', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDebouncedKeyword({ q: undefined, onChange }));

    act(() => result.current[1]('김'));
    expect(onChange).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(300));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ q: '김', page: 1 });
  });

  it('빈 문자열로 되돌리면 q: undefined로 발화한다', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDebouncedKeyword({ q: '김', onChange }));

    act(() => result.current[1](''));
    act(() => vi.advanceTimersByTime(300));

    expect(onChange).toHaveBeenCalledWith({ q: undefined, page: 1 });
  });

  it('q와 동일한 값이면 발화하지 않는다 (mount 직후 가드)', () => {
    const onChange = vi.fn();
    renderHook(() => useDebouncedKeyword({ q: '김', onChange }));

    act(() => vi.advanceTimersByTime(1000));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('연속 입력 시 마지막 값만 발화한다 (이전 타이머 cleanup)', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDebouncedKeyword({ q: undefined, onChange }));

    act(() => result.current[1]('김'));
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current[1]('김수'));
    act(() => vi.advanceTimersByTime(200));
    expect(onChange).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(100));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ q: '김수', page: 1 });
  });
});
