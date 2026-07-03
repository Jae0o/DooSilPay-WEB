import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

import type { AsyncBoundaryProps } from './AsyncBoundary.type';

const AsyncBoundary = ({
  skeleton,
  errorSize = 'md',
  errorFallback,
  onReset,
  resetKeys,
  children,
}: AsyncBoundaryProps) => {
  const { reset: resetQueryError } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      resetKeys={resetKeys}
      onReset={() => {
        resetQueryError();
        onReset?.();
      }}
      fallback={errorFallback ?? (({ reset }) => <ErrorFallback size={errorSize} onRetry={reset} />)}
    >
      <Suspense fallback={skeleton}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
