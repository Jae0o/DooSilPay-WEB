import type { Meta, StoryObj } from '@storybook/react-vite';

import LoginForm from './LoginForm';

/**
 * ## LoginForm 컴포넌트
 *
 * `react-hook-form` 기반 로그인 폼. 이메일·비밀번호·"로그인 상태 유지"를 입력받고,
 * 빈 값/형식 오류 시 필드별 에러를 노출한다.
 *
 * > submit 은 01-05 단계에서 **스텁**이며, 실제 로그인·분기·persistence 는 01-06 의
 * > `useLogin` 으로 연결된다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { LoginForm } from '@features/auth-login';
 *
 * <LoginForm />;
 * ```
 */
const meta = {
  title: 'features/auth-login/LoginForm',
  component: LoginForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[38rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 폼. 빈 값/형식 오류로 제출해 검증 에러를 확인할 수 있다. */
export const Default: Story = {};
