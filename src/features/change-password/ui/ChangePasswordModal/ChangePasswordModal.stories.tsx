import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ChangePasswordModal from './ChangePasswordModal';

const queryClient = new QueryClient();

/**
 * ## ChangePasswordModal
 *
 * 설정 계정 카드의 **비밀번호 변경 모달**(`features/change-password`, Modal sm). 현재/새/새 확인 3필드를
 * RHF로 검증하고, 제출 시 `changePasswordWithReauth`(현재 비번 재인증 → `updatePassword`)를 호출한다.
 *
 * > `useChangePasswordWithReauth`(`useMutation`)를 쓰므로 스토리는 `QueryClientProvider`를 제공한다.
 * > **에러 배너**(`auth/wrong-password` → "현재 비밀번호가 올바르지 않아요." 등)는 제출 실패 시 내부 상태로
 * > 표시되며, 정적 스토리 범위 밖이다 — 해당 동작은 `ChangePasswordModal.test.tsx`에서 검증한다.
 *
 * ### Props
 *
 * - **open**: 모달 표시 여부(필수).
 * - **onClose**: 취소/오버레이/ESC/성공 시 닫기(필수).
 */
const meta = {
  title: 'features/change-password/ChangePasswordModal',
  component: ChangePasswordModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { open: true, onClose: () => {} },
  argTypes: {
    open: { control: 'boolean', description: '모달 표시 여부(필수).' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof ChangePasswordModal>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 열린 상태, 빈 폼. 필수/8자 미만/불일치 검증은 입력 후 확인할 수 있다. */
export const Default: Story = {};
