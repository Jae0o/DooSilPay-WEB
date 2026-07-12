import { useMemo } from 'react';

import { paymentTotal, usePaymentsQuery } from '@entities/payment';
import { cn, formatCurrency } from '@shared/utils';

import type { PaymentSummaryCardProps } from './PaymentSummaryCard.type';

// suspense 소비 — 이력과 동일 쿼리키로 요청 1회 공유. 파생은 useMemo(P11 — 훅 분리 기준 미충족)
const PaymentSummaryCard = ({ studentId }: PaymentSummaryCardProps) => {
  const { data } = usePaymentsQuery({ studentId });

  const { totalPaid, count, overdueCount } = useMemo(() => {
    const { items } = data;

    return {
      totalPaid: items.filter((p) => p.status === 'paid').reduce((sum, p) => sum + paymentTotal(p), 0),
      count: items.length,
      overdueCount: items.filter((p) => p.status === 'overdue').length,
    };
  }, [data]);

  return (
    <>
      <div>
        <p className="text-[1.4rem] text-ink-3">누적 납부액</p>
        <p className="tnum mt-[0.4rem] text-[1.9rem] font-extrabold tracking-[-0.03em]">{formatCurrency(totalPaid)}</p>
      </div>

      <div className="flex gap-[2.4rem]">
        <div>
          <p className="text-[1.3rem] text-ink-3">결제 건수</p>
          <p className="tnum mt-[0.2rem] text-[1.25rem] font-bold">{count}건</p>
        </div>
        <div>
          <p className="text-[1.3rem] text-ink-3">미납</p>
          <p className={cn('tnum mt-[0.2rem] text-[1.25rem] font-bold', overdueCount > 0 && 'text-danger')}>
            {overdueCount}건
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentSummaryCard;
