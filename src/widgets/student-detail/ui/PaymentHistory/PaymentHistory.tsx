import { usePaymentsQuery } from '@entities/payment';
import { EmptyState, ReceiptIcon } from '@shared/ui';

import { PaymentRow } from '../PaymentRow';

import type { PaymentHistoryProps } from './PaymentHistory.type';

// suspense 소비 — 로딩/에러는 상위 AsyncBoundary가 수신 (R18)
const PaymentHistory = ({ studentId, onMarkPaid, onEdit, onDelete, onIssue }: PaymentHistoryProps) => {
  const { data } = usePaymentsQuery({ studentId }); // ListPaymentsResult (V2-1)

  if (data.items.length === 0)
    return (
      <EmptyState
        icon={<ReceiptIcon size="2.8rem" />}
        title="결제 내역이 없어요"
        desc="결제를 추가해 납부 현황을 관리하세요."
      />
    );

  // 서버 정렬(period desc, createdAt desc) 그대로 — FE 재정렬 금지 (PM-6)
  return (
    <div>
      {data.items.map((payment) => (
        <PaymentRow
          key={payment.id}
          payment={payment}
          onMarkPaid={() => onMarkPaid(payment)}
          onEdit={() => onEdit(payment)}
          onDelete={() => onDelete(payment)}
          onIssue={() => onIssue(payment)}
        />
      ))}
    </div>
  );
};

export default PaymentHistory;
