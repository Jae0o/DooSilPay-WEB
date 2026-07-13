import { formatReceiptNo } from '@entities/issued-receipt';
import type { IssuedReceipt } from '@entities/issued-receipt';
import { sumOtherFees } from '@entities/payment';
import { Card, IconButton, ReceiptIcon, TrashIcon } from '@shared/ui';
import { formatCurrency, formatPeriod } from '@shared/utils';

interface ReceiptCardProps {
  receipt: IssuedReceipt;
  onPreview: (receipt: IssuedReceipt) => void;
  onDelete: (receipt: IssuedReceipt) => void;
}

// 모바일(<660px) 카드 — 클릭 시 미리보기, trash는 전파 차단.
const ReceiptCard = ({ receipt, onPreview, onDelete }: ReceiptCardProps) => (
  <Card pad="1.6rem" hover onClick={() => onPreview(receipt)} className="flex items-center gap-[1.2rem]">
    <span className="grid size-[4.4rem] shrink-0 place-items-center rounded-md bg-point-weak text-point">
      <ReceiptIcon size="2rem" />
    </span>

    <div className="min-w-0 flex-1">
      <p className="truncate font-bold">{receipt.studentSnapshot.name}</p>
      <p className="tnum truncate text-[1.3rem] text-ink-3">
        No.{formatReceiptNo(receipt.issueYearMonth, receipt.seq)} · {formatPeriod(receipt.period)}
      </p>
    </div>

    <div className="flex shrink-0 flex-col items-end gap-[0.2rem]">
      <span className="tnum font-bold whitespace-nowrap">
        {formatCurrency(receipt.tuitionFee + sumOtherFees(receipt.otherFees))}
      </span>
      <span className="tnum text-[1.25rem] whitespace-nowrap text-ink-3">
        {receipt.issuedDate.replaceAll('-', '.')}
      </span>
    </div>

    <IconButton
      label="삭제"
      icon={<TrashIcon size="1.8rem" />}
      onClick={(e) => {
        e.stopPropagation();
        onDelete(receipt);
      }}
    />
  </Card>
);

export default ReceiptCard;
