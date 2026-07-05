import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { ArrowLeftIcon } from '../Icons';

import PageHead from './PageHead';

/**
 * ## PageHead 컴포넌트
 *
 * 페이지 상단 헤더 블록. 좌측 제목/부제(+뒤로가기)와 우측 액션 영역을 배치하고,
 * `useBreakpoint`(<768px)로 모바일에서는 세로 스택 + 액션 버튼 전체 너비로 전환된다.
 *
 * > 실제 뷰포트 너비를 기준으로 반응하며, 이 저장소에는 Storybook 뷰포트 애드온이 없어
 * > 모바일 레이아웃은 브라우저 창 너비를 직접 좁혀서 확인해야 한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { PageHead } from '@shared/ui';
 *
 * <PageHead title="수강생" subtitle="총 12명" actions={<Button>등록</Button>} />;
 * ```
 *
 * ### Props
 *
 * - **title**: 페이지 제목(필수, ReactNode)
 * - **subtitle**: 제목 아래 부가 정보
 * - **actions**: 우측 액션 버튼 영역
 * - **back**: 제목 위 뒤로가기 노드
 */
const meta = {
  title: 'shared/ui/PageHead',
  component: PageHead,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { title: '수강생' },
  argTypes: {
    title: { control: 'text', description: '페이지 제목(필수).' },
    subtitle: { control: 'text', description: '제목 아래 부가 정보.' },
    actions: { control: { disable: true }, description: '우측 액션 버튼 영역.' },
    back: { control: { disable: true }, description: '제목 위 뒤로가기 노드.' },
  },
} satisfies Meta<typeof PageHead>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 제목만 있는 기본 헤더. */
export const Default: Story = {};

/** 제목 아래 부제(부가 정보)가 붙는다. */
export const WithSubtitle: Story = { args: { subtitle: '총 12명' } };

/** 우측에 액션 버튼 2개가 배치된다. */
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button variant="neutral">정보 수정</Button>
        <Button variant="secondary">수강생 등록</Button>
      </>
    ),
  },
};

/** 제목 위에 뒤로가기 링크가 붙는다. */
export const WithBack: Story = {
  args: {
    back: (
      <button type="button" className="inline-flex items-center gap-[0.4rem] text-[1.4rem] font-semibold text-ink-3">
        <ArrowLeftIcon size="1.6rem" />
        목록으로
      </button>
    ),
  },
};

/** 뒤로가기·부제·액션을 모두 포함한 전체 구성. */
export const Full: Story = {
  args: {
    back: (
      <button type="button" className="inline-flex items-center gap-[0.4rem] text-[1.4rem] font-semibold text-ink-3">
        <ArrowLeftIcon size="1.6rem" />
        목록으로
      </button>
    ),
    subtitle: '총 12명',
    actions: (
      <>
        <Button variant="neutral">정보 수정</Button>
        <Button variant="secondary">수강생 등록</Button>
      </>
    ),
  },
};
