import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { buildIssueMonthOptions, useIssuedReceiptsQuery } from '@entities/issued-receipt';
import type { IssuedReceipt } from '@entities/issued-receipt';
import { DeleteIssuedReceiptDialog } from '@features/delete-issued-receipt';
import { Card, EmptyState, ReceiptIcon, Select } from '@shared/ui';
import { ReceiptPreviewModal } from '@widgets/receipt-preview';

import { ReceiptList } from '../ReceiptList';

// 전체 발급분을 한 번 조회 후 월 필터·정렬은 클라이언트에서 처리(월 옵션·총계가 전체 집합을 필요로 함 — RW-7·RW-2).
const ReceiptBoard = () => {
  const navigate = useNavigate();
  const { data } = useIssuedReceiptsQuery();

  const [month, setMonth] = useState('');
  const [preview, setPreview] = useState<IssuedReceipt | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IssuedReceipt | null>(null);

  const monthOptions = useMemo(() => buildIssueMonthOptions(data.items), [data.items]);

  const rows = useMemo(
    () =>
      data.items
        .filter((receipt) => month === '' || receipt.issueYearMonth === month)
        .sort((a, b) => b.issueYearMonth.localeCompare(a.issueYearMonth) || b.seq - a.seq),
    [data.items, month],
  );

  return (
    <>
      <div className="mb-[1.8rem] flex flex-wrap items-center gap-[1.2rem]">
        <Select
          className="w-[20rem]"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          options={monthOptions}
        />
        <span className="tnum text-[1.4rem] text-ink-3">{rows.length}건</span>
      </div>

      {rows.length === 0 ? (
        <Card>
          <EmptyState
            icon={<ReceiptIcon size="2.8rem" />}
            title="발급된 교부영수증이 없어요"
            desc="결제 상세에서 ‘교부영수증 발급’을 누르면 여기에 등록돼요."
          />
        </Card>
      ) : (
        <ReceiptList rows={rows} onPreview={setPreview} onDelete={setDeleteTarget} />
      )}

      {preview && (
        <ReceiptPreviewModal
          receipt={preview}
          onClose={() => setPreview(null)}
          onExport={() => {
            setPreview(null);
            navigate('/issued-receipts/export');
          }}
          onEdit={() => navigate(`/payments/${preview.paymentId}/issue`)}
        />
      )}

      {deleteTarget && <DeleteIssuedReceiptDialog receipt={deleteTarget} onClose={() => setDeleteTarget(null)} />}
    </>
  );
};

export default ReceiptBoard;
