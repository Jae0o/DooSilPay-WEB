import type { ListStudentsParams } from '@entities/student';

export interface UseDebouncedKeywordParams {
  q: string | undefined; // 현재 적용된 검색어 (params.q)
  onChange: (patch: Partial<ListStudentsParams>) => void;
}
