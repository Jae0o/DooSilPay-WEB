import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '../TextInput';

import FormField from './FormField';

/**
 * ## FormField 컴포넌트
 *
 * 입력 컨트롤을 감싸는 라벨·필수(*)·힌트·에러 래퍼. `<label>` 시맨틱으로
 * 라벨과 입력을 연결한다. `error`가 있으면 `hint`를 대체해 표시하며,
 * 보통 `TextInput invalid={...}`와 함께 react-hook-form 에러를 렌더한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { FormField, TextInput } from '@shared/ui';
 *
 * <FormField label="이메일" required error={errors.email?.message}>
 *   <TextInput invalid={!!errors.email} {...register('email')} />
 * </FormField>;
 * ```
 *
 * ### Props
 *
 * - **label**: 라벨 텍스트
 * - **required**: 라벨 옆 `*`(point 색)
 * - **hint**: 도움말(에러 없을 때만 표시)
 * - **error**: 에러 메시지(hint 대체, danger 색)
 * - **children**: 입력 컨트롤(TextInput 등)
 */
const meta = {
  title: 'shared/ui/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: '이메일', children: <TextInput placeholder="name@academy.kr" /> },
  argTypes: {
    label: { control: 'text', description: '라벨 텍스트.' },
    required: { control: 'boolean', description: '필수 표시(*).' },
    hint: { control: 'text', description: '도움말(에러 없을 때만).' },
    error: { control: 'text', description: '에러 메시지(hint 대체).' },
    children: { control: { disable: true }, description: '입력 컨트롤.' },
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-[32rem]">
        <StoryComponent />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 라벨 + TextInput. */
export const Default: Story = {};

/** 필수 입력 — 라벨 옆 `*`. */
export const Required: Story = { args: { required: true } };

/** 도움말(hint) 표시. */
export const WithHint: Story = { args: { hint: '학원 관리자 이메일을 입력하세요.' } };

/** 에러 표시 — hint 대신 error + invalid TextInput. */
export const WithError: Story = {
  args: {
    required: true,
    error: '이메일 형식이 올바르지 않아요.',
    children: <TextInput invalid defaultValue="wrong-email" />,
  },
};
