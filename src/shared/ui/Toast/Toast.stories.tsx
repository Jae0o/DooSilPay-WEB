import type { Meta, StoryObj } from '@storybook/react-vite';

import { useToastStore } from '@shared/store';

import { Button } from '../Button';

import Toast from './Toast';
import type { ToastVariant } from './Toast.type';
import { ToastContainer } from './ToastContainer';

/**
 * ## Toast 컴포넌트
 *
 * DooPay 알림. 화면 하단 중앙에 **다크 `--ink` 알약 + 색상 상태 아이콘**을 띄우고,
 * 등장 시 fade-up(`prefers-reduced-motion`이면 모션 생략)한다. 보통 직접 렌더하지 않고
 * `useToast()` 훅으로 push하면 `ToastContainer`가 store의 토스트 큐를 그린다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { useToast } from '@shared/hooks';
 *
 * const show = useToast();
 * show({ message: '납부 처리했어요', variant: 'success' }); // 2.6초 후 자동 소멸
 * ```
 *
 * ### variant → 아이콘·색
 *
 * - **info**: info · `--point`
 * - **success**: checkCircle · `--ok`
 * - **warning**: alert · `--warn`
 * - **error**: alert · `--danger`
 */
const meta = {
  title: 'shared/ui/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    item: { control: { disable: true }, description: '토스트 데이터(id·message·variant·duration).' },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 정보(info) — info 아이콘 + point 색. */
export const Info: Story = {
  args: { item: { id: 'info', message: '변경사항을 저장했어요', variant: 'info', duration: 0 } },
};

/** 성공(success) — checkCircle 아이콘 + ok 색. */
export const Success: Story = {
  args: { item: { id: 'success', message: '납부 처리했어요', variant: 'success', duration: 0 } },
};

/** 경고(warning) — alert 아이콘 + warn 색. */
export const Warning: Story = {
  args: { item: { id: 'warning', message: '일부 항목을 확인해 주세요', variant: 'warning', duration: 0 } },
};

/** 에러(error) — alert 아이콘 + danger 색. */
export const Error: Story = {
  args: { item: { id: 'error', message: '이메일 또는 비밀번호가 올바르지 않아요', variant: 'error', duration: 0 } },
};

/** 4종 variant 한눈 비교. */
export const States: Story = {
  args: { item: { id: 's1', message: '변경사항을 저장했어요', variant: 'info', duration: 0 } },
  render: () => (
    <div className="flex flex-col items-center gap-[0.8rem]">
      <Toast item={{ id: 's1', message: '변경사항을 저장했어요', variant: 'info', duration: 0 }} />
      <Toast item={{ id: 's2', message: '납부 처리했어요', variant: 'success', duration: 0 }} />
      <Toast item={{ id: 's3', message: '일부 항목을 확인해 주세요', variant: 'warning', duration: 0 }} />
      <Toast item={{ id: 's4', message: '이메일 또는 비밀번호가 올바르지 않아요', variant: 'error', duration: 0 }} />
    </div>
  ),
};

const PLAYGROUND_VARIANTS: { variant: ToastVariant; message: string }[] = [
  { variant: 'info', message: '변경사항을 저장했어요' },
  { variant: 'success', message: '납부 처리했어요' },
  { variant: 'warning', message: '일부 항목을 확인해 주세요' },
  { variant: 'error', message: '이메일 또는 비밀번호가 올바르지 않아요' },
];

/** 인터랙티브 데모 — 버튼으로 실제 토스트를 push하면 하단 중앙에 떠 2.6초 후 사라진다. */
export const Playground: Story = {
  args: { item: { id: 'pg', message: '납부 처리했어요', variant: 'success', duration: 0 } },
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex min-h-[60vh] flex-wrap items-center justify-center gap-[1.2rem] p-[2.4rem]">
      {PLAYGROUND_VARIANTS.map(({ variant, message }) => (
        <Button key={variant} variant="neutral" onClick={() => useToastStore.getState().show({ message, variant })}>
          {variant}
        </Button>
      ))}
      <ToastContainer />
    </div>
  ),
};
