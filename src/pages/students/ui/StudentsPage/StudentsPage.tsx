import { motion, useReducedMotion } from 'motion/react';

import { AsyncBoundary, Button, PageHead, PlusIcon, Skeleton } from '@shared/ui';

import ActiveStudentCount from './ActiveStudentCount';

const StudentsPage = () => {
  const shouldReduceMotion = useReducedMotion();

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

      {/* MonthSummary 슬롯 — 02-02에서 채움 */}

      {/* 검색 · 필터 슬롯 — 02-03에서 채움 */}

      {/* 리스트 슬롯 — 02-03에서 채움 */}
    </motion.section>
  );
};

export default StudentsPage;
