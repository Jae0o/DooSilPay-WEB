import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IssuedReceipt } from '@entities/issued-receipt';

import ReceiptPreviewModal from './ReceiptPreviewModal';

const SAMPLE_RECEIPT: IssuedReceipt = {
  id: 'receipt-1',
  issueYearMonth: '2026-06',
  seq: 3,
  paymentId: 'payment-1',
  studentSnapshot: { registrationNo: 7, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [
    { label: '교재비', amount: 30000 },
    { label: '모의고사비', amount: 15000 },
  ],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
};

/**
 * ## ReceiptPreviewModal
 *
 * `ReceiptTemplate`을 배경 위 중앙 배치하는 **미리보기 모달**(`widgets/receipt-preview`). 닫기/PDF 변환/
 * 수정 3액션을 footer에 둔다(§3.2).
 *
 * ### Props
 *
 * - **receipt**: 미리보기할 영수증(`IssuedReceipt`, 필수).
 * - **onClose** / **onExport** / **onEdit**: 닫기·PDF 변환·수정 콜백(필수).
 */
const meta = {
  title: 'widgets/receipt-preview/ReceiptPreviewModal',
  component: ReceiptPreviewModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { receipt: SAMPLE_RECEIPT, onClose: () => {}, onExport: () => {}, onEdit: () => {} },
  argTypes: {
    receipt: { control: { disable: true }, description: '미리보기할 영수증(IssuedReceipt).' },
    onClose: { control: { disable: true }, description: '닫기 콜백.' },
    onExport: { control: { disable: true }, description: 'PDF 변환 콜백.' },
    onEdit: { control: { disable: true }, description: '수정 콜백.' },
  },
} satisfies Meta<typeof ReceiptPreviewModal>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 항상 열림(`open` 고정), 배경 위 중앙 배치. */
export const Default: Story = {};
