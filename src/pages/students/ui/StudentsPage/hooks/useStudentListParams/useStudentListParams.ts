import { useCallback, useState, useTransition } from 'react';

import type { ListStudentsParams } from '@entities/student';

const useStudentListParams = () => {
  const [params, setParams] = useState<ListStudentsParams>({ status: 'active' });
  const [isPending, startTransition] = useTransition(); // params 변경 시 skeleton 재진입 방지 — 이전 UI 유지 (R18)

  const patchParams = useCallback(
    (patch: Partial<ListStudentsParams>) => startTransition(() => setParams((p) => ({ ...p, ...patch }))),
    [],
  );

  const loadMore = () => patchParams({ limit: Math.min((params.limit ?? 20) + 20, 100) }); // limit 증가 — 상한 100 (R13)

  return { params, isPending, patchParams, loadMore };
};

export default useStudentListParams;
