import type { Meta, StoryObj } from '@storybook/react-vite';

import { BuildingIcon } from '@shared/ui';

import SettingsSectionTitle from './SettingsSectionTitle';

/**
 * ## SettingsSectionTitle
 *
 * 설정 페이지 카드 3개가 공유하는 **섹션 헤더**(아이콘 배지 + 제목 + 설명). 설정 전용 로컬 헬퍼로,
 * `icon`은 `<BuildingIcon size="1.9rem" />` 형태로 주입한다(`bg-point-weak text-point` 배지 안에 렌더).
 *
 * ### Props
 *
 * - **icon**: 배지 안 아이콘 노드(필수).
 * - **title**: 제목(700, 필수).
 * - **desc**: 설명(`text-ink-3`, 선택) — 없으면 렌더하지 않는다.
 */
const meta = {
  title: 'pages/settings/SettingsSectionTitle',
  component: SettingsSectionTitle,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    icon: <BuildingIcon size="1.9rem" />,
    title: '학원 정보',
    desc: '교부 영수증의 발급 주체로 표시돼요.',
  },
  argTypes: {
    icon: { control: { disable: true }, description: '배지 안 아이콘 노드(필수).' },
    title: { control: 'text', description: '제목(필수).' },
    desc: { control: 'text', description: '설명(선택) — 없으면 미렌더.' },
  },
} satisfies Meta<typeof SettingsSectionTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 제목 + 설명. */
export const Default: Story = {};

/** 설명 없음 — `desc` 미지정 시 제목만 노출된다. */
export const NoDesc: Story = {
  args: { desc: undefined },
};
