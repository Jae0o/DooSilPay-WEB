import { cn } from '@shared/utils';

import type { BadgeProps, BadgeTone } from './Badge.type';

const TONE_CLASS: Record<BadgeTone, string> = {
  ok: 'bg-ok-weak text-ok',
  warn: 'bg-warn-weak text-warn',
  danger: 'bg-danger-weak text-danger',
  muted: 'bg-muted-weak text-muted',
  point: 'bg-point-weak text-point-strong',
};

const DOT_CLASS: Record<BadgeTone, string> = {
  ok: 'bg-ok',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-muted',
  point: 'bg-point-strong',
};

const Badge = ({ tone = 'muted', size = 'md', dot = false, children }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-[0.6rem] rounded-pill font-semibold',
      size === 'md' ? 'px-[1.2rem] py-[0.4rem] text-[1.3rem]' : 'px-[0.9rem] py-[0.2rem] text-[1.2rem]',
      TONE_CLASS[tone],
    )}
  >
    {dot && <span className={cn('size-[0.6rem] rounded-pill', DOT_CLASS[tone])} />}
    {children}
  </span>
);

export default Badge;
