import type { ReactNode } from 'react';

import type { ErrorBoundaryFallbackArgs } from '../ErrorBoundary';
import type { ErrorFallbackSize } from '../ErrorFallback';

export interface AsyncBoundaryProps {
  /** Suspense fallback — 각 UI 전용 Skeleton을 전달 */
  skeleton: ReactNode;
  /** 기본 ErrorFallback 크기 (기본 'md') */
  errorSize?: ErrorFallbackSize;
  /** 기본 ErrorFallback 대신 렌더할 커스텀 (예: 404 분기) */
  errorFallback?: (args: ErrorBoundaryFallbackArgs) => ReactNode;
  onReset?: () => void;
  resetKeys?: readonly unknown[];
  children: ReactNode;
}
