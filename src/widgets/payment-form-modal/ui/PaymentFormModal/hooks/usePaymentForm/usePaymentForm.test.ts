import type { PaymentFormValues } from '../../PaymentFormModal.type';

import { toCreateInput, toPaymentBase } from './usePaymentForm';

const VALUES: PaymentFormValues = {
  period: '2026-07',
  dueDate: '2026-07-10',
  subjectName: '  중등 수학  ',
  tuitionFee: '250000',
  otherFees: [
    { label: '교재비', amount: '30000' },
    { label: '', amount: '5000' }, // label 없음 → 제외
    { label: '모의고사', amount: '' }, // amount 없음 → 제외
  ],
  method: 'transfer',
  status: 'paid',
};

describe('toPaymentBase', () => {
  it('subjectName trim · tuitionFee 문자열 → Number', () => {
    const base = toPaymentBase(VALUES);

    expect(base.subjectName).toBe('중등 수학');
    expect(base.tuitionFee).toBe(250000);
  });

  it('label·amount 둘 다 채운 기타경비만 남기고 amount를 Number로 변환', () => {
    expect(toPaymentBase(VALUES).otherFees).toEqual([{ label: '교재비', amount: 30000 }]);
  });

  it('빈 dueDate·method는 null', () => {
    const base = toPaymentBase({ ...VALUES, dueDate: '', method: '' });

    expect(base.dueDate).toBeNull();
    expect(base.method).toBeNull();
  });
});

describe('toCreateInput', () => {
  it('status paid면 paidDate=today, studentId 포함', () => {
    const input = toCreateInput(VALUES, 'student-1', '2026-07-12');

    expect(input.studentId).toBe('student-1');
    expect(input.paidDate).toBe('2026-07-12');
  });

  it('status가 paid가 아니면 paidDate=null', () => {
    expect(toCreateInput({ ...VALUES, status: 'scheduled' }, 'student-1', '2026-07-12').paidDate).toBeNull();
  });
});
