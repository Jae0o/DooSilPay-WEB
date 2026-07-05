import { motion, useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router';

import { DeleteStudentDialog } from '@features/delete-student';
import { AsyncBoundary, Button, PageHead, PlusIcon, Skeleton } from '@shared/ui';
import { StudentFormModal } from '@widgets/student-form-modal';

import { MonthSummary } from '../MonthSummary';
import { StudentListSkeleton } from '../StudentListSkeleton';
import { StudentSearchBar } from '../StudentSearchBar';

import ActiveStudentCount from './ActiveStudentCount';
import StudentListLoader from './StudentListLoader';
import { useStudentListParams, useStudentModals } from './hooks';

const StudentsPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const { params, isPending, patchParams, loadMore } = useStudentListParams();
  const { form, deleteTarget, deleteOpen, openCreate, openEdit, openDelete, closeForm, closeDelete } =
    useStudentModals();

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
            <Button variant="neutral" onClick={() => navigate('/payments/bulk')}>
              결제 등록
            </Button>

            <Button icon={<PlusIcon size="1.8rem" />} onClick={openCreate}>
              수강생 등록
            </Button>
          </>
        }
      />

      <MonthSummary />

      <StudentSearchBar params={params} onChange={patchParams} />

      <div className={isPending ? 'opacity-60' : ''}>
        <AsyncBoundary errorSize="md" skeleton={<StudentListSkeleton />} resetKeys={[params]}>
          <StudentListLoader params={params} onLoadMore={loadMore} onEdit={openEdit} onDelete={openDelete} />
        </AsyncBoundary>
      </div>

      <StudentFormModal open={form.open} mode={form.mode} student={form.student} onClose={closeForm} />

      {/* 닫을 때 target을 null로 만들면 exit 애니메이션 중 언마운트되어 모션이 잘림 — open prop으로만 제어 */}
      {deleteTarget && <DeleteStudentDialog open={deleteOpen} student={deleteTarget} onClose={closeDelete} />}
    </motion.section>
  );
};

export default StudentsPage;
