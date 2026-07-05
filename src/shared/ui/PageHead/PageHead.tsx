import { useBreakpoint } from '@shared/hooks';
import { cn } from '@shared/utils';

import type { PageHeadProps } from './PageHead.type';

const PageHead = ({ title, subtitle, actions, back }: PageHeadProps) => {
  const isMobile = useBreakpoint();

  return (
    <div
      className={cn(
        'mb-[2.2rem] flex gap-[1.6rem]',
        isMobile ? 'flex-col items-stretch' : 'flex-row flex-wrap items-start',
      )}
    >
      {/* flex-auto(basis=콘텐츠): 액션과 한 줄에 안 들어가면 액션이 아랫줄로 wrap — 좌측 텍스트 겹침 방지 */}
      <div className="min-w-0 flex-auto">
        {back && <div className="mb-[0.8rem]">{back}</div>}

        <h1 className={cn('truncate font-extrabold tracking-[-0.03em]', isMobile ? 'text-[1.5rem]' : 'text-[1.8rem]')}>
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
