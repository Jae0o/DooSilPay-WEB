import { Button, Card, CheckIcon } from '@shared/ui';
import { formatCurrency } from '@shared/utils';

import type { BulkSaveBarProps } from './BulkSaveBar.type';

// 하단 고정 저장 바 — 저장될 건수·합계 + 취소/일괄 저장(디자인 sticky bar)
const BulkSaveBar = ({ validCount, grandTotal, isPending, onSubmit, onCancel }: BulkSaveBarProps) => (
  <div className="sticky bottom-[1.6rem] z-20 mt-[1.8rem]">
    <Card pad="1.6rem" className="flex flex-wrap items-center gap-[1.6rem] shadow-lg">
      <div className="flex flex-1 flex-wrap gap-[2.4rem]">
        <div>
          <span className="text-[1.3rem] text-ink-3">저장될 결제</span>
          <div className="tnum text-[1.7rem] font-bold">{validCount}건</div>
        </div>
        <div>
          <span className="text-[1.3rem] text-ink-3">합계 금액</span>
          <div className="tnum text-[1.7rem] font-extrabold text-point">{formatCurrency(grandTotal)}</div>
        </div>
      </div>

      <div className="flex gap-[1rem]">
        <Button variant="ghost" onClick={onCancel}>
          취소
        </Button>

        <Button icon={<CheckIcon size="1.8rem" />} isLoading={isPending} disabled={validCount === 0} onClick={onSubmit}>
          일괄 저장 ({validCount})
        </Button>
      </div>
    </Card>
  </div>
);

export default BulkSaveBar;
