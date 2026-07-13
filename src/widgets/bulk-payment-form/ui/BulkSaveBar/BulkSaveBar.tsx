import { Button, Card, CheckIcon } from '@shared/ui';
import { formatCurrency } from '@shared/utils';

import type { BulkSaveBarProps } from './BulkSaveBar.type';

// 하단 고정 저장 바 — 저장될 건수·합계 + 일괄 발급 옵션 + 취소/일괄 저장(디자인 sticky bar · RW-9)
const BulkSaveBar = ({
  validCount,
  grandTotal,
  alsoIssue,
  onAlsoIssueChange,
  isPending,
  onSubmit,
  onCancel,
}: BulkSaveBarProps) => (
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

      <label className="flex shrink-0 cursor-pointer items-center gap-[0.8rem] text-[1.4rem] text-ink-2">
        <input
          type="checkbox"
          checked={alsoIssue}
          onChange={(event) => onAlsoIssueChange(event.target.checked)}
          className="size-[1.7rem] accent-point"
        />
        저장과 동시에 교부영수증 일괄 발급
      </label>

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
