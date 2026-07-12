import type { Meta, StoryObj } from '@storybook/react-vite';

import SettingsSaveBar from './SettingsSaveBar';

/**
 * ## SettingsSaveBar
 *
 * 설정 페이지의 **스티키 저장 바** — `dirty`일 때만 부모가 렌더한다(`dpFadeUp` 등장). "저장하지 않은
 * 변경사항이 있어요" + [되돌리기 / 저장]. 저장은 `isPending` 동안 스피너·disabled. 모바일 하단 nav 위로
 * `bottom-[9.4rem] md:bottom-[1.6rem]` 보정(V2-4).
 *
 * ### Props
 *
 * - **isPending**: 저장 진행 중 — 저장 버튼 스피너·disabled(필수).
 * - **onRevert**: 되돌리기 핸들러(필수).
 * - **onSave**: 저장 핸들러(필수).
 */
const meta = {
  title: 'pages/settings/SettingsSaveBar',
  component: SettingsSaveBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { isPending: false, onRevert: () => {}, onSave: () => {} },
  argTypes: {
    isPending: { control: 'boolean', description: '저장 진행 중 — 스피너·disabled.' },
    onRevert: { control: { disable: true }, description: '되돌리기 핸들러(필수).' },
    onSave: { control: { disable: true }, description: '저장 핸들러(필수).' },
  },
} satisfies Meta<typeof SettingsSaveBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 저장 가능 상태. */
export const Default: Story = {};

/** 저장 중 — `isPending`으로 저장 버튼이 스피너·비활성으로 전환된다. */
export const Pending: Story = {
  args: { isPending: true },
};
