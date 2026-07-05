import type { Student } from '@entities/student';
import { Avatar, Card, IconButton, StudentStatusBadge, TrashIcon } from '@shared/ui';
import { formatCurrency } from '@shared/utils';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  onDelete: () => void;
}

// 모바일(<560px) 카드 1장 — 삭제 액션만 노출, 수정은 상세 진입 후 (v3)
const StudentCard = ({ student, onClick, onDelete }: StudentCardProps) => (
  <Card hover pad="1.6rem" onClick={onClick}>
    <div className="flex items-center gap-[1.2rem]">
      <Avatar name={student.name} size="4.2rem" />

      <div className="min-w-0 flex-1">
        <p className="truncate font-bold">{student.name}</p>
        <p className="truncate text-[1.4rem] text-ink-3">{student.subjectName ?? '-'}</p>
      </div>

      <div className="flex flex-col items-end gap-[0.4rem]">
        <StudentStatusBadge status={student.status} />
        <span className="tnum text-[1.5rem] font-bold">{formatCurrency(student.monthlyFee)}</span>
      </div>

      <IconButton
        label="삭제"
        icon={<TrashIcon size="2rem" />}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </div>
  </Card>
);

export default StudentCard;
