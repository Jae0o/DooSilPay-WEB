import type { Meta, StoryObj } from '@storybook/react-vite';

import { LockIcon, MailIcon, SettingsIcon } from '../Icons';

import IconButton from './IconButton';

/**
 * ## IconButton 컴포넌트
 *
 * 아이콘 전용 정사각 버튼. 라벨 텍스트 없이 아이콘만 노출하므로, 접근성을 위해
 * `label`(→ `aria-label`)이 필수다. hover 시 `surface-2` 배경이 들어온다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { IconButton } from '@shared/ui';
 * import { SettingsIcon } from '@shared/ui';
 *
 * <IconButton icon={<SettingsIcon size="2rem" />} label="설정" onClick={openSettings} />;
 * ```
 *
 * ### Props
 *
 * - **icon**: 표시할 아이콘 요소(ReactNode, 필수)
 * - **label**: 스크린리더용 접근성 라벨 → `aria-label`(필수)
 * - **size**: 버튼 정사각 크기 rem 문자열(기본 `4rem`)
 * - **disabled**: 비활성
 */
const meta = {
  title: 'shared/ui/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    icon: <SettingsIcon size="2rem" />,
    label: '설정',
  },
  argTypes: {
    icon: { control: { disable: true }, description: '표시할 아이콘 요소(ReactNode).' },
    label: { control: 'text', description: '접근성 라벨(aria-label).' },
    size: { control: 'text', description: '정사각 크기 rem 문자열(기본 4rem).' },
    disabled: { control: 'boolean', description: '비활성 상태.' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 컨트롤로 label·size 변경 가능. */
export const Default: Story = {};

/** 다양한 크기(rem 문자열). */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-[1.2rem]">
      {['3.2rem', '4rem', '4.8rem'].map((size) => (
        <IconButton key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

/** 비활성 상태 — hover 배경 없음. */
export const Disabled: Story = { args: { disabled: true } };

/** 여러 아이콘 적용 예시. */
export const Gallery: Story = {
  render: () => (
    <div className="flex items-center gap-[1.2rem]">
      <IconButton icon={<MailIcon size="2rem" />} label="메일" />
      <IconButton icon={<LockIcon size="2rem" />} label="잠금" />
      <IconButton icon={<SettingsIcon size="2rem" />} label="설정" />
    </div>
  ),
};
