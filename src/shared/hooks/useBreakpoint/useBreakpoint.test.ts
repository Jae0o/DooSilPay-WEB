import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import useBreakpoint from './useBreakpoint';

const setMatchMedia = (matches: boolean) => {
  const listeners = new Set<() => void>();
  const mql = {
    matches,
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    _emit: (next: boolean) => {
      (mql as { matches: boolean }).matches = next;
      listeners.forEach((cb) => cb());
    },
  };
  vi.stubGlobal('matchMedia', () => mql);
  return mql;
};

afterEach(() => vi.unstubAllGlobals());

describe('useBreakpoint', () => {
  it('초기 매칭 상태를 반환한다', () => {
    setMatchMedia(true);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(true);
  });

  it('미디어 변경에 반응한다', () => {
    const mql = setMatchMedia(false);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(false);
    act(() => mql._emit(true));
    expect(result.current).toBe(true);
  });
});
