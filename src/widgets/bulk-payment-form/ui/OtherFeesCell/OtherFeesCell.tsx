import { EditIcon, PlusIcon } from '@shared/ui';
import { cn, formatCurrency } from '@shared/utils';

import type { OtherFeesCellProps } from './OtherFeesCell.type';

// 기타경비 트리거 셀 — 클릭 시 OtherFeesModal 오픈(디자인 OtherCell)
const OtherFeesCell = ({ otherFees, onOpen }: OtherFeesCellProps) => {
  const sum = otherFees.reduce((total, fee) => total + (Number(fee.amount) || 0), 0);
  const has = otherFees.length > 0;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'flex h-[5rem] w-full items-center justify-between gap-[0.6rem] rounded-md bg-surface-2 px-[1.4rem] text-[1.4rem]',
        has ? 'font-semibold text-ink' : 'text-ink-3',
      )}
    >
      <span className="tnum truncate">{has ? `${formatCurrency(sum)} · ${otherFees.length}건` : '추가'}</span>
      {has ? <EditIcon size="1.6rem" /> : <PlusIcon size="1.6rem" />}
    </button>
  );
};

export default OtherFeesCell;
