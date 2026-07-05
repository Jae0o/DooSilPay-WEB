import type { Student } from '@entities/student';

export interface StudentFormModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  student?: Student; // mode==='edit' 시 prefill
}
