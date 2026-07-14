import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import SignatureSection from './SignatureSection';

/**
 * ## SignatureSection
 *
 * 설정 카드 2 — 서명 / 인 이미지. `signatureUrl` 유무로 등록/미등록 안내 문구와 프리뷰(실이미지 vs 이미지
 * 아이콘)를 분기한다. 버튼은 **[서명 관리]** — 클릭 시 `/settings/signatures` 관리 페이지로 이동한다.
 *
 * > 레이아웃은 `useBreakpoint()`(matchMedia, 768px)로 데스크탑(가로 썸네일) ↔ 모바일(세로 스택, full 프리뷰)을
 * > 내부 분기한다 — 뷰포트 폭에 따라 자동 전환되며, 스토리는 현재 뷰포트 기준으로 렌더된다.
 *
 * ### Props
 *
 * - **signatureUrl**: 등록된 서명 이미지 URL(선택) — 없으면 미등록 상태.
 * - **cacheKey**: 프리뷰 캐시버스팅 키(`academy.updatedAt`).
 */
const meta = {
  title: 'pages/settings/SignatureSection',
  component: SignatureSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: { cacheKey: '2026-01-01T00:00:00.000Z' },
  argTypes: {
    signatureUrl: { control: 'text', description: '등록된 서명 이미지 URL(선택) — 없으면 미등록.' },
    cacheKey: { control: 'text', description: '프리뷰 캐시버스팅 키(academy.updatedAt).' },
  },
} satisfies Meta<typeof SignatureSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 미등록(기본) — "등록된 서명 이미지가 없어요" + 이미지 아이콘 프리뷰. */
export const Unregistered: Story = {};

/** 등록 — `signatureUrl` 주입 시 "서명 이미지가 등록되어 있어요" + 실이미지 프리뷰. */
export const Registered: Story = {
  args: { signatureUrl: 'https://example.com/signature.png' },
};
