import { AnimatePresence, type Transition, motion, useReducedMotion } from 'motion/react';
import { Outlet } from 'react-router';

import { useBreakpoint } from '@shared/hooks';
import { cn } from '@shared/utils';

import { AppBottomNav } from '../AppBottomNav';
import { AppSidebar } from '../AppSidebar';
import { AppTopBar } from '../AppTopBar';

const AppShell = () => {
  const isMobile = useBreakpoint();
  const reduce = useReducedMotion();

  // Transition 으로 명시(삼항에서 type:'spring' 리터럴이 string 으로 넓어져 tsc 에러나는 것 방지)
  const spring: Transition = reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 44 };

  return (
    <div className="flex min-h-screen">
      {/* 데스크탑 사이드바 — 폭(래퍼) + x(내용) 동시 트랜지션 */}
      <AnimatePresence initial={false}>
        {!isMobile && (
          <motion.div
            key="sidebar"
            initial={{ width: 0 }}
            animate={{ width: '24.8rem' }}
            exit={{ width: 0 }}
            transition={spring}
            className="dp-noprint h-screen shrink-0 overflow-hidden sticky top-0"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={spring}
              className="h-full w-[24.8rem]"
            >
              <AppSidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* main 컬럼 — 항상 마운트 유지 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 모바일 상단바 — 위 → 아래 */}
        <AnimatePresence initial={false}>
          {isMobile && (
            <motion.div
              key="topbar"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={spring}
              className="dp-noprint sticky top-0 z-50"
            >
              <AppTopBar />
            </motion.div>
          )}
        </AnimatePresence>

        <main
          className={cn(
            'flex-1',
            isMobile ? 'px-[1.6rem] pt-[2rem] pb-[7.8rem]' : 'px-[clamp(2.4rem,4vw,5.2rem)] pt-[3.4rem] pb-[9rem]',
          )}
        >
          <div className="mx-auto max-w-[108rem]">
            <Outlet />
          </div>
        </main>

        {/* 모바일 하단바 — 아래 → 위 */}
        <AnimatePresence initial={false}>
          {isMobile && (
            <motion.div
              key="bottomnav"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={spring}
              className="dp-noprint fixed inset-x-0 bottom-0 z-50"
            >
              <AppBottomNav />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppShell;
