import type { ReactNode } from 'react';

export type BadgeTone = 'ok' | 'warn' | 'danger' | 'muted' | 'point';
export type BadgeSize = 'md' | 'sm';

export interface BadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  dot?: boolean;
  children: ReactNode;
}
