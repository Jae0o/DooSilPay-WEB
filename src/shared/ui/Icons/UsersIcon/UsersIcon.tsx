import type { IconProps } from '../Icon.type';

const UsersIcon = ({ size = '2rem', strokeWidth = 1.8, ...rest }: IconProps) => (
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
    <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
    <circle cx="10" cy="8" r="3.2" />
    <path d="M17 14a3.4 3.4 0 0 1 3 3.4V19" />
    <path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.6" />
  </svg>
);

export default UsersIcon;
