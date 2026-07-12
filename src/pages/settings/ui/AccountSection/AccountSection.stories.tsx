import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AccountSection from './AccountSection';

const queryClient = new QueryClient();

/**
 * ## AccountSection
 *
 * 설정 카드 3 — 계정. `Avatar`(name = ownerName) + "{ownerName} 원장님" + 이메일(Firebase
 * `auth.currentUser.email`, 없으면 `—`) + [비밀번호 변경](모달) · [로그아웃](`signOut`). 좁은 폭에서는
 * 버튼 그룹이 `flex-wrap`으로 줄바꿈된다.
 *
 * > `ChangePasswordModal`이 `useMutation`을 쓰므로 스토리는 `QueryClientProvider`를 데코레이터로 제공한다.
 * > 스토리 환경엔 로그인 사용자가 없어 이메일은 `—`로 표시된다(실제는 로그인 계정 이메일).
 *
 * ### Props
 *
 * - **ownerName**: 대표자명 — 아바타·표시 이름(필수).
 */
const meta = {
  title: 'pages/settings/AccountSection',
  component: AccountSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { ownerName: '김두실' },
  argTypes: {
    ownerName: { control: 'text', description: '대표자명 — 아바타·표시 이름(필수).' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof AccountSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 이름 + 계정 이메일 + 비밀번호 변경/로그아웃 버튼. */
export const Default: Story = {};

/** 긴 이름 — 좁은 폭에서 버튼 그룹이 `flex-wrap`으로 아래 줄로 접히는지 확인. */
export const LongName: Story = {
  args: { ownerName: '두실국제학원 대표교습자 홍길동' },
  decorators: [
    (Story) => (
      <div className="w-[42rem] max-w-full">
        <Story />
      </div>
    ),
  ],
};
