import type { Meta, StoryObj } from '@storybook/react-vite';

import { AlertIcon, CheckCircleIcon, InfoIcon, LockIcon, MailIcon, SettingsIcon } from './';

const ICONS = [
  { name: 'MailIcon', Component: MailIcon },
  { name: 'LockIcon', Component: LockIcon },
  { name: 'SettingsIcon', Component: SettingsIcon },
  { name: 'InfoIcon', Component: InfoIcon },
  { name: 'CheckCircleIcon', Component: CheckCircleIcon },
  { name: 'AlertIcon', Component: AlertIcon },
];

const meta = {
  title: 'shared/ui/Icons',
  component: MailIcon,
  args: { size: '2.4rem' },
  argTypes: { size: { control: { type: 'text' } } },
} satisfies Meta<typeof MailIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div className="text-ink flex flex-wrap gap-[2.4rem]">
      {ICONS.map(({ name, Component }) => (
        <div key={name} className="flex flex-col items-center gap-[0.8rem]">
          <Component size="2.8rem" />
          <span className="text-ink-3 text-[1.2rem]">{name}</span>
        </div>
      ))}
    </div>
  ),
};
