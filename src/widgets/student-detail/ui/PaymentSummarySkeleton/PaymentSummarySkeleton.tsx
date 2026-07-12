import { Skeleton } from '@shared/ui';

// 요약 로드 전 실루엣 — 누적 납부액 + 건수/미납 수치 자리. Card flex-gap 직접 자식 유지 위해 fragment
const PaymentSummarySkeleton = () => (
  <>
    <div>
      <Skeleton className="h-[1.4rem] w-[7rem]" />
      <Skeleton className="mt-[0.6rem] h-[2.2rem] w-[13rem]" />
    </div>

    <div className="flex gap-[2.4rem]">
      <Skeleton className="h-[3.2rem] w-[6rem]" />
      <Skeleton className="h-[3.2rem] w-[6rem]" />
    </div>
  </>
);

export default PaymentSummarySkeleton;
