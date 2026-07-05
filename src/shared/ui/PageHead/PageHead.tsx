import { useBreakpoint } from '@shared/hooks';
import { cn } from '@shared/utils';

import type { PageHeadProps } from './PageHead.type';

const PageHead = ({ title, subtitle, actions, back }: PageHeadProps) => {
  const isMobile = useBreakpoint();

  return (
    <div className={cn('mb-[2.2rem] flex gap-[1.6rem]', isMobile ? 'flex-col items-stretch' : 'flex-row items-start')}>
      <div className="min-w-0 flex-1">
        {back && <div className="mb-[0.8rem]">{back}</div>}

        <h1 className={cn('font-extrabold tracking-[-0.03em]', isMobile ? 'text-[1.5rem]' : 'text-[1.8rem]')}>
          {title}
        </h1>

        {subtitle && <div className="mt-[0.6rem] text-[1.4rem] text-ink-3">{subtitle}</div>}
      </div>

      {actions && (
        <div className={cn('flex shrink-0 flex-wrap gap-[1rem]', isMobile && 'w-full [&>*]:flex-1')}>{actions}</div>
      )}
    </div>
  );
};

export default PageHead;
