import { useForm } from 'react-hook-form';

import { AlertIcon, ArrowRightIcon, Button, FormField, LockIcon, TextInput } from '@shared/ui';

import type { ChangePasswordForm } from '../../model';

import type { PasswordSetupFormProps } from './PasswordSetupForm.type';

const TEMP_PW = 'doosilwelcome';

const PasswordSetupForm = ({ onSubmit, isPending, errorMessage }: PasswordSetupFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: 'onTouched',
    defaultValues: { password: '', passwordConfirm: '' },
  });

  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v.password))} className="flex flex-col gap-[1.6rem]">
      {errorMessage && (
        <div className="flex items-center gap-[1rem] rounded-md bg-danger-weak p-[1.2rem] text-[1.4rem] font-semibold text-danger">
          <AlertIcon size="1.8rem" />
          {errorMessage}
        </div>
      )}

      <div className="bg-surface rounded-xl border border-line p-[2.8rem] shadow-sm">
        <div className="flex flex-col gap-[1.8rem]">
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
                validate: (v) => v !== TEMP_PW || '임시 비밀번호와 다른 비밀번호를 사용해 주세요.',
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
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        isLoading={isPending}
        iconRight={<ArrowRightIcon />}
        className="mt-[2rem]"
      >
        다음
      </Button>
    </form>
  );
};

export default PasswordSetupForm;
