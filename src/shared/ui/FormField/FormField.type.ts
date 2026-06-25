import type { ReactNode } from 'react';

export interface FormFieldProps {
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
}
