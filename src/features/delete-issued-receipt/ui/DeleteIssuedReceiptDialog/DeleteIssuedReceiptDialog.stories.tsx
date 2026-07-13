import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { IssuedReceipt } from '@entities/issued-receipt';

import DeleteIssuedReceiptDialog from './DeleteIssuedReceiptDialog';

const queryClient = new QueryClient();

// 삭제 대상 1건 — subtitle(No.YYYY-MM-NNN) 표기 확인용.
const SAMPLE_RECEIPT: IssuedReceipt = {
  id: 'receipt-1',
  issueYearMonth: '2026-06',
  seq: 3,
  paymentId: 'payment-1',
  studentSnapshot: { registrationNo: 7, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [{ label: '교재비', amount: 30000 }],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
};

/**
 * ## DeleteIssuedReceiptDialog
 *
 * 교부영수증 1건을 **삭제**하는 확인 모달(`features/delete-issued-receipt`). No.YYYY-MM-NNN을 subtitle로
 * 표기하고, `삭제`를 누르면 `useDeleteIssuedReceiptMutation`을 호출한다(성공 시 같은 달 일련번호 재정렬).
 *
 * > 조건부 마운트 컴포넌트(`open` prop 없음) — 부모가 `{receipt && <DeleteIssuedReceiptDialog … />}`로 렌더한다.
 * > 실제 삭제(뮤테이션)는 이 시연 범위 밖이며, 표기·구성만 확인한다.
 *
 * ### Props
 *
 * - **receipt**: 삭제할 영수증 1건(`IssuedReceipt`) — No. 표기(필수).
 * - **onClose**: 취소/오버레이/ESC/삭제 성공 시 언마운트(필수).
 */
const meta = {
  title: 'features/delete-issued-receipt/DeleteIssuedReceiptDialog',
  component: DeleteIssuedReceiptDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { receipt: SAMPLE_RECEIPT, onClose: () => {} },
  argTypes: {
    receipt: { control: { disable: true }, description: '삭제할 영수증 1건(IssuedReceipt).' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof DeleteIssuedReceiptDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — No.2026-06-003 표기, 삭제 시 같은 달 일련번호가 재정렬된다는 안내. */
export const Default: Story = {};
