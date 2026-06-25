import type { Meta, StoryObj } from '@storybook/react-vite';

import AppTitle from './AppTitle';

/**
 * ## AppTitle 컴포넌트
 *
 * 앱 워드마크(DooSilPay) 타이틀. props 없이 고정 렌더된다.
 *
 * ```tsx
 * import { AppTitle } from '@shared/ui';
 *
 * <AppTitle />;
 * ```
 */
const meta = {
  title: 'shared/ui/AppTitle',
  component: AppTitle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof AppTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 타이틀. */
export const Default: Story = {};
