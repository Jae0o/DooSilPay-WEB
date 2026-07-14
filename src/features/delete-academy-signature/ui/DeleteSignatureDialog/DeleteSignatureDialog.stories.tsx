import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import DeleteSignatureDialog from './DeleteSignatureDialog';

const queryClient = new QueryClient();

/**
 * ## DeleteSignatureDialog
 *
 * 서명 이미지를 **삭제**하는 확인 모달(`features/delete-academy-signature`). danger 아이콘칩 + 스냅샷 안내
 * ("발급된 영수증의 내용은 변하지 않아요")를 노출하고, `삭제`를 누르면 `useDeleteSignatureMutation`을 호출한다(SG9·SG15).
 *
 * > 실제 삭제(뮤테이션)는 이 시연 범위 밖이며 QueryClient 데코레이터로 훅만 마운트한다 — 구성·문구만 확인한다.
 *
 * ### Props
 *
 * - **open**: 모달 표시 여부(필수).
 * - **onClose**: 취소/오버레이/ESC/삭제 성공 시 닫기(필수).
 */
const meta = {
  title: 'features/delete-academy-signature/DeleteSignatureDialog',
  component: DeleteSignatureDialog,
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
} satisfies Meta<typeof DeleteSignatureDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 삭제 확인 모달(danger 칩 + 스냅샷 안내). */
export const Default: Story = {};
