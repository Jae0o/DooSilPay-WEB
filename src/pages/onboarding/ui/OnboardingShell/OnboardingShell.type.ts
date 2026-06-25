import type { ReactNode } from 'react';

export interface OnboardingShellProps {
  step: 1 | 2;
  title: string;
  desc: ReactNode;
  children: ReactNode;
}
