import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IssuedReceipt } from '@entities/issued-receipt';

import ReceiptList from './ReceiptList';

// 학생별 스냅샷만 다른 기본 영수증 — id/seq/일련번호가 목록 표기 핵심.
const buildReceipt = (overrides: Partial<IssuedReceipt> & { id: string }): IssuedReceipt => ({
  issueYearMonth: '2026-06',
  seq: 1,
  paymentId: `payment-${overrides.id}`,
  studentSnapshot: { registrationNo: 1, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
  ...overrides,
});

const SAMPLE_ROWS: IssuedReceipt[] = [
  buildReceipt({
    id: 'r1',
    seq: 5,
    studentSnapshot: { registrationNo: 5, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  }),
  buildReceipt({
    id: 'r2',
    seq: 4,
    studentSnapshot: { registrationNo: 4, name: '김민준', birthDate: '2011-07-14', subjectName: '초등 영어' },
    tuitionFee: 200000,
    otherFees: [{ label: '교재비', amount: 20000 }],
  }),
  buildReceipt({
    id: 'r3',
    seq: 3,
    studentSnapshot: { registrationNo: 3, name: '이서연', birthDate: '2009-11-02', subjectName: '고등 국어' },
    tuitionFee: 320000,
  }),
  buildReceipt({
    id: 'r4',
    seq: 2,
    studentSnapshot: { registrationNo: 2, name: '박도윤', birthDate: '2012-01-20', subjectName: '초등 수학' },
    tuitionFee: 180000,
  }),
  buildReceipt({
    id: 'r5',
    seq: 1,
    studentSnapshot: { registrationNo: 1, name: '최지우', birthDate: '2010-09-09', subjectName: '중등 과학' },
    tuitionFee: 260000,
    otherFees: [{ label: '모의고사비', amount: 15000 }],
  }),
];

const MANY_ROWS: IssuedReceipt[] = Array.from({ length: 12 }, (_, i) =>
  buildReceipt({
    id: `many-${i}`,
    seq: 12 - i,
    studentSnapshot: {
      registrationNo: 12 - i,
      name: `수강생 ${12 - i}`,
      birthDate: '2010-03-02',
      subjectName: '중등 수학',
    },
    tuitionFee: 200000 + i * 10000,
  }),
);

/**
 * ## ReceiptList
 *
 * 교부영수증 목록 본문(`pages/issued-receipts`) — 컨테이너 폭에 따라 **테이블(≥660px)/카드(<660px)**
 * 를 `useNarrow`로 자동 전환한다(V2-4). 빈 상태는 상위(`ReceiptBoard`)가 처리하므로 이 컴포넌트는
 * 다루지 않는다.
 *
 * ### Props
 *
 * - **rows**: 표시할 영수증 목록(`IssuedReceipt[]`, 필수).
 * - **onPreview** / **onDelete**: 행(카드) 클릭·삭제 버튼 콜백(필수).
 */
const meta = {
  title: 'pages/issued-receipts/ReceiptList',
  component: ReceiptList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { onPreview: () => {}, onDelete: () => {} },
  argTypes: {
    rows: { control: { disable: true }, description: '표시할 영수증 목록(IssuedReceipt[]).' },
    onPreview: { control: { disable: true }, description: '행(카드) 클릭 → 미리보기 콜백.' },
    onDelete: { control: { disable: true }, description: '삭제 버튼 콜백.' },
  },
} satisfies Meta<typeof ReceiptList>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 컨테이너 ≥660px — 6컬럼 테이블. */
export const Table: Story = {
  args: { rows: SAMPLE_ROWS },
  decorators: [
    (Story) => (
      <div className="w-[80rem] max-w-full">
        <Story />
      </div>
    ),
  ],
};

/** 컨테이너 <660px — 카드 스택으로 자동 전환. */
export const Cards: Story = {
  args: { rows: SAMPLE_ROWS.slice(0, 3) },
  decorators: [
    (Story) => (
      <div className="w-[42rem] max-w-full">
        <Story />
      </div>
    ),
  ],
};

/** 다건(12행) — 테이블에서 목록이 길게 쌓였을 때. */
export const Many: Story = {
  args: { rows: MANY_ROWS },
  decorators: [
    (Story) => (
      <div className="w-[80rem] max-w-full">
        <Story />
      </div>
    ),
  ],
};
