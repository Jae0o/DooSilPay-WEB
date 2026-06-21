import type { Meta, StoryObj } from '@storybook/react-vite';

import DooPayLogo from './DooPayLogo';

const meta = {
  title: 'shared/ui/DooPayLogo',
  component: DooPayLogo,
  args: { size: '2.8rem', variant: 'default', withText: true },
  argTypes: {
    size: { control: { type: 'text' } },
    variant: { control: 'radio', options: ['default', 'onBrand'] },
    withText: { control: 'boolean' },
  },
} satisfies Meta<typeof DooPayLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnBrand: Story = {
  args: { variant: 'onBrand' },
  decorators: [
    (Story) => (
      <div className="bg-point inline-flex rounded-lg p-[2.4rem]">
        <Story />
      </div>
    ),
  ],
};

export const MarkOnly: Story = {
  args: { withText: false },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-[2.4rem]">
      {['2rem', '2.8rem', '4rem'].map((size) => (
        <DooPayLogo key={size} size={size} />
      ))}
    </div>
  ),
};
