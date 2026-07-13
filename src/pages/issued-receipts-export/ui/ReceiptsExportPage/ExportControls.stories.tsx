import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IssuedReceipt } from '@entities/issued-receipt';

import ExportControls from './ExportControls';

const MONTHS = ['2026-06', '2026-05', '2026-04'];

// 대상 월(2026-06) 발급분 4건 — 2x2 페이지 묶음(chunk) 확인용.
const MONTH_ROWS: IssuedReceipt[] = [
  { id: 'r1', name: '홍길동', seq: 4 },
  { id: 'r2', name: '김민준', seq: 3 },
  { id: 'r3', name: '이서연', seq: 2 },
  { id: 'r4', name: '박도윤', seq: 1 },
].map(({ id, name, seq }) => ({
  id,
  issueYearMonth: '2026-06',
  seq,
  paymentId: `payment-${id}`,
  studentSnapshot: { registrationNo: seq, name, birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
}));

/**
 * ## ExportControls
 *
 * 월별 PDF 변환 페이지의 **좌측 컨트롤**(`pages/issued-receipts-export`) — 대상 월 선택 · 전체 선택/해제 ·
 * 발급분 체크리스트 · 선택 요약(장수·페이지 수)을 담는 순수 표시 컴포넌트. 상태는 전부 상위(`ExportBoard`)가
 * 소유하고 props로만 전달받는다.
 *
 * ### Props
 *
 * - **months** / **month** / **onMonthChange**: 대상 월 옵션·현재 값·변경 콜백(필수).
 * - **monthRows**: 대상 월 발급분 목록(`IssuedReceipt[]`, 필수).
 * - **selected** / **onToggle** / **onToggleAll** / **allOn**: 선택 상태(`Set<string>`)·토글 콜백·전체 여부(필수).
 * - **chosenCount** / **pageCount**: 선택 장수·산출 페이지 수(2×2, 필수).
 */
const meta = {
  title: 'pages/issued-receipts-export/ExportControls',
  component: ExportControls,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    months: MONTHS,
    month: '2026-06',
    onMonthChange: () => {},
    monthRows: MONTH_ROWS,
    onToggle: () => {},
    onToggleAll: () => {},
  },
  argTypes: {
    months: { control: { disable: true }, description: '대상 월 옵션 목록.' },
    month: { control: { disable: true }, description: '현재 선택된 월.' },
    onMonthChange: { control: { disable: true }, description: '대상 월 변경 콜백.' },
    monthRows: { control: { disable: true }, description: '대상 월 발급분 목록(IssuedReceipt[]).' },
    selected: { control: { disable: true }, description: '선택된 영수증 id 집합.' },
    onToggle: { control: { disable: true }, description: '개별 선택 토글 콜백.' },
    onToggleAll: { control: { disable: true }, description: '전체 선택/해제 콜백.' },
    allOn: { control: 'boolean', description: '전체 선택 여부.' },
    chosenCount: { control: { disable: true }, description: '선택 장수.' },
    pageCount: { control: { disable: true }, description: '산출 페이지 수(2×2 묶음).' },
  },
  decorators: [
    (Story) => (
      <div className="grid w-[36rem] max-w-full grid-cols-1 gap-[1.6rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExportControls>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 전체 선택 — 4건 모두 체크, 2쪽(2×2) 출력. */
export const AllSelected: Story = {
  args: {
    selected: new Set(MONTH_ROWS.map((r) => r.id)),
    allOn: true,
    chosenCount: MONTH_ROWS.length,
    pageCount: Math.ceil(MONTH_ROWS.length / 4),
  },
};

/** 부분 선택 — 2건만 체크, 전체 선택 아님. */
export const PartialSelection: Story = {
  args: {
    selected: new Set(MONTH_ROWS.slice(0, 2).map((r) => r.id)),
    allOn: false,
    chosenCount: 2,
    pageCount: Math.ceil(2 / 4),
  },
};
