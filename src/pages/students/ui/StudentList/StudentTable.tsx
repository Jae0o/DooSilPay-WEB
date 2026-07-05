import type { Student } from '@entities/student';
import { Avatar, Card, EditIcon, IconButton, StudentStatusBadge, TrashIcon } from '@shared/ui';
import { formatCurrency, zeroPad } from '@shared/utils';

interface StudentTableProps {
  students: Student[];
  onRowClick: (id: string) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

// 데스크톱(≥560px) 테이블 — 행 클릭 상세 이동, 액션 버튼은 stopPropagation
const StudentTable = ({ students, onRowClick, onEdit, onDelete }: StudentTableProps) => (
  <Card pad="0">
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-[1.3rem] text-ink-3">
          <th className="py-[1.4rem] pr-[1.4rem] pl-[2.4rem] font-semibold">수강생</th>
          <th className="px-[1.4rem] py-[1.4rem] font-semibold">등록번호</th>
          <th className="px-[1.4rem] py-[1.4rem] text-right font-semibold">기본 결제 금액</th>
          <th className="px-[1.4rem] py-[1.4rem] text-center font-semibold">상태</th>
          <th className="px-[1.4rem] py-[1.4rem]" />
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr
            key={s.id}
            className="cursor-pointer border-t border-line transition-colors hover:bg-surface-2"
            onClick={() => onRowClick(s.id)}
          >
            <td className="py-[1.4rem] pr-[1.4rem] pl-[2.4rem]">
              <div className="flex items-center gap-[1.2rem]">
                <Avatar name={s.name} size="4rem" />

                <div className="min-w-0">
                  <p className="truncate font-bold">{s.name}</p>
                  <p className="truncate text-[1.4rem] text-ink-3">{s.subjectName ?? '-'}</p>
                </div>
              </div>
            </td>

            <td className="tnum px-[1.4rem] py-[1.4rem] text-ink-2">{zeroPad(s.registrationNo)}</td>

            <td className="tnum px-[1.4rem] py-[1.4rem] text-right font-bold">{formatCurrency(s.monthlyFee)}</td>

            <td className="px-[1.4rem] py-[1.4rem] text-center">
              <StudentStatusBadge status={s.status} />
            </td>

            <td className="px-[1.4rem] py-[1.4rem]">
              <div className="flex justify-end gap-[0.2rem]">
                <IconButton
                  label="수정"
                  icon={<EditIcon size="2rem" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(s);
                  }}
                />

                <IconButton
                  label="삭제"
                  icon={<TrashIcon size="2rem" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(s);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

export default StudentTable;
