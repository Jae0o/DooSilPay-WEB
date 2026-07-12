import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { Payment } from '@entities/payment';

import MarkPaidDialog from './MarkPaidDialog';

const queryClient = new QueryClient();

// 예정 상태 결제(기타경비 1건) — method 없음 → 기본 계좌이체(P14).
const SAMPLE_PAYMENT: Payment = {
  id: 'payment-1',
  studentId: 'student-1',
  period: '2026-06',
  subjectName: '중등 수학',
  tuitionFee: 250000,
  otherFees: [{ label: '교재비', amount: 30000 }],
  dueDate: '2026-06-10',
  paidDate: null,
  status: 'scheduled',
  method: null,
  issuedReceiptId: null,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
};

/**
 * ## MarkPaidDialog
 *
 * 예정/미납 결제를 **납부 완료로 처리**하는 확인 모달(`features/mark-paid`). 납부일(기본 오늘)과
 * 결제수단(기본 계좌이체, 기존 `method` 있으면 그 값 복원)을 입력받아 `PATCH /payments/:id/pay`를 호출한다.
 *
 * > 조건부 마운트 컴포넌트(`open` prop 없음) — 부모가 `{open && <MarkPaidDialog … />}`로 렌더한다.
 * > 실제 제출(뮤테이션)은 이 시연 범위 밖이며, 폼 구성·기본값만 확인한다.
 *
 * ### Props
 *
 * - **payment**: 처리할 결제 1건(`Payment`) — subtitle(연월·총액)·기존 method 공급(필수).
 * - **onClose**: 취소/오버레이/ESC/처리 성공 시 언마운트(필수).
 */
const meta = {
  title: 'features/mark-paid/MarkPaidDialog',
  component: MarkPaidDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { payment: SAMPLE_PAYMENT, onClose: () => {} },
  argTypes: {
    payment: { control: { disable: true }, description: '처리할 결제 1건(Payment).' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof MarkPaidDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 납부일은 오늘, 결제수단은 계좌이체(payment.method가 null이라 기본값). */
export const Default: Story = {};

/** 기존 결제수단(카드) 복원 — payment.method가 있으면 그 값으로 초기화된다. */
export const WithExistingMethod: Story = {
  args: { payment: { ...SAMPLE_PAYMENT, method: 'card' } },
};
