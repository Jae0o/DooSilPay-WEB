import type { Payment } from '../../model';
import { sumOtherFees } from '../sumOtherFees';

// 파생 총액(저장 안 함 — 상세-01 §2.2). 형제 유틸은 상대경로(배럴 순환 회피)
export const paymentTotal = ({ tuitionFee, otherFees }: Pick<Payment, 'tuitionFee' | 'otherFees'>): number =>
  tuitionFee + sumOtherFees(otherFees);
