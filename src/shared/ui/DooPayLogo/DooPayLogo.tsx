import { cn } from '@shared/utils';

interface DooPayLogoProps {
  size?: string;
  variant?: 'default' | 'onBrand';
  withText?: boolean;
}

const DooPayLogo = ({ size = '2.8rem', variant = 'default', withText = true }: DooPayLogoProps) => {
  const onBrand = variant === 'onBrand';
  return (
    <span className="inline-flex items-center gap-[1rem]">
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-[1rem]',
          onBrand ? 'bg-white/15' : 'bg-point shadow-[0_0.4rem_1rem_oklch(0.6_0.196_257/0.35)]',
        )}
        style={{ width: size, height: size }}
      >
        <span
          className="font-extrabold leading-none tracking-[-0.04em] text-white"
          style={{ fontSize: `calc(${size} * 0.56)` }}
        >
          D
        </span>
      </span>

      {withText && (
        <span
          className={cn('font-extrabold tracking-[-0.03em]', onBrand ? 'text-white' : 'text-ink')}
          style={{ fontSize: `calc(${size} * 0.72)` }}
        >
          Doo<span className={onBrand ? 'text-white' : 'text-point'}>Pay</span>
        </span>
      )}
    </span>
  );
};

export default DooPayLogo;
