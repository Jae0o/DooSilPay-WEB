import { Skeleton } from '@shared/ui';

// 수납 수치 로드 전 실루엣 — 좌 수치 + 우 수납률 바(라벨·카드 셸은 즉시 렌더)
const SummaryFiguresSkeleton = () => (
  <div aria-busy className="mt-[0.6rem] flex flex-wrap gap-[2.8rem]">
    <div className="min-w-[22rem]">
      <Skeleton className="h-[2.8rem] w-[16rem]" />
      <Skeleton className="mt-[0.6rem] h-[1.3rem] w-[10rem]" />
    </div>

    <div className="max-w-[46rem] flex-1 basis-[30rem]">
      <Skeleton className="h-[1.4rem] w-full" />
      <Skeleton className="mt-[0.8rem] h-[1.2rem] w-full rounded-pill" />
      <Skeleton className="mt-[1rem] h-[1.3rem] w-[14rem]" />
    </div>
  </div>
);

export default SummaryFiguresSkeleton;
