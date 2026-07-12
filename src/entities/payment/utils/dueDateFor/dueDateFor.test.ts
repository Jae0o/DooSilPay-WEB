import { dueDateFor } from './dueDateFor';

describe('dueDateFor', () => {
  it('결제일을 zero-pad해 YYYY-MM-DD로 만든다', () => {
    expect(dueDateFor('2026-06', 5)).toBe('2026-06-05');
  });

  it('말일을 넘는 결제일은 해당 월 말일로 클램프한다', () => {
    expect(dueDateFor('2026-02', 31)).toBe('2026-02-28');
  });
});
