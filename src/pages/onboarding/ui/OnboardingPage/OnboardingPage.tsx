import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import {
  type AcademyProfile,
  type UpsertAcademyInput,
  useGetAcademyQuery,
  useUpsertAcademyMutation,
} from '@entities/academy';
import { PasswordSetupForm, useChangePassword } from '@features/change-password';
import { useToast } from '@shared/hooks';

import { AcademyInfoForm } from '../AcademyInfoForm';
import { OnboardingComplete } from '../OnboardingComplete';
import { OnboardingShell } from '../OnboardingShell';

const PASSWORD_ERROR_MESSAGE = '비밀번호 변경에 실패했어요. 다시 시도해 주세요.';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [saved, setSaved] = useState<AcademyProfile | null>(null);

  const { data: academy } = useGetAcademyQuery();
  const changePassword = useChangePassword();
  const saveAcademy = useUpsertAcademyMutation();

  const onPasswordSubmit = (password: string) =>
    changePassword.mutate(password, {
      onSuccess: () => setStep(2),
      onError: (error) => {
        if (error instanceof FirebaseError && error.code === 'auth/requires-recent-login') {
          showToast({ message: '보안을 위해 다시 로그인한 뒤 진행해 주세요.', variant: 'error' });
          navigate('/login', { replace: true });
          return;
        }
        showToast({ message: PASSWORD_ERROR_MESSAGE, variant: 'error' });
      },
    });

  const onAcademySubmit = (input: UpsertAcademyInput) =>
    saveAcademy.mutate(input, {
      onSuccess: (data) => setSaved(data),
      onError: () => showToast({ message: '학원 정보 저장에 실패했어요. 다시 시도해 주세요.', variant: 'error' }),
    });

  // 학원 보유자의 URL 직접 접근 차단(이번 세션에서 막 저장한 경우는 완료 화면을 위해 통과)
  if (academy && !saveAcademy.isSuccess) return <Navigate to="/students" replace />;

  if (saved) {
    return <OnboardingComplete academy={saved} onGoHome={() => navigate('/students', { replace: true })} />;
  }

  return step === 1 ? (
    <OnboardingShell
      step={1}
      title="비밀번호를 새로 설정해 주세요"
      desc="처음 로그인하셨어요. 임시 비밀번호를 나만의 비밀번호로 바꿔 주세요."
    >
      <PasswordSetupForm
        onSubmit={onPasswordSubmit}
        isPending={changePassword.isPending}
        errorMessage={changePassword.isError ? PASSWORD_ERROR_MESSAGE : null}
      />
    </OnboardingShell>
  ) : (
    <OnboardingShell
      step={2}
      title="학원 정보를 입력해 주세요"
      desc={
        <>
          교부 영수증의 발급 주체로 사용돼요. 학원명과 대표자명만 있으면 시작할 수 있고,
          <br className="hidden md:inline" /> 나머지는 나중에 설정에서 추가할 수 있어요.
        </>
      }
    >
      <AcademyInfoForm onBack={() => setStep(1)} onSubmit={onAcademySubmit} isPending={saveAcademy.isPending} />
    </OnboardingShell>
  );
};

export default OnboardingPage;
