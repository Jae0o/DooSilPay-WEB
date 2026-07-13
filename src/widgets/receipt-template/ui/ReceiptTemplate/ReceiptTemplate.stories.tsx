import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IssuedReceipt } from '@entities/issued-receipt';

import ReceiptTemplate from './ReceiptTemplate';

// 점선 서명란 대신 렌더할 최소 서명 이미지(inline SVG data URI).
const SIGNATURE_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><text x="4" y="36" font-size="20" font-family="serif" fill="%231a222d">김원장</text></svg>',
  );

const base: IssuedReceipt = {
  id: 'receipt-1',
  issueYearMonth: '2026-06',
  seq: 3,
  paymentId: 'payment-1',
  studentSnapshot: {
    registrationNo: 7,
    name: '홍길동',
    birthDate: '2010-03-02',
    subjectName: '중등 수학',
  },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [
    { label: '교재비', amount: 30000 },
    { label: '모의고사비', amount: 15000 },
    { label: '재료비', amount: 5000 },
  ],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
};

const withOverrides = (overrides: Partial<IssuedReceipt>): IssuedReceipt => ({ ...base, ...overrides });

/**
 * ## ReceiptTemplate
 *
 * 「교습비등 영수증 원부」 법정 서식을 1:1 재현한 **384px 고정 폭 위젯**
 * (`widgets/receipt-template`). 미리보기 모달·발급 폼 실시간 미리보기·월별 PDF(2×2)가 공유한다.
 *
 * - 순수 표시 위젯 — 훅·API 의존 없이 `IssuedReceipt` 타입만 소비한다.
 * - 기타경비는 **3열 고정**(항목명 행 + 금액 행) — 데이터가 3 미만이면 빈 칸으로 남는다.
 * - 서명(`academy.signatureUrl`) 없으면 "(서명 또는 인)" placeholder 텍스트.
 * - 축소는 `scale` prop(`transform: scale`) — reflow 없음. 내부 치수·색은 서식 고정 px·hex(RW-12 예외).
 */
const meta = {
  title: 'widgets/receipt-template/ReceiptTemplate',
  component: ReceiptTemplate,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    scale: { control: { type: 'range', min: 0.5, max: 1.5, step: 0.05 }, description: '축소/확대 배율.' },
    data: { control: { disable: true } },
  },
} satisfies Meta<typeof ReceiptTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기타경비 3개 + 서명 없음(기본). */
export const Default: Story = {
  args: { data: base },
};

/** 기타경비 없음 — 3열 모두 빈 칸. */
export const NoOtherFees: Story = {
  args: { data: withOverrides({ otherFees: [] }) },
};

/** 기타경비 1개 — 나머지 2열은 빈 칸. */
export const OneOtherFee: Story = {
  args: { data: withOverrides({ otherFees: [{ label: '교재비', amount: 30000 }] }) },
};

/** 서명 이미지 있음 — "(서명 또는 인)" placeholder 대신 서명 렌더. */
export const WithSignature: Story = {
  args: { data: withOverrides({ academy: { ...base.academy, signatureUrl: SIGNATURE_DATA_URI } }) },
};

/** 0원 발급 허용(E3) — 교습비 0, 기타경비 빈 칸. */
export const ZeroAmount: Story = {
  args: { data: withOverrides({ tuitionFee: 0, otherFees: [] }) },
};

/** PDF 셀 배치용 축소(scale 0.7). */
export const Scaled: Story = {
  args: { data: base, scale: 0.7 },
};
