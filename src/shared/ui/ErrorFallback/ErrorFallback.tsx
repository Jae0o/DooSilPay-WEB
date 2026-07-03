import Button from '../Button/Button';
import { AlertIcon } from '../Icons';

import type { ErrorFallbackProps } from './ErrorFallback.type';

const ErrorFallback = ({ size = 'md', title, description, onRetry, action }: ErrorFallbackProps) => {
  if (size === 'sm')
    return (
      <div role="alert" className="flex items-center justify-center gap-[0.8rem] py-[1.2rem]">
        <AlertIcon size="1.6rem" className="text-danger" />
        <p className="text-[1.3rem] text-ink-3">{title ?? '불러오지 못했어요'}</p>
        {onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry}>
            다시 시도
          </Button>
        )}
        {action}
      </div>
    );

  const isLg = size === 'lg';

  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-[0.6rem] px-[2.4rem] text-center ${isLg ? 'py-[6.4rem]' : 'py-[3.2rem]'}`}
    >
      <span
        className={`mb-[0.4rem] grid place-items-center rounded-lg bg-danger-weak text-danger ${isLg ? 'size-[6.4rem]' : 'size-[4.8rem]'}`}
      >
        <AlertIcon size={isLg ? '2.8rem' : '2.2rem'} />
      </span>

      <p className={`font-bold ${isLg ? 'text-[1.7rem]' : 'text-[1.5rem]'}`}>{title ?? '일시적인 오류가 발생했어요'}</p>

      {(description ?? isLg) && (
        <p className="max-w-[32rem] text-[1.4rem] leading-[1.55] text-ink-3">
          {description ?? '잠시 후 다시 시도해 주세요.'}
        </p>
      )}

      {(onRetry || action) && (
        <div className="mt-[1.4rem] flex items-center gap-[0.8rem]">
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              다시 시도
            </Button>
          )}

          {action}
        </div>
      )}
    </div>
  );
};

export default ErrorFallback;
