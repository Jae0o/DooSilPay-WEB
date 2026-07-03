import type { Meta, StoryObj } from '@storybook/react-vite';

import Skeleton from '../Skeleton/Skeleton';

import AsyncBoundary from './AsyncBoundary';

const Suspender = () => {
  throw new Promise(() => {});
};

const Thrower = () => {
  throw new Error('일시적인 오류');
};

/**
 * ## AsyncBoundary 컴포넌트
 *
 * Suspense + ErrorBoundary 조합 경계. suspend하는 자식은 `skeleton`을, throw하는 자식은
 * 크기별 `ErrorFallback`을 렌더한다. 재시도 클릭 시 TanStack 쿼리 에러 캐시를 reset하고 재요청한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { AsyncBoundary } from '@shared/ui';
 *
 * <AsyncBoundary skeleton={<StudentListSkeleton />} errorSize="md">
 *   <StudentList />
 * </AsyncBoundary>;
 * ```
 *
 * ### Props
 *
 * - **skeleton**: Suspense fallback(ReactNode) — 화면별 스켈레톤 전달
 * - **errorSize**: 기본 ErrorFallback 크기 'sm' | 'md' | 'lg' (기본 'md')
 * - **errorFallback**: 기본 ErrorFallback 대신 렌더할 커스텀 fallback
 * - **onReset / resetKeys**: 재시도 시 추가 동작 / 키 변경 시 에러 자동 해제
 */
const meta = {
  title: 'shared/ui/AsyncBoundary',
  component: AsyncBoundary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    skeleton: { control: { disable: true }, description: 'Suspense fallback — 화면별 스켈레톤(ReactNode).' },
    errorSize: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: "기본 ErrorFallback 크기 (기본 'md').",
    },
    errorFallback: { control: { disable: true }, description: '기본 ErrorFallback 대신 렌더할 커스텀 fallback.' },
    onReset: { control: { disable: true }, description: '재시도 시 추가 동작.' },
    resetKeys: { control: { disable: true }, description: '키 변경 시 에러 자동 해제.' },
    children: { control: { disable: true } },
  },
} satisfies Meta<typeof AsyncBoundary>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 로딩 — suspend하는 자식 → skeleton(리스트 행 조합) 렌더. */
export const Loading: Story = {
  args: {
    skeleton: (
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
    children: <Suspender />,
  },
};

/** 에러 md — throw하는 자식 → 기본 ErrorFallback(재시도 포함). */
export const ErrorMedium: Story = {
  args: {
    skeleton: null,
    errorSize: 'md',
    children: <Thrower />,
  },
};

/** 에러 sm — 카드·소형 위젯 밀도. */
export const ErrorSmall: Story = {
  args: {
    skeleton: null,
    errorSize: 'sm',
    children: <Thrower />,
  },
};
