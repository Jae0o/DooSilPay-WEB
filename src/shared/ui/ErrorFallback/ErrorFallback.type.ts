import type { ReactNode } from 'react';

export type ErrorFallbackSize = 'sm' | 'md' | 'lg';

export interface ErrorFallbackProps {
  /** 영역 크기 (기본 'md') */
  size?: ErrorFallbackSize;
  /** 기본 카피는 size별 제공 */
  title?: string;
  /** lg만 기본 카피, sm/md는 미노출 기본 */
  description?: string;
  /** 있으면 "다시 시도" 버튼 렌더 */
  onRetry?: () => void;
  /** 재시도 대신/추가 커스텀 액션 (예: "목록으로") */
  action?: ReactNode;
}
