import { useQuery } from '@tanstack/react-query';
import { motion, useReducedMotion } from 'motion/react';

import { useUiStore } from '@shared/store';

const StudentsPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

  // 골격 스모크: QueryClientProvider 하위에서 useQuery 동작 확인 (도메인 단계에서 교체)
  useQuery({ queryKey: ['smoke'], queryFn: () => Promise.resolve('ok') });

  return (
    <motion.section initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>수강생</h1>
      <p>sidebar: {String(isSidebarOpen)}</p>
    </motion.section>
  );
};

export default StudentsPage;
