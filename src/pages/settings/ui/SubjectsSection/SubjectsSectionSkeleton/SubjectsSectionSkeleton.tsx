import { Skeleton } from '@shared/ui';

const SubjectsSectionSkeleton = () => (
  <div>
    <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-[1fr_auto]">
      <Skeleton className="h-[5rem] w-full rounded-md" />
      <Skeleton className="h-[5rem] w-[9rem] rounded-md" />
    </div>
    <div className="mt-[1.6rem] flex flex-wrap gap-[0.8rem]">
      <Skeleton className="h-[2.9rem] w-[8rem] rounded-pill" />
      <Skeleton className="h-[2.9rem] w-[10rem] rounded-pill" />
      <Skeleton className="h-[2.9rem] w-[7rem] rounded-pill" />
    </div>
  </div>
);

export default SubjectsSectionSkeleton;
