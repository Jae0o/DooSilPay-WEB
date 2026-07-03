import { cn } from '@shared/utils';

import { ChevronDownIcon } from '../Icons';

import type { SelectProps } from './Select.type';

const Select = ({ options, placeholder, invalid = false, disabled, className, ref, ...rest }: SelectProps) => (
  <div
    className={cn(
      'relative flex h-[5rem] items-center rounded-md border-[0.15rem] transition-[border-color,background]',
      disabled
        ? 'cursor-not-allowed border-transparent bg-muted-weak'
        : invalid
          ? 'border-danger bg-surface-2 focus-within:border-danger'
          : 'border-transparent bg-surface-2 focus-within:border-point focus-within:bg-surface',
      className,
    )}
  >
    <select
      ref={ref}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className="h-[4.8rem] w-full appearance-none border-0 bg-transparent pr-[4rem] pl-[1.6rem] text-[1.6rem] text-ink outline-none disabled:cursor-not-allowed"
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>

    <ChevronDownIcon size="1.8rem" className="pointer-events-none absolute right-[1.4rem] text-ink-3" />
  </div>
);

export default Select;
