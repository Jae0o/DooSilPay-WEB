import { motion, useReducedMotion } from 'motion/react';

import { LoginForm } from '@features/auth-login';
import { DooPayLogo } from '@shared/ui';

const LoginPage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-dvh">
      {/* 좌측 브랜드 패널 — 데스크탑 전용 */}
      <aside
        className="relative hidden flex-col justify-between overflow-hidden p-[5.6rem] text-white md:flex md:w-[46%]"
        style={{ background: 'linear-gradient(160deg, var(--color-point-strong), var(--color-point))' }}
      >
        <span className="absolute -right-[16rem] -top-[11rem] size-[48rem] rounded-full bg-white/[0.08]" />
        <span className="absolute -bottom-[14rem] right-[6.4rem] size-[32rem] rounded-full bg-white/[0.07]" />

        <DooPayLogo size="3.4rem" variant="onBrand" />

        <div className="relative">
          <h2 className="text-[3.8rem] font-extrabold leading-[1.25] tracking-[-0.03em]">
            학원 수강료 관리,
            <br />
            이제 두페이로 간단하게.
          </h2>
          <p className="mt-[1.8rem] text-[1.7rem] font-medium leading-relaxed text-white/85">
            수강생 등록부터 교부 영수증 발급, 월별 PDF 출력까지
            <br />한 곳에서 끝내세요.
          </p>
        </div>

        <span className="text-[1.35rem] text-white/60">© 2026 DooPay</span>
      </aside>

      {/* 우측 폼 */}
      <main className="flex flex-1 items-center justify-center bg-surface p-[3.2rem] md:p-[4rem]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[38rem]"
        >
          <div className="mb-[3.2rem] md:hidden">
            <DooPayLogo size="3.2rem" />
          </div>

          <h1 className="text-[2.7rem] font-extrabold tracking-[-0.03em]">로그인</h1>
          <p className="mb-[3rem] mt-[0.6rem] text-ink-3">원장님 계정으로 로그인해 주세요.</p>

          <LoginForm />

          <p className="mt-[2.2rem] text-center text-[1.4rem] text-ink-3">계정은 관리자가 발급해 드려요.</p>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
