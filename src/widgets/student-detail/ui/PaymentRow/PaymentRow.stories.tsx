import type { Meta, StoryObj } from '@storybook/react-vite';

import type { Payment } from '@entities/payment';

import PaymentRow from './PaymentRow';

// 예정 상태 기준 결제 1건(기타경비 없음·method 없음·dueDate 있음).
const BASE_PAYMENT: Payment = {
  id: 'payment-1',
  studentId: 'student-1',
  period: '2026-06',
  subjectName: '수학',
  tuitionFee: 250000,
  otherFees: [],
  dueDate: '2026-06-10',
  paidDate: null,
  status: 'scheduled',
  method: null,
  issuedReceiptId: null,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
};

// 납부완료 — paidDate·method 존재 → 'M.D 납부' + 결제수단 라벨, 확장 시 '납부 처리' 액션 없음.
const PAID_PAYMENT: Payment = {
  ...BASE_PAYMENT,
  id: 'payment-2',
  period: '2026-05',
  status: 'paid',
  paidDate: '2026-05-08',
  method: 'transfer',
};

// 미납 — dueDate만 존재(method null) → 'M.D 예정' + 결제수단 라벨 없음.
const OVERDUE_PAYMENT: Payment = {
  ...BASE_PAYMENT,
  id: 'payment-3',
  period: '2026-04',
  status: 'overdue',
  dueDate: '2026-04-10',
};

// 기타경비 2건 + 납부완료(card) → 총액 아래 '교습비 · 기타' 구성 라인 노출.
const WITH_OTHER_FEES: Payment = {
  ...BASE_PAYMENT,
  id: 'payment-4',
  period: '2026-03',
  status: 'paid',
  paidDate: '2026-03-09',
  method: 'card',
  otherFees: [
    { label: '교재비', amount: 30000 },
    { label: '모의고사', amount: 15000 },
  ],
};

/**
 * ## PaymentRow
 *
 * 상세 페이지 결제 이력의 **1행 순수 UI**(위젯 내부 전용). 데이터·액션은 전부 props다.
 * 기간·납부/예정일·총액(구성)·결제수단·상태 뱃지를 보여주고, 우측 토글(⌄)을 누르면
 * `납부 처리`·`수정`·`삭제` 액션이 펼쳐진다. `paid` 상태에서는 `납부 처리` 액션이 빠진다.
 *
 * > 리스트 렌더·콜백 배선은 03·04 단계에서. 교부영수증·첨부 UI는 노출하지 않는다(P8).
 *
 * ### Props
 *
 * - **payment**: 렌더할 결제 1건(`Payment`).
 * - **onMarkPaid** / **onEdit** / **onDelete**: 확장 액션 콜백.
 */
const meta = {
  title: 'widgets/student-detail/PaymentRow',
  component: PaymentRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    payment: BASE_PAYMENT,
    onMarkPaid: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  argTypes: {
    payment: { control: { disable: true }, description: '렌더할 결제 1건(Payment).' },
    onMarkPaid: { control: { disable: true }, description: '납부 처리 콜백.' },
    onEdit: { control: { disable: true }, description: '수정 콜백.' },
    onDelete: { control: { disable: true }, description: '삭제 콜백.' },
  },
  decorators: [
    (Story) => (
      <div className="w-[62rem] max-w-full overflow-hidden rounded-md border border-line bg-surface">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentRow>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 예정 상태 — dueDate 'M.D 예정', 결제수단·기타경비 없음. 토글(⌄)로 액션이 펼쳐진다. */
export const Default: Story = {};

/** 납부완료 — 'M.D 납부' + 결제수단 라벨. 확장 액션에 '납부 처리'가 없다. */
export const Paid: Story = { args: { payment: PAID_PAYMENT } };

/** 미납 — dueDate만 있어 'M.D 예정', method null이라 결제수단 라벨 미노출. */
export const Overdue: Story = { args: { payment: OVERDUE_PAYMENT } };

/** 기타경비 유 — 총액 아래 '교습비 · 기타' 구성 라인이 나온다. */
export const WithOtherFees: Story = { args: { payment: WITH_OTHER_FEES } };

/** 리스트로 쌓였을 때(상태·기타경비·결제수단 조합). 실제 이력 카드 내부 형태. */
export const AllStates: Story = {
  render: (args) => (
    <>
      <PaymentRow {...args} payment={BASE_PAYMENT} />
      <PaymentRow {...args} payment={PAID_PAYMENT} />
      <PaymentRow {...args} payment={OVERDUE_PAYMENT} />
      <PaymentRow {...args} payment={WITH_OTHER_FEES} />
    </>
  ),
};
