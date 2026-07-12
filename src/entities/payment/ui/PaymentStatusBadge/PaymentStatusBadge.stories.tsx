import type { Meta, StoryObj } from '@storybook/react-vite';

import type { PaymentStatus } from '../../model';

import PaymentStatusBadge from './PaymentStatusBadge';

const STATUSES: PaymentStatus[] = ['scheduled', 'paid', 'overdue'];
const SIZES = ['md', 'sm'] as const;

/**
 * ## PaymentStatusBadge
 *
 * 결제 상태(`scheduled`·`paid`·`overdue`)를 `Badge`(dot)로 표시하는 도메인 프리셋.
 * `STATUS_LABEL`(예정/납부완료/미납) × `STATUS_TONE`(muted/ok/danger)을 매핑한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { PaymentStatusBadge } from '@entities/payment';
 *
 * <PaymentStatusBadge status="paid" />;
 * ```
 *
 * ### Props
 *
 * - **status**: `scheduled` | `paid` | `overdue`.
 * - **size**: `md` | `sm` (기본 `md`).
 */
const meta = {
  title: 'entities/payment/PaymentStatusBadge',
  component: PaymentStatusBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { status: 'scheduled' },
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: STATUSES,
      description: '결제 상태.',
    },
    size: { control: { type: 'radio' }, options: SIZES, description: '배지 크기.' },
  },
} satisfies Meta<typeof PaymentStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 컨트롤 패널에서 status·size를 바꿔보는 기본 스토리. */
export const Default: Story = {};

/** 3상태 한눈에 비교(예정/납부완료/미납). */
export const Statuses: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-[1.2rem]">
      {STATUSES.map((status) => (
        <PaymentStatusBadge key={status} {...args} status={status} />
      ))}
    </div>
  ),
};

/** status × size 전 조합 매트릭스. */
export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[1.2rem]">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-[1.2rem]">
          {STATUSES.map((status) => (
            <PaymentStatusBadge key={`${status}-${size}`} {...args} status={status} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};
