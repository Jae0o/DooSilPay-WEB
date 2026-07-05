import { NavLink } from 'react-router';

import { ArrowLeftIcon, Avatar, Button, Card, EditIcon, PageHead, StudentStatusBadge, TrashIcon } from '@shared/ui';
import { formatCurrency, zeroPad } from '@shared/utils';

import type { StudentDetailProps } from './StudentDetail.type';
import { useToggleStudentStatus } from './hooks';

const Info = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="mb-[0.3rem] text-[1.3rem] text-ink-3">{label}</p>
    <p className="font-semibold">{value || '-'}</p>
  </div>
);

const StudentDetail = ({ student, onEdit, onDelete }: StudentDetailProps) => {
  const { toggle, isPending } = useToggleStudentStatus({ student });

  return (
    <section>
      <PageHead
        back={
          <NavLink
            to="/students"
            className="inline-flex items-center gap-[0.4rem] whitespace-nowrap text-[1.4rem] font-semibold text-ink-3"
          >
            <ArrowLeftIcon size="1.6rem" /> 수강생 목록
          </NavLink>
        }
        title={student.name}
        actions={
          <>
            <Button variant="neutral" icon={<EditIcon size="1.8rem" />} onClick={onEdit}>
              정보 수정
            </Button>
            {/* isLoading은 라벨을 스피너로 교체해 버튼 폭이 출렁임 — 라벨 유지한 채 disabled로 중복 클릭만 방지 */}
            <Button variant="neutral" onClick={toggle} disabled={isPending}>
              {student.status === 'active' ? '휴식 전환' : '수강 전환'}
            </Button>
            {/* 결제 추가: Payment 후속 → disabled 안내 */}
            <Button variant="secondary" disabled>
              결제 추가 (준비 중)
            </Button>
            <Button variant="danger" icon={<TrashIcon size="1.8rem" />} onClick={onDelete}>
              삭제
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-[1.6rem] lg:grid-cols-[1.3fr_1fr]">
        <Card pad="2.4rem">
          <div className="mb-[2rem] flex items-center gap-[1.6rem]">
            <Avatar name={student.name} size="5.8rem" />
            <div className="min-w-0">
              <div className="flex items-center gap-[0.8rem]">
                <span className="text-[1.9rem] font-extrabold">{student.name}</span>
                <StudentStatusBadge status={student.status} />
              </div>
              <p className="mt-[0.2rem] text-[1.4rem] text-ink-3">
                {(student.subjectName ?? '과목 미지정') + ' · 등록번호 ' + zeroPad(student.registrationNo)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-[2.4rem] gap-y-[1.6rem]">
            <Info label="생년월일" value={student.birthDate} />
            <Info label="기본 교습비" value={formatCurrency(student.monthlyFee)} />
            <Info label="본인 연락처" value={student.contact} />
            <Info label="보호자명" value={student.guardianName} />
            <Info label="보호자 연락처" value={student.guardianContact} />
          </div>
        </Card>

        {/* 결제 요약 카드 → 04-02 에서 추가 */}
      </div>

      {/* 결제 이력 카드 → 04-02 에서 추가 */}
    </section>
  );
};

export default StudentDetail;
