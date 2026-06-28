import type { IconProps } from '../Icon.type';

const ReceiptIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M6 3.5h12v17l-2.2-1.4-2.3 1.4-2.3-1.4-2.3 1.4L6 20.5v-17Z" />
    <path d="M9 8h6M9 11.5h6M9 15h3.5" />
  </svg>
);

export default ReceiptIcon;
