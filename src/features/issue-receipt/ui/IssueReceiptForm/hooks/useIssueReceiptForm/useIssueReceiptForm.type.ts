import type { AcademyProfile } from '@entities/academy';
import type { IssuedReceipt } from '@entities/issued-receipt';
import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';

export interface UseIssueReceiptFormParams {
  payment: Payment;
  student: Student;
  academy?: AcademyProfile;
  existingReceipt?: IssuedReceipt;
  onCancelEdit: () => void;
  onIssued: () => void;
}

export interface IssueReceiptBlocker {
  message: string;
  linkLabel: string;
  to: string;
}
