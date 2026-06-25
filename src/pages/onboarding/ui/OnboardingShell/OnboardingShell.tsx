import { motion, useReducedMotion } from 'motion/react';

import { DooPayLogo, SparklesIcon } from '@shared/ui';
import { cn } from '@shared/utils';

import type { OnboardingShellProps } from './OnboardingShell.type';

const OnboardingShell = ({ step, title, desc, children }: OnboardingShellProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen justify-center bg-bg" style={{ padding: 'clamp(2.4rem, 6vw, 7.2rem) 2rem' }}>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[56rem]"
      >
        <div className="mb-[2.6rem]">
          <DooPayLogo size="2.8rem" />
        </div>

        <div className="mb-[1.2rem] flex items-center gap-[1rem]">
          <div className="flex items-center gap-[0.8rem] text-[1.4rem] font-bold text-point">
            <SparklesIcon size="1.8rem" /> 시작하기 · {step}/2단계
          </div>
          <div className="flex items-center gap-[0.5rem]">
            {[1, 2].map((n) => (
              <span
                key={n}
                className={cn(
                  'h-[0.8rem] rounded-[99px] transition-all',
                  n === step ? 'w-[2.2rem]' : 'w-[0.8rem]',
                  n <= step ? 'bg-point' : 'bg-line-2',
                )}
              />
            ))}
          </div>
        </div>

        <h1 className="text-[1.9rem] font-extrabold tracking-[-0.03em]">{title}</h1>
        <p className="mb-[2.8rem] mt-[1rem] leading-[1.6] break-keep text-ink-2">{desc}</p>

        {children}
      </motion.div>
    </div>
  );
};

export default OnboardingShell;
