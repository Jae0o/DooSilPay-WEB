import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge from './Badge';
import type { BadgeSize, BadgeTone } from './Badge.type';
import StudentStatusBadge from './StudentStatusBadge';

/**
 * ## Badge 컴포넌트
 *
 * 상태·카테고리를 나타내는 작은 알약형 라벨. `tone` 5종 × `size` 2종을 조합하고,
 * `dot`으로 라벨 앞에 상태 점을 붙일 수 있다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Badge } from '@shared/ui';
 *
 * <Badge tone="ok" dot>
 *   결제완료
 * </Badge>;
 * ```
 *
 * ### Props
 *
 * - **tone**: `ok` | `warn` | `danger` | `muted` | `point` (기본 `muted`)
 * - **size**: `md` | `sm` (기본 `md`)
 * - **dot**: 라벨 앞 상태 점 표시
 * - **children**: 배지 라벨
 */
const meta = {
  title: 'shared/ui/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: '라벨' },
  argTypes: {
    tone: {
      control: { type: 'radio' },
      options: ['ok', 'warn', 'danger', 'muted', 'point'],
      description: '배지 색상 톤.',
    },
    size: {
      control: { type: 'radio' },
      options: ['md', 'sm'],
      description: '배지 크기.',
    },
    dot: { control: 'boolean', description: '라벨 앞 상태 점 표시.' },
    children: { control: 'text', description: '배지 라벨.' },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const TONES: BadgeTone[] = ['ok', 'warn', 'danger', 'muted', 'point'];
const SIZES: BadgeSize[] = ['md', 'sm'];

/** 컨트롤 패널에서 props를 바꿔보며 확인하는 기본 스토리. */
export const Default: Story = {};

/** 5가지 tone 한눈에 비교. */
export const Tones: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-[1.2rem]">
      {TONES.map((tone) => (
        <Badge key={tone} {...args} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

/** md/sm 크기 비교. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-[1.2rem]">
      {SIZES.map((size) => (
        <Badge key={size} {...args} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

/** 상태 점(dot)이 라벨 앞에 붙는다. */
export const WithDot: Story = { args: { dot: true, tone: 'ok', children: '진행중' } };

/** tone × size 전 조합 매트릭스. */
export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[1.2rem]">
      {TONES.map((tone) => (
        <div key={tone} className="flex flex-wrap items-center gap-[1.2rem]">
          {SIZES.map((size) => (
            <Badge key={`${tone}-${size}`} {...args} tone={tone} size={size}>
              {tone}/{size}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** StudentStatusBadge — 수강생 상태(active/inactive) → "수강중"(point) / "휴식중"(muted) 프리셋. */
export const StudentStatus: Story = {
  render: () => (
    <div className="flex items-center gap-[1.2rem]">
      <StudentStatusBadge status="active" />
      <StudentStatusBadge status="inactive" />
    </div>
  ),
};
