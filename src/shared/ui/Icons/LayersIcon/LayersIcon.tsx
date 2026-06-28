import type { IconProps } from '../Icon.type';

const LayersIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M12 3 3.5 7.3 12 11.6l8.5-4.3L12 3Z" />
    <path d="m4 12 8 4 8-4" />
    <path d="m4 16.5 8 4 8-4" />
  </svg>
);

export default LayersIcon;
