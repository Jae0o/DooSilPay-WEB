import type { ReactNode } from 'react';

export interface ErrorBoundaryFallbackArgs {
  error: Error;
  reset: () => void;
}

export interface ErrorBoundaryProps {
  fallback: (args: ErrorBoundaryFallbackArgs) => ReactNode;
  /** reset 시 추가로 실행할 콜백 (예: 쿼리 캐시 reset) */
  onReset?: () => void;
  /** 값이 바뀌면 에러 상태 자동 해제 (예: 라우트 param, 검색 params) */
  resetKeys?: readonly unknown[];
  children: ReactNode;
}

export interface ErrorBoundaryState {
  error: Error | null;
}
