import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import { ACADEMY_KEY, type AcademyProfile } from '@entities/academy';

import AppTopBar from './AppTopBar';

const queryClient = new QueryClient();
queryClient.setQueryData(ACADEMY_KEY.me(), {
  ownerId: 'demo',
  name: '두실수학학원',
  ownerName: '김두실',
  updatedAt: '2026-01-01T00:00:00.000Z',
} satisfies AcademyProfile);

/**
 * ## AppTopBar
 *
 * 모바일 상단바 — 로고 · 알림 버튼 · 아바타. `useGetAcademyQuery` 로 원장 아바타를 노출한다.
 */
const meta = {
  title: 'widgets/app-shell/AppTopBar',
  component: AppTopBar,
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
} satisfies Meta<typeof AppTopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 상단바. */
export const Default: Story = {};
