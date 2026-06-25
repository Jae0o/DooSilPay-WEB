import { cn } from '@shared/utils';

import { SettingsIcon } from '../Icons';

import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.type';

const BASE_CLASS =
  'inline-flex cursor-pointer items-center justify-center gap-[0.8rem] whitespace-nowrap rounded-md border border-transparent font-semibold tracking-[-0.01em] transition ' +
  '[&:not(:disabled)]:hover:brightness-[0.97] [&:not(:disabled)]:active:scale-[0.97] ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none';

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'h-[3.8rem] px-[1.4rem] text-[1.4rem]',
  md: 'h-[4.6rem] px-[1.8rem] text-[1.5rem]',
  lg: 'h-[5.4rem] px-[2.2rem] text-[1.7rem]',
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-point text-point-ink shadow-sm',
  secondary: 'bg-point-weak text-point-strong',
  neutral: 'border-line-2 bg-surface-2 text-ink',
  ghost: 'bg-transparent text-ink-2 [&:not(:disabled)]:hover:bg-surface-2',
  danger: 'bg-danger-weak text-danger',
  dark: 'bg-ink text-white',
};

// 로딩 기어 크기(디자인: sm/md 18px, lg 20px)
const SPINNER_SIZE: Record<ButtonSize, string> = { sm: '1.8rem', md: '1.8rem', lg: '2rem' };

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  iconRight,
  type,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) => (
  <button
    {...rest}
    type={type ?? 'button'}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={cn(BASE_CLASS, SIZE_CLASS[size], VARIANT_CLASS[variant], fullWidth && 'w-full', className)}
  >
    {isLoading && <SettingsIcon size={SPINNER_SIZE[size]} className="animate-spin" />}

    {!isLoading && (
      <>
        {icon}
        {children}
        {iconRight}
      </>
    )}
  </button>
);

export default Button;
