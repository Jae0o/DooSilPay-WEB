import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from './Card';

/**
 * ## Card 컴포넌트
 *
 * 콘텐츠를 감싸는 기본 컨테이너. 둥근 모서리 + 옅은 테두리 + `shadow-sm`을 기본으로 하고,
 * `hover`로 클릭 가능한 카드(hover 시 상승 + `shadow-md`)를 표현한다. `pad="0"`으로
 * 패딩 없이 테이블·리스트를 감싸는 컨테이너로도 쓴다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Card } from '@shared/ui';
 *
 * <Card hover onClick={openDetail}>
 *   <p>학생 이름</p>
 * </Card>;
 * ```
 *
 * ### Props
 *
 * - **pad**: 내부 여백 rem 문자열(기본 `'2.4rem'`)
 * - **hover**: 클릭 가능한 카드 — hover 시 상승 + `shadow-md`
 * - 그 외 `<div>` 네이티브 속성(onClick·className 등)
 */
const meta = {
  title: 'shared/ui/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    pad: { control: 'text', description: '내부 여백 rem 문자열(기본 2.4rem).' },
    hover: { control: 'boolean', description: '클릭 가능한 카드 — hover 시 상승 + shadow-md.' },
    children: { control: { disable: true }, description: '카드 내부 콘텐츠.' },
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-[32rem]">
        <StoryComponent />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 텍스트 콘텐츠를 감싼 카드. */
export const Default: Story = {
  args: {
    children: (
      <>
        <p className="text-[1.6rem] font-bold">DooPay 학원</p>
        <p className="mt-[0.6rem] text-[1.4rem] text-ink-3">서울시 강남구 대치동</p>
      </>
    ),
  },
};

/** hover — 클릭 가능한 카드, hover 시 상승 + shadow-md. */
export const Hover: Story = {
  args: {
    hover: true,
    children: (
      <>
        <p className="text-[1.6rem] font-bold">클릭 가능한 카드</p>
        <p className="mt-[0.6rem] text-[1.4rem] text-ink-3">마우스를 올려보세요</p>
      </>
    ),
  },
};

/** pad="0" — 테이블/리스트 컨테이너 용도, 각 행이 자체 패딩과 구분선을 가진다. */
export const PadZero: Story = {
  args: {
    pad: '0',
    children: (
      <ul>
        {['김민준', '이서연', '박도윤'].map((name) => (
          <li key={name} className="border-b border-line px-[2.4rem] py-[1.6rem] last:border-b-0">
            {name}
          </li>
        ))}
      </ul>
    ),
  },
};
