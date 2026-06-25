import { cn } from '@shared/utils';

import type { FormFieldProps } from './FormField.type';

const FormField = ({ label, required = false, hint, error, children, className }: FormFieldProps) => (
  <label className={cn('block', className)}>
    {label && (
      <span className="mb-[0.8rem] flex gap-[0.4rem] text-[1.4rem] font-semibold text-ink-2">
        {label}
        {required && <span className="text-point">*</span>}
      </span>
    )}

    {children}

    {hint && !error && <span className="mt-[0.6rem] block text-[1.3rem] text-ink-3">{hint}</span>}

    {error && <span className="mt-[0.6rem] block text-[1.3rem] text-danger">{error}</span>}
  </label>
);

export default FormField;
