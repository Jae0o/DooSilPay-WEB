import type { IconProps } from '../Icon.type';

const EditIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M5 19h3l9.5-9.5a2.1 2.1 0 0 0-3-3L5 16v3Z" />
    <path d="M14 6.5l3 3" />
  </svg>
);

export default EditIcon;
