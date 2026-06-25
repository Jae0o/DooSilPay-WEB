import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router';

import { ACADEMY_KEY, getAcademy } from '@entities/academy';
import { useToast } from '@shared/hooks';

import { signIn } from '../../api';
import type { LoginCredentials } from '../../model';

const useLogin = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await signIn(credentials);

      const academy = await queryClient.fetchQuery({
        queryKey: ACADEMY_KEY.me(),
        queryFn: getAcademy,
      });

      return academy ? '/students' : '/onboarding/academy';
    },

    onSuccess: (path) => navigate(path, { replace: true }),

    onError: (error) => {
      const message =
        error instanceof FirebaseError && error.code.startsWith('auth/')
          ? '이메일 또는 비밀번호를 확인해 주세요.'
          : '로그인 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.';

      showToast({ message, variant: 'error' });
    },
  });
};

export default useLogin;
