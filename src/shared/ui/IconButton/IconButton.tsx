import { cn } from '@shared/utils';

import type { IconButtonProps } from './IconButton.type';

const IconButton = ({ icon, label, size = '4rem', type, className, ...rest }: IconButtonProps) => (
  <button
    {...rest}
    type={type ?? 'button'}
    aria-label={label}
    style={{ width: size, height: size }}
    className={cn(
      'inline-grid cursor-pointer place-items-center rounded-md border-0 bg-transparent text-ink-2 transition',
      '[&:not(:disabled)]:hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
  >
    {icon}
  </button>
);

export default IconButton;
