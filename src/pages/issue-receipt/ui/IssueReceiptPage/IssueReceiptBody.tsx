import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { useGetAcademyQuery } from '@entities/academy';
import type { IssuedReceipt } from '@entities/issued-receipt';
import { formatReceiptNo } from '@entities/issued-receipt';
import type { Payment } from '@entities/payment';
import { useStudentQuery } from '@entities/student';
import { IssueReceiptForm } from '@features/issue-receipt';
import { ArrowLeftIcon, PageHead } from '@shared/ui';

// payment 확정 후 학생·학원 로딩 + 보기/수정 토글(PageHead 부제 공유 목적으로 페이지가 소유) + 2컬럼 조립 (§3.3)
const IssueReceiptBody = ({ payment, existingReceipt }: { payment: Payment; existingReceipt?: IssuedReceipt }) => {
  const navigate = useNavigate();
  const { data: student } = useStudentQuery(payment.studentId);
  const { data: academy } = useGetAcademyQuery();
  const [editing, setEditing] = useState(!existingReceipt);

  const receiptNo = existingReceipt ? formatReceiptNo(existingReceipt.issueYearMonth, existingReceipt.seq) : undefined;

  return (
    <>
      <PageHead
        back={
          <NavLink
            to={`/students/${student.id}`}
            className="inline-flex items-center gap-[0.4rem] whitespace-nowrap text-[1.4rem] font-semibold text-ink-3"
          >
            <ArrowLeftIcon size="1.6rem" /> {student.name} 상세
          </NavLink>
        }
        title={existingReceipt ? '교부영수증' : '교부영수증 발급'}
        subtitle={
          existingReceipt
            ? editing
              ? `수정 중 · No.${receiptNo}`
              : `이미 발급된 영수증이에요 · No.${receiptNo}`
            : '결제 정보가 자동으로 채워졌어요. 확인 후 발급하세요.'
        }
      />

      <div className="grid grid-cols-1 gap-[2rem] lg:grid-cols-[1fr_42rem] lg:items-start">
        <IssueReceiptForm
          payment={payment}
          student={student}
          academy={academy ?? undefined}
          existingReceipt={existingReceipt}
          editing={editing}
          onStartEdit={() => setEditing(true)}
          onCancelEdit={() => setEditing(false)}
          onIssued={() => navigate('/issued-receipts')}
        />
      </div>
    </>
  );
};

export default IssueReceiptBody;
