import { formatReceiptNo } from './formatReceiptNo';

describe('formatReceiptNo', () => {
  it('YYYY-MM-NNN 형식으로 순번을 3자리 zero-pad 한다', () => {
    expect(formatReceiptNo('2026-06', 1)).toBe('2026-06-001');
    expect(formatReceiptNo('2026-12', 42)).toBe('2026-12-042');
  });

  it('세 자리 이상 순번은 그대로 붙인다', () => {
    expect(formatReceiptNo('2026-06', 123)).toBe('2026-06-123');
  });
});
