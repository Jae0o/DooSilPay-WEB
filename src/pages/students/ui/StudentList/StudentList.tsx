import { useNarrow } from '@shared/hooks';
import { Button, Card, EmptyState, UsersIcon } from '@shared/ui';

import StudentCard from './StudentCard';
import type { StudentListProps } from './StudentList.type';
import StudentTable from './StudentTable';

// 로딩/에러 분기 없음 — AsyncBoundary가 담당 (R18)
const StudentList = ({ students, hasNext, onLoadMore, onRowClick, onEdit, onDelete }: StudentListProps) => {
  const [ref, narrow] = useNarrow({ maxWidth: 560 });

  if (students.length === 0) {
    return (
      <Card pad="0">
        <EmptyState
          icon={<UsersIcon size="2.8rem" />}
          title="수강생이 없어요"
          desc="첫 수강생을 등록해 관리를 시작하세요."
        />
      </Card>
    );
  }

  return (
    <div ref={ref}>
      {narrow ? (
        <div className="flex flex-col gap-[1rem]">
          {students.map((s) => (
            <StudentCard key={s.id} student={s} onClick={() => onRowClick(s.id)} onDelete={() => onDelete(s)} />
          ))}
        </div>
      ) : (
        <StudentTable students={students} onRowClick={onRowClick} onEdit={onEdit} onDelete={onDelete} />
      )}

      {hasNext && (
        <div className="mt-[1.6rem] flex justify-center">
          <Button variant="neutral" onClick={onLoadMore}>
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
