import { Skeleton } from '@shared/ui';

// 헤더 + 좌 컨트롤/우 미리보기 실루엣
const ExportBoardSkeleton = () => (
  <div aria-busy>
    <div className="mb-[2.2rem] flex flex-col gap-[0.8rem]">
      <Skeleton className="h-[1.4rem] w-[10rem]" />
      <Skeleton className="h-[2.8rem] w-[20rem]" />
    </div>

    <div className="grid grid-cols-1 gap-[2rem] lg:grid-cols-[30rem_1fr]">
      <Skeleton className="h-[32rem] rounded-xl" />
      <Skeleton className="h-[40rem] rounded-xl" />
    </div>
  </div>
);

export default ExportBoardSkeleton;
