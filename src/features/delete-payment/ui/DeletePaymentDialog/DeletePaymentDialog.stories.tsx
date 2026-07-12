import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { Payment } from '@entities/payment';

import DeletePaymentDialog from './DeletePaymentDialog';

const queryClient = new QueryClient();

// 기타경비 2건 — subtitle·본문 총액(교습비+기타)이 합산되어 표기된다.
const SAMPLE_PAYMENT: Payment = {
  id: 'payment-1',
  studentId: 'student-1',
  period: '2026-06',
  subjectName: '중등 수학',
  tuitionFee: 250000,
  otherFees: [
    { label: '교재비', amount: 30000 },
    { label: '모의고사', amount: 15000 },
  ],
  dueDate: '2026-06-10',
  paidDate: null,
  status: 'scheduled',
  method: 'transfer',
  issuedReceiptId: null,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
};

/**
 * ## DeletePaymentDialog
 *
 * 결제 1건을 **삭제**하는 확인 모달(`features/delete-payment`). 연월·총액을 표기해 대상을 확인시키고,
 * `삭제`를 누르면 `DELETE /payments/:id`를 호출한다. 되돌릴 수 없는 작업임을 문구로 경고한다.
 *
 * > 조건부 마운트 컴포넌트(`open` prop 없음) — 부모가 `{open && <DeletePaymentDialog … />}`로 렌더한다.
 * > 실제 삭제(뮤테이션)는 이 시연 범위 밖이며, 표기·구성만 확인한다.
 *
 * ### Props
 *
 * - **payment**: 삭제할 결제 1건(`Payment`) — 연월·총액 표기(필수).
 * - **onClose**: 취소/오버레이/ESC/삭제 성공 시 언마운트(필수).
 */
const meta = {
  title: 'features/delete-payment/DeletePaymentDialog',
  component: DeletePaymentDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { payment: SAMPLE_PAYMENT, onClose: () => {} },
  argTypes: {
    payment: { control: { disable: true }, description: '삭제할 결제 1건(Payment).' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof DeletePaymentDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 연월(2026년 6월)·총액(교습비+기타경비 합산)이 subtitle과 본문에 표기된다. */
export const Default: Story = {};
