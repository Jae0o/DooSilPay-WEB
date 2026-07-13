import { useNavigate } from 'react-router';

import { useBreakpoint } from '@shared/hooks';
import { ArrowLeftIcon, Button, DownloadIcon } from '@shared/ui';
import { cn } from '@shared/utils';

interface ExportHeaderProps {
  chosenCount: number;
  onPrint: () => void;
}

// 목록의 PageHead와 달리 전용 커스텀 헤더(§3.4) — back·반응형 타이틀·인쇄 액션·설명
const ExportHeader = ({ chosenCount, onPrint }: ExportHeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useBreakpoint();

  return (
    <div className="dp-noprint mb-[2.2rem]">
      <button
        type="button"
        onClick={() => navigate('/issued-receipts')}
        className="mb-[0.8rem] inline-flex items-center gap-[0.4rem] text-[1.4rem] font-semibold text-ink-3"
      >
        <ArrowLeftIcon size="1.6rem" /> 교부영수증
      </button>

      <div className="flex items-center gap-[1.2rem]">
        <h1
          className={cn(
            'min-w-0 flex-1 font-extrabold tracking-[-0.03em]',
            isMobile ? 'text-[1.45rem]' : 'text-[1.8rem]',
          )}
        >
          월별 PDF 변환
        </h1>

        <Button
          icon={<DownloadIcon size="1.8rem" />}
          onClick={onPrint}
          disabled={chosenCount === 0}
          size={isMobile ? 'sm' : 'md'}
          className="dp-noprint shrink-0"
        >
          PDF 저장 · 인쇄
        </Button>
      </div>

      <p className="mt-[0.6rem] text-ink-3">
        고정 양식이 페이지 경계에서 잘리지 않도록 한 페이지에 2×2(4개)로 배치돼요.
      </p>
    </div>
  );
};

export default ExportHeader;
