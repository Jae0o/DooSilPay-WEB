import type { Meta, StoryObj } from '@storybook/react-vite';

import { AlertIcon, CheckCircleIcon, ImageIcon, InfoIcon, LockIcon, LogoutIcon, MailIcon, SettingsIcon } from './';

const ICONS = [
  { name: 'MailIcon', Component: MailIcon },
  { name: 'LockIcon', Component: LockIcon },
  { name: 'SettingsIcon', Component: SettingsIcon },
  { name: 'InfoIcon', Component: InfoIcon },
  { name: 'CheckCircleIcon', Component: CheckCircleIcon },
  { name: 'AlertIcon', Component: AlertIcon },
  { name: 'ImageIcon', Component: ImageIcon },
  { name: 'LogoutIcon', Component: LogoutIcon },
];

/**
 * ## 공통 Icon 모음
 *
 * DooPay에서 사용하는 라인 아이콘 8종. 모두 동일한 `IconProps` 인터페이스를 공유하며,
 * `stroke="currentColor"`라 `text-*` 색상 토큰으로 색을 지정한다.
 *
 * ```tsx
 * import type { SVGProps } from 'react';
 *
 * interface IconProps extends SVGProps<SVGSVGElement> {
 *   size?: string; // rem 문자열, 기본 '2rem'
 * }
 * ```
 *
 * - 사용: `import { MailIcon } from '@shared/ui'` → `<MailIcon size="2.4rem" className="text-point" />`
 */
const meta = {
  title: 'shared/ui/Icons',
  component: MailIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { size: '2.4rem' },
  argTypes: { size: { control: 'text', description: '아이콘 크기 rem 문자열(기본 2rem).' } },
} satisfies Meta<typeof MailIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 단일 아이콘 — 컨트롤로 size 변경. */
export const Default: Story = {};

/** 8종 전체를 한눈에. */
export const AllIcons: Story = {
  render: () => (
    <div className="text-ink flex flex-wrap gap-[2.4rem]">
      {ICONS.map(({ name, Component }) => (
        <div key={name} className="flex flex-col items-center gap-[0.8rem]">
          <Component size="2.8rem" />
          <span className="text-ink-3 text-[1.2rem]">{name}</span>
        </div>
      ))}
    </div>
  ),
};
