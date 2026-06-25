import type { UseQueryOptions } from '@tanstack/react-query';

/** 쿼리 훅이 받는 공통 옵션 — 자주 덮어쓰는 키만 노출. */
export type CustomQueryOptions<TData> = Partial<
  Pick<UseQueryOptions<TData, Error>, 'enabled' | 'staleTime' | 'gcTime'>
>;
