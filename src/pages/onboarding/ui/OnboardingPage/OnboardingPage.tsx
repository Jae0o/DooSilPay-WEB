import { useState } from 'react';

import type { AcademyProfile, UpsertAcademyInput } from '@entities/academy';
import { PasswordSetupForm } from '@features/change-password';

import { AcademyInfoForm } from '../AcademyInfoForm';
import { OnboardingComplete } from '../OnboardingComplete';
import { OnboardingShell } from '../OnboardingShell';

const OnboardingPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [done, setDone] = useState(false);
  const [pwDone, setPwDone] = useState(false);
  const [saved, setSaved] = useState<AcademyProfile | null>(null);

  if (done && saved) {
    return (
      <OnboardingComplete
        academy={saved}
        onGoHome={() => {
          /* 02-04: navigate('/students', { replace: true }) */
        }}
      />
    );
  }

  return step === 1 ? (
    <OnboardingShell
      step={1}
      title="비밀번호를 새로 설정해 주세요"
      desc="처음 로그인하셨어요. 임시 비밀번호를 나만의 비밀번호로 바꿔 주세요."
    >
      <PasswordSetupForm
        onSubmit={() => {
          // 02-04: useChangePassword 연결
          setPwDone(true);
          setStep(2);
        }}
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
      <AcademyInfoForm
        onBack={() => setStep(1)}
        onSubmit={(input: UpsertAcademyInput) => {
          // 02-04: useUpsertAcademyMutation 연결
          if (pwDone) {
            setSaved(input as AcademyProfile);
            setDone(true);
          }
        }}
      />
    </OnboardingShell>
  );
};

export default OnboardingPage;
