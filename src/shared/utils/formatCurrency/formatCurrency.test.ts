import { describe, expect, it } from 'vitest';

import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('천 단위 구분 후 원을 붙인다', () => expect(formatCurrency(280000)).toBe('280,000원'));
  it('0도 포맷한다', () => expect(formatCurrency(0)).toBe('0원'));
});
