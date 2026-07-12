import type { Control, UseFormRegister } from 'react-hook-form';

import type { BulkPaymentFormValues } from '../BulkPaymentForm/hooks';

export interface BulkPaymentRowFieldsProps {
  index: number;
  register: UseFormRegister<BulkPaymentFormValues>;
  control: Control<BulkPaymentFormValues>;
  studentOpts: { value: string; label: string }[];
  isMobile: boolean;
  tried: boolean; // 제출 시도 후 불완전 행 하이라이트
  canRemove: boolean;
  onPickStudent: (studentId: string) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onOpenOtherFees: () => void;
}
