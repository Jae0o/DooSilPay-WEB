import { Skeleton } from '@shared/ui';

// 로드 후 레이아웃(프로필 카드)과 실루엣 일치 (00-02 콜로케이트 패턴)
const StudentDetailSkeleton = () => (
  <div aria-busy className="flex flex-col gap-[1.6rem]">
    <div className="flex items-center gap-[1.6rem]">
      <Skeleton className="size-[6.4rem] rounded-pill" />

      <div className="flex flex-col gap-[0.8rem]">
        <Skeleton className="h-[2rem] w-[16rem]" />

        <Skeleton className="h-[1.4rem] w-[10rem]" />
      </div>
    </div>

    <Skeleton className="h-[20rem] rounded-lg" />
  </div>
);

export default StudentDetailSkeleton;
