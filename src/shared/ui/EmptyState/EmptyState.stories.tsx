import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { MailIcon, UsersIcon } from '../Icons';

import EmptyState from './EmptyState';

/**
 * ## EmptyState 컴포넌트
 *
 * 목록·검색 결과가 없을 때 보여주는 빈 상태 화면. `title`만 필수이고,
 * `icon`·`desc`·`action`은 선택적으로 조합해 맥락에 맞게 채운다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { EmptyState, Button } from '@shared/ui';
 * import { UsersIcon } from '@shared/ui';
 *
 * <EmptyState
 *   icon={<UsersIcon size="3.2rem" />}
 *   title="등록된 수강생이 없어요"
 *   desc="첫 수강생을 등록해 보세요"
 *   action={<Button onClick={openCreate}>수강생 등록</Button>}
 * />;
 * ```
 *
 * ### Props
 *
 * - **icon**: 상단 아이콘 배지(ReactNode)
 * - **title**: 안내 문구(필수)
 * - **desc**: 보조 설명
 * - **action**: 하단 액션 요소(ReactNode)
 */
const meta = {
  title: 'shared/ui/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { title: '표시할 내용이 없어요' },
  argTypes: {
    icon: { control: { disable: true }, description: '상단 아이콘 배지(ReactNode).' },
    title: { control: 'text', description: '안내 문구(필수).' },
    desc: { control: 'text', description: '보조 설명.' },
    action: { control: { disable: true }, description: '하단 액션 요소(ReactNode).' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — title만. */
export const Default: Story = {};

/** 아이콘 배지 포함. */
export const WithIcon: Story = {
  args: { icon: <MailIcon size="3.2rem" />, title: '받은 메일이 없어요' },
};

/** icon + title + desc + action 전부 조합. */
export const Full: Story = {
  args: {
    icon: <UsersIcon size="3.2rem" />,
    title: '등록된 수강생이 없어요',
    desc: '첫 수강생을 등록하면 여기에 표시돼요',
    action: <Button>수강생 등록</Button>,
  },
};
