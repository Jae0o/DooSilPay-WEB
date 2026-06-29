import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import { ACADEMY_KEY, type AcademyProfile } from '@entities/academy';

import AppSidebar from './AppSidebar';

const queryClient = new QueryClient();
queryClient.setQueryData(ACADEMY_KEY.me(), {
  ownerId: 'demo',
  name: '두실수학학원',
  ownerName: '김두실',
  updatedAt: '2026-01-01T00:00:00.000Z',
} satisfies AcademyProfile);

/**
 * ## AppSidebar
 *
 * 데스크탑 좌측 사이드바 — 로고 · `NavLink` nav · 계정 푸터(`useGetAcademyQuery`).
 * Router·QueryClient 데코레이터로 active 상태와 학원 정보를 노출한다.
 */
const meta = {
  title: 'widgets/app-shell/AppSidebar',
  component: AppSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/students']}>
          <div className="h-screen">
            <Story />
          </div>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 수강생 경로에서 첫 항목 active. */
export const Default: Story = {};
