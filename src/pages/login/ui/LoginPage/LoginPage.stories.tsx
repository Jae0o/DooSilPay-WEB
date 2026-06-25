import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import LoginPage from './LoginPage';

const queryClient = new QueryClient();

/**
 * ## LoginPage 화면
 *
 * 로그인 화면. 데스크탑은 좌측 브랜드 패널 + 우측 폼 2단, 모바일(`md` 768px 미만)은
 * 패널을 숨기고 폼 위에 로고를 노출한다. 진입 시 폼 영역 fade-up 모션
 * (`prefers-reduced-motion` 시 최소화).
 *
 * > 데스크탑/모바일 차이는 뷰포트 너비를 줄여 확인한다. 폼 submit 은 `useLogin` 에 연결돼
 * > 있어 Router·QueryClient 를 데코레이터로 제공한다.
 */
const meta = {
  title: 'pages/login/LoginPage',
  component: LoginPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 로그인 화면(데스크탑 2단). */
export const Default: Story = {};
