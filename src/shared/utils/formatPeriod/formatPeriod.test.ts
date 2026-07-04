import { describe, expect, it } from 'vitest';

import { formatPeriod } from './formatPeriod';

describe('formatPeriod', () => {
  it('월 앞자리 0을 떼고 한국어로 포맷한다', () => expect(formatPeriod('2026-06')).toBe('2026년 6월'));
  it('두 자리 월도 포맷한다', () => expect(formatPeriod('2026-11')).toBe('2026년 11월'));
});
