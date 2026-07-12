import { sumOtherFees } from './sumOtherFees';

describe('sumOtherFees', () => {
  it('빈 배열이면 0을 반환한다', () => {
    expect(sumOtherFees([])).toBe(0);
  });

  it('기타경비 금액을 합산한다', () => {
    expect(
      sumOtherFees([
        { label: '교재비', amount: 30000 },
        { label: '모의고사비', amount: 15000 },
      ]),
    ).toBe(45000);
  });
});
