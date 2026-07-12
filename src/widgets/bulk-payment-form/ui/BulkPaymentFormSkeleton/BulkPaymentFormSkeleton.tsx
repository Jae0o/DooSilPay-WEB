import { Card, Skeleton } from '@shared/ui';

// 벌크 폼 로드 전 실루엣 — 연월 카드 1 + 행 카드 3 (StudentListSkeleton 관례)
const BulkPaymentFormSkeleton = () => (
  <div aria-busy className="flex flex-col gap-[1.6rem]">
    <Card pad="2rem">
      <Skeleton className="h-[1.4rem] w-[8rem]" />
      <Skeleton className="mt-[0.8rem] h-[4.4rem] w-[22rem]" />
    </Card>

    {Array.from({ length: 3 }, (_, i) => (
      <Card key={i} pad="1.6rem">
        <Skeleton className="h-[1.4rem] w-[6rem]" />
        <Skeleton className="mt-[1.2rem] h-[4.4rem] w-full" />
      </Card>
    ))}
  </div>
);

export default BulkPaymentFormSkeleton;
