import { Skeleton } from '@shared/ui';

// 목록 로드 전 실루엣 — 행 5개(원형 아바타 + 텍스트 bar 2단 + 우측 금액 bar), 00-02 §2 콜로케이트 패턴
const StudentListSkeleton = () => (
  <div aria-busy className="flex flex-col gap-[1.2rem]">
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="flex items-center gap-[1.2rem] px-[1.6rem] py-[1.2rem]">
        <Skeleton className="size-[4rem] rounded-pill" />

        <div className="flex flex-1 flex-col gap-[0.6rem]">
          <Skeleton className="h-[1.6rem] w-[12rem]" />

          <Skeleton className="h-[1.2rem] w-[8rem]" />
        </div>

        <Skeleton className="h-[1.4rem] w-[6rem]" />
      </div>
    ))}
  </div>
);

export default StudentListSkeleton;
