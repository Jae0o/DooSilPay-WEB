import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import LoginForm from './LoginForm';

const queryClient = new QueryClient();

/**
 * ## LoginForm 컴포넌트
 *
 * `react-hook-form` 기반 로그인 폼. 이메일·비밀번호·"로그인 상태 유지"를 입력받고,
 * 빈 값/형식 오류 시 필드별 에러를 노출한다.
 *
 * > submit 은 `useLogin`(Firebase 로그인 → 학원 조회 → 진입 분기)에 연결돼 있다.
 * > 스토리는 Router·QueryClient 를 데코레이터로 제공하며, 실제 제출은 인증 실패로 에러 Toast 가 뜬다.
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
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <div className="w-[38rem]">
            <Story />
          </div>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 폼. 빈 값/형식 오류로 제출해 검증 에러를 확인할 수 있다. */
export const Default: Story = {};
