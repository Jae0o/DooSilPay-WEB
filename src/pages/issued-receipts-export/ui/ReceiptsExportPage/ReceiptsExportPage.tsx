import { motion, useReducedMotion } from 'motion/react';

import { AsyncBoundary } from '@shared/ui';

import ExportBoard from './ExportBoard';
import ExportBoardSkeleton from './ExportBoardSkeleton';

const ReceiptsExportPage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-[2.4rem] py-[2.8rem]"
    >
      <AsyncBoundary errorSize="md" skeleton={<ExportBoardSkeleton />}>
        <ExportBoard />
      </AsyncBoundary>
    </motion.section>
  );
};

export default ReceiptsExportPage;
