import type { IconProps } from '../Icon.type';

const AlertIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M12 4 2.5 20h19L12 4Z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </svg>
);

export default AlertIcon;
