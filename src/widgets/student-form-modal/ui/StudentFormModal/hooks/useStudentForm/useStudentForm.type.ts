import type { Student, StudentStatus } from '@entities/student';

export interface UseStudentFormParams {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  student?: Student; // mode==='edit' 시 prefill
}

export interface StudentFormValues {
  name: string;
  birthDate: string;
  subjectName: string;
  monthlyFee: number;
  contact: string;
  guardianName: string;
  guardianContact: string;
  status: StudentStatus; // edit 모드에서만 사용, create는 항상 'active'
}
