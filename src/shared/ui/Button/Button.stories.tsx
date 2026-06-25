import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { MailIcon, SettingsIcon } from '../Icons';

import Button from './Button';
import type { ButtonSize, ButtonVariant } from './Button.type';

/**
 * ## Button 컴포넌트
 *
 * DooPay 공통 액션 버튼. 6가지 `variant` × 3가지 `size`를 조합한다.
 * `isLoading` 시 기어(SettingsIcon) 스피너가 라벨을 대체하고, `fullWidth`로 폼 제출 버튼에 쓴다.
 * hover 시 살짝 어두워지고(`brightness`), 클릭 시 눌리는(`active:scale`) 인터랙션이 있다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Button } from '@shared/ui';
 *
 * <Button variant="primary" size="lg" fullWidth isLoading={isPending}>
 *   로그인
 * </Button>;
 * ```
 *
 * ### Props
 *
 * - **variant**: `primary` | `secondary` | `neutral` | `ghost` | `danger` | `dark` (기본 `primary`)
 * - **size**: `sm` | `md` | `lg` (기본 `md`)
 * - **fullWidth**: 가로 100% 확장
 * - **isLoading**: 로딩 중 — 비활성 + 기어 스피너로 라벨 대체(`aria-busy`)
 * - **disabled**: 비활성
 * - **icon / iconRight**: 라벨 좌/우 아이콘 슬롯(ReactNode)
 */
const meta = {
  title: 'shared/ui/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: '버튼' },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'neutral', 'ghost', 'danger', 'dark'],
      description: '버튼 색상 스타일.',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기(높이·패딩·폰트).',
    },
    fullWidth: { control: 'boolean', description: '가로 100% 확장.' },
    isLoading: { control: 'boolean', description: '로딩 중 비활성 + 기어 스피너로 라벨 대체.' },
    disabled: { control: 'boolean', description: '비활성 상태.' },
    icon: { control: { disable: true }, description: '라벨 왼쪽 아이콘 슬롯.' },
    iconRight: { control: { disable: true }, description: '라벨 오른쪽 아이콘 슬롯.' },
    onClick: { control: { disable: true }, description: '클릭 핸들러.' },
    children: { control: 'text', description: '버튼 라벨.' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'neutral', 'ghost', 'danger', 'dark'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-[1.2rem]">{children}</div>
);

/** 컨트롤 패널에서 props를 바꿔보며 확인하는 기본 스토리. */
export const Default: Story = {};

/** 6가지 variant 한눈에 비교. */
export const Variants: Story = {
  render: (args) => (
    <Row>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </Row>
  ),
};

/** 3가지 size 비교(sm 38 / md 46 / lg 54px). */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </Row>
  ),
};

/** variant × size 전 조합 매트릭스. */
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[1.2rem]">
      {VARIANTS.map((variant) => (
        <Row key={variant}>
          {SIZES.map((size) => (
            <Button key={`${variant}-${size}`} {...args} variant={variant} size={size}>
              {variant}/{size}
            </Button>
          ))}
        </Row>
      ))}
    </div>
  ),
};

/** 로딩 상태 — 비활성 + 기어 스피너가 라벨을 대체. */
export const Loading: Story = { args: { isLoading: true } };

/** 비활성 상태 — hover/active 인터랙션 없음. */
export const Disabled: Story = { args: { disabled: true } };

/** 가로 100% — 폼 제출 버튼 용도. */
export const FullWidth: Story = {
  args: { size: 'lg', fullWidth: true, children: '로그인' },
  decorators: [
    (StoryComponent) => (
      <div className="w-[38rem]">
        <StoryComponent />
      </div>
    ),
  ],
};

/** 좌·우 아이콘 슬롯(icon / iconRight). */
export const WithIcon: Story = {
  args: {
    icon: <MailIcon size="1.8rem" />,
    iconRight: <SettingsIcon size="1.8rem" />,
    children: '아이콘',
  },
};
