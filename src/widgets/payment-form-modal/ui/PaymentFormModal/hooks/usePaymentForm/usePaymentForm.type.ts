import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';

export interface UsePaymentFormParams {
  mode: 'create' | 'edit';
  student: Student;
  payment?: Payment; // mode==='edit' 시 복원값
  onClose: () => void;
  onSuccess?: (payment: Payment) => void;
}
