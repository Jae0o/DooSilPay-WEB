import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Segmented from './Segmented';
import type { SegmentedOption, SegmentedProps } from './Segmented.type';

type Method = 'card' | 'transfer' | 'cash';

// MarkPaid 결제수단 옵션 3종(카드/계좌이체/현금).
const METHOD_OPTIONS: SegmentedOption<Method>[] = [
  { value: 'card', label: '카드' },
  { value: 'transfer', label: '계좌이체' },
  { value: 'cash', label: '현금' },
];

/** 제어 컴포넌트를 스토리에서 조작하기 위한 내부 상태 래퍼(args.value를 초기값으로). */
const ControlledSegmented = ({ value, onChange: _onChange, ...rest }: SegmentedProps<string>) => {
  const [selected, setSelected] = useState(value);

  return <Segmented {...rest} value={selected} onChange={setSelected} />;
};

/**
 * ## Segmented 컨트롤
 *
 * surface-2 트랙 위의 세그먼트 버튼 그룹. 선택된 버튼만 흰 배경 + 그림자로 강조한다.
 * 제어 컴포넌트(`value` + `onChange`)이며, MarkPaid 모달의 결제수단 선택 등에 쓴다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Segmented } from '@shared/ui';
 *
 * const [method, setMethod] = useState('transfer');
 *
 * <Segmented
 *   value={method}
 *   options={[
 *     { value: 'card', label: '카드' },
 *     { value: 'transfer', label: '계좌이체' },
 *     { value: 'cash', label: '현금' },
 *   ]}
 *   onChange={setMethod}
 *   full
 * />;
 * ```
 *
 * ### Props
 *
 * - **value**: 선택된 값(제어).
 * - **options**: `{ value, label }[]` 옵션 목록.
 * - **onChange**: 선택 변경 콜백.
 * - **size**: `md` | `sm` (기본 `md` — 높이 42px/36px).
 * - **full**: 트랙 100% 폭 + 버튼 `flex-1`.
 */
const meta = {
  title: 'shared/ui/Segmented',
  component: Segmented,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    value: 'transfer',
    options: METHOD_OPTIONS,
    onChange: () => {},
    size: 'md',
    full: false,
  },
  argTypes: {
    value: { control: false, description: '선택된 값(제어 컴포넌트).' },
    options: { control: false, description: '옵션 목록 { value, label }[].' },
    onChange: { control: false, description: '선택 변경 콜백.' },
    size: { control: { type: 'radio' }, options: ['sm', 'md'], description: '높이 md=42px/sm=36px.' },
    full: { control: 'boolean', description: 'true면 트랙 100% 폭 + 버튼 flex-1.' },
  },
  render: (args) => <ControlledSegmented {...args} />,
} satisfies Meta<typeof Segmented>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본(md) — 결제수단 3종. 버튼을 눌러 선택이 이동한다. */
export const Default: Story = {};

/** sm 크기 — 높이 36px. */
export const Small: Story = { args: { size: 'sm' } };

/** full — 트랙이 컨테이너 폭을 채우고 버튼이 균등 분할된다(MarkPaid 결제수단 사용 형태). */
export const Full: Story = {
  args: { full: true },
  decorators: [
    (Story) => (
      <div className="w-[32rem]">
        <Story />
      </div>
    ),
  ],
};

/** sm/md 크기 비교. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-[1.2rem]">
      <ControlledSegmented {...args} size="sm" />
      <ControlledSegmented {...args} size="md" />
    </div>
  ),
};
