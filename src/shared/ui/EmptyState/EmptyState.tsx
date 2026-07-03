import type { EmptyStateProps } from './EmptyState.type';

const EmptyState = ({ icon, title, desc, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-[0.6rem] px-[2.4rem] py-[6.4rem] text-center">
    {icon && (
      <span className="mb-[0.4rem] grid size-[6.4rem] place-items-center rounded-lg bg-point-weak text-point">
        {icon}
      </span>
    )}

    <p className="text-[1.7rem] font-bold">{title}</p>

    {desc && <p className="max-w-[32rem] text-[1.4rem] leading-[1.55] text-ink-3">{desc}</p>}

    {action && <div className="mt-[1.4rem]">{action}</div>}
  </div>
);

export default EmptyState;
