import type { IssuedReceipt } from '@entities/issued-receipt';
import { useNarrow } from '@shared/hooks';
import { Card, EmptyState, PrinterIcon } from '@shared/ui';
import { formatPeriod } from '@shared/utils';
import { ReceiptTemplate } from '@widgets/receipt-template';

import A4Page from './A4Page';

interface ExportPreviewProps {
  chosen: IssuedReceipt[];
  pages: IssuedReceipt[][];
}

// 컨테이너 560 기준 — 폰: 세로 스택(개별 zoom) / 태블릿+: A4(794px) 2x2 zoom-to-fit (§3.4, RW-12)
const ExportPreview = ({ chosen, pages }: ExportPreviewProps) => {
  const [previewRef, , previewWidth] = useNarrow({ maxWidth: 560 });

  return (
    <div ref={previewRef} className="min-w-0">
      {chosen.length === 0 ? (
        <Card>
          <EmptyState
            icon={<PrinterIcon size="2.8rem" />}
            title="선택된 영수증이 없어요"
            desc="왼쪽에서 출력할 발급분을 선택하세요."
          />
        </Card>
      ) : previewWidth > 0 && previewWidth < 560 ? (
        <div className="flex flex-col gap-[2.2rem]">
          {pages.map((pg, pi) => (
            <div key={pi}>
              <div className="tnum mb-[1rem] text-[1.3rem] font-bold text-ink-3">
                {formatPeriod(pg[0].issueYearMonth)} · {pi + 1} / {pages.length}쪽
              </div>

              <div className="flex flex-col items-center gap-[1.4rem]">
                {pg.map((receipt) => (
                  <div key={receipt.id} style={{ zoom: Math.min(1, previewWidth / 412) }}>
                    <ReceiptTemplate data={receipt} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{ width: 794, margin: '0 auto', zoom: previewWidth > 0 ? Math.min(1, previewWidth / 794) : 1 }}
          className="flex flex-col items-center gap-[2.4rem]"
        >
          {pages.map((pg, pi) => (
            <A4Page key={pi} blocks={pg} pageNo={pi + 1} total={pages.length} preview />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportPreview;
