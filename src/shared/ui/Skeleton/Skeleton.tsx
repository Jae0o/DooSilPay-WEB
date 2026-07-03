import type { SkeletonProps } from './Skeleton.type';

const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div
    aria-hidden
    className={`animate-shimmer rounded-md bg-[linear-gradient(90deg,var(--color-line)_25%,var(--color-surface-2)_50%,var(--color-line)_75%)] bg-[length:200%_100%] ${className}`}
  />
);

export default Skeleton;
