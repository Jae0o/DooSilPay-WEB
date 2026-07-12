import { cn } from '@shared/utils';

import type { SegmentedProps } from './Segmented.type';

const Segmented = <T extends string>({ value, options, onChange, size = 'md', full }: SegmentedProps<T>) => (
  <div className={cn('gap-[0.2rem] rounded-md bg-surface-2 p-[0.4rem]', full ? 'flex w-full' : 'inline-flex')}>
    {options.map(({ value: optionValue, label }) => {
      const selected = optionValue === value;

      return (
        <button
          key={optionValue}
          type="button"
          aria-pressed={selected}
          onClick={() => onChange(optionValue)}
          className={cn(
            'rounded-[calc(1.2rem-0.2rem)] px-[1.6rem] text-[1.4rem] font-semibold transition-[color,background,box-shadow]',
            size === 'sm' ? 'h-[3.6rem]' : 'h-[4.2rem]',
            full && 'flex-1',
            selected ? 'bg-surface text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2',
          )}
        >
          {label}
        </button>
      );
    })}
  </div>
);

export default Segmented;
