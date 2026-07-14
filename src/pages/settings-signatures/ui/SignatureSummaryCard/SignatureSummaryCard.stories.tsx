import type { Meta, StoryObj } from '@storybook/react-vite';

import SignatureSummaryCard from './SignatureSummaryCard';

/**
 * ## SignatureSummaryCard
 *
 * 서명 관리 페이지 요약 카드 — `signatureUrl` 유무로 등록/미등록 상태 문구와 `Badge`(등록됨=`ok` /
 * 미등록=`muted`)를 분기한다. 스냅샷 안내("발급된 영수증은 변하지 않아요")를 함께 노출한다(SG9).
 * 타임스탬프는 표시하지 않는다(SG10).
 *
 * ### Props
 *
 * - **signatureUrl**: 등록된 서명 이미지 URL(선택) — 없으면 미등록 상태.
 */
const meta = {
  title: 'pages/settings-signatures/SignatureSummaryCard',
  component: SignatureSummaryCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    signatureUrl: { control: 'text', description: '등록된 서명 이미지 URL(선택) — 없으면 미등록.' },
  },
} satisfies Meta<typeof SignatureSummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 미등록(기본) — "등록된 서명 이미지가 없어요" + muted "미등록" Badge. */
export const Unregistered: Story = {};

/** 등록 — "서명 이미지가 등록되어 있어요" + ok "등록됨" Badge. */
export const Registered: Story = {
  args: { signatureUrl: 'https://example.com/signature.png' },
};
