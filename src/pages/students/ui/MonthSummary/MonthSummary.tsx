import { AsyncBoundary, Card, Skeleton } from '@shared/ui';

import ActiveStudentTotal from './ActiveStudentTotal';

const MonthSummary = () => {
  const now = new Date();
  const label = `${now.getFullYear()}년 ${now.getMonth() + 1}월 수납 현황`;

  // Payment 연동 전 placeholder (R3) — 수납 수치는 결제 단계에서 채운다.
  const paidCount = '—';
  const collected = '—';
  const ratio = 0;

  return (
    <Card pad="2.6rem" className="mb-[2rem]">
      <div className="flex flex-wrap gap-[2.8rem]">
        <div className="min-w-[22rem]">
          <p className="text-[1.4rem] font-semibold text-ink-3">{label}</p>

          <p className="mt-[0.6rem] flex items-baseline gap-[0.8rem]">
            <span className="tnum text-[2.3rem] font-extrabold tracking-[-0.03em]">{paidCount}</span>

            <span className="tnum text-[1.2rem] font-bold text-ink-3">
              <AsyncBoundary errorSize="sm" skeleton={<Skeleton className="h-[1.2rem] w-[9rem]" />}>
                <ActiveStudentTotal />
              </AsyncBoundary>
            </span>
          </p>

          <p className="tnum mt-[0.4rem] text-[1.3rem] text-ink-3">수납액 {collected}</p>
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
    </Card>
  );
};

export default MonthSummary;
