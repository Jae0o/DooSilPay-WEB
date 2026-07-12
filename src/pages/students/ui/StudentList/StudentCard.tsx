import type { Student } from '@entities/student';
import { Avatar, Card, IconButton, StudentStatusBadge, TrashIcon } from '@shared/ui';
import { formatCurrency, zeroPad } from '@shared/utils';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  onDelete: () => void;
}

// 모바일(<560px) 카드 1장 — 삭제 액션만 노출, 수정은 상세 진입 후 (v3)
const StudentCard = ({ student, onClick, onDelete }: StudentCardProps) => (
  <Card hover pad="1.6rem" onClick={onClick}>
    <div className="flex flex-wrap items-center gap-[1.2rem]">
      <Avatar name={student.name} size="4.2rem" />

      <div className="min-w-0 flex-1 basis-[14rem]">
        <p className="font-bold">{student.name}</p>
        <p className="text-[1.4rem] text-ink-3">{student.subjectName ?? '-'}</p>
      </div>

      <div className="flex grow items-center justify-between gap-[1.2rem]">
        <p className="text-[1.3rem] font-semibold text-ink-3">
          등록번호 <span className="tnum font-bold text-ink">{zeroPad(student.registrationNo)}</span>
        </p>

        <div className="flex items-center gap-[1.2rem]">
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
      </div>
    </div>
  </Card>
);

export default StudentCard;
