import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface SubjectSelectFieldProps {
  /** register('subjectName', rules) 반환값 — Select에 스프레드 */
  registration: UseFormRegisterReturn;
  label?: ReactNode;
  required?: boolean;
  error?: ReactNode;
  /** 목록에 없는 기존 값 보존(edit·prefill) — buildSubjectOptions 선두 병합 */
  current?: string;
  placeholder?: string;
  /** 선택 가능한 옵션이 하나도 없을 때만 노출되는 안내(예: 설정 유도) */
  emptyHint?: ReactNode;
  className?: string;
}

export interface SubjectSelectControlProps extends Pick<
  SubjectSelectFieldProps,
  'registration' | 'current' | 'placeholder' | 'emptyHint'
> {
  invalid: boolean;
}
