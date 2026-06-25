import type { Meta, StoryObj } from '@storybook/react-vite';

import { MailIcon } from '../Icons';

import TextInput from './TextInput';

/**
 * ## TextInput 컴포넌트
 *
 * DooPay 공통 텍스트 입력. wrapper `focus-within`으로 포커스 테두리를 그리고,
 * `prefix`/`suffix` 슬롯(아이콘·단위)을 둔다. React 19 `ref`-as-prop이라
 * react-hook-form `register()` 스프레드가 그대로 동작한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { FormField, TextInput } from '@shared/ui';
 *
 * <FormField label="이메일" required error={errors.email?.message}>
 *   <TextInput
 *     type="email"
 *     placeholder="name@academy.kr"
 *     invalid={!!errors.email}
 *     {...register('email', { required: '이메일을 입력해 주세요.' })}
 *   />
 * </FormField>;
 * ```
 *
 * ### Props
 *
 * - **invalid**: 에러 시각 — `--danger` 테두리(포커스에도 유지) + `aria-invalid`
 * - **prefix / suffix**: 좌/우 슬롯(아이콘·단위 텍스트)
 * - **disabled**: 비활성(`bg-muted-weak` + not-allowed)
 * - **ref**: input 참조(rhf `register` 호환)
 * - 그 외 네이티브 `<input>` 속성(type·placeholder·readOnly·autoComplete 등)
 */
const meta = {
  title: 'shared/ui/TextInput',
  component: TextInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { placeholder: 'name@academy.kr' },
  argTypes: {
    invalid: { control: 'boolean', description: '에러 상태(danger 테두리 + aria-invalid).' },
    disabled: { control: 'boolean', description: '비활성 상태.' },
    readOnly: { control: 'boolean', description: '읽기 전용.' },
    placeholder: { control: 'text', description: '플레이스홀더.' },
    prefix: { control: { disable: true }, description: '왼쪽 슬롯(아이콘 등).' },
    suffix: { control: { disable: true }, description: '오른쪽 슬롯(단위 등).' },
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-[32rem]">
        <StoryComponent />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 컨트롤로 상태를 바꿔보며 확인. */
export const Default: Story = {};

/** 에러 상태 — danger 테두리는 포커스 시에도 유지. */
export const Invalid: Story = { args: { invalid: true, defaultValue: '잘못된 값' } };

/** 비활성 — muted 배경 + not-allowed. */
export const Disabled: Story = { args: { disabled: true, defaultValue: 'name@academy.kr' } };

/** 읽기 전용 — 값 표시·수정 불가. */
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'name@academy.kr' } };

/** 왼쪽 아이콘 슬롯(prefix). */
export const WithPrefix: Story = {
  args: { prefix: <MailIcon size="1.8rem" />, placeholder: '이메일' },
};

/** 오른쪽 단위 슬롯(suffix). */
export const WithSuffix: Story = {
  args: { suffix: '원', type: 'number', inputMode: 'numeric', placeholder: '교습비' },
};

/** 상태 한눈 비교(기본·포커스 가능·에러·비활성·읽기전용). */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-[1.2rem]">
      <TextInput {...args} placeholder="기본" />
      <TextInput {...args} invalid defaultValue="에러" />
      <TextInput {...args} disabled defaultValue="비활성" />
      <TextInput {...args} readOnly defaultValue="읽기전용" />
    </div>
  ),
};
