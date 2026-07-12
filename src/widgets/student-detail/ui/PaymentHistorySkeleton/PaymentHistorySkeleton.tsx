import { Skeleton } from '@shared/ui';

// 이력 로드 전 실루엣 — 행 3개(PaymentRow 패딩·정렬 일치), R18 콜로케이트 패턴
const PaymentHistorySkeleton = () => (
  <div aria-busy>
    {Array.from({ length: 3 }, (_, i) => (
      <div
        key={i}
        className="flex items-center gap-[1.4rem] border-t border-line px-[1.8rem] py-[1.6rem] lg:px-[2.4rem] lg:py-[1.8rem]"
      >
        <div className="flex min-w-[9.2rem] flex-col gap-[0.6rem]">
          <Skeleton className="h-[1.6rem] w-[7rem]" />
          <Skeleton className="h-[1.2rem] w-[5rem]" />
        </div>

        <div className="flex-1">
          <Skeleton className="h-[1.6rem] w-[9rem]" />
        </div>

        <Skeleton className="h-[2rem] w-[5rem]" />
      </div>
    ))}
  </div>
);

export default PaymentHistorySkeleton;
