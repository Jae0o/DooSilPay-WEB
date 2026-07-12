import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { UpsertAcademyInput } from '@entities/academy';

import AcademyInfoSection from './AcademyInfoSection';

// RHF 컨텍스트가 필요한 컴포넌트 — useForm으로 register/errors를 공급하는 스토리 전용 래퍼.
// withErrors=true면 마운트 시 trigger()로 필수 필드 검증을 돌려 에러 상태를 시연한다.
const InfoHarness = ({ withErrors = false }: { withErrors?: boolean }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<UpsertAcademyInput>({
    mode: 'onTouched',
    defaultValues: { name: '', ownerName: '', bizNo: '', tel: '', address: '' },
  });

  useEffect(() => {
    if (withErrors) void trigger();
  }, [withErrors, trigger]);

  return <AcademyInfoSection register={register} errors={errors} />;
};

/**
 * ## AcademyInfoSection
 *
 * 설정 카드 1 — 학원 정보 폼(`name`·`ownerName`·`bizNo`·`tel`·`address`). 상태는 상위
 * `useSettingsForm`(RHF)에서 오며 `register`·`errors`만 props로 받는다. 필수(`name`·`ownerName`)는
 * API zod와 동일 문구로 검증한다. 데스크탑 2열 그리드 → 768px↓ 1열(`md:grid-cols-2`).
 *
 * > RHF 컨텍스트가 필요하므로 스토리는 `useForm` 래퍼(`InfoHarness`)로 `register`/`errors`를 주입한다.
 *
 * ### 래퍼 args
 *
 * - **withErrors**: 마운트 시 필수 필드 검증을 실행해 에러 상태를 시연.
 */
const meta = {
  title: 'pages/settings/AcademyInfoSection',
  component: InfoHarness,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    withErrors: { control: 'boolean', description: '마운트 시 필수 필드 검증 → 에러 문구 노출.' },
  },
} satisfies Meta<typeof InfoHarness>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 — 빈 폼(에러 없음). */
export const Default: Story = {};

/** 에러 상태 — 필수(학원명·대표자명) 미입력으로 검증 실패 시 필드 에러가 노출된다. */
export const WithErrors: Story = {
  args: { withErrors: true },
};
