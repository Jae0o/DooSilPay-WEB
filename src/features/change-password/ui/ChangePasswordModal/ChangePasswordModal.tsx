import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useToast } from '@shared/hooks';
import { AlertIcon, Button, FormField, LockIcon, Modal, TextInput } from '@shared/ui';

import { useChangePasswordWithReauth } from '../../hooks';

import type { ChangePasswordModalForm, ChangePasswordModalProps } from './ChangePasswordModal.type';

const FORM_ID = 'change-password-form';

// Firebase 재인증/변경 에러 → 배너 문구 (OnboardingPage 매핑 관례)
const toErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      return '현재 비밀번호가 올바르지 않아요.';
    }
    if (error.code === 'auth/too-many-requests') return '잠시 후 다시 시도해 주세요.';
  }
  return '비밀번호 변경에 실패했어요. 다시 시도해 주세요.';
};

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
  const showToast = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordModalForm>({
    mode: 'onTouched',
    defaultValues: { currentPassword: '', password: '', passwordConfirm: '' },
  });
  const { mutate, isPending } = useChangePasswordWithReauth();

  const close = () => {
    reset();
    setErrorMessage(null);
    onClose();
  };

  const submit = handleSubmit((values) => {
    setErrorMessage(null);
    mutate(
      { currentPassword: values.currentPassword, newPassword: values.password },
      {
        onSuccess: () => {
          showToast({ message: '비밀번호를 변경했어요', variant: 'success' });
          close();
        },
        onError: (error) => setErrorMessage(toErrorMessage(error)),
      },
    );
  });

  return (
    <Modal
      open={open}
      onClose={close}
      title="비밀번호 변경"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            취소
          </Button>
          <Button type="submit" form={FORM_ID} isLoading={isPending}>
            변경하기
          </Button>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={submit} className="flex flex-col gap-[1.6rem]">
        {errorMessage && (
          <div className="flex items-center gap-[1rem] rounded-md bg-danger-weak p-[1.2rem] text-[1.4rem] font-semibold text-danger">
            <AlertIcon size="1.8rem" />
            {errorMessage}
          </div>
        )}

        <FormField label="현재 비밀번호" required error={errors.currentPassword?.message}>
          <TextInput
            type="password"
            placeholder="현재 비밀번호"
            autoComplete="current-password"
            invalid={!!errors.currentPassword}
            prefix={<LockIcon size="1.8rem" />}
            {...register('currentPassword', { required: '현재 비밀번호를 입력해 주세요.' })}
          />
        </FormField>

        <FormField label="새 비밀번호" required hint="8자 이상" error={errors.password?.message}>
          <TextInput
            type="password"
            placeholder="새 비밀번호"
            autoComplete="new-password"
            invalid={!!errors.password}
            prefix={<LockIcon size="1.8rem" />}
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              minLength: { value: 8, message: '비밀번호는 8자 이상이어야 해요.' },
              validate: (v) => v !== getValues('currentPassword') || '현재 비밀번호와 다른 비밀번호를 사용해 주세요.',
            })}
          />
        </FormField>

        <FormField label="새 비밀번호 확인" required error={errors.passwordConfirm?.message}>
          <TextInput
            type="password"
            placeholder="새 비밀번호 다시 입력"
            autoComplete="new-password"
            invalid={!!errors.passwordConfirm}
            prefix={<LockIcon size="1.8rem" />}
            {...register('passwordConfirm', {
              required: '비밀번호를 입력해 주세요.',
              validate: (v) => v === getValues('password') || '비밀번호가 일치하지 않아요.',
            })}
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
