import type { Meta, StoryObj } from '@storybook/react-vite';

import Skeleton from './Skeleton';

/**
 * ## Skeleton 컴포넌트
 *
 * 로딩 중 실루엣을 그리는 최소 프리미티브. variant 없이 `className` 하나로
 * 크기·모양(rem arbitrary + `rounded-*`)을 소비처가 지정한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Skeleton } from '@shared/ui';
 *
 * <Skeleton className="h-[1.6rem] w-[12rem]" />; // bar
 * <Skeleton className="size-[4rem] rounded-pill" />; // 원형
 * ```
 *
 * ### 화면별 스켈레톤 패턴
 *
 * - **실루엣 일치**: 로드 후 레이아웃과 같은 자리·크기(레이아웃 시프트 방지). Avatar 자리=원형, 텍스트=bar.
 * - **배치**: 사용처가 1곳이면 해당 페이지/위젯 `ui/`에 콜로케이트. 2곳+ 공유 시에만 `shared/ui` 승격.
 * - 스켈레톤 자체는 `aria-hidden` — 로딩 알림이 필요한 컨테이너에서 `aria-busy` 사용.
 */
const meta = {
  title: 'shared/ui/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: '크기·모양 지정 (w-/h-/size-/rounded- rem arbitrary).' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** bar — 텍스트 자리. */
export const Bar: Story = {
  args: { className: 'h-[1.6rem] w-[12rem]' },
};

/** 원형 — Avatar 자리. */
export const Circle: Story = {
  args: { className: 'size-[4rem] rounded-pill' },
};

/** 조합 — 리스트 행 골격 (원형 + bar 2단 + 우측 bar). */
export const ListRow: Story = {
  render: () => (
    <div aria-busy className="flex w-[36rem] flex-col gap-[1.2rem]">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center gap-[1.2rem] px-[1.6rem] py-[1.2rem]">
          <Skeleton className="size-[4rem] rounded-pill" />
          <div className="flex flex-1 flex-col gap-[0.6rem]">
            <Skeleton className="h-[1.6rem] w-[12rem]" />
            <Skeleton className="h-[1.2rem] w-[8rem]" />
          </div>
          <Skeleton className="h-[1.4rem] w-[6rem]" />
        </div>
      ))}
    </div>
  ),
};
