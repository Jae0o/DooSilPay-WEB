import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';

import type { BulkPaymentFormValues, BulkPaymentRowValues } from '../BulkPaymentForm/hooks';

import BulkPaymentRowFields from './BulkPaymentRowFields';

const STUDENT_OPTS = [
  { value: 'student-1', label: '김두실 · 중등 수학' },
  { value: 'student-2', label: '이하늘 · 고등 영어' },
];

// 유효하게 채워진 행 — 수강생·과목·교습비·예정일·수단·기타경비 1건.
const FILLED_ROW: BulkPaymentRowValues = {
  studentId: 'student-1',
  subjectName: '중등 수학',
  dueDate: '2026-07-10',
  tuitionFee: '250000',
  otherFees: [{ label: '교재비', amount: '30000' }],
  method: 'transfer',
};

// RHF 컨텍스트가 필요한 컴포넌트 — seed 행으로 useForm을 구성해 register/control을 주입하는 스토리 전용 래퍼.
const RowHarness = ({
  seed = FILLED_ROW,
  isMobile = false,
  tried = false,
}: {
  seed?: BulkPaymentRowValues;
  isMobile?: boolean;
  tried?: boolean;
}) => {
  const { register, control } = useForm<BulkPaymentFormValues>({
    defaultValues: { period: '2026-07', rows: [seed] },
  });

  return (
    <BulkPaymentRowFields
      index={0}
      register={register}
      control={control}
      studentOpts={STUDENT_OPTS}
      isMobile={isMobile}
      tried={tried}
      canRemove
      onPickStudent={() => {}}
      onDuplicate={() => {}}
      onRemove={() => {}}
      onOpenOtherFees={() => {}}
    />
  );
};

const boxed: Decorator = (Story) => (
  <div className="w-[76rem] max-w-full overflow-hidden rounded-md border border-line bg-surface">
    <Story />
  </div>
);

/**
 * ## BulkPaymentRowFields
 *
 * 벌크 결제 등록 폼의 **1행 편집 UI**(`widgets/bulk-payment-form` 내부 전용). 데이터·콜백은 전부 props이며
 * 상태는 상위 `useBulkPaymentForm`(RHF)에서 온다. `isMobile`에 따라 데스크탑 그리드/모바일 카드로 전환하고,
 * 제출 후(`tried`) 채웠으나 필수 미입력인 행을 강조, 서버가 돌려준 `skippedReason`을 사유 문구로 노출한다.
 *
 * > `useWatch(control)`로 행 값을 구독하므로 스토리는 `useForm` 래퍼(`RowHarness`)로 컨텍스트를 공급한다.
 *
 * ### 래퍼 args
 *
 * - **isMobile**: 데스크탑 그리드 ↔ 모바일 카드 전환.
 * - **tried**: 제출 시도 후 불완전 행 하이라이트 활성.
 * - **seed**: 행 초기값(`BulkPaymentRowValues`) — skipped 사유·불완전 상태 시연.
 */
const meta = {
  title: 'widgets/bulk-payment-form/BulkPaymentRowFields',
  component: RowHarness,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    isMobile: { control: 'boolean', description: '데스크탑 그리드 ↔ 모바일 카드 전환.' },
    tried: { control: 'boolean', description: '제출 후 불완전 행 하이라이트.' },
    seed: { control: { disable: true }, description: '행 초기값(BulkPaymentRowValues).' },
  },
} satisfies Meta<typeof RowHarness>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 데스크탑 그리드 — 한 행이 가로 그리드(수강생·예정일·과목·교습비·수단·기타경비)로 배치되고 우측에 합계·액션. */
export const Desktop: Story = { decorators: [boxed] };

/** 모바일 카드 — 좁은 폭에서 2열 카드로 접히고 상단 행 번호·하단 합계 라인이 노출된다. */
export const Mobile: Story = {
  args: { isMobile: true },
  decorators: [
    (Story) => (
      <div className="w-[36rem] max-w-full">
        <Story />
      </div>
    ),
  ],
};

/** skipped 사유 행 — 서버가 반환한 `DUPLICATE_PAYMENT` 등 사유를 경고 문구로 표시한다. */
export const Skipped: Story = {
  args: { seed: { ...FILLED_ROW, skippedReason: 'DUPLICATE_PAYMENT' } },
  decorators: [boxed],
};

/** 불완전(하이라이트) — 채웠으나 필수(교습과목) 미입력 + `tried` → 행 배경이 강조된다. */
export const Invalid: Story = {
  args: { seed: { ...FILLED_ROW, subjectName: '' }, tried: true },
  decorators: [boxed],
};
