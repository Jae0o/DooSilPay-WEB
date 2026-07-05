import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useState, useTransition } from 'react';

import type { ListStudentsParams } from '@entities/student';
import { AsyncBoundary, Button, PageHead, PlusIcon, Skeleton } from '@shared/ui';

import { MonthSummary } from '../MonthSummary';
import { StudentListSkeleton } from '../StudentListSkeleton';
import { StudentSearchBar } from '../StudentSearchBar';

import ActiveStudentCount from './ActiveStudentCount';
import StudentListLoader from './StudentListLoader';

const StudentsPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const [params, setParams] = useState<ListStudentsParams>({ status: 'active' });
  const [isPending, startTransition] = useTransition(); // params 변경 시 skeleton 재진입 방지 — 이전 UI 유지 (R18)

  const patchParams = useCallback(
    (patch: Partial<ListStudentsParams>) => startTransition(() => setParams((p) => ({ ...p, ...patch }))),
    [],
  );

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-[2.4rem] py-[2.8rem]"
    >
      <PageHead
        title="수강생"
        subtitle={
          <AsyncBoundary errorSize="sm" skeleton={<Skeleton className="h-[1.4rem] w-[10rem]" />}>
            <ActiveStudentCount />
          </AsyncBoundary>
        }
        actions={
          <>
            <Button
              variant="neutral"
              onClick={() => {
                /* TODO: 03-등록-수정-삭제에서 연결 */
              }}
            >
              결제 등록
            </Button>

            <Button
              icon={<PlusIcon size="1.8rem" />}
              onClick={() => {
                /* TODO: 03-등록-수정-삭제에서 연결 */
              }}
            >
              수강생 등록
            </Button>
          </>
        }
      />

      <MonthSummary />

      <StudentSearchBar params={params} onChange={patchParams} />

      <div className={isPending ? 'opacity-60' : ''}>
        <AsyncBoundary errorSize="md" skeleton={<StudentListSkeleton />} resetKeys={[params]}>
          <StudentListLoader
            params={params}
            onLoadMore={() => patchParams({ limit: Math.min((params.limit ?? 20) + 20, 100) })}
          />
        </AsyncBoundary>
      </div>
    </motion.section>
  );
};

export default StudentsPage;
