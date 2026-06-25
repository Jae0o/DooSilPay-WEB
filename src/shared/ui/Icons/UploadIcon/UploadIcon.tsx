import type { IconProps } from '../Icon.type';

const UploadIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M12 16V5m0 0L8 9m4-4 4 4" />
    <path d="M5 17v2.5h14V17" />
  </svg>
);

export default UploadIcon;
