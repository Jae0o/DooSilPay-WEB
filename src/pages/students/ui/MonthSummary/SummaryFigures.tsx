import { useStudentsSummaryQuery } from '@entities/student';
import { formatCurrency } from '@shared/utils';

// suspense 소비 — summary 서버 집계를 그대로 렌더(FE 재계산 금지, V2-2). 라벨은 상위(MonthSummary)가 즉시 렌더
const SummaryFigures = ({ period }: { period: string }) => {
  const { data } = useStudentsSummaryQuery(period);
  const { activeCount, paidCount, collected, ratio } = data;

  return (
    <div className="mt-[0.6rem] flex flex-wrap gap-[2.8rem]">
      <div className="min-w-[22rem]">
        <div className="flex items-baseline gap-[0.8rem]">
          <span className="tnum text-[2.3rem] font-extrabold tracking-[-0.03em]">{paidCount}</span>
          <span className="tnum text-[1.2rem] font-bold text-ink-3">/ 활성 원생 {activeCount}명</span>
        </div>

        <p className="tnum mt-[0.4rem] text-[1.3rem] text-ink-3">수납액 {formatCurrency(collected)}</p>
      </div>

      <div className="max-w-[46rem] flex-1 basis-[30rem]">
        <div className="flex items-center justify-between">
          <span className="text-[1.4rem] font-semibold text-ink-2">수납률</span>
          <span className="text-[1.4rem] font-bold text-point">{ratio}%</span>
        </div>

        <div className="mt-[0.8rem] h-[1.2rem] overflow-hidden rounded-pill bg-surface-2">
          <div className="h-full rounded-pill bg-ok transition-[width]" style={{ width: `${ratio}%` }} />
        </div>

        <div className="mt-[1rem] flex gap-[1.6rem] text-[1.3rem] text-ink-3">
          <span className="flex items-center gap-[0.6rem]">
            <span className="size-[0.8rem] rounded-pill bg-ok" /> 납부완료
          </span>

          <span className="flex items-center gap-[0.6rem]">
            <span className="size-[0.8rem] rounded-pill bg-muted" /> 예정
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryFigures;
