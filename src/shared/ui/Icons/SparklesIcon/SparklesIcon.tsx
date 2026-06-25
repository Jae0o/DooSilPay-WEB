import type { IconProps } from '../Icon.type';

const SparklesIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <path d="M12 4.5 13.6 9 18 10.5 13.6 12 12 16.5 10.4 12 6 10.5 10.4 9 12 4.5Z" />
    <path d="M18 16l.8 2 2 .8-2 .8L18 22l-.8-2-2-.8 2-.8.8-2Z" />
  </svg>
);

export default SparklesIcon;
