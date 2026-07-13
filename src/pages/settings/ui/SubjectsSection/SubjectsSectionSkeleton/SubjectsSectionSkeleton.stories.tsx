import type { Meta, StoryObj } from '@storybook/react-vite';

import SubjectsSectionSkeleton from './SubjectsSectionSkeleton';

/**
 * ## SubjectsSectionSkeleton
 *
 * `SubjectsSection` 카드 내부 지역 `AsyncBoundary`의 로딩 fallback. 입력 행 + 칩 자리를 shimmer로 채운다.
 */
const meta = {
  title: 'pages/settings/SubjectsSectionSkeleton',
  component: SubjectsSectionSkeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-[72rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SubjectsSectionSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
