import type { IconProps } from '../Icon.type';

const ArrowLeftIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export default ArrowLeftIcon;
