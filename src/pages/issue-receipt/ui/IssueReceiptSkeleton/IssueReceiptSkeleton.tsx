import { Skeleton } from '@shared/ui';

// 로드 후 레이아웃(2컬럼 · 발급 정보 카드 + 우측 미리보기)과 실루엣 일치 (00-02 콜로케이트 패턴)
const IssueReceiptSkeleton = () => (
  <div aria-busy className="grid grid-cols-1 gap-[2rem] lg:grid-cols-[1fr_42rem]">
    <div className="flex flex-col gap-[1.6rem]">
      <Skeleton className="h-[28rem] rounded-lg" />

      <div className="flex gap-[1rem]">
        <Skeleton className="h-[4.6rem] w-[8rem] rounded-md" />
        <Skeleton className="h-[4.6rem] w-[16rem] rounded-md" />
      </div>
    </div>

    <Skeleton className="h-[40rem] rounded-lg" />
  </div>
);

export default IssueReceiptSkeleton;
