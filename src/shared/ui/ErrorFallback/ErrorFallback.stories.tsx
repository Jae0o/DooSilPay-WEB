import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';

import ErrorFallback from './ErrorFallback';

/**
 * ## ErrorFallback 컴포넌트
 *
 * 조회 실패 시 영역 크기별로 보여주는 에러 UI. `AsyncBoundary`의 기본 에러 화면으로 쓰이며,
 * 단독으로도 사용할 수 있다. `size`에 따라 카피·밀도가 달라진다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { ErrorFallback } from '@shared/ui';
 *
 * <ErrorFallback size="lg" onRetry={refetch} />;
 * ```
 *
 * ### Props
 *
 * - **size**: 'sm' | 'md' | 'lg' (기본 'md')
 * - **title**: 제목 카피 — 기본은 size별 제공(sm "불러오지 못했어요" / md·lg "일시적인 오류가 발생했어요")
 * - **description**: 보조 설명 — lg만 기본 카피 노출
 * - **onRetry**: 있으면 "다시 시도" 버튼 렌더
 * - **action**: 재시도 대신/추가 커스텀 액션(ReactNode)
 */
const meta = {
  title: 'shared/ui/ErrorFallback',
  component: ErrorFallback,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: "영역 크기 (기본 'md')." },
    title: { control: 'text', description: '제목 카피(기본은 size별 제공).' },
    description: { control: 'text', description: '보조 설명(lg만 기본 카피).' },
    onRetry: { control: { disable: true }, description: '있으면 "다시 시도" 버튼 렌더.' },
    action: { control: { disable: true }, description: '커스텀 액션 요소(ReactNode).' },
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 md — onRetry 없음. */
export const Default: Story = {};

/** sm — 인라인 밀도(카드·소형 위젯), 재시도 포함. */
export const Small: Story = {
  args: { size: 'sm', onRetry: () => {} },
};

/** md — 섹션·리스트 영역, 재시도 포함. */
export const MediumWithRetry: Story = {
  args: { size: 'md', onRetry: () => {} },
};

/** lg — 페이지 본문 전체, 기본 설명 카피 + 재시도. */
export const Large: Story = {
  args: { size: 'lg', onRetry: () => {} },
};

/** 재시도 + 커스텀 액션 조합 (예: 목록으로). */
export const WithAction: Story = {
  args: {
    size: 'lg',
    onRetry: () => {},
    action: (
      <Button variant="ghost" size="sm">
        목록으로
      </Button>
    ),
  },
};
