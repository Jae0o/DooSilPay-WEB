import type { Student } from '@entities/student';

export interface StudentDetailProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddPayment: () => void;
}
