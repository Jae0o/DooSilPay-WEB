import { useForm } from 'react-hook-form';

import { Button, FormField, LockIcon, MailIcon, TextInput } from '@shared/ui';

import { useLogin } from '../../hooks';
import type { LoginCredentials } from '../../model';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '', remember: true },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (values: LoginCredentials) => login(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1.6rem]">
      <FormField label="이메일" error={errors.email?.message}>
        <TextInput
          type="email"
          placeholder="name@academy.kr"
          autoComplete="username"
          invalid={!!errors.email}
          prefix={<MailIcon size="1.8rem" />}
          {...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '이메일 형식이 올바르지 않아요.',
            },
          })}
        />
      </FormField>

      <FormField label="비밀번호" error={errors.password?.message}>
        <TextInput
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
          invalid={!!errors.password}
          prefix={<LockIcon size="1.8rem" />}
          {...register('password', { required: '비밀번호를 입력해 주세요.' })}
        />
      </FormField>

      <label className="mt-[0.2rem] flex cursor-pointer items-center gap-[0.8rem] text-[1.4rem] text-ink-2">
        <input type="checkbox" className="size-[1.6rem] accent-point" {...register('remember')} />
        로그인 상태 유지
      </label>

      <Button type="submit" size="lg" fullWidth isLoading={isPending} className="mt-[0.8rem]">
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
