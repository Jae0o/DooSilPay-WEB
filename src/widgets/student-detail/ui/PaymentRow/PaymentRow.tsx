import { METHOD_LABEL, PaymentStatusBadge, paymentTotal, sumOtherFees } from '@entities/payment';
import { useToggle } from '@shared/hooks';
import { Button, CheckIcon, ChevronDownIcon, EditIcon, IconButton, TrashIcon } from '@shared/ui';
import { formatCurrency, formatPeriod } from '@shared/utils';

import type { PaymentRowProps } from './PaymentRow.type';

// 'YYYY-MM-DD' -> 'M.D' (예: '2026-06-15' -> '6.15')
const toMonthDay = (date: string) => {
  const [, month, day] = date.split('-');

  return `${Number(month)}.${Number(day)}`;
};

const PaymentRow = ({ payment, onMarkPaid, onEdit, onDelete }: PaymentRowProps) => {
  const [open, toggle] = useToggle();

  // paidDate 있으면 '납부', 없고 dueDate 있으면 '예정', 둘 다 없으면 '—' (dueDate 선택 — P5)
  const dateLabel = payment.paidDate
    ? `${toMonthDay(payment.paidDate)} 납부`
    : payment.dueDate
      ? `${toMonthDay(payment.dueDate)} 예정`
      : '—';

  return (
    <div className="border-t border-line px-[1.8rem] py-[1.6rem] lg:px-[2.4rem] lg:py-[1.8rem]">
      <div className="flex flex-wrap items-center gap-[1.4rem]">
        {/* ① 기간 + 납부/예정일 */}
        <div className="min-w-[9.2rem]">
          <p className="tnum font-bold">{formatPeriod(payment.period)}</p>
          <p className="tnum mt-[0.2rem] text-[1.3rem] text-ink-3">{dateLabel}</p>
        </div>

        {/* ② 총액 + 구성 */}
        <div className="min-w-[11rem] flex-1">
          <p className="tnum text-[1.6rem] font-bold">{formatCurrency(paymentTotal(payment))}</p>
          {payment.otherFees.length > 0 && (
            <p className="tnum mt-[0.1rem] text-[1.3rem] text-ink-3">
              교습비 {formatCurrency(payment.tuitionFee)} · 기타 {formatCurrency(sumOtherFees(payment.otherFees))}
            </p>
          )}
        </div>

        {/* ③ 결제수단 · 상태 · 토글 */}
        <div className="flex items-center gap-[0.8rem]">
          {payment.method && (
            <span className="whitespace-nowrap text-[1.3rem] text-ink-3">{METHOD_LABEL[payment.method]}</span>
          )}
          <PaymentStatusBadge status={payment.status} />
          <IconButton
            label="행 액션 펼치기"
            icon={<ChevronDownIcon size="1.8rem" />}
            onClick={toggle}
            className={open ? 'rotate-180' : undefined}
          />
        </div>
      </div>

      {open && (
        <div className="mt-[1.4rem] flex flex-wrap gap-[0.8rem]">
          {payment.status !== 'paid' && (
            <Button size="sm" icon={<CheckIcon size="1.6rem" />} onClick={onMarkPaid}>
              납부 처리
            </Button>
          )}
          <Button size="sm" variant="ghost" icon={<EditIcon size="1.6rem" />} onClick={onEdit}>
            수정
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={<TrashIcon size="1.6rem" />}
            className="text-danger"
            onClick={onDelete}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentRow;
