import { cn } from '@shared/utils';

import type { CardProps } from './Card.type';

const Card = ({ pad = '2.4rem', hover = false, className, style, children, ...rest }: CardProps) => (
  <div
    className={cn(
      'rounded-xl border border-line bg-surface shadow-sm',
      hover && 'cursor-pointer transition-[box-shadow,transform] hover:-translate-y-[0.2rem] hover:shadow-md',
      className,
    )}
    style={{ padding: pad, ...style }}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
