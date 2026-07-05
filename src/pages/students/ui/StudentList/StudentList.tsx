import { useNarrow } from '@shared/hooks';
import {
  Avatar,
  Button,
  Card,
  EditIcon,
  EmptyState,
  IconButton,
  StudentStatusBadge,
  TrashIcon,
  UsersIcon,
} from '@shared/ui';
import { formatCurrency, zeroPad } from '@shared/utils';

import type { StudentListProps } from './StudentList.type';

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
            <Card key={s.id} hover pad="1.6rem" onClick={() => onRowClick(s.id)}>
              <div className="flex items-center gap-[1.2rem]">
                <Avatar name={s.name} size="4.2rem" />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{s.name}</p>
                  <p className="truncate text-[1.4rem] text-ink-3">{s.subjectName ?? '-'}</p>
                </div>

                <div className="flex flex-col items-end gap-[0.4rem]">
                  <StudentStatusBadge status={s.status} />
                  <span className="tnum text-[1.5rem] font-bold">{formatCurrency(s.monthlyFee)}</span>
                </div>

                <IconButton
                  label="삭제"
                  icon={<TrashIcon size="2rem" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(s);
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
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
