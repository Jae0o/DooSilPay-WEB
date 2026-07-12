import type { OtherFee } from '../../model';

export const sumOtherFees = (otherFees: OtherFee[]): number => otherFees.reduce((sum, fee) => sum + fee.amount, 0);
