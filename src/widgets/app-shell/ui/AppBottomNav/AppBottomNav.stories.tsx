import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import AppBottomNav from './AppBottomNav';

const routerAt =
  (route: string): Decorator =>
  (Story) => (
    <MemoryRouter initialEntries={[route]}>
      <Story />
    </MemoryRouter>
  );

/**
 * ## AppBottomNav
 *
 * 모바일 하단 탭바(4탭·safe-area). `NavLink` 가 현재 경로에 맞춰 active 색을 입힌다.
 * 경로별 스토리로 active 상태를 비교한다.
 */
const meta = {
  title: 'widgets/app-shell/AppBottomNav',
  component: AppBottomNav,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof AppBottomNav>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 수강생 경로 — 첫 탭 active. */
export const Students: Story = { decorators: [routerAt('/students')] };

/** 결제 등록 경로 — 둘째 탭 active. */
export const Payments: Story = { decorators: [routerAt('/payments/bulk')] };

/** 설정 경로 — 마지막 탭 active. */
export const Settings: Story = { decorators: [routerAt('/settings/academy')] };
