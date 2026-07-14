import type { Meta, StoryObj } from '@storybook/react-vite';

import SignatureManageCard from './SignatureManageCard';

// 프리뷰 렌더 확인용 최소 서명 이미지(inline SVG data URI).
const SIGNATURE_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><text x="4" y="36" font-size="20" font-family="serif" fill="%231a222d">김원장</text></svg>',
  );

/**
 * ## SignatureManageCard
 *
 * 서명 관리 페이지 서명 카드 — 프리뷰(등록 시 실이미지 / 미등록 시 이미지 아이콘)와 업로드/삭제 **액션 슬롯**을
 * 받는다(`uploadAction`·`deleteAction`). 슬롯 미지정 시 자리 표시용 `disabled` 버튼을 렌더한다(정적 시연).
 *
 * > 레이아웃은 `useBreakpoint()`(matchMedia, 768px)로 데스크탑(가로 썸네일) ↔ 모바일(세로 스택, full 프리뷰)을
 * > 내부 분기한다 — 스토리는 현재 뷰포트 폭 기준으로 렌더된다(≤768px에서 모바일 스택).
 *
 * ### Props
 *
 * - **signatureUrl**: 등록된 서명 이미지 URL(선택) — 없으면 미등록.
 * - **cacheKey**: 프리뷰 캐시버스팅 키(`academy.updatedAt`).
 * - **uploadAction / deleteAction**: 액션 슬롯(선택) — 미지정 시 disabled placeholder.
 */
const meta = {
  title: 'pages/settings-signatures/SignatureManageCard',
  component: SignatureManageCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { cacheKey: '2026-01-01T00:00:00.000Z' },
  argTypes: {
    signatureUrl: { control: 'text', description: '등록된 서명 이미지 URL(선택) — 없으면 미등록.' },
    cacheKey: { control: 'text', description: '프리뷰 캐시버스팅 키(academy.updatedAt).' },
    uploadAction: { control: { disable: true }, description: '업로드 액션 슬롯(미지정 시 disabled placeholder).' },
    deleteAction: { control: { disable: true }, description: '삭제 액션 슬롯(등록 시에만 · 미지정 시 disabled).' },
  },
} satisfies Meta<typeof SignatureManageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 미등록(기본) — 이미지 아이콘 프리뷰 + disabled [업로드]. */
export const Unregistered: Story = {};

/** 등록 — 실이미지 프리뷰 + disabled [다시 업로드]·[삭제]. */
export const Registered: Story = {
  args: { signatureUrl: SIGNATURE_DATA_URI },
};

/** 모바일 뷰포트 — 세로 스택 + full 프리뷰(≤768px 폭에서 확인). */
export const Mobile: Story = {
  args: { signatureUrl: SIGNATURE_DATA_URI },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
