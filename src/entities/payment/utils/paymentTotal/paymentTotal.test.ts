import { paymentTotal } from './paymentTotal';

describe('paymentTotal', () => {
  it('기타경비가 없으면 교습비를 그대로 반환한다', () => {
    expect(paymentTotal({ tuitionFee: 280000, otherFees: [] })).toBe(280000);
  });

  it('교습비에 기타경비 합을 더한다', () => {
    expect(
      paymentTotal({
        tuitionFee: 280000,
        otherFees: [
          { label: '교재비', amount: 30000 },
          { label: '모의고사비', amount: 15000 },
          { label: '특강비', amount: 50000 },
        ],
      }),
    ).toBe(375000);
  });
});
