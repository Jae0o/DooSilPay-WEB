import { formatReceiptNo } from '@entities/issued-receipt';
import type { IssuedReceipt } from '@entities/issued-receipt';
import { sumOtherFees } from '@entities/payment';
import { Avatar, Card, EyeIcon, IconButton, TrashIcon } from '@shared/ui';
import { formatCurrency, formatPeriod } from '@shared/utils';

interface ReceiptTableProps {
  rows: IssuedReceipt[];
  onPreview: (receipt: IssuedReceipt) => void;
  onDelete: (receipt: IssuedReceipt) => void;
}

// 데스크톱 테이블 — 6컬럼(§3.1). 행 클릭 없음, 액션은 미리보기/삭제 버튼.
// 셀 내용은 절대 줄바꿈하지 않고(whitespace-nowrap), 폭이 부족하면 카드로 전환(ReceiptList) 또는 가로 스크롤(overflow-x).
const ReceiptTable = ({ rows, onPreview, onDelete }: ReceiptTableProps) => (
  <Card pad="0" className="overflow-x-auto">
    <table className="w-full border-collapse whitespace-nowrap">
      <thead>
        <tr className="text-left text-[1.3rem] text-ink-3">
          <th className="py-[1.4rem] pr-[1.4rem] pl-[2.4rem] font-semibold">일련번호</th>
          <th className="px-[1.4rem] py-[1.4rem] font-semibold">수강생</th>
          <th className="px-[1.4rem] py-[1.4rem] font-semibold">연월(분기)</th>
          <th className="px-[1.4rem] py-[1.4rem] text-right font-semibold">금액</th>
          <th className="px-[1.4rem] py-[1.4rem] font-semibold">발급일</th>
          <th className="px-[1.4rem] py-[1.4rem] text-center font-semibold">액션</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((receipt) => (
          <tr key={receipt.id} className="border-t border-line">
            <td className="py-[1.4rem] pr-[1.4rem] pl-[2.4rem]">
              <span className="tnum font-bold text-point">{formatReceiptNo(receipt.issueYearMonth, receipt.seq)}</span>
            </td>

            <td className="px-[1.4rem] py-[1.4rem]">
              <div className="flex items-center gap-[1rem]">
                <Avatar name={receipt.studentSnapshot.name} size="3.4rem" />
                <span className="font-semibold">{receipt.studentSnapshot.name}</span>
              </div>
            </td>

            <td className="tnum px-[1.4rem] py-[1.4rem] text-ink-2">{formatPeriod(receipt.period)}</td>

            <td className="tnum px-[1.4rem] py-[1.4rem] text-right font-bold">
              {formatCurrency(receipt.tuitionFee + sumOtherFees(receipt.otherFees))}
            </td>

            <td className="tnum px-[1.4rem] py-[1.4rem] text-ink-2">{receipt.issuedDate.replaceAll('-', '.')}</td>

            <td className="px-[1.4rem] py-[1.4rem]">
              <div className="flex justify-center gap-[0.2rem]">
                <IconButton label="미리보기" icon={<EyeIcon size="1.8rem" />} onClick={() => onPreview(receipt)} />
                <IconButton label="삭제" icon={<TrashIcon size="1.8rem" />} onClick={() => onDelete(receipt)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

export default ReceiptTable;
