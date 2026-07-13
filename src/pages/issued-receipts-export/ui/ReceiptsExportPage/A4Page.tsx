import type { IssuedReceipt } from '@entities/issued-receipt';
import { formatPeriod } from '@shared/utils';
import { ReceiptTemplate } from '@widgets/receipt-template';

interface A4PageProps {
  blocks: IssuedReceipt[];
  pageNo: number;
  total: number;
  preview?: boolean;
}

// A4 2x2 페이지 — preview(화면 zoom-fit)와 print(dp-print-only) 양쪽에서 재사용 (RW-12: 내부는 zoom·서식 px 그대로)
const A4Page = ({ blocks, pageNo, total, preview = false }: A4PageProps) => (
  <div className={preview ? 'a4-preview' : 'a4-print'}>
    <div className="a4-grid">
      {blocks.map((receipt) => (
        <div key={receipt.id} className="a4-cell">
          <ReceiptTemplate data={receipt} />
        </div>
      ))}

      {preview &&
        Array.from({ length: 4 - blocks.length }, (_, i) => (
          <div key={`e${i}`} className="a4-cell a4-empty">
            <span>빈 칸</span>
          </div>
        ))}
    </div>

    {preview && (
      <div className="a4-foot tnum">
        {formatPeriod(blocks[0].issueYearMonth)} · {pageNo} / {total}
      </div>
    )}
  </div>
);

export default A4Page;
