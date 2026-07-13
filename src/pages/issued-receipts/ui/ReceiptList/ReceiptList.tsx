import { useNarrow } from '@shared/hooks';

import ReceiptCard from './ReceiptCard';
import type { ReceiptListProps } from './ReceiptList.type';
import ReceiptTable from './ReceiptTable';

// 컨테이너 720 미만이면 카드 스택, 이상이면 테이블 (6컬럼이 줄바꿈 없이 들어갈 폭 확보 — V2-4).
// 빈 상태는 상위(ReceiptBoard)가 처리.
const ReceiptList = ({ rows, onPreview, onDelete }: ReceiptListProps) => {
  const [ref, narrow] = useNarrow({ maxWidth: 720 });

  return (
    <div ref={ref}>
      {narrow ? (
        <div className="flex flex-col gap-[1rem]">
          {rows.map((receipt) => (
            <ReceiptCard key={receipt.id} receipt={receipt} onPreview={onPreview} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <ReceiptTable rows={rows} onPreview={onPreview} onDelete={onDelete} />
      )}
    </div>
  );
};

export default ReceiptList;
