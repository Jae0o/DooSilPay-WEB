import { Skeleton } from '@shared/ui';

// 목록 로드 전 실루엣 — 행 5개(receipt 타일 + 텍스트 2단 + 우측 금액 bar)
const ReceiptListSkeleton = () => (
  <div aria-busy className="flex flex-col gap-[1rem]">
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="flex items-center gap-[1.2rem] px-[1.6rem] py-[1.2rem]">
        <Skeleton className="size-[4.4rem] rounded-md" />

        <div className="flex flex-1 flex-col gap-[0.6rem]">
          <Skeleton className="h-[1.6rem] w-[12rem]" />

          <Skeleton className="h-[1.2rem] w-[9rem]" />
        </div>

        <Skeleton className="h-[1.4rem] w-[7rem]" />
      </div>
    ))}
  </div>
);

export default ReceiptListSkeleton;
