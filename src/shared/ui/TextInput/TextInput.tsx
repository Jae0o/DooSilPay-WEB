import { cn } from '@shared/utils';

import type { TextInputProps } from './TextInput.type';

const TextInput = ({ invalid = false, prefix, suffix, disabled, className, ref, ...rest }: TextInputProps) => (
  <div
    className={cn(
      'flex h-[5rem] items-center rounded-md border-[0.15rem] transition-[border-color,background]',
      disabled
        ? 'cursor-not-allowed border-transparent bg-muted-weak'
        : invalid
          ? 'border-danger bg-surface-2 focus-within:border-danger'
          : 'border-transparent bg-surface-2 focus-within:border-point focus-within:bg-surface',
      prefix ? 'pl-[1.4rem]' : 'pl-[1.6rem]',
      suffix ? 'pr-[1.4rem]' : 'pr-[1.6rem]',
      className,
    )}
  >
    {prefix && <span className="mr-[0.6rem] flex text-ink-3">{prefix}</span>}

    <input
      ref={ref}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className="h-[4.8rem] min-w-0 flex-1 border-0 bg-transparent text-[1.6rem] text-ink outline-none placeholder:text-ink-3 disabled:cursor-not-allowed disabled:text-ink-3"
      {...rest}
    />

    {suffix && <span className="ml-[0.6rem] flex font-medium text-ink-3">{suffix}</span>}
  </div>
);

export default TextInput;
