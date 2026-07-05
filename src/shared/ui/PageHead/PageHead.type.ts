import type { ReactNode } from 'react';

export interface PageHeadProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  back?: ReactNode;
}
