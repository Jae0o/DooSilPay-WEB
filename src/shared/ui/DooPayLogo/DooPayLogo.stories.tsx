import type { Meta, StoryObj } from '@storybook/react-vite';

import DooPayLogo from './DooPayLogo';

/**
 * ## DooPayLogo 컴포넌트
 *
 * DooPay 브랜드 마크 + 워드마크. `variant`로 일반/브랜드배경(onBrand)을 대응하고,
 * `withText`로 마크만 노출하며, `size`(rem 문자열)로 비례 확대한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { DooPayLogo } from '@shared/ui';
 *
 * <DooPayLogo size="3.4rem" variant="onBrand" />;
 * ```
 *
 * ### Props
 *
 * - **size**: 마크 크기 rem 문자열(기본 `2.8rem`) — 텍스트는 비례 계산
 * - **variant**: `default` | `onBrand`(브랜드색 배경 위 흰색)
 * - **withText**: 워드마크(DooPay) 표시 여부(기본 true)
 */
const meta = {
  title: 'shared/ui/DooPayLogo',
  component: DooPayLogo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { size: '2.8rem', variant: 'default', withText: true },
  argTypes: {
    size: { control: 'text', description: '마크 크기 rem 문자열(텍스트는 비례).' },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'onBrand'],
      description: 'default | onBrand(브랜드 배경용 흰색).',
    },
    withText: { control: 'boolean', description: '워드마크 표시 여부.' },
  },
} satisfies Meta<typeof DooPayLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 로고(마크 + 워드마크). */
export const Default: Story = {};

/** 브랜드 색 배경 위에서 쓰는 흰색 변형. */
export const OnBrand: Story = {
  args: { variant: 'onBrand' },
  decorators: [
    (StoryComponent) => (
      <div className="bg-point inline-flex rounded-lg p-[2.4rem]">
        <StoryComponent />
      </div>
    ),
  ],
};

/** 워드마크 없이 마크만. */
export const MarkOnly: Story = {
  args: { withText: false },
};

/** 크기 비례 확대 비교. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-[2.4rem]">
      {['2rem', '2.8rem', '4rem'].map((size) => (
        <DooPayLogo key={size} size={size} />
      ))}
    </div>
  ),
};
