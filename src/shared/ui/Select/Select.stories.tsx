import type { Meta, StoryObj } from '@storybook/react-vite';

import Select from './Select';

const OPTIONS = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
];

/**
 * ## Select 컴포넌트
 *
 * DooPay 공통 셀렉트. `options` 배열로 옵션을 렌더하고, `placeholder`가 있으면
 * 빈 값 옵션을 맨 앞에 추가한다. React 19 `ref`-as-prop이라 react-hook-form
 * `register()` 스프레드가 그대로 동작한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Select } from '@shared/ui';
 *
 * <Select
 *   options={[{ value: 'seoul', label: '서울' }]}
 *   placeholder="지역 선택"
 *   invalid={!!errors.region}
 *   {...register('region', { required: '지역을 선택해 주세요.' })}
 * />;
 * ```
 *
 * ### Props
 *
 * - **options**: `{ value, label }[]` — 선택 옵션 목록
 * - **placeholder**: 빈 값 옵션 라벨
 * - **invalid**: 에러 시각 — `--danger` 테두리 + `aria-invalid`
 * - **disabled**: 비활성(`bg-muted-weak` + not-allowed)
 * - **ref**: select 참조(rhf `register` 호환)
 * - 그 외 네이티브 `<select>` 속성
 */
const meta = {
  title: 'shared/ui/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { options: OPTIONS, placeholder: '지역 선택' },
  argTypes: {
    options: { control: { disable: true }, description: '선택 옵션 목록({ value, label }[]).' },
    placeholder: { control: 'text', description: '빈 값 옵션 라벨.' },
    invalid: { control: 'boolean', description: '에러 상태(danger 테두리 + aria-invalid).' },
    disabled: { control: 'boolean', description: '비활성 상태.' },
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-[32rem]">
        <StoryComponent />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — placeholder + 옵션 4개, 컨트롤로 상태를 바꿔보며 확인. */
export const Default: Story = {};

/** 에러 상태 — danger 테두리 + aria-invalid. */
export const Invalid: Story = { args: { invalid: true } };

/** 비활성 — muted 배경 + not-allowed. */
export const Disabled: Story = { args: { disabled: true } };

/** 상태 한눈 비교(기본·에러·비활성). */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[1.2rem]">
      <Select {...args} />
      <Select {...args} invalid />
      <Select {...args} disabled />
    </div>
  ),
};
