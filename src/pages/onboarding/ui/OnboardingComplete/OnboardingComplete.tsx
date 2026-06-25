import { motion, useReducedMotion } from 'motion/react';

import { ArrowRightIcon, Button, CheckCircleIcon } from '@shared/ui';

import type { OnboardingCompleteProps } from './OnboardingComplete.type';

const OnboardingComplete = ({ academy, onGoHome }: OnboardingCompleteProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-screen place-items-center bg-bg p-[3.2rem]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[44rem] text-center"
      >
        <div className="mx-auto mb-[2.2rem] grid size-[7.2rem] place-items-center rounded-full bg-ok-weak text-ok">
          <CheckCircleIcon size="4rem" />
        </div>

        <h1 className="text-[1.7rem] font-extrabold tracking-[-0.03em]">설정이 완료됐어요</h1>

        <p className="mt-[1.2rem] leading-[1.6] text-ink-2">
          비밀번호를 변경하고 학원 정보를 등록했어요.
          <br />
          이제 두페이의 모든 기능을 사용할 수 있어요.
        </p>

        <div className="mt-[2rem] rounded-md border border-line bg-surface p-[1.8rem] text-left">
          <div className="mb-[0.6rem] text-[1.3rem] font-bold text-ink-3">등록된 학원</div>
          <div className="text-[1.5rem] font-bold">{academy.name}</div>
          <div className="text-ink-2">{academy.ownerName} 원장</div>
        </div>

        <Button size="lg" fullWidth iconRight={<ArrowRightIcon />} onClick={onGoHome} className="mt-[2.4rem]">
          두페이로 이동
        </Button>
      </motion.div>
    </div>
  );
};

export default OnboardingComplete;
