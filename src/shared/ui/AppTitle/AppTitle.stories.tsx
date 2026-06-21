import type { Meta, StoryObj } from '@storybook/react-vite';

import AppTitle from './AppTitle';

const meta = {
  title: 'shared/ui/AppTitle',
  component: AppTitle,
} satisfies Meta<typeof AppTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
